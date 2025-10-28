import {
    RemoveRedEyeOutlined,
    WorkOutlineOutlined
} from "@mui/icons-material";
import {Box, Button, Card, CardActions, CardContent, CardHeader, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import type {Application, Campaign, CampaignTask} from "../interfaces/interfaces.ts";
import {PATHS} from "../PATHS.ts";
import {getCampaignByID} from "../services/campaign_service.ts";
import {getApplicationByID, getTaskByID} from "../services/volunteer_application_service.ts";

interface ApplicationCardProps {
    id: number;
}
function ApplicationCard({id}: ApplicationCardProps) {
    const [application, setApplication] = useState<Application | null>(null)
    const [task, setTask] = useState<CampaignTask | null>(null)
    const [campaign, setCampaign] = useState<Campaign | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const navigate = useNavigate()
    const handle_click = () => {
        console.log(id)
        navigate(`${PATHS.APPLICATION_INFO}/${id}`)
    }

    useEffect(() => {
        async function get_application_details() {
            try {
                const _application = await getApplicationByID(id);
                setApplication(_application.data);

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
    if (!application) {
        return (
            <Typography variant={'body1'}>
                No Available Campaigns
            </Typography>
        )
    }

    return (
        <Card sx={{
            p: 1
        }}>
            <CardHeader title={campaign?.title} />
            <CardContent sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                minHeight: 'fit-content',
            }}>
                {/* CAMPAIGN DETAILS */}
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1
                }}>
                    {/* Organization name and location removed - not in schema */}
                    <Typography variant={'body1'}>
                        <WorkOutlineOutlined />
                        {task?.task_name}
                    </Typography>
                </Box>
                <Typography variant={'body1'}>
                    {task?.task_description}
                </Typography>
            </CardContent>
            <CardActions sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
            }}>
                <Button onClick={handle_click}
                        fullWidth
                        sx={{
                            display: "flex",
                            gap: 1
                        }}>
                    <RemoveRedEyeOutlined />
                    View
                </Button>
            </CardActions>
        </Card>
    )
}
export default ApplicationCard