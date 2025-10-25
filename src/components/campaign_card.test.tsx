import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import CampaignCard from './campaign_card'
import { AuthProvider } from '../services/auth_service'
import * as campaignService from '../services/campaign_service'

vi.mock('../services/campaign_service')

const mockCampaign = {
  id: '1',
  name: 'Food Distribution Drive',
  organization_name: 'Local Food Bank',
  organization_id: '2',
  location: 'Manila City Hall',
  date: new Date('2024-12-15'),
  description: 'Help distribute food packages to families in need.',
  status: 'approved',
  task: [],
}

describe('CampaignCard', () => {
  it('should display loading state initially', () => {
    vi.mocked(campaignService.getCampaignByID).mockImplementation(
      () => new Promise(() => {})
    )

    render(
      <MemoryRouter>
        <AuthProvider>
          <CampaignCard id="1" />
        </AuthProvider>
      </MemoryRouter>
    )

    expect(screen.getByText('Loading . . .')).toBeInTheDocument()
  })

  it('should display campaign details when loaded', async () => {
    vi.mocked(campaignService.getCampaignByID).mockResolvedValue({
      data: mockCampaign,
    } as any)

    render(
      <MemoryRouter>
        <AuthProvider>
          <CampaignCard id="1" />
        </AuthProvider>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('Food Distribution Drive')).toBeInTheDocument()
    })

    expect(screen.getByText(/Local Food Bank/)).toBeInTheDocument()
    expect(screen.getByText(/Manila City Hall/)).toBeInTheDocument()
    expect(screen.getByText(/Help distribute food packages/)).toBeInTheDocument()
  })

  it('should hide organization when hide_org is true', async () => {
    vi.mocked(campaignService.getCampaignByID).mockResolvedValue({
      data: mockCampaign,
    } as any)

    render(
      <MemoryRouter>
        <AuthProvider>
          <CampaignCard id="1" hide_org={true} />
        </AuthProvider>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('Food Distribution Drive')).toBeInTheDocument()
    })

    const orgElement = screen.queryByText(/Local Food Bank/)
    expect(orgElement).toHaveStyle({ display: 'none' })
  })

  it('should hide button when hide_button is true', async () => {
    vi.mocked(campaignService.getCampaignByID).mockResolvedValue({
      data: mockCampaign,
    } as any)

    render(
      <MemoryRouter>
        <AuthProvider>
          <CampaignCard id="1" hide_button={true} />
        </AuthProvider>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('Food Distribution Drive')).toBeInTheDocument()
    })

    const viewButton = screen.queryByRole('button', { name: /view/i })
    expect(viewButton).toHaveStyle({ display: 'none' })
  })

  it('should display "No Available Campaigns" when campaign is null', async () => {
    vi.mocked(campaignService.getCampaignByID).mockRejectedValue(
      new Error('Campaign not found')
    )

    render(
      <MemoryRouter>
        <AuthProvider>
          <CampaignCard id="999" />
        </AuthProvider>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('No Available Campaigns')).toBeInTheDocument()
    })
  })

  it('should format date correctly', async () => {
    vi.mocked(campaignService.getCampaignByID).mockResolvedValue({
      data: mockCampaign,
    } as any)

    render(
      <MemoryRouter>
        <AuthProvider>
          <CampaignCard id="1" />
        </AuthProvider>
      </MemoryRouter>
    )

    await waitFor(() => {
      const dateText = screen.getByText(/12\/15\/2024/)
      expect(dateText).toBeInTheDocument()
    })
  })

  it('should display status chip with correct text', async () => {
    vi.mocked(campaignService.getCampaignByID).mockResolvedValue({
      data: mockCampaign,
    } as any)

    render(
      <MemoryRouter>
        <AuthProvider>
          <CampaignCard id="1" />
        </AuthProvider>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('APPROVED')).toBeInTheDocument()
    })
  })
})
