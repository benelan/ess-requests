import React from 'react'
import { render, screen } from '@testing-library/react'
import renderer from 'react-test-renderer'
import Home from '../pages/index'

describe('<Home /> snapshot', () => {
  it('matches com', () => {
    const homeTree = renderer.create(<Home />).toJSON()
    expect(homeTree).toMatchSnapshot()
  })
})

beforeEach(() => {
  render(<Home />)
})

describe('<Home /> renders', () => {
  it('title', () => {
    expect(screen.getAllByText(/ESS Requests/)).toHaveLength(2)
  })
  it('instructions', () => {
    expect(
      screen.getByText(/Which request form do you need\?/),
    ).toBeInTheDocument()
  })
})
