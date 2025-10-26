import type { BarangayRiskData } from "../interfaces/interfaces.ts";
import { mockBarangayRiskData, mockBarangayRiskData6Months, mockBarangayRiskData12Months } from '../interfaces/mock_data.ts';

export type TimePeriod = 'current' | '6months' | '12months';

export function getRiskDataByTimePeriod(timePeriod: TimePeriod): BarangayRiskData[] {
    switch (timePeriod) {
        case 'current':
            return mockBarangayRiskData;
        case '6months':
            return mockBarangayRiskData6Months;
        case '12months':
            return mockBarangayRiskData12Months;
    }
}
