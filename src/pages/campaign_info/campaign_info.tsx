import {Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Typography, Select, type SelectChangeEvent} from "@mui/material"
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import type {ApplicationDraft, Campaign} from "../../interfaces/interfaces.ts";
import {useAuth} from "../../services/auth_service.tsx";
import {getCampaignByID} from "../../services/campaign_service.ts";
import {getAvailableLotsForTask, createApplication} from "../../services/volunteer_application_service.ts";
import Notification from "../../components/notification.tsx";

function CampaignInfo () {
    const {id} = useParams<{ id: string }>();
    const {user} = useAuth()
    const [campaign, setCampaign] = useState<Campaign>()
    const [loading, setLoading] = useState<boolean>(true)
    const [task, setTask] = useState<number | ''>('')
    const [error, setError] = useState(false)
    const [taskLots, setTaskLots] = useState<Map<number, number>>(new Map())
    const [notification, setNotification] = useState({ open: false, message: "", severity: "success" as "success" | "error" })

    useEffect(() => {
        async function get_campaign() {
            try {
                const campaignId = id ? parseInt(id) : undefined
                const response = await getCampaignByID(campaignId)
                setCampaign(response.data)
                
                const lotsMap = new Map<number, number>();
                if (response.data.task) {
                    for (const task of response.data.task) {
                        const lots = await getAvailableLotsForTask(task.id);
                        lotsMap.set(task.id, lots);
                    }
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
    const tasks_description = campaign?.task?.map((t) => (
        <Box key={t.id} sx={{
            display: "flex",
            flexDirection: "column",
        }}>
            <Typography variant="body1" fontWeight={'bold'}>{t.task_name}</Typography>
            <Typography variant="body1">- {t.task_description}</Typography>
            <Typography variant="body2" color="text.secondary">
                Available lots: {taskLots.get(t.id) ?? 0} / {t.volunteer_quota}
            </Typography>
        </Box>
    ))
    const tasks = campaign?.task?.map((t) => (
        <MenuItem value={t.id} key={t.id}>
            {t.task_name} ({taskLots.get(t.id) ?? 0} slots available)
        </MenuItem>
    ))

    const handleChange = (event: SelectChangeEvent<number | ''>) => {
        setTask(event.target.value as number);
        setError(false);
    };

    const handleSubmit = async () => {
        if (!task) {
            setError(true);
            return;
        }
        const application: ApplicationDraft = {
            campaign_task_id: task,
            volunteer_id: user?.id ?? 0
        }
        
        try {
            await createApplication(application);
            setNotification({ open: true, message: "Application submitted successfully!", severity: "success" });
            setTask('');
            
            if (campaign?.task) {
                const lotsMap = new Map<number, number>();
                for (const t of campaign.task) {
                    const lots = await getAvailableLotsForTask(t.id);
                    lotsMap.set(t.id, lots);
                }
                setTaskLots(lotsMap);
            }
        } catch (error) {
            console.error("Error creating application:", error);
            setNotification({ open: true, message: "Failed to submit application. Please try again.", severity: "error" });
        }
    };


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
            </Box>

            <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2
            }}>
                { (!campaign?.task || campaign.task.length === 0)
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
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'stretch',
                            gap: 1
                        }}>
                            <FormControl fullWidth error={error}>
                                <InputLabel id="task-label">Task</InputLabel>
                                <Select
                                    labelId="task-label"
                                    id="task-select"
                                    name="select"
                                    value={task}
                                    onChange={handleChange}
                                    label="Task"
                                >
                                    {tasks}
                                </Select>
                                {error && (
                                    <FormHelperText>Please select a task before applying.</FormHelperText>
                                )}
                            </FormControl>

                            <Button onClick={handleSubmit}>
                                Apply Now
                            </Button>
                        </Box>
                    </>
                }
            </Box>
            <Notification
                open={notification.open}
                message={notification.message}
                severity={notification.severity}
                onClose={() => setNotification({ ...notification, open: false })}
            />
        </Box>
    )
}
export default CampaignInfo