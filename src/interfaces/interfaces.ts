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
    status: string,
}
export interface Campaign {
    id: string,
    name: string,
    organization_name: string,
    organization_id: string,
    location: string,
    date: Date,
    description: string,
    status: string,
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
    status: string,
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
    status: string,
}
export interface BarangayRiskData {
    id: string;
    name: string;
    risk_score: number;
    severity: 'HIGH' | 'MEDIUM' | 'LOW';
}

// -------------------- Messaging Interfaces --------------------
/**
 * Represents a conversation between two users
 * Volunteers can only have conversations with admin or organizations
 */
export interface Conversation {
    id: string;
    participant_1_id: string; // User ID of first participant
    participant_2_id: string; // User ID of second participant
    last_message: string; // Preview of the last message
    last_message_time: Date; // Timestamp of last message
    unread_count: number; // Number of unread messages for current user
}

/**
 * Represents an individual message in a conversation
 */
export interface Message {
    id: string;
    conversation_id: string; // Reference to parent conversation
    sender_id: string; // ID of user who sent the message
    content: string; // Message text content
    timestamp: Date; // When the message was sent
    is_read: boolean; // Whether the message has been read
}

/**
 * DTO for sending a new message
 */
export interface SendMessageData {
    conversation_id: string;
    sender_id: string;
    content: string;
}

/**
 * DTO for creating a new conversation
 */
export interface CreateConversationData {
    participant_1_id: string;
    participant_2_id: string;
}