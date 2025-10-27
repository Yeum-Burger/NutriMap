import {CalendarTodayOutlined, CorporateFareOutlined, LocationOnOutlined} from "@mui/icons-material";
import {Box, Typography} from "@mui/material"
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import type {Campaign} from "../../interfaces/interfaces.ts";
import {getCampaignByID} from "../../services/campaign_service.ts";
import {getAvailableLotsForTask} from "../../services/volunteer_application_service.ts";
import ApplicationList from "./application_list.tsx";

function O_CampaignInfo () {
    const {id} = useParams<{ id: string }>();
    const [campaign, setCampaign] = useState<Campaign>()
    const [loading, setLoading] = useState<boolean>(true)
    const [taskLots, setTaskLots] = useState<Map<string, number>>(new Map())

    useEffect(() => {
        async function get_campaign() {
            try {
                const response = await getCampaignByID(id)
                setCampaign(response.data)
                
                const lotsMap = new Map<string, number>();
                for (const task of response.data.task) {
                    const lots = await getAvailableLotsForTask(task.id);
                    lotsMap.set(task.id, lots);
                }
                setTaskLots(lotsMap);
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        get_campaign()
    }, [id])
    
    const tasks_description = campaign?.task.map((t) => (
        <Box key={t.id} sx={{
            display: "flex",
            flexDirection: "column",
        }}>
            <Typography variant="body1" fontWeight={'bold'}>{t.name}</Typography>
            <Typography variant="body1">- {t.description}</Typography>
            <Typography variant="body2" color="text.secondary">
                Available lots: {taskLots.get(t.id) ?? 0} / {t.quota}
            </Typography>
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

            <ApplicationList c_id={id || ''} />
        </Box>
    )
}
export default O_CampaignInfo