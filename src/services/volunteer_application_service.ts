import { supabase } from "./global_service.ts";
import type { Application, ApplicationDraft, CampaignTask } from "../interfaces/interfaces.ts";

export async function getApplicationIDs(volunteer_id: number | undefined): Promise<{ data: number[] }> {
    if (!volunteer_id) {
        console.error('Volunteer ID is required for getApplicationIDs');
        throw new Error('Volunteer ID is required.');
    }
    
    const { data, error } = await supabase
        .from('Application')
        .select('id')
        .eq('volunteer_id', volunteer_id);
    
    if (error) {
        console.error('Error fetching application IDs:', error);
        throw new Error(error.message);
    }
    
    if (!data) {
        console.warn('No applications found for volunteer:', volunteer_id);
        return { data: [] };
    }
    
    return { data: data.map((a) => a.id) };
}

export async function createApplication(applicationData: ApplicationDraft): Promise<{ data: { application_id: number } }> {
    if (!applicationData.volunteer_id || !applicationData.campaign_task_id) {
        console.error('Missing required fields for application:', applicationData);
        throw new Error('Volunteer ID and Campaign Task ID are required.');
    }
    
    const { data, error } = await supabase
        .from('Application')
        .insert([{
            volunteer_id: applicationData.volunteer_id,
            campaign_task_id: applicationData.campaign_task_id
        }])
        .select('id')
        .single();
    
    if (error) {
        console.error('Error creating application:', error);
        throw new Error(error.message);
    }
    
    if (!data) {
        console.error('No data returned after application creation');
        throw new Error('Failed to create application.');
    }
    
    return { data: { application_id: data.id } };
}

export async function getApplicationByID(id: number | undefined) {
    if (!id) {
        console.error('Application ID is required for getApplicationByID');
        throw new Error('Application ID is required.');
    }
    
    const { data, error } = await supabase
        .from('Application')
        .select('*')
        .eq('id', id)
        .single();
    
    if (error) {
        console.error(`Error fetching application ${id}:`, error);
        throw new Error(error.message);
    }
    
    if (!data) {
        console.warn(`Application ${id} not found`);
        throw new Error('Application not found.');
    }
    
    return { data: data as Application };
}

export async function getTaskByID(id: number | undefined) {
    if (!id) {
        console.error('Task ID is required for getTaskByID');
        throw new Error('Task ID is required.');
    }
    
    const { data, error } = await supabase
        .from('Campaign_Task')
        .select('*')
        .eq('id', id)
        .single();
    
    if (error) {
        console.error(`Error fetching task ${id}:`, error);
        throw new Error(error.message);
    }
    
    if (!data) {
        console.warn(`Task ${id} not found`);
        throw new Error("Task not found.");
    }
    
    return { data: data as CampaignTask };
}

export async function getAvailableLotsForTask(taskId: number | undefined): Promise<number> {
    if (!taskId) {
        console.error('Task ID is required for getAvailableLotsForTask');
        throw new Error('Task ID is required.');
    }
    
    const { data: task, error: taskError } = await supabase
        .from('Campaign_Task')
        .select('volunteer_quota')
        .eq('id', taskId)
        .single();
    
    if (taskError) {
        console.error(`Error fetching task ${taskId} for available lots:`, taskError);
        throw new Error(taskError.message);
    }
    
    if (!task) {
        console.warn(`Task ${taskId} not found for available lots calculation`);
        throw new Error("Task not found.");
    }
    
    const { count, error: countError } = await supabase
        .from('Application')
        .select('*', { count: 'exact', head: true })
        .eq('campaign_task_id', taskId);
    
    if (countError) {
        console.error(`Error counting applications for task ${taskId}:`, countError);
        throw new Error(countError.message);
    }
    
    const applicationsCount = count || 0;
    const availableLots = Math.max(0, task.volunteer_quota - applicationsCount);
    
    console.log(`Task ${taskId}: ${availableLots} lots available (${applicationsCount}/${task.volunteer_quota} filled)`);
    
    return availableLots;
}


