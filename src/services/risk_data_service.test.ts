import { describe, expect, it } from 'vitest'
import { getRiskDataByTimePeriod } from './risk_data_service'
import { mockBarangayRiskData, mockBarangayRiskData6Months, mockBarangayRiskData12Months } from '../interfaces/mock_data'

describe('RiskDataService', () => {
  describe('getRiskDataByTimePeriod', () => {
    it('should return current risk data when timePeriod is "current"', () => {
      const result = getRiskDataByTimePeriod('current')
      
      expect(result).toBeDefined()
      expect(Array.isArray(result)).toBe(true)
      expect(result).toEqual(mockBarangayRiskData)
      expect(result.length).toBeGreaterThan(0)
    })

    it('should return 6 months risk data when timePeriod is "6months"', () => {
      const result = getRiskDataByTimePeriod('6months')
      
      expect(result).toBeDefined()
      expect(Array.isArray(result)).toBe(true)
      expect(result).toEqual(mockBarangayRiskData6Months)
      expect(result.length).toBeGreaterThan(0)
    })

    it('should return 12 months risk data when timePeriod is "12months"', () => {
      const result = getRiskDataByTimePeriod('12months')
      
      expect(result).toBeDefined()
      expect(Array.isArray(result)).toBe(true)
      expect(result).toEqual(mockBarangayRiskData12Months)
      expect(result.length).toBeGreaterThan(0)
    })

    it('should return data with correct structure', () => {
      const result = getRiskDataByTimePeriod('current')
      
      expect(result[0]).toHaveProperty('id')
      expect(result[0]).toHaveProperty('name')
      expect(result[0]).toHaveProperty('risk_score')
      expect(result[0]).toHaveProperty('severity')
    })

    it('should return different data for different time periods', () => {
      const current = getRiskDataByTimePeriod('current')
      const sixMonths = getRiskDataByTimePeriod('6months')
      const twelveMonths = getRiskDataByTimePeriod('12months')
      
      expect(current).not.toEqual(sixMonths)
      expect(current).not.toEqual(twelveMonths)
      expect(sixMonths).not.toEqual(twelveMonths)
    })
  })
})
