
import {Box, List, ListItem, ListItemText, Paper, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import type {Application, CampaignTask, Volunteer} from "../../interfaces/interfaces.ts";
import {mockApplications, mockCampaigns, mockVolunteers} from "../../interfaces/mock_data.ts";
import {delay} from "../../services/global_service.ts";

interface ApplicationListProps {
    c_id: string;
}

async function getApplicationsByCampaignId(campaignId: string) {
    await delay(400);
    const campaign = mockCampaigns.find((c) => c.id === campaignId);
    if (!campaign) throw new Error("Campaign not found");

    const taskIds = campaign.task.map((t) => t.id);
    const applications = mockApplications.filter((app) => taskIds.includes(app.c_task_id));

    return {data: applications};
}

async function getVolunteerById(volunteerId: string) {
    await delay(200);
    const volunteer = mockVolunteers.find((v) => v.id === volunteerId);
    if (!volunteer) throw new Error("Volunteer not found");
    return {data: volunteer};
}

async function getTaskById(taskId: string) {
    await delay(200);
    const task = mockCampaigns
        .flatMap(c => c.task)
        .find(t => t.id === taskId);
    if (!task) throw new Error("Task not found");
    return {data: task};
}

function ApplicationList({c_id}: ApplicationListProps) {
    const [applications, setApplications] = useState<Application[]>([]);
    const [volunteers, setVolunteers] = useState<Map<string, Volunteer>>(new Map());
    const [tasks, setTasks] = useState<Map<string, CampaignTask>>(new Map());
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchApplications() {
            try {
                const response = await getApplicationsByCampaignId(c_id);
                setApplications(response.data);

                const volunteerMap = new Map<string, Volunteer>();
                const taskMap = new Map<string, CampaignTask>();

                for (const app of response.data) {
                    const volunteerResponse = await getVolunteerById(app.user_id);
                    volunteerMap.set(app.user_id, volunteerResponse.data);

                    const taskResponse = await getTaskById(app.c_task_id);
                    taskMap.set(app.c_task_id, taskResponse.data);
                }

                setVolunteers(volunteerMap);
                setTasks(taskMap);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        fetchApplications();
    }, [c_id]);

    if (loading) {
        return (
            <Typography variant="body1">Loading applications...</Typography>
        );
    }

    if (applications.length === 0) {
        return (
            <Paper sx={{p: 2}}>
                <Typography variant="h5" sx={{mb: 2}}>
                    Applications
                </Typography>
                <Typography variant="body1">No applications yet.</Typography>
            </Paper>
        );
    }

    return (
        <Paper sx={{p: 2}}>
            <Typography variant="h5" sx={{mb: 2}}>
                Applications ({applications.length})
            </Typography>
            <List>
                {applications.map((app) => {
                    const volunteer = volunteers.get(app.user_id);
                    const task = tasks.get(app.c_task_id);

                    return (
                        <ListItem
                            key={app.id}
                            sx={{
                                border: '1px solid #e0e0e0',
                                borderRadius: 1,
                                mb: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'stretch'
                            }}
                        >
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                width: '100%',
                                mb: 1
                            }}>
                                <ListItemText
                                    primary={`${volunteer?.first_name} ${volunteer?.last_name}`}
                                    secondary={volunteer?.email}
                                />
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                                Task: {task?.name}
                            </Typography>
                        </ListItem>
                    );
                })}
            </List>
        </Paper>
    );
}

export default ApplicationList;