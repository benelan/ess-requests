import React from 'react'
import { render, screen } from '@testing-library/react'
import Exam from '../pages/exam'
import { esriLogin } from '../utils/authenticator'

jest.mock('../utils/authenticator', () => ({
  esriLogin: jest.fn(),
}))

describe('<Exam />', () => {
  it('User name is rendered', async () => {
    esriLogin.mockImplementation(() => ({
      name: 'Test User',
      email: 'test@email.com',
    }))
    render(<Exam />)
    expect(screen.getByRole('textbox', { name: 'nameEmployee' })).toHaveValue('')
    expect(await screen.findByRole('textbox', { name: 'nameEmployee' })).toHaveValue('Test User')
  })
})
