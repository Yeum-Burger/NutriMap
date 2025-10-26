import { describe, it, expect } from 'vitest'
import type {
  User,
  Volunteer,
  Organization,
  Campaign,
  CampaignTask,
  Application,
  LogInFormData,
  JoinVolunteerFormData,
  JoinOrganizationFormData,
  CreateCampaignFormData,
  TaskDraft,
  ApplicationDraft,
  BarangayRiskData
} from './interfaces'

describe('Interface Type Validation', () => {
  describe('User Interface', () => {
    it('should accept valid User object', () => {
      const user: User = {
        id: '1',
        email: 'test@example.com',
        password: 'password123',
      }

      expect(user.id).toBe('1')
      expect(user.email).toBe('test@example.com')
      expect(user.password).toBe('password123')
    })
  })

  describe('Volunteer Interface', () => {
    it('should accept valid Volunteer object', () => {
      const volunteer: Volunteer = {
        id: '1',
        email: 'volunteer@example.com',
        password: 'password123',
        first_name: 'John',
        last_name: 'Doe',
      }

      expect(volunteer.first_name).toBe('John')
      expect(volunteer.last_name).toBe('Doe')
    })
  })

  describe('Organization Interface', () => {
    it('should accept valid Organization object', () => {
      const organization: Organization = {
        id: '2',
        email: 'org@example.com',
        password: 'password123',
        organization_name: 'Food Bank',
        address: '123 Main St',
        status: 'approved',
      }

      expect(organization.organization_name).toBe('Food Bank')
      expect(organization.address).toBe('123 Main St')
      expect(organization.status).toBe('approved')
    })
  })

  describe('Campaign Interface', () => {
    it('should accept valid Campaign object', () => {
      const campaign: Campaign = {
        id: '1',
        name: 'Food Drive',
        organization_name: 'Food Bank',
        organization_id: '2',
        location: 'Manila',
        date: new Date('2024-12-15'),
        description: 'Help distribute food',
        status: 'approved',
        task: [],
      }

      expect(campaign.name).toBe('Food Drive')
      expect(campaign.location).toBe('Manila')
      expect(campaign.task).toEqual([])
    })
  })

  describe('CampaignTask Interface', () => {
    it('should accept valid CampaignTask object', () => {
      const task: CampaignTask = {
        id: '1',
        campaign_id: '1',
        quota: '10',
        name: 'Food Distribution',
        description: 'Distribute food packages',
      }

      expect(task.name).toBe('Food Distribution')
      expect(task.quota).toBe('10')
    })
  })

  describe('Application Interface', () => {
    it('should accept valid Application object', () => {
      const application: Application = {
        id: '1',
        c_task_id: '1',
        user_id: '1',
        status: 'pending',
      }

      expect(application.c_task_id).toBe('1')
      expect(application.user_id).toBe('1')
      expect(application.status).toBe('pending')
    })
  })

  describe('LogInFormData Interface', () => {
    it('should accept valid LogInFormData object', () => {
      const formData: LogInFormData = {
        email: 'user@example.com',
        password: 'password123',
      }

      expect(formData.email).toBe('user@example.com')
      expect(formData.password).toBe('password123')
    })
  })

  describe('JoinVolunteerFormData Interface', () => {
    it('should accept valid JoinVolunteerFormData object', () => {
      const formData: JoinVolunteerFormData = {
        f_name: 'John',
        l_name: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        c_password: 'password123',
      }

      expect(formData.f_name).toBe('John')
      expect(formData.l_name).toBe('Doe')
      expect(formData.c_password).toBe(formData.password)
    })
  })

  describe('JoinOrganizationFormData Interface', () => {
    it('should accept valid JoinOrganizationFormData object', () => {
      const formData: JoinOrganizationFormData = {
        organization_name: 'Food Bank',
        address: '123 Main St',
        email: 'org@example.com',
        password: 'password123',
        c_password: 'password123',
      }

      expect(formData.organization_name).toBe('Food Bank')
      expect(formData.address).toBe('123 Main St')
    })
  })

  describe('CreateCampaignFormData Interface', () => {
    it('should accept valid CreateCampaignFormData object', () => {
      const formData: CreateCampaignFormData = {
        name: 'Food Drive',
        location: 'Manila',
        date: new Date('2024-12-15'),
        description: 'Help distribute food',
        task: [],
      }

      expect(formData.name).toBe('Food Drive')
      expect(formData.task).toEqual([])
    })
  })

  describe('TaskDraft Interface', () => {
    it('should accept valid TaskDraft object', () => {
      const task: TaskDraft = {
        name: 'Volunteer',
        description: 'Help with distribution',
        quota: '10',
      }

      expect(task.name).toBe('Volunteer')
      expect(task.quota).toBe('10')
    })
  })

  describe('ApplicationDraft Interface', () => {
    it('should accept valid ApplicationDraft object', () => {
      const draft: ApplicationDraft = {
        c_task_id: '1',
        user_id: '1',
        status: 'pending',
      }

      expect(draft.c_task_id).toBe('1')
      expect(draft.status).toBe('pending')
    })
  })

  describe('BarangayRiskData Interface', () => {
    it('should accept valid BarangayRiskData object with HIGH severity', () => {
      const data: BarangayRiskData = {
        id: '1',
        name: 'Barangay 1',
        risk_score: 85,
        severity: 'HIGH',
      }

      expect(data.severity).toBe('HIGH')
      expect(data.risk_score).toBe(85)
    })

    it('should accept valid BarangayRiskData object with MEDIUM severity', () => {
      const data: BarangayRiskData = {
        id: '2',
        name: 'Barangay 2',
        risk_score: 50,
        severity: 'MEDIUM',
      }

      expect(data.severity).toBe('MEDIUM')
    })

    it('should accept valid BarangayRiskData object with LOW severity', () => {
      const data: BarangayRiskData = {
        id: '3',
        name: 'Barangay 3',
        risk_score: 20,
        severity: 'LOW',
      }

      expect(data.severity).toBe('LOW')
    })
  })
})
