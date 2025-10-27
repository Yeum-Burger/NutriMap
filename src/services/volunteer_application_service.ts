import {type AxiosResponse} from 'axios';
import {mockApplications, mockCampaigns} from "../interfaces/mock_data.ts";
import {delay} from "./global_service.ts";

// TODO: ADJUST THESE API CALLS TO ACTUALLY FETCH FROM THE DB
// GET CAMPAIGN IDs THAT THE USER APPLIED TO
export async function getApplicationIDs(user_id: string | undefined): Promise<AxiosResponse<string[]>> {
    await delay(400);
    const ids= mockApplications
        .filter((a) => a.user_id === user_id)
        .map((a) => a.id)

    return {data: ids} as AxiosResponse<string[]>
}
// GET APPLICATION USING ID
export async function getApplicationByID(id: string | undefined) {
    await delay(400);
    const application = mockApplications.find((a) => a.id === id);
    if (!application) {
        throw new Error('Campaign not found.');
    }
    return { data: application }
}
// GET CAMPAIGN TASK USING ID
export async function getTaskByID(id: string | undefined) {
    await delay(400);

    const task = mockCampaigns
        .flatMap(c => c.task)
        .find(t => t.id === id);

    if (!task) throw new Error("Task not found.");

    return { data: task };

}

// CALCULATE AVAILABLE LOTS FOR A TASK
export async function getAvailableLotsForTask(taskId: string | undefined): Promise<number> {
    await delay(200);
    
    const task = mockCampaigns
        .flatMap(c => c.task)
        .find(t => t.id === taskId);
    
    if (!task) throw new Error("Task not found.");
    
    const quota = parseInt(task.quota);
    const applicationsCount = mockApplications.filter(app => app.c_task_id === taskId).length;
    
    return Math.max(0, quota - applicationsCount);
}


