import React from 'react'
import { render, screen } from '@testing-library/react'
import renderer from 'react-test-renderer'
import Training from '../pages/training'
import { esriLogin } from '../utils/authenticator'

const loginPromise = Promise.resolve({
  name: 'Test User',
  email: 'test@email.com',
})

// mock the OAuth login for tests
jest.mock('../utils/authenticator', () => ({
  esriLogin: jest.fn(),
}))

esriLogin.mockImplementation(() => loginPromise)

describe('<Training /> snapshot', () => {
  it('matches component', () => {
    const examTree = renderer.create(<Training />).toJSON()
    expect(examTree).toMatchSnapshot()
  })
})

describe('<Training /> renders', () => {
  it('user name', async () => {
    render(<Training />)
    expect(await screen.findByRole('textbox', { name: 'Employee Name' })).toHaveValue('Test User')
  })
})
