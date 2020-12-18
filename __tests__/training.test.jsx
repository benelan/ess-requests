import React from 'react'
import { render, screen } from '@testing-library/react'
import renderer from 'react-test-renderer'
import Training from '../pages/training'
import { getEmployeeLocations } from '../utils/constGetter'

beforeEach(() => {
  render(<Training />)
})

describe('<Training /> renders', () => {
  it('matches snapshot', () => {
    const examTree = renderer.create(<Training />).toJSON()
    expect(examTree).toMatchSnapshot()
  })

  it('user name', async () => {
    expect(
      await screen.findByRole('textbox', { name: 'Employee Name' }),
    ).toHaveValue('Test User')
  })

  it('title', () => {
    expect(screen.getByText(/Request for Training/)).toBeInTheDocument()
  })

  it('employee location options', () => {
    const employeeLocations = getEmployeeLocations()
    employeeLocations.forEach((el) => {
      expect(screen.getByText(el)).toBeInTheDocument()
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
