import { describe, it, expect } from 'vitest'
import { getUserName, getUserByID, getOrganizationIDs } from './user_service'
import { USER_TYPES } from '../PATHS'

describe('UserService', () => {
  describe('getUserName', () => {
    it('should return volunteer first name when user_type is VOLUNTEER', async () => {
      const name = await getUserName('1', USER_TYPES.VOLUNTEER)
      
      expect(name).toBeDefined()
      expect(typeof name).toBe('string')
    })

    it('should return organization name when user_type is ORGANIZATION', async () => {
      const name = await getUserName('2', USER_TYPES.ORGANIZATION)
      
      expect(name).toBeDefined()
      expect(typeof name).toBe('string')
    })

    it('should return undefined for non-existent volunteer', async () => {
      const name = await getUserName('999', USER_TYPES.VOLUNTEER)
      
      expect(name).toBeUndefined()
    })

    it('should return undefined for non-existent organization', async () => {
      const name = await getUserName('999', USER_TYPES.ORGANIZATION)
      
      expect(name).toBeUndefined()
    })

    it('should handle undefined id', async () => {
      const name = await getUserName(undefined, USER_TYPES.VOLUNTEER)
      
      expect(name).toBeUndefined()
    })
  })

  describe('getUserByID', () => {
    it('should return organization user when valid ID is provided', async () => {
      const response = await getUserByID('2')
      
      expect(response.data).toBeDefined()
      expect(response.data.id).toBe('2')
      expect(response.data.organization_name).toBeDefined()
    })

    it('should throw error when user not found', async () => {
      await expect(getUserByID('999')).rejects.toThrow('User not found.')
    })

    it('should throw error when undefined ID is provided', async () => {
      await expect(getUserByID(undefined)).rejects.toThrow('User not found.')
    })
  })

  describe('getOrganizationIDs', () => {
    it('should return array of organization IDs', async () => {
      const response = await getOrganizationIDs()
      
      expect(response.data).toBeDefined()
      expect(Array.isArray(response.data)).toBe(true)
    })
  })
})
