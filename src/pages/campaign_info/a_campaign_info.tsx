import {CalendarTodayOutlined, CorporateFareOutlined, LocationOnOutlined} from "@mui/icons-material";
import {Box, Chip, Typography, Button} from "@mui/material"
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import type {Campaign} from "../../interfaces/interfaces.ts";
import {getCampaignByID, updateCampaignStatus} from "../../services/campaign_service.ts";
import theme from "../../theme.ts";

function A_CampaignInfo() {
    const {id} = useParams<{ id: string }>();
    const [campaign, setCampaign] = useState<Campaign>()
    const [loading, setLoading] = useState<boolean>(true)
    const [updating, setUpdating] = useState<boolean>(false)

    useEffect(() => {
        async function get_campaign() {
            try {
                const response = await getCampaignByID(id)
                setCampaign(response.data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        get_campaign()
    }, [id])

    const handleApprove = async () => {
        setUpdating(true)
        try {
            await updateCampaignStatus(id, 'approved')
            setCampaign(prev => prev ? {...prev, status: 'approved'} : prev)
        } catch (error) {
            console.log(error)
        } finally {
            setUpdating(false)
        }
    }

    const handleReject = async () => {
        setUpdating(true)
        try {
            await updateCampaignStatus(id, 'rejected')
            setCampaign(prev => prev ? {...prev, status: 'rejected'} : prev)
        } catch (error) {
            console.log(error)
        } finally {
            setUpdating(false)
        }
    }
    const chip_color = () => {
        if (campaign?.status === 'approved')
            return theme.palette.primary.main
        else if (campaign?.status === 'rejected')
            return '#ff0000'
        else if (campaign?.status === 'pending')
            return 'orange'
    }
    const tasks_description = campaign?.task.map((t) => (
        <Box key={t.id} sx={{
            display: "flex",
            flexDirection: "column",
        }}>
            <Typography variant="body1" fontWeight={'bold'}>{t.name}</Typography>
            <Typography variant="body1">- {t.description}</Typography>
        </Box>
    ))

    if (loading) {
        return (
            <Typography variant={'body1'}>
                Loading . . .
            </Typography>
        )
    }
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2
        }}>
            <Typography variant={'h3'}>
                {campaign?.name}
            </Typography>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1
            }}>
                <Typography variant={'body1'}>
                    <CorporateFareOutlined />
                    {campaign?.organization_name}
                </Typography>
                <Typography variant={'body1'}>
                    <LocationOnOutlined />
                    {campaign?.location}
                </Typography>
                <Typography variant={'body1'}>
                    <CalendarTodayOutlined />
                    {campaign?.date.toLocaleDateString()}
                </Typography>
                <Chip label={campaign?.status.toUpperCase()} sx={{
                    my: 1,
                    width: "fit-content",
                    backgroundColor: chip_color(),
                    color: theme.palette.primary.contrastText,
                }}/>
                <Typography variant={'body1'}
                            sx={{
                                textAlign: "justify",
                                textOverflow: "ellipsis",
                            }}>
                    {campaign?.description}
                </Typography>
            </Box>

            <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2
            }}>
                { (!tasks_description)
                    ? <></>
                    : <>
                        <Typography variant={'h4'}>Available Volunteer Tasks</Typography>
                        <Box sx={{
                            display: "flex",
                            flexDirection: 'column',
                            gap: 1
                        }}>
                            {tasks_description}
                        </Box>
                    </>
                }
            </Box>

            {campaign?.status === 'pending' && (
                <Box sx={{
                    display: 'flex',
                    gap: 2,
                    mt: 2
                }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleApprove}
                        disabled={updating}
                        fullWidth
                    >
                        Approve Campaign
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={handleReject}
                        disabled={updating}
                        fullWidth
                    >
                        Reject Campaign
                    </Button>
                </Box>
            )}
        </Box>
    )
}
export default A_CampaignInfo