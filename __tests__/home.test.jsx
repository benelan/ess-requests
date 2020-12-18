import React from 'react'
import { render, screen } from '@testing-library/react'
import renderer from 'react-test-renderer'
import Home from '../pages/index'

beforeEach(() => {
  render(<Home />)
})

describe('<Home /> renders', () => {
  it('matches snapshot', () => {
    const homeTree = renderer.create(<Home />).toJSON()
    expect(homeTree).toMatchSnapshot()
  })

  it('title', () => {
    expect(screen.getAllByText(/ESS Requests/)).toHaveLength(2)
  })
  it('instructions', () => {
    expect(
      screen.getByText(/Which request form do you need\?/),
    ).toBeInTheDocument()
  })
})
