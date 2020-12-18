import React from 'react'
import { render, screen } from '@testing-library/react'
import renderer from 'react-test-renderer'
import Training from '../pages/training'
import { getOfficeLocations } from '../utils/constGetter'

describe('<Training /> snapshot', () => {
  it('matches component', () => {
    const examTree = renderer.create(<Training />).toJSON()
    expect(examTree).toMatchSnapshot()
  })
})

beforeEach(() => {
  render(<Training />)
})

describe('<Training /> renders', () => {
  it('user name', async () => {
    expect(
      await screen.findByRole('textbox', { name: 'Employee Name' }),
    ).toHaveValue('Test User')
  })

  it('title', () => {
    expect(screen.getByText(/Request for Training/)).toBeInTheDocument()
  })

  it('office location options', () => {
    const locations = getOfficeLocations()
    locations.forEach((loc) => {
      expect(screen.getByText(loc)).toBeInTheDocument()
    })
  })

  it('all form inputs', () => {
    expect(screen.getByRole('spinbutton', { name: 'Employee Number' })).toBeInTheDocument()
    expect(screen.getByRole('spinbutton', { name: 'Cost' })).toBeInTheDocument()
    expect(screen.getByRole('combobox', { name: 'Employee Unit' })).toBeInTheDocument()
    expect(screen.getByRole('combobox', { name: 'Employee Location' })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Course Name' })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Vendor' })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Justification' })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Comments' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument()
    expect(screen.getByLabelText(/Start Date/)).toBeInTheDocument()
    expect(screen.getByLabelText(/End Date/)).toBeInTheDocument()
  })
})
