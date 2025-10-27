export interface User {
    id: string;
    email: string,
    password: string,
}
export interface Volunteer extends User {
    first_name: string,
    last_name: string,
}
export interface Organization extends User {
    organization_name: string,
    address: string,
}
export interface Campaign {
    id: string,
    name: string,
    organization_name: string,
    organization_id: string,
    location: string,
    date: Date,
    description: string,
    task: CampaignTask[],
}
export interface CampaignTask {
    id: string,
    campaign_id: string,
    quota: string,
    name: string,
    description: string,
}
export interface Application {
    id: string,
    c_task_id: string,
    user_id: string,
}
export interface LogInFormData {
    email: string;
    password: string;
}
export interface JoinVolunteerFormData {
    f_name: string,
    l_name: string,
    email: string,
    password: string,
    c_password: string,
}
export interface JoinOrganizationFormData {
    organization_name: string,
    address: string,
    email: string,
    password: string,
    c_password: string,
}
export interface CreateCampaignFormData {
    name: string,
    location: string,
    date: Date,
    description: string,
    task: TaskDraft[],
}
export interface TaskDraft {
    name: string;
    description: string;
    quota: string;
}
export interface ApplicationDraft {
    c_task_id: string,
    user_id: string,
}
export interface BarangayRiskData {
    id: string;
    name: string;
    risk_score: number;
    severity: 'HIGH' | 'MEDIUM' | 'LOW';
}