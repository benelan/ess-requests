import '@testing-library/jest-dom/extend-expect'
import { esriLogin } from '../utils/authenticateUser'

// mock browser window functions
window.confirm = jest.fn(() => true) // always confirm
window.open = jest.fn(() => false) // never open

const { location } = window
delete window.location
window.location = {
  ...location,
  reload: jest.fn(),
}

// mock the OAuth login for tests
jest.mock('../utils/authenticateUser', () => ({
  esriLogin: jest.fn(),
}))
esriLogin.mockImplementation(() => Promise.resolve({
  name: 'Test User',
  email: 'test@email.com',
}))

// set the base path
process.env.basePath = ''
