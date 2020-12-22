import '@testing-library/jest-dom/extend-expect'
import { esriLogin } from './utils/authenticateUser'
import submitForm from './utils/submitForm'

// mock browser window functions
window.confirm = jest.fn(() => true) // always confirm
window.open = jest.fn(() => false) // never open

// mock the OAuth login for tests
jest.mock('./utils/authenticateUser', () => ({
  esriLogin: jest.fn(),
}))
esriLogin.mockImplementation(() => Promise.resolve({
  name: 'Test User',
  email: 'test@email.com',
}))

// Mock submit function
jest.mock('./utils/submitForm')
submitForm.mockImplementation(() => 'form submitted')
