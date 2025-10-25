import { describe, it, expect } from 'vitest'
import { 
  getApplicationIDs, 
  getApplicationByID, 
  getTaskByID, 
  updateApplicationStatus 
} from './volunteer_application_service'

describe('VolunteerApplicationService', () => {
  describe('getApplicationIDs', () => {
    it('should return application IDs for a specific user', async () => {
      const response = await getApplicationIDs('1')
      
      expect(response.data).toBeDefined()
      expect(Array.isArray(response.data)).toBe(true)
    })

    it('should return empty array for user with no applications', async () => {
      const response = await getApplicationIDs('999')
      
      expect(response.data).toBeDefined()
      expect(Array.isArray(response.data)).toBe(true)
      expect(response.data.length).toBe(0)
    })

    it('should handle undefined user_id', async () => {
      const response = await getApplicationIDs(undefined)
      
      expect(response.data).toBeDefined()
      expect(Array.isArray(response.data)).toBe(true)
    })
  })

  describe('getApplicationByID', () => {
    it('should return application when valid ID is provided', async () => {
      const response = await getApplicationByID('1')
      
      expect(response.data).toBeDefined()
      expect(response.data.id).toBe('1')
      expect(response.data.c_task_id).toBeDefined()
      expect(response.data.user_id).toBeDefined()
      expect(response.data.status).toBeDefined()
    })

    it('should throw error when application not found', async () => {
      await expect(getApplicationByID('999')).rejects.toThrow('Campaign not found.')
    })

    it('should throw error when undefined ID is provided', async () => {
      await expect(getApplicationByID(undefined)).rejects.toThrow('Campaign not found.')
    })
  })

  describe('getTaskByID', () => {
    it('should return task when valid ID is provided', async () => {
      const response = await getTaskByID('1')
      
      expect(response.data).toBeDefined()
      expect(response.data.id).toBe('1')
      expect(response.data.campaign_id).toBeDefined()
      expect(response.data.name).toBeDefined()
      expect(response.data.description).toBeDefined()
    })

    it('should throw error when task not found', async () => {
      await expect(getTaskByID('999')).rejects.toThrow('Task not found.')
    })

    it('should throw error when undefined ID is provided', async () => {
      await expect(getTaskByID(undefined)).rejects.toThrow('Task not found.')
    })
  })

  describe('updateApplicationStatus', () => {
    it('should update application status to approved', async () => {
      const response = await updateApplicationStatus('1', 'approved')
      
      expect(response.data).toBeUndefined()
      
      const updatedApplication = await getApplicationByID('1')
      expect(updatedApplication.data.status).toBe('approved')
    })

    it('should update application status to rejected', async () => {
      const response = await updateApplicationStatus('1', 'rejected')
      
      expect(response.data).toBeUndefined()
      
      const updatedApplication = await getApplicationByID('1')
      expect(updatedApplication.data.status).toBe('rejected')
    })

    it('should update application status to pending', async () => {
      const response = await updateApplicationStatus('1', 'pending')
      
      expect(response.data).toBeUndefined()
      
      const updatedApplication = await getApplicationByID('1')
      expect(updatedApplication.data.status).toBe('pending')
    })

    it('should throw error when application not found', async () => {
      await expect(updateApplicationStatus('999', 'approved')).rejects.toThrow('Application not found.')
    })

    it('should throw error when undefined ID is provided', async () => {
      await expect(updateApplicationStatus(undefined, 'approved')).rejects.toThrow('Application not found.')
    })
  })
})
