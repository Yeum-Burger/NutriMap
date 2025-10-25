import {
    type Volunteer,
    type Organization,
    type Campaign,
    type Application,
    type BarangayRiskData, type User, type Conversation, type Message
} from "./interfaces.ts";
export const mockAdmin: User[] = [{
    id: "vol-3f8b9d8c-2b1f-4a6e-bf17-94b4d21w4eg6",
    email: "jhn.do@example.com",
    password: "password123",
}]
// -------------------- Volunteers --------------------
export const mockVolunteers: Volunteer[] = [
    {
        id: "vol-3f8b9d8c-2b1f-4a6e-bf17-94b4d2c1e9a7",
        email: "john.doe@example.com",
        password: "password123",
        first_name: "John",
        last_name: "Doe",
    },
    {
        id: "vol-82a9a1c4-5f23-4c7d-91f8-c4f1b1a93f56",
        email: "jane.smith@example.com",
        password: "securepass",
        first_name: "Jane",
        last_name: "Smith",
    },
    {
        id: "vol-cb62e5c9-2f76-44b3-8c27-748dca6a924e",
        email: "mark.tan@example.com",
        password: "volunteer789",
        first_name: "Mark",
        last_name: "Tan",
    },
];

// -------------------- Organizations --------------------
export const mockOrganizations: Organization[] = [
    {
        id: "org-1a45e3b9-56d8-40c3-9e2f-2d8c1fefb512",
        email: "greenearth@example.org",
        password: "orgpass123",
        organization_name: "Green Earth Foundation",
        address: "123 Eco Street, Makati City, Philippines",
        status: "approved",
    },
    {
        id: "org-72e91a6d-0d58-4a7a-87f4-27fbb70db71f",
        email: "helpinghands@example.org",
        password: "help2025",
        organization_name: "Helping Hands PH",
        address: "45 Bayanihan Ave, Quezon City, Philippines",
        status: "pending",
    },
    {
        id: "org-bd52f1ca-4c2e-4f6b-b84b-6e3b19f27bdf",
        email: "animalcare@example.org",
        password: "savepets!",
        organization_name: "Animal Care Society",
        address: "78 Paw Street, Cebu City, Philippines",
        status: "rejected",
    },
];

// -------------------- Campaigns --------------------
export const mockCampaigns: Campaign[] = [
    {
        id: "a1f0e1d2-4c5b-11ef-8c2b-0242ac120001",
        name: "Clean Water Drive",
        organization_name: "AquaAid Foundation",
        organization_id: "org-1a45e3b9-56d8-40c3-9e2f-2d8c1fefb512", // ✅ add this
        location: "Cebu City",
        date: new Date("2025-11-10"),
        description: "A campaign to provide clean water to remote communities.",
        status: "pending",
        task: [
            {
                id: "task-001",
                campaign_id: "a1f0e1d2-4c5b-11ef-8c2b-0242ac120001",
                quota: "10",
                name: "Water Filter Assembly",
                description: "Help assemble and test portable water filters.",
            },
            {
                id: "task-002",
                campaign_id: "a1f0e1d2-4c5b-11ef-8c2b-0242ac120001",
                quota: "5",
                name: "Community Distribution",
                description: "Distribute water filters to designated barangays.",
            },
        ],
    },
    {
        id: "b2a1f0e1-4c5b-11ef-8c2b-0242ac120002",
        name: "Tree Planting Marathon",
        organization_name: "Green Earth PH",
        organization_id: "org-1a45e3b9-56d8-40c3-9e2f-2d8c1fefb512",
        location: "Davao City",
        date: new Date("2025-12-01"),
        description: "Join volunteers to plant 5,000 trees in deforested areas.",
        status: "approved",
        task: [
            {
                id: "task-003",
                campaign_id: "b2a1f0e1-4c5b-11ef-8c2b-0242ac120002",
                quota: "20",
                name: "Seedling Transport",
                description: "Assist in transporting seedlings to planting sites.",
            },
            {
                id: "task-004",
                campaign_id: "b2a1f0e1-4c5b-11ef-8c2b-0242ac120002",
                quota: "30",
                name: "Planting Crew",
                description: "Participate in tree planting and maintenance.",
            },
        ],
    },
    {
        id: "c3b2a1f0-4c5b-11ef-8c2b-0242ac120003",
        name: "Food for All",
        organization_name: "Helping Hands Org",
        organization_id: "org-72e91a6d-0d58-4a7a-87f4-27fbb70db71f",
        location: "Manila",
        date: new Date("2025-10-30"),
        description: "Feeding program for urban poor families affected by floods.",
        status: "rejected",
        task: [
            {
                id: "task-005",
                campaign_id: "c3b2a1f0-4c5b-11ef-8c2b-0242ac120003",
                quota: "15",
                name: "Meal Prep",
                description: "Assist in cooking and packing meals.",
            },
            {
                id: "task-006",
                campaign_id: "c3b2a1f0-4c5b-11ef-8c2b-0242ac120003",
                quota: "10",
                name: "Distribution Team",
                description: "Deliver meals to affected areas.",
            },
        ],
    },
    {
        id: "d4c3b2a1-4c5b-11ef-8c2b-0242ac120004",
        name: "Blood Donation Camp",
        organization_name: "Red Cross Volunteers",
        organization_id: "org-bd52f1ca-4c2e-4f6b-b84b-6e3b19f27bdf",
        location: "Quezon City",
        date: new Date("2025-11-05"),
        description: "Encouraging people to donate blood to save lives.",
        status: "approved",
        task: [
            {
                id: "task-007",
                campaign_id: "d4c3b2a1-4c5b-11ef-8c2b-0242ac120004",
                quota: "25",
                name: "Registration Desk",
                description: "Help register donors and guide them through the process.",
            },
        ],
    },
    {
        id: "e5d4c3b2-4c5b-11ef-8c2b-0242ac120005",
        name: "Education for Every Child",
        organization_name: "Bright Minds Initiative",
        organization_id: "org-72e91a6d-0d58-4a7a-87f4-27fbb70db71f",
        location: "Taguig",
        date: new Date("2025-12-15"),
        description: "Raising funds for school supplies for underprivileged kids.",
        status: "pending",
        task: [
            {
                id: "task-008",
                campaign_id: "e5d4c3b2-4c5b-11ef-8c2b-0242ac120005",
                quota: "8",
                name: "Fundraising Booth",
                description: "Assist in manning fundraising booths in malls.",
            },
        ],
    },
];
export const mockApplications: Application[] = [
    {
        id: "app-001",
        c_task_id: "task-001",
        user_id: "vol-3f8b9d8c-2b1f-4a6e-bf17-94b4d2c1e9a7",
        status: "approved",
    },
    {
        id: "app-002",
        c_task_id: "task-002",
        user_id: "vol-82a9a1c4-5f23-4c7d-91f8-c4f1b1a93f56",
        status: "pending",
    },
    {
        id: "app-003",
        c_task_id: "task-003",
        user_id: "vol-cb62e5c9-2f76-44b3-8c27-748dca6a924e",
        status: "approved",
    },
    {
        id: "app-004",
        c_task_id: "task-004",
        user_id: "vol-82a9a1c4-5f23-4c7d-91f8-c4f1b1a93f56",
        status: "rejected",
    },
    {
        id: "app-005",
        c_task_id: "task-005",
        user_id: "vol-3f8b9d8c-2b1f-4a6e-bf17-94b4d2c1e9a7",
        status: "pending",
    },
    {
        id: "app-006",
        c_task_id: "task-007",
        user_id: "vol-cb62e5c9-2f76-44b3-8c27-748dca6a924e",
        status: "approved",
    },
    {
        id: "app-007",
        c_task_id: "task-008",
        user_id: "vol-3f8b9d8c-2b1f-4a6e-bf17-94b4d2c1e9a7",
        status: "pending",
    },
];


export const mockBarangayRiskData: BarangayRiskData[] = [
    { id: '071222001', name: 'Bagacay', risk_score: 85, severity: 'HIGH' },
    { id: '071222002', name: 'Batinguel', risk_score: 72, severity: 'MEDIUM' },
    { id: '071222003', name: 'Bunao', risk_score: 65, severity: 'MEDIUM' },
    { id: '071222004', name: 'Cadawinonan', risk_score: 58, severity: 'MEDIUM' },
    { id: '071222005', name: 'Calindagan', risk_score: 45, severity: 'LOW' },
    { id: '071222006', name: 'Camanjac', risk_score: 78, severity: 'HIGH' },
    { id: '071222007', name: 'Candau-ay', risk_score: 62, severity: 'MEDIUM' },
    { id: '071222008', name: 'Cantil-e', risk_score: 55, severity: 'MEDIUM' },
    { id: '071222009', name: 'Daro', risk_score: 88, severity: 'HIGH' },
    { id: '071222010', name: 'Junob', risk_score: 70, severity: 'MEDIUM' },
    { id: '071222011', name: 'Looc', risk_score: 52, severity: 'MEDIUM' },
    { id: '071222012', name: 'Mangnao-Canal', risk_score: 35, severity: 'LOW' },
    { id: '071222013', name: 'Motong', risk_score: 68, severity: 'MEDIUM' },
    { id: '071222014', name: 'Piapi', risk_score: 92, severity: 'HIGH' },
    { id: '071222015', name: 'Poblacion 1', risk_score: 40, severity: 'LOW' },
    { id: '071222016', name: 'Poblacion 2', risk_score: 42, severity: 'LOW' },
    { id: '071222017', name: 'Poblacion 3', risk_score: 38, severity: 'LOW' },
    { id: '071222018', name: 'Poblacion 4', risk_score: 48, severity: 'LOW' },
    { id: '071222019', name: 'Poblacion 5', risk_score: 44, severity: 'LOW' },
    { id: '071222020', name: 'Poblacion 6', risk_score: 50, severity: 'MEDIUM' },
    { id: '071222021', name: 'Poblacion 7', risk_score: 46, severity: 'LOW' },
    { id: '071222022', name: 'Poblacion 8', risk_score: 41, severity: 'LOW' },
    { id: '071222023', name: 'Pulantubig', risk_score: 75, severity: 'HIGH' },
    { id: '071222024', name: 'Tabuc-tubig', risk_score: 60, severity: 'MEDIUM' },
    { id: '071222025', name: 'Taclobo', risk_score: 82, severity: 'HIGH' },
    { id: '071222026', name: 'Talay', risk_score: 67, severity: 'MEDIUM' },
    { id: '071222027', name: 'Bantayan', risk_score: 71, severity: 'MEDIUM' },
    { id: '071222028', name: 'Balugo', risk_score: 54, severity: 'MEDIUM' },
    { id: '071222029', name: 'Banilad', risk_score: 63, severity: 'MEDIUM' },
    { id: '071222030', name: 'Tubtubon', risk_score: 56, severity: 'MEDIUM' },
];

export const mockBarangayRiskData6Months: BarangayRiskData[] = [
    { id: '071222001', name: 'Bagacay', risk_score: 78, severity: 'HIGH' },
    { id: '071222002', name: 'Batinguel', risk_score: 68, severity: 'MEDIUM' },
    { id: '071222003', name: 'Bunao', risk_score: 60, severity: 'MEDIUM' },
    { id: '071222004', name: 'Cadawinonan', risk_score: 55, severity: 'MEDIUM' },
    { id: '071222005', name: 'Calindagan', risk_score: 42, severity: 'LOW' },
    { id: '071222006', name: 'Camanjac', risk_score: 72, severity: 'MEDIUM' },
    { id: '071222007', name: 'Candau-ay', risk_score: 58, severity: 'MEDIUM' },
    { id: '071222008', name: 'Cantil-e', risk_score: 52, severity: 'MEDIUM' },
    { id: '071222009', name: 'Daro', risk_score: 82, severity: 'HIGH' },
    { id: '071222010', name: 'Junob', risk_score: 65, severity: 'MEDIUM' },
    { id: '071222011', name: 'Looc', risk_score: 48, severity: 'LOW' },
    { id: '071222012', name: 'Mangnao-Canal', risk_score: 32, severity: 'LOW' },
    { id: '071222013', name: 'Motong', risk_score: 63, severity: 'MEDIUM' },
    { id: '071222014', name: 'Piapi', risk_score: 86, severity: 'HIGH' },
    { id: '071222015', name: 'Poblacion 1', risk_score: 38, severity: 'LOW' },
    { id: '071222016', name: 'Poblacion 2', risk_score: 39, severity: 'LOW' },
    { id: '071222017', name: 'Poblacion 3', risk_score: 36, severity: 'LOW' },
    { id: '071222018', name: 'Poblacion 4', risk_score: 45, severity: 'LOW' },
    { id: '071222019', name: 'Poblacion 5', risk_score: 41, severity: 'LOW' },
    { id: '071222020', name: 'Poblacion 6', risk_score: 47, severity: 'LOW' },
    { id: '071222021', name: 'Poblacion 7', risk_score: 43, severity: 'LOW' },
    { id: '071222022', name: 'Poblacion 8', risk_score: 39, severity: 'LOW' },
    { id: '071222023', name: 'Pulantubig', risk_score: 70, severity: 'MEDIUM' },
    { id: '071222024', name: 'Tabuc-tubig', risk_score: 56, severity: 'MEDIUM' },
    { id: '071222025', name: 'Taclobo', risk_score: 76, severity: 'HIGH' },
    { id: '071222026', name: 'Talay', risk_score: 63, severity: 'MEDIUM' },
    { id: '071222027', name: 'Bantayan', risk_score: 66, severity: 'MEDIUM' },
    { id: '071222028', name: 'Balugo', risk_score: 51, severity: 'MEDIUM' },
    { id: '071222029', name: 'Banilad', risk_score: 59, severity: 'MEDIUM' },
    { id: '071222030', name: 'Tubtubon', risk_score: 53, severity: 'MEDIUM' },
];

export const mockBarangayRiskData12Months: BarangayRiskData[] = [
    { id: '071222001', name: 'Bagacay', risk_score: 70, severity: 'MEDIUM' },
    { id: '071222002', name: 'Batinguel', risk_score: 62, severity: 'MEDIUM' },
    { id: '071222003', name: 'Bunao', risk_score: 54, severity: 'MEDIUM' },
    { id: '071222004', name: 'Cadawinonan', risk_score: 50, severity: 'MEDIUM' },
    { id: '071222005', name: 'Calindagan', risk_score: 38, severity: 'LOW' },
    { id: '071222006', name: 'Camanjac', risk_score: 65, severity: 'MEDIUM' },
    { id: '071222007', name: 'Candau-ay', risk_score: 53, severity: 'MEDIUM' },
    { id: '071222008', name: 'Cantil-e', risk_score: 48, severity: 'LOW' },
    { id: '071222009', name: 'Daro', risk_score: 75, severity: 'HIGH' },
    { id: '071222010', name: 'Junob', risk_score: 58, severity: 'MEDIUM' },
    { id: '071222011', name: 'Looc', risk_score: 44, severity: 'LOW' },
    { id: '071222012', name: 'Mangnao-Canal', risk_score: 28, severity: 'LOW' },
    { id: '071222013', name: 'Motong', risk_score: 57, severity: 'MEDIUM' },
    { id: '071222014', name: 'Piapi', risk_score: 78, severity: 'HIGH' },
    { id: '071222015', name: 'Poblacion 1', risk_score: 35, severity: 'LOW' },
    { id: '071222016', name: 'Poblacion 2', risk_score: 36, severity: 'LOW' },
    { id: '071222017', name: 'Poblacion 3', risk_score: 33, severity: 'LOW' },
    { id: '071222018', name: 'Poblacion 4', risk_score: 41, severity: 'LOW' },
    { id: '071222019', name: 'Poblacion 5', risk_score: 38, severity: 'LOW' },
    { id: '071222020', name: 'Poblacion 6', risk_score: 43, severity: 'LOW' },
    { id: '071222021', name: 'Poblacion 7', risk_score: 40, severity: 'LOW' },
    { id: '071222022', name: 'Poblacion 8', risk_score: 36, severity: 'LOW' },
    { id: '071222023', name: 'Pulantubig', risk_score: 63, severity: 'MEDIUM' },
    { id: '071222024', name: 'Tabuc-tubig', risk_score: 51, severity: 'MEDIUM' },
    { id: '071222025', name: 'Taclobo', risk_score: 68, severity: 'MEDIUM' },
    { id: '071222026', name: 'Talay', risk_score: 58, severity: 'MEDIUM' },
    { id: '071222027', name: 'Bantayan', risk_score: 60, severity: 'MEDIUM' },
    { id: '071222028', name: 'Balugo', risk_score: 47, severity: 'LOW' },
    { id: '071222029', name: 'Banilad', risk_score: 54, severity: 'MEDIUM' },
    { id: '071222030', name: 'Tubtubon', risk_score: 49, severity: 'LOW' },
];

// -------------------- Mock Messaging Data --------------------
/**
 * Mock conversations for testing
 * Demonstrates different conversation types:
 * - Volunteer <-> Admin
 * - Volunteer <-> Organization
 * - Organization <-> Admin
 */
export const mockConversations: Conversation[] = [
    // Volunteer (John Doe) <-> Admin conversation
    {
        id: 'conv-001',
        participant_1_id: 'vol-3f8b9d8c-2b1f-4a6e-bf17-94b4d2c1e9a7', // John Doe (Volunteer)
        participant_2_id: 'vol-3f8b9d8c-2b1f-4a6e-bf17-94b4d21w4eg6', // Admin
        last_message: 'Thank you for your help!',
        last_message_time: new Date('2025-10-24T14:30:00'),
        unread_count: 0,
    },
    // Volunteer (John Doe) <-> Organization (Green Earth) conversation
    {
        id: 'conv-002',
        participant_1_id: 'vol-3f8b9d8c-2b1f-4a6e-bf17-94b4d2c1e9a7', // John Doe (Volunteer)
        participant_2_id: 'org-1a45e3b9-56d8-40c3-9e2f-2d8c1fefb512', // Green Earth Foundation
        last_message: 'When does the tree planting start?',
        last_message_time: new Date('2025-10-25T10:15:00'),
        unread_count: 1,
    },
    // Volunteer (Jane Smith) <-> Organization (Helping Hands) conversation
    {
        id: 'conv-003',
        participant_1_id: 'vol-82a9a1c4-5f23-4c7d-91f8-c4f1b1a93f56', // Jane Smith (Volunteer)
        participant_2_id: 'org-72e91a6d-0d58-4a7a-87f4-27fbb70db71f', // Helping Hands PH
        last_message: 'I can help with the food distribution.',
        last_message_time: new Date('2025-10-23T16:45:00'),
        unread_count: 0,
    },
    // Organization (Green Earth) <-> Admin conversation
    {
        id: 'conv-004',
        participant_1_id: 'org-1a45e3b9-56d8-40c3-9e2f-2d8c1fefb512', // Green Earth Foundation
        participant_2_id: 'vol-3f8b9d8c-2b1f-4a6e-bf17-94b4d21w4eg6', // Admin
        last_message: 'Campaign approval status update',
        last_message_time: new Date('2025-10-25T09:00:00'),
        unread_count: 2,
    },
    // Volunteer (Mark Tan) <-> Admin conversation
    {
        id: 'conv-005',
        participant_1_id: 'vol-cb62e5c9-2f76-44b3-8c27-748dca6a924e', // Mark Tan (Volunteer)
        participant_2_id: 'vol-3f8b9d8c-2b1f-4a6e-bf17-94b4d21w4eg6', // Admin
        last_message: 'How do I update my profile?',
        last_message_time: new Date('2025-10-22T11:20:00'),
        unread_count: 0,
    },
];

/**
 * Mock messages for testing
 * Contains sample messages for different conversations
 */
export const mockMessages: Message[] = [
    // Messages for conv-001 (John Doe <-> Admin)
    {
        id: 'msg-001',
        conversation_id: 'conv-001',
        sender_id: 'vol-3f8b9d8c-2b1f-4a6e-bf17-94b4d2c1e9a7', // John Doe
        content: 'Hello, I need help with my application.',
        timestamp: new Date('2025-10-24T14:00:00'),
        is_read: true,
    },
    {
        id: 'msg-002',
        conversation_id: 'conv-001',
        sender_id: 'vol-3f8b9d8c-2b1f-4a6e-bf17-94b4d21w4eg6', // Admin
        content: 'Hello John! How can I assist you today?',
        timestamp: new Date('2025-10-24T14:05:00'),
        is_read: true,
    },
    {
        id: 'msg-003',
        conversation_id: 'conv-001',
        sender_id: 'vol-3f8b9d8c-2b1f-4a6e-bf17-94b4d2c1e9a7', // John Doe
        content: 'I submitted an application but haven\'t heard back.',
        timestamp: new Date('2025-10-24T14:10:00'),
        is_read: true,
    },
    {
        id: 'msg-004',
        conversation_id: 'conv-001',
        sender_id: 'vol-3f8b9d8c-2b1f-4a6e-bf17-94b4d21w4eg6', // Admin
        content: 'Let me check that for you. Your application has been approved!',
        timestamp: new Date('2025-10-24T14:25:00'),
        is_read: true,
    },
    {
        id: 'msg-005',
        conversation_id: 'conv-001',
        sender_id: 'vol-3f8b9d8c-2b1f-4a6e-bf17-94b4d2c1e9a7', // John Doe
        content: 'Thank you for your help!',
        timestamp: new Date('2025-10-24T14:30:00'),
        is_read: true,
    },

    // Messages for conv-002 (John Doe <-> Green Earth Foundation)
    {
        id: 'msg-006',
        conversation_id: 'conv-002',
        sender_id: 'vol-3f8b9d8c-2b1f-4a6e-bf17-94b4d2c1e9a7', // John Doe
        content: 'Hi! I\'m interested in the Tree Planting Marathon.',
        timestamp: new Date('2025-10-25T09:30:00'),
        is_read: true,
    },
    {
        id: 'msg-007',
        conversation_id: 'conv-002',
        sender_id: 'org-1a45e3b9-56d8-40c3-9e2f-2d8c1fefb512', // Green Earth
        content: 'Great! We\'d love to have you join us.',
        timestamp: new Date('2025-10-25T09:45:00'),
        is_read: true,
    },
    {
        id: 'msg-008',
        conversation_id: 'conv-002',
        sender_id: 'vol-3f8b9d8c-2b1f-4a6e-bf17-94b4d2c1e9a7', // John Doe
        content: 'When does the tree planting start?',
        timestamp: new Date('2025-10-25T10:15:00'),
        is_read: false, // Unread message
    },

    // Messages for conv-003 (Jane Smith <-> Helping Hands PH)
    {
        id: 'msg-009',
        conversation_id: 'conv-003',
        sender_id: 'vol-82a9a1c4-5f23-4c7d-91f8-c4f1b1a93f56', // Jane Smith
        content: 'I saw your Food for All campaign.',
        timestamp: new Date('2025-10-23T16:00:00'),
        is_read: true,
    },
    {
        id: 'msg-010',
        conversation_id: 'conv-003',
        sender_id: 'org-72e91a6d-0d58-4a7a-87f4-27fbb70db71f', // Helping Hands
        content: 'Yes! We need volunteers for meal distribution.',
        timestamp: new Date('2025-10-23T16:20:00'),
        is_read: true,
    },
    {
        id: 'msg-011',
        conversation_id: 'conv-003',
        sender_id: 'vol-82a9a1c4-5f23-4c7d-91f8-c4f1b1a93f56', // Jane Smith
        content: 'I can help with the food distribution.',
        timestamp: new Date('2025-10-23T16:45:00'),
        is_read: true,
    },

    // Messages for conv-004 (Green Earth <-> Admin)
    {
        id: 'msg-012',
        conversation_id: 'conv-004',
        sender_id: 'org-1a45e3b9-56d8-40c3-9e2f-2d8c1fefb512', // Green Earth
        content: 'Hello, we submitted a new campaign for approval.',
        timestamp: new Date('2025-10-25T08:00:00'),
        is_read: true,
    },
    {
        id: 'msg-013',
        conversation_id: 'conv-004',
        sender_id: 'vol-3f8b9d8c-2b1f-4a6e-bf17-94b4d21w4eg6', // Admin
        content: 'I\'ll review it shortly.',
        timestamp: new Date('2025-10-25T08:30:00'),
        is_read: true,
    },
    {
        id: 'msg-014',
        conversation_id: 'conv-004',
        sender_id: 'vol-3f8b9d8c-2b1f-4a6e-bf17-94b4d21w4eg6', // Admin
        content: 'Campaign approval status update',
        timestamp: new Date('2025-10-25T09:00:00'),
        is_read: false, // Unread messages
    },

    // Messages for conv-005 (Mark Tan <-> Admin)
    {
        id: 'msg-015',
        conversation_id: 'conv-005',
        sender_id: 'vol-cb62e5c9-2f76-44b3-8c27-748dca6a924e', // Mark Tan
        content: 'How do I update my profile?',
        timestamp: new Date('2025-10-22T11:20:00'),
        is_read: true,
    },
    {
        id: 'msg-016',
        conversation_id: 'conv-005',
        sender_id: 'vol-3f8b9d8c-2b1f-4a6e-bf17-94b4d21w4eg6', // Admin
        content: 'Go to Dashboard, then click on your name in the top right.',
        timestamp: new Date('2025-10-22T11:25:00'),
        is_read: true,
    },
];
