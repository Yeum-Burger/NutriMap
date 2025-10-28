import { Paper, Box, Typography, List, ListItem, ListItemText, Chip } from "@mui/material"
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import { useEffect, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type {BarangayRiskData} from "../../../interfaces/interfaces.ts";
import { getRiskDataByTimePeriod } from '../../../services/risk_data_service.ts'
import barangaysData from '../../../assets/Barangays.json'

function O_Heatmap() {
    const [geojsonData, setGeojsonData] = useState<any>(null)
    const [mapKey, setMapKey] = useState(0)
    const [riskData, setRiskData] = useState<BarangayRiskData[]>([])
    
    useEffect(() => {
        async function fetchRiskData() {
            const data = await getRiskDataByTimePeriod('current')
            setRiskData(data)
        }
        fetchRiskData()
    }, [])
    
    useEffect(() => {
        try {
            const data = barangaysData as any
            const dumagueteBarangays = data.features.filter((feature: any) =>
                feature.properties.NAME_2 === 'Dumaguete City'  // Also update this
            )
            setGeojsonData({ type: 'FeatureCollection', features: dumagueteBarangays })
            setMapKey(prev => prev + 1)
        } catch (error) {
            console.error('Error loading GeoJSON:', error)
        }
    }, [])

    const getColor = (brgyName: string) => {
        const barangay = riskData.find(b =>
            b.name.toLowerCase() === brgyName.toLowerCase()
        )
        if (!barangay) return '#cccccc'
        
        if (barangay.risk_score >= 75) return '#d32f2f'
        if (barangay.risk_score >= 50) return '#ff9800'
        return '#4caf50'
    }

    const style = (feature: any) => {
        const fillColor = getColor(feature.properties.NAME_3)
        return {
            fillColor: fillColor,
            weight: 2,
            opacity: 1,
            color: '#ffffff',
            dashArray: '',
            fillOpacity: 0.7
        }
    }

    const onEachFeature = (feature: any, layer: L.Layer) => {
        const brgyName = feature.properties.NAME_3
        const barangay = riskData.find(b =>
            b.name.toLowerCase() === brgyName.toLowerCase()
        )

        if (barangay) {
            layer.bindPopup(`
            <strong>${barangay.name}</strong><br/>
            Risk Score: ${barangay.risk_score}<br/>
            Severity: ${barangay.severity}
        `)
        } else {
            layer.bindPopup(`<strong>${brgyName}</strong><br/>No data available`)
        }
    }

    const sortedBarangays = [...riskData].sort((a, b) => b.risk_score - a.risk_score)

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'HIGH': return 'error'
            case 'MEDIUM': return 'warning'
            case 'LOW': return 'success'
            default: return 'default'
        }
    }

    return (
        <Paper sx={{ p: 3, height: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: 2 }}>
            <MapContainer
                center={[9.3068, 123.3054]}
                zoom={13}
                style={{ height: '40vh' , width: '100%' }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {geojsonData && (
                    <GeoJSON
                        key={mapKey}
                        data={geojsonData}
                        style={style}
                        onEachFeature={onEachFeature}
                    />
                )}
            </MapContainer>
            <Box sx={{ flex: 1, height: '30vh', width: '100%' }}>
                <Typography variant="h6" gutterBottom>
                    Barangay Risk Levels
                </Typography>
                <List sx={{ height: '25vh', overflow: 'auto', bgcolor: 'background.paper' }}>
                    {sortedBarangays.map((barangay: BarangayRiskData) => (
                        <ListItem key={barangay.id} divider>
                            <ListItemText
                                primary={barangay.name}
                                secondary={`Risk Score: ${barangay.risk_score}`}
                            />
                            <Chip
                                label={barangay.severity}
                                color={getSeverityColor(barangay.severity) as any}
                                size="small"
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Paper>
    )
}
export default O_Heatmap