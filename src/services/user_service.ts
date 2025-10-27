import type {AxiosResponse} from "axios";
import {mockOrganizations, mockVolunteers} from "../interfaces/mock_data.ts";
import {USER_TYPES} from "../PATHS.ts";
import {delay} from "./global_service.ts";


// TODO: CONNECT THIS TO DB LATER
export async function getUserName(id: string | undefined, user_type: string | null): Promise<string | undefined> {
    await delay(400);

    if (user_type === USER_TYPES.VOLUNTEER) {
        const user = mockVolunteers.find(v => v.id === id)
        return user?.first_name
    } else {
        const user = mockOrganizations.find(o => o.id === id)
        return user?.organization_name
    }
}
export async function getUserByID(id: string | undefined) {
    await delay(400);

    const user = mockOrganizations.find(o => o.id === id)

    if (!user) {
        throw new Error('User not found.');
    }
    return { data: user }
}
export async function getOrganizationIDs(): Promise<AxiosResponse<string[]>> {
    await delay(400);

    const org_ids = mockOrganizations.map(c => c.id)
    return { data: org_ids } as AxiosResponse<string[]>;
}