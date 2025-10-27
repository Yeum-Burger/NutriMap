import {
    CorporateFareOutlined,
    LocationOnOutlined,
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
    id: string;
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
            m: 1,
            p: 1
        }}>
            <CardHeader title={campaign?.name} />
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
                    <Typography variant={'body1'}>
                        <CorporateFareOutlined />
                        {campaign?.organization_name}
                    </Typography>
                    <Typography variant={'body1'}>
                        <LocationOnOutlined />
                        {campaign?.location}
                    </Typography>
                    <Typography variant={'body1'}>
                        <WorkOutlineOutlined />
                        {task?.name}
                    </Typography>
                </Box>
                <Typography variant={'body1'}>
                    {task?.description}
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