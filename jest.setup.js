import '@testing-library/jest-dom/extend-expect'
import { setConfig } from 'next/config'
import { publicRuntimeConfig } from './next.config'
import { esriLogin } from './utils/authenticator'

// Make sure you can use "publicRuntimeConfig" within tests.
setConfig({ publicRuntimeConfig })

// mock the 0auth login for tests
jest.mock('./utils/authenticator', () => ({
  esriLogin: jest.fn(),
}))

esriLogin.mockImplementation(() => Promise.resolve({
  name: 'Test User',
  email: 'test@email.com',
}))
