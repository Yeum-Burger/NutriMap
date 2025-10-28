import { supabase } from "./global_service.ts";
import type { Campaign, CreateCampaignFormData } from "../interfaces/interfaces.ts";

export async function getCampaignIDs(count?: number, organization_id?: number): Promise<{ data: number[] }> {
    let query = supabase.from('Campaign').select('id');
    
    if (organization_id) {
        query = query.eq('organization_id', organization_id);
    }
    
    if (count) {
        query = query.limit(count);
    }
    
    const { data, error } = await query;
    
    if (error) {
        console.error('Error fetching campaign IDs:', error);
        throw new Error(error.message);
    }
    
    if (!data) {
        console.warn('No campaigns found');
        return { data: [] };
    }
    
    return { data: data.map(c => c.id) };
}

export async function getCampaignByID(id: number | undefined) {
    if (!id) {
        throw new Error('Campaign ID is required.');
    }
    
    // First fetch the campaign
    const { data: campaignData, error: campaignError } = await supabase
        .from('Campaign')
        .select('*')
        .eq('id', id)
        .single();
    
    if (campaignError) {
        console.error(`Error fetching campaign ${id}:`, campaignError);
        throw new Error(campaignError.message);
    }
    
    if (!campaignData) {
        console.warn(`Campaign ${id} not found`);
        throw new Error('Campaign not found.');
    }
    
    // Then fetch the tasks for this campaign
    const { data: tasksData, error: tasksError } = await supabase
        .from('Campaign_Task')
        .select('*')
        .eq('campaign_id', id);
    
    if (tasksError) {
        console.error(`Error fetching tasks for campaign ${id}:`, tasksError);
        // Don't throw, just set empty tasks array
    }
    
    const campaign: Campaign = {
        ...campaignData,
        task: tasksData || []
    };
    
    return { data: campaign };
}

export async function createCampaign(campaignData: CreateCampaignFormData): Promise<{ data: { campaign_id: number } }> {
    const { data: campaign, error: campaignError } = await supabase
        .from('Campaign')
        .insert([{
            title: campaignData.title,
            description: campaignData.description,
            organization_id: campaignData.organization_id
        }])
        .select('id')
        .single();
    
    if (campaignError) {
        console.error('Error creating campaign:', campaignError);
        throw new Error(campaignError.message);
    }
    
    if (!campaign) {
        console.error('No data returned after campaign creation');
        throw new Error('Failed to create campaign.');
    }
    
    if (campaignData.task && campaignData.task.length > 0) {
        const tasksToInsert = campaignData.task.map(task => ({
            campaign_id: campaign.id,
            task_name: task.task_name,
            task_description: task.task_description,
            volunteer_quota: task.volunteer_quota,
            start_date: task.start_date
        }));
        
        const { error: tasksError } = await supabase
            .from('Campaign_Task')
            .insert(tasksToInsert);
        
        if (tasksError) {
            console.error('Error creating campaign tasks:', tasksError);
            throw new Error(tasksError.message);
        }
    }
    
    console.log('Campaign created successfully:', campaign.id);
    return { data: { campaign_id: campaign.id } };
}



