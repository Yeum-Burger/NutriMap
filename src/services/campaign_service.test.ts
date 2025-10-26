import {describe, expect, it} from 'vitest'
import {getApprovedCampaignIDs, getCampaignByID, getCampaignIDs, updateCampaignStatus} from './campaign_service'

describe('CampaignService', () => {
  describe('getCampaignIDs', () => {
    it('should return all campaign IDs when no parameters provided', async () => {
      const response = await getCampaignIDs()
      
      expect(response.data).toBeDefined()
      expect(Array.isArray(response.data)).toBe(true)
      expect(response.data.length).toBeGreaterThan(0)
    })

    it('should return limited campaign IDs when count is provided', async () => {
      const count = 2
      const response = await getCampaignIDs(count)
      
      expect(response.data.length).toBe(count)
    })

    it('should filter campaigns by user_id when provided', async () => {
      const response = await getCampaignIDs(undefined, '2')
      
      expect(response.data).toBeDefined()
      expect(Array.isArray(response.data)).toBe(true)
    })

    it('should combine count and user_id filters', async () => {
      const count = 1
      const response = await getCampaignIDs(count, '2')
      
      expect(response.data.length).toBeLessThanOrEqual(count)
    })
  })

  describe('getApprovedCampaignIDs', () => {
    it('should return only approved campaign IDs', async () => {
      const response = await getApprovedCampaignIDs()
      
      expect(response.data).toBeDefined()
      expect(Array.isArray(response.data)).toBe(true)
    })

    it('should return limited approved campaign IDs when count provided', async () => {
      const count = 1
      const response = await getApprovedCampaignIDs(count)
      
      expect(response.data.length).toBeLessThanOrEqual(count)
    })
  })

  describe('getCampaignByID', () => {
    it('should return campaign when valid ID is provided', async () => {
      const response = await getCampaignByID('1')
      
      expect(response.data).toBeDefined()
      expect(response.data.id).toBe('1')
      expect(response.data.name).toBeDefined()
      expect(response.data.organization_name).toBeDefined()
    })

    it('should throw error when campaign not found', async () => {
      await expect(getCampaignByID('999')).rejects.toThrow('Campaign not found.')
    })

    it('should throw error when undefined ID is provided', async () => {
      await expect(getCampaignByID(undefined)).rejects.toThrow('Campaign not found.')
    })
  })

  describe('updateCampaignStatus', () => {
    it('should update campaign status to approved', async () => {
      const response = await updateCampaignStatus('1', 'approved')
      
      expect(response.data).toBeUndefined()
      
      const updatedCampaign = await getCampaignByID('1')
      expect(updatedCampaign.data.status).toBe('approved')
    })

    it('should update campaign status to rejected', async () => {
      const response = await updateCampaignStatus('1', 'rejected')
      
      expect(response.data).toBeUndefined()
      
      const updatedCampaign = await getCampaignByID('1')
      expect(updatedCampaign.data.status).toBe('rejected')
    })

    it('should update campaign status to pending', async () => {
      const response = await updateCampaignStatus('1', 'pending')
      
      expect(response.data).toBeUndefined()
      
      const updatedCampaign = await getCampaignByID('1')
      expect(updatedCampaign.data.status).toBe('pending')
    })

    it('should throw error when campaign not found', async () => {
      await expect(updateCampaignStatus('999', 'approved')).rejects.toThrow('Campaign not found.')
    })
  })
})
