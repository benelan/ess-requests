import React from 'react'
import { render, screen } from '@testing-library/react'
import Home from '../pages/index'

test('renders form choice instructions', () => {
  render(<Home />)
  expect(
    screen.getByText(/Which request form do you need\?/),
  ).toBeInTheDocument()
})
