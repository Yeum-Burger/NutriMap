import {WorkOutlineOutlined} from "@mui/icons-material";
import {Box, Typography} from "@mui/material"
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import type {Campaign, CampaignTask} from "../../interfaces/interfaces.ts";
import {getCampaignByID} from "../../services/campaign_service.ts";
import {getApplicationByID, getTaskByID} from "../../services/volunteer_application_service.ts";

function ApplicationInfo() {
    const {id} = useParams<{ id: string }>();
    const [task, setTask] = useState<CampaignTask | null>(null)
    const [campaign, setCampaign] = useState<Campaign | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    console.log(id)

    useEffect(() => {
        async function get_application_details() {
            try {
                const applicationId = id ? parseInt(id) : undefined
                const _application = await getApplicationByID(applicationId);

                const _task = await getTaskByID(_application.data.campaign_task_id);
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
                {campaign?.title}
            </Typography>
            <Box sx={{
                display: "flex",
                    flexDirection: "column",
                    gap: 1
            }}>
                <Typography variant={'body1'}
                sx={{
                    textAlign: "justify",
                        textOverflow: "ellipsis",
                }}>
                    {campaign?.description}
                </Typography>
                <Typography variant={'body1'}>
                    <WorkOutlineOutlined />
                    {task?.task_name}
                </Typography>
                <Typography variant={'body1'}>
                    - {task?.task_description}
                </Typography>
            </Box>
        </Box>
    )
}
export default ApplicationInfo