import {CalendarTodayOutlined, CorporateFareOutlined, LocationOnOutlined, WorkOutlineOutlined} from "@mui/icons-material";
import {Box, Typography, Chip, Button} from "@mui/material"
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import type {Application, Campaign, CampaignTask} from "../../interfaces/interfaces.ts";
import {getCampaignByID} from "../../services/campaign_service.ts";
import {getApplicationByID, getTaskByID, updateApplicationStatus} from "../../services/volunteer_application_service.ts";
import theme from "../../theme.ts";

function ApplicationInfo() {
    const {id} = useParams<{ id: string }>();
    const [application, setApplication] = useState<Application | null>(null)
    const [task, setTask] = useState<CampaignTask | null>(null)
    const [campaign, setCampaign] = useState<Campaign | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [updating, setUpdating] = useState<boolean>(false)

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

    const handleApprove = async () => {
        setUpdating(true)
        try {
            await updateApplicationStatus(id, 'approved')
            setApplication(prev => prev ? {...prev, status: 'approved'} : prev)
        } catch (error) {
            console.log(error)
        } finally {
            setUpdating(false)
        }
    }

    const handleReject = async () => {
        setUpdating(true)
        try {
            await updateApplicationStatus(id, 'rejected')
            setApplication(prev => prev ? {...prev, status: 'rejected'} : prev)
        } catch (error) {
            console.log(error)
        } finally {
            setUpdating(false)
        }
    }

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

            {application?.status === 'pending' && (
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
                        Approve Application
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={handleReject}
                        disabled={updating}
                        fullWidth
                    >
                        Reject Application
                    </Button>
                </Box>
            )}
        </Box>
    )
}
export default ApplicationInfo