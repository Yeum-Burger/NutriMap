import { supabase } from "./global_service.ts";
import type { BarangayRiskData } from "../interfaces/interfaces.ts";

export type TimePeriod = 'current' | '6months' | '12months';

export async function getRiskDataByTimePeriod(timePeriod: TimePeriod): Promise<BarangayRiskData[]> {
    const now = new Date();
    let query = supabase
        .from('Barangay')
        .select('id, name, risk_score, severity, last_updated_date');
    
    if (timePeriod !== 'current') {
        let startDate: Date;
        
        if (timePeriod === '6months') {
            startDate = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
        } else {
            startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
        }
        
        query = query.gte('last_updated_date', startDate.toISOString().split('T')[0]);
    }
    
    const { data, error } = await query;
    
    if (error) {
        console.error('Error fetching risk data:', error);
        return [];
    }
    
    if (!data || data.length === 0) {
        console.warn('No risk data found for period:', timePeriod);
        return [];
    }
    
    return data.map(b => ({
        id: b.id,
        name: b.name || '',
        risk_score: b.risk_score || 0,
        severity: b.severity >= 2 ? 'HIGH' : b.severity === 1 ? 'MEDIUM' : 'LOW'
    }));
}
