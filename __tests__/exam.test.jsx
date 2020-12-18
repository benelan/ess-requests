import React from 'react'
import { render, screen } from '@testing-library/react'
import Exam from '../pages/exam'
import { esriLogin } from '../utils/authenticator'

jest.mock('../utils/authenticator', () => ({
  esriLogin: jest.fn(),
}))

describe('<Exam /> renders', () => {
  beforeEach(() => {
    esriLogin.mockImplementation(() => ({
      name: 'Test User',
      email: 'test@email.com',
    }))
    render(<Exam />)
  })

  it('User name', async () => {
    expect(
      await screen.findByRole('textbox', { name: 'nameEmployee' })).toHaveValue('Test User')
  })

  it('title', () => {
    expect(
      screen.getByText(/Request for Exam Certification/),
    ).toBeInTheDocument()
  })
})
