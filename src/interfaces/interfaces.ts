export interface User {
    id: number;
    email: string,
}
export interface Volunteer {
    id: number;
    created_at?: string;
    f_name: string;
    email: string;
    l_name: string;
}
export interface Organization {
    id: number;
    created_at?: string;
    name: string;
    type?: number;
    contact_person?: string;
    email: string;
    contact_person_info?: string;
    address: string;
    organization_name?: string;
}
export interface Campaign {
    id: number;
    created_at: string;
    title: string;
    description: string;
    organization_id: number;
    name?: string;
    organization_name?: string;
    location?: string;
    date?: Date;
    task?: CampaignTask[];
}
export interface CampaignTask {
    id: number;
    created_at: string;
    campaign_id: number;
    task_name: string;
    task_description: string;
    start_date: string;
    volunteer_quota: number;
    name?: string;
    description?: string;
    quota?: number;
}
export interface Application {
    id: number;
    created_at: string;
    campaign_task_id: number;
    volunteer_id: number;
}
export interface LogInFormData {
    email: string;
}
export interface JoinVolunteerFormData {
    f_name: string,
    l_name: string,
    email: string,
}
export interface JoinOrganizationFormData {
    organization_name: string,
    address: string,
    email: string,
}
export interface CreateCampaignFormData {
    title: string;
    description: string;
    organization_id: number;
    task: TaskDraft[];
}
export interface TaskDraft {
    task_name: string;
    task_description: string;
    volunteer_quota: number;
    start_date: string;
}
export interface ApplicationDraft {
    campaign_task_id: number;
    volunteer_id: number;
}
export interface Barangay {
    id: number;
    created_at: string;
    name: string;
    malnourished_count: number;
    severity: number;
    risk_score: number;
    last_updated_date: string;
}
export interface BarangayData {
    id: number;
    created_at: string;
    date_collected: string;
    barangay_id: number;
    malnourished_count: number;
}
export interface BarangayRiskData {
    id: number;
    name: string;
    risk_score: number;
    severity: 'HIGH' | 'MEDIUM' | 'LOW';
}