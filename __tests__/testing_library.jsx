import React from 'react'
import { render } from '@testing-library/react'
import Home from '../pages/index'

test('renders form choice instructions', () => {
  const { getByText } = render(<Home />)
  const linkElement = getByText(
    /Which request form do you need\?/,
  )
  expect(linkElement).toBeInTheDocument()
})
