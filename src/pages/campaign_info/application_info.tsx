import {CalendarTodayOutlined, CorporateFareOutlined, LocationOnOutlined, WorkOutlineOutlined} from "@mui/icons-material";
import {Box, Typography, Chip} from "@mui/material"
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import type {Application, Campaign, CampaignTask} from "../../interfaces/interfaces.ts";
import {getCampaignByID} from "../../services/campaign_service.ts";
import {getApplicationByID, getTaskByID} from "../../services/volunteer_application_service.ts";
import theme from "../../theme.ts";

function ApplicationInfo() {
    const {id} = useParams<{ id: string }>();
    const [application, setApplication] = useState<Application | null>(null)
    const [task, setTask] = useState<CampaignTask | null>(null)
    const [campaign, setCampaign] = useState<Campaign | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    console.log(id)

    useEffect(() => {
        async function get_application_details() {
            try {
                const _application = await getApplicationByID(id);
                setApplication(_application.data);

                const _task = await getTaskByID(_application.data.c_task_id);
                setTask(_task.data);

                const _campaign = await getCampaignByID(_task.data.campaign_id);
                setCampaign(_campaign.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        get_application_details();
    }, [id]);

    const chip_color = () => {
        if (application?.status === 'approved')
            return theme.palette.primary.main
        else if (application?.status === 'rejected')
            return '#ff0000'
        else if (application?.status === 'pending')
            return 'orange'
    }
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
                <Typography variant={'body1'}>
                    <WorkOutlineOutlined />
                    {task?.name}
                </Typography>
                <Typography variant={'body1'}>
                    - {task?.description}
                </Typography>
                <Chip label={application?.status.toUpperCase()} sx={{
                    my: 1,
                    width: "fit-content",
                    backgroundColor: chip_color(),
                    color: theme.palette.primary.contrastText,
                }}/>
            </Box>
        </Box>
    )
}
export default ApplicationInfo