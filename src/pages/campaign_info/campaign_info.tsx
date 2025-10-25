import {CalendarTodayOutlined, CorporateFareOutlined, LocationOnOutlined} from "@mui/icons-material";
import {Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Typography, Select, type SelectChangeEvent} from "@mui/material"
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import type {ApplicationDraft, Campaign} from "../../interfaces/interfaces.ts";
import {STATUS} from "../../PATHS.ts";
import {useAuth} from "../../services/auth_service.tsx";
import {getCampaignByID} from "../../services/campaign_service.ts";

function CampaignInfo () {
    const {id} = useParams<{ id: string }>();
    const {user} = useAuth()
    const [campaign, setCampaign] = useState<Campaign>()
    const [loading, setLoading] = useState<boolean>(true)
    const [task, setTask] = useState('')
    const [error, setError] = useState(false)

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
    const tasks_description = campaign?.task.map((t) => (
        <Box key={t.id} sx={{
            display: "flex",
            flexDirection: "column",
        }}>
            <Typography variant="body1" fontWeight={'bold'}>{t.name}</Typography>
            <Typography variant="body1">- {t.description}</Typography>
        </Box>
    ))
    const tasks = campaign?.task.map((t) => (
        <MenuItem value={t.id} key={t.id}>
            {t.name}
        </MenuItem>
    ))

    const handleChange = (event: SelectChangeEvent) => {
        setTask(event.target.value as string);
        setError(false); // clear error on change
    };

    const handleSubmit = () => {
        if (!task) {
            setError(true);
            return;
        }
        const application: ApplicationDraft = {
            c_task_id: task,
            status: STATUS.PENDING,
            user_id: user?.id ?? ''
        }
        console.log(application);
        // TODO: CREATE A NEW ENTRY IN APPLICATIONS TABLE, ALSO ADD FEEDBACK AFTER APPLYING
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
                                    name="select"
                                    value={task}
                                    onChange={handleChange}
                                    label="Task"
                                >
                                    {tasks}
                                </Select>
                            </FormControl>

                            {error && (
                                <FormHelperText error>Please select a task before applying.</FormHelperText>
                            )}

                            <Button onClick={handleSubmit}>
                                Apply Now
                            </Button>
                        </Box>
                    </>
                }
            </Box>
        </Box>
    )
}
export default CampaignInfo