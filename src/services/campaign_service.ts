import {type AxiosResponse} from 'axios';
import {mockCampaigns} from "../interfaces/mock_data.ts";
import {delay} from "./global_service.ts";

// TODO: ADJUST THESE API CALLS TO ACTUALLY FETCH FROM THE DB
// GET CAMPAIGN IDs
export async function getCampaignIDs(count?: number, user_id?: string): Promise<AxiosResponse<string[]>> {
    await delay(400);

    const filtered = user_id
        ? mockCampaigns.filter(c => c.organization_id === user_id).map(c => c.id)
        : mockCampaigns.map(c => c.id);

    const counted_ids = count ? filtered.slice(0, count) : filtered;

    return { data: counted_ids } as AxiosResponse<string[]>;
}

export async function getApprovedCampaignIDs(count?: number): Promise<AxiosResponse<string[]>> {
    const ids= mockCampaigns
        .filter(c => c.status === 'approved')
        .map(c => c.id);
    const counted_ids = count ? ids.slice(0, count) : ids;

    return {data: counted_ids} as AxiosResponse<string[]>
}
// GET CAMPAIGN BY ID
export async function getCampaignByID(id: string | undefined) {
    await delay(400);
    const campaign = mockCampaigns.find(c => c.id === id)

    if (!campaign) {
        throw new Error('Campaign not found.');
    }
    return { data: campaign }
}

export async function updateCampaignStatus(id: string | undefined, status: 'approved' | 'rejected' | 'pending'): Promise<AxiosResponse<void>> {
    await delay(400);
    const campaign = mockCampaigns.find(c => c.id === id);
    
    if (!campaign) {
        throw new Error('Campaign not found.');
    }
    
    campaign.status = status;
    return { data: undefined } as AxiosResponse<void>;
}



