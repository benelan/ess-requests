import React from 'react'
import { render, screen } from '@testing-library/react'
import Training from '../pages/training'
import { esriLogin } from '../utils/authenticator'

jest.mock('../utils/authenticator', () => ({
  esriLogin: jest.fn(),
}))

describe('<Training />', () => {
  it('User name is rendered', async () => {
    esriLogin.mockImplementation(() => ({
      name: 'Test User',
      email: 'test@email.com',
    }))
    render(<Training />)
    expect(screen.getByRole('textbox', { name: 'nameEmployee' })).toHaveValue('')
    expect(await screen.findByRole('textbox', { name: 'nameEmployee' })).toHaveValue('Test User')
  })
})
