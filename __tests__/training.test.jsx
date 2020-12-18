import React from 'react'
import { render, screen } from '@testing-library/react'
import Training from '../pages/training'
import { esriLogin } from '../utils/authenticator'

jest.mock('../utils/authenticator', () => ({
  esriLogin: jest.fn(),
}))

describe('<Training />', () => {
  beforeEach(() => {
    esriLogin.mockImplementation(() => ({
      name: 'Test User',
      email: 'test@email.com',
    }))
    render(<Training />)
  })

  it('User name is rendered', async () => {
    expect(
      await screen.findByRole('textbox', { name: 'nameEmployee' })).toHaveValue('Test User')
  })

  it('title', () => {
    expect(screen.getByText(/Request for Training/)).toBeInTheDocument()
  })

  it('start and end dates', () => {
    expect(screen.getByTestId('startDate')).toBeInTheDocument()
    expect(screen.getByTestId('endDate')).toBeInTheDocument()
  })
})
