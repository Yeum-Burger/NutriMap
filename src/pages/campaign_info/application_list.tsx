import {Box, List, ListItem, ListItemText, Paper, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import type {Application, CampaignTask, Volunteer} from "../../interfaces/interfaces.ts";
import { supabase } from "../../services/global_service.ts";

interface ApplicationListProps {
    c_id: number;
}

async function getApplicationsByCampaignId(campaignId: number) {
    const { data: campaign, error: campaignError } = await supabase
        .from('Campaign')
        .select('id')
        .eq('id', campaignId)
        .single();
    
    if (campaignError) {
        console.error(`Error fetching campaign ${campaignId}:`, campaignError);
        throw new Error(campaignError.message);
    }
    if (!campaign) {
        console.warn(`Campaign ${campaignId} not found`);
        throw new Error("Campaign not found");
    }

    const { data: tasks, error: tasksError } = await supabase
        .from('Campaign_Task')
        .select('id')
        .eq('campaign_id', campaignId);
    
    if (tasksError) {
        console.error(`Error fetching tasks for campaign ${campaignId}:`, tasksError);
        throw new Error(tasksError.message);
    }
    
    if (!tasks || tasks.length === 0) {
        console.log(`No tasks found for campaign ${campaignId}`);
        return {data: []};
    }
    
    const taskIds = tasks.map((t) => t.id);
    
    const { data: applications, error: appsError } = await supabase
        .from('Application')
        .select('*')
        .in('campaign_task_id', taskIds);
    
    if (appsError) {
        console.error(`Error fetching applications for campaign ${campaignId}:`, appsError);
        throw new Error(appsError.message);
    }

    return {data: applications || []};
}

async function getVolunteerById(volunteerId: number) {
    const { data: volunteer, error } = await supabase
        .from('Volunteer')
        .select('*')
        .eq('id', volunteerId)
        .single();
    
    if (error) {
        console.error(`Error fetching volunteer ${volunteerId}:`, error);
        throw new Error(error.message);
    }
    if (!volunteer) {
        console.warn(`Volunteer ${volunteerId} not found`);
        throw new Error("Volunteer not found");
    }
    return {data: volunteer};
}

async function getTaskById(taskId: number) {
    const { data: task, error } = await supabase
        .from('Campaign_Task')
        .select('*')
        .eq('id', taskId)
        .single();
    
    if (error) {
        console.error(`Error fetching task ${taskId}:`, error);
        throw new Error(error.message);
    }
    if (!task) {
        console.warn(`Task ${taskId} not found`);
        throw new Error("Task not found");
    }
    return {data: task};
}

function ApplicationList({c_id}: ApplicationListProps) {
    const [applications, setApplications] = useState<Application[]>([]);
    const [volunteers, setVolunteers] = useState<Map<number, Volunteer>>(new Map());
    const [tasks, setTasks] = useState<Map<number, CampaignTask>>(new Map());
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchApplications() {
            try {
                const response = await getApplicationsByCampaignId(c_id);
                setApplications(response.data);

                const volunteerMap = new Map<number, Volunteer>();
                const taskMap = new Map<number, CampaignTask>();

                for (const app of response.data) {
                    const volunteerResponse = await getVolunteerById(app.volunteer_id);
                    volunteerMap.set(app.volunteer_id, volunteerResponse.data);

                    const taskResponse = await getTaskById(app.campaign_task_id);
                    taskMap.set(app.campaign_task_id, taskResponse.data);
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

        const channel = supabase
            .channel('applications-changes')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'Application'
                },
                async (payload) => {
                    const newApp = payload.new as Application;
                    
                    const { data: tasks } = await supabase
                        .from('Campaign_Task')
                        .select('campaign_id')
                        .eq('id', newApp.campaign_task_id)
                        .single();
                    
                    if (tasks?.campaign_id === c_id) {
                        setApplications((prev) => [...prev, newApp]);
                        
                        const volunteerResponse = await getVolunteerById(newApp.volunteer_id);
                        setVolunteers((prev) => new Map(prev).set(newApp.volunteer_id, volunteerResponse.data));
                        
                        const taskResponse = await getTaskById(newApp.campaign_task_id);
                        setTasks((prev) => new Map(prev).set(newApp.campaign_task_id, taskResponse.data));
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
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
                    const volunteer = volunteers.get(app.volunteer_id);
                    const task = tasks.get(app.campaign_task_id);

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
                                    primary={`${volunteer?.f_name} ${volunteer?.l_name}`}
                                    secondary={volunteer?.email}
                                />
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                                Task: {task?.task_name}
                            </Typography>
                        </ListItem>
                    );
                })}
            </List>
        </Paper>
    );
}

export default ApplicationList;