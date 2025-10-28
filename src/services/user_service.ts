import { supabase } from "./global_service.ts";
import { USER_TYPES } from "../PATHS.ts";
import type { Organization, JoinVolunteerFormData, JoinOrganizationFormData } from "../interfaces/interfaces.ts";

export async function getUserName(id: number | undefined, user_type: string | null): Promise<string | undefined> {
    if (!id) {
        return undefined;
    }

    if (user_type === USER_TYPES.VOLUNTEER) {
        const { data, error } = await supabase
            .from('Volunteer')
            .select('f_name')
            .eq('id', id)
            .single();
        
        if (error) {
            console.error(error);
            return undefined;
        }
        
        return data?.f_name;
    } else {
        const { data, error } = await supabase
            .from('Organization')
            .select('name')
            .eq('id', id)
            .single();
        
        if (error) {
            console.error(error);
            return undefined;
        }
        
        return data?.name;
    }
}

export async function getUserByID(id: number | undefined) {
    if (!id) {
        throw new Error('User ID is required.');
    }

    const { data, error } = await supabase
        .from('Organization')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        throw new Error(error.message);
    }

    if (!data) {
        throw new Error('User not found.');
    }
    
    return { data: data as Organization };
}

export async function getOrganizationIDs(): Promise<{ data: number[] }> {
    const { data, error } = await supabase
        .from('Organization')
        .select('id');

    if (error) {
        throw new Error(error.message);
    }

    return { data: data?.map(c => c.id) || [] };
}

export async function createVolunteer(volunteerData: JoinVolunteerFormData): Promise<void> {
    const { error } = await supabase
        .from('Volunteer')
        .insert([{
            f_name: volunteerData.f_name,
            l_name: volunteerData.l_name,
            email: volunteerData.email
        }]);

    if (error) {
        throw new Error(error.message);
    }
}

export async function createOrganization(organizationData: JoinOrganizationFormData): Promise<void> {
    const { error } = await supabase
        .from('Organization')
        .insert([{
            name: organizationData.organization_name,
            address: organizationData.address,
            email: organizationData.email,
            created_at: new Date().toISOString(),
        }]);

    if (error) {
        throw new Error(error.message);
    }
}