import React from 'react'
import { render, screen } from '@testing-library/react'
import renderer from 'react-test-renderer'
import Exam from '../pages/exam'
import { esriLogin } from '../utils/authenticateUser'

const loginPromise = Promise.resolve({
  name: 'Test User',
  email: 'test@email.com',
})

// mock the OAuth login for tests
jest.mock('../utils/authenticateUser', () => ({
  esriLogin: jest.fn(),
}))

esriLogin.mockImplementation(() => loginPromise)

describe('<Exam /> snapshot', () => {
  it('matches component', () => {
    const examTree = renderer.create(<Exam />).toJSON()
    expect(examTree).toMatchSnapshot()
  })
})

describe('<Exam /> renders', () => {
  it('user name', async () => {
    render(<Exam />)
    expect(await screen.findByRole('textbox', { name: 'Employee Name' })).toHaveValue('Test User')
  })
})
