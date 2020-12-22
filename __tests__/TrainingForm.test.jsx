import React from 'react'
import { render, screen } from '@testing-library/react'
import TrainingForm from '../components/TrainingForm'
import { getUnits, getOfficeLocations } from '../utils/getValue'

beforeEach(() => {
  render(<TrainingForm nameEmployee="Test User" units={getUnits()} offices={getOfficeLocations()} />)
})

describe('<TrainingForm /> renders', () => {
  it('user name', async () => {
    expect(
      await screen.findByRole('textbox', { name: 'Employee Name' }),
    ).toHaveValue('Test User')
  })

  it('office location options', () => {
    getOfficeLocations().forEach((loc) => {
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
