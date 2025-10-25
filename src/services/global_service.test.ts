import { describe, it, expect } from 'vitest'
import { delay, api } from './global_service'

describe('GlobalService', () => {
  describe('delay', () => {
    it('should delay execution for specified milliseconds', async () => {
      const startTime = Date.now()
      const delayMs = 100
      
      await delay(delayMs)
      
      const endTime = Date.now()
      const elapsed = endTime - startTime
      
      expect(elapsed).toBeGreaterThanOrEqual(delayMs)
      expect(elapsed).toBeLessThan(delayMs + 50) // Allow some margin
    })

    it('should return a promise', () => {
      const result = delay(10)
      expect(result).toBeInstanceOf(Promise)
    })

    it('should work with zero delay', async () => {
      const startTime = Date.now()
      await delay(0)
      const endTime = Date.now()
      
      expect(endTime - startTime).toBeLessThan(50)
    })
  })

  describe('api', () => {
    it('should be an axios instance', () => {
      expect(api).toBeDefined()
      expect(api.get).toBeDefined()
      expect(api.post).toBeDefined()
      expect(api.put).toBeDefined()
      expect(api.delete).toBeDefined()
    })
  })
})
