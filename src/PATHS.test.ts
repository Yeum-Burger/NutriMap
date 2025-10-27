import { describe, it, expect } from 'vitest'
import { PATHS, USER_TYPES } from './PATHS'

describe('PATHS Constants', () => {
  describe('Route Paths', () => {
    it('should have correct public route paths', () => {
      expect(PATHS.HOME).toBe('/')
      expect(PATHS.LOGIN).toBe('/login')
      expect(PATHS.JOIN).toBe('/join')
    })

    it('should have dashboard path', () => {
      expect(PATHS.DASHBOARD).toBe('/dashboard')
    })

    it('should have volunteer route paths', () => {
      expect(PATHS.CAMPAIGN_INFO).toBe('campaign')
      expect(PATHS.APPLICATION_INFO).toBe('application')
    })

    it('should have organization route paths', () => {
      expect(PATHS.CAMPAIGN_MANAGER).toBe('campaign-manager')
      expect(PATHS.CREATE_CAMPAIGN).toBe('create-campaign')
    })

    it('should have admin route paths', () => {
      expect(PATHS.A_CAMPAIGN_MANAGER).toBe('a-campaign-manager')
      expect(PATHS.A_ORG_MANAGER).toBe('organization-manager')
    })
  })

  describe('User Types', () => {
    it('should have all user types defined', () => {
      expect(USER_TYPES.VOLUNTEER).toBe('VOLUNTEER')
      expect(USER_TYPES.ORGANIZATION).toBe('ORGANIZATION')
      expect(USER_TYPES.ADMIN).toBe('ADMIN')
    })

    it('should have three distinct user types', () => {
      const types = Object.values(USER_TYPES)
      expect(types.length).toBe(3)
      expect(new Set(types).size).toBe(3)
    })
  })
})
