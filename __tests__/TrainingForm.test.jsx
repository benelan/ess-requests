import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import TrainingForm from '../components/TrainingForm'
import { getUnits, getOfficeLocations } from '../utils/getValue'

beforeEach(() => {
  render(
    <TrainingForm
      nameEmployee="Test User"
      units={getUnits()}
      offices={getOfficeLocations()}
      validateSubmit={() => 'validate submit'}
    />,
  )
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

  it('form no validation on load', () => {
    expect(screen.getByRole('form', { name: /Training Request Form/ })).not.toHaveClass('was-validated')
  })
})

describe('<TrainingForm /> inputs', () => {
  it('employee number - integer works', () => {
    const node = screen.getByRole('spinbutton', { name: 'Employee Number' })
    fireEvent.change(node, { target: { value: '123' } })
    expect(node).toHaveValue(123)
  })

  it('employee number - strings not allowed', () => {
    const node = screen.getByRole('spinbutton', { name: 'Employee Number' })
    fireEvent.change(node, { target: { value: '123abc' } })
    expect(node).toHaveValue(null)
  })

  it('cost - integer works', () => {
    const node = screen.getByRole('spinbutton', { name: 'Cost' })
    fireEvent.change(node, { target: { value: '123' } })
    expect(node).toHaveValue(123)
  })

  it('cost - strings not allowed', () => {
    const node = screen.getByRole('spinbutton', { name: 'Cost' })
    fireEvent.change(node, { target: { value: '123abc' } })
    expect(node).toHaveValue(null)
  })

  it('startDate - ISO format works', () => {
    const node = screen.getByLabelText(/Start Date/)
    fireEvent.change(node, { target: { value: '2020-12-22' } })
    expect(node).toHaveValue('2020-12-22')
  })

  it('startDate - other formats not allowed', () => {
    const node = screen.getByLabelText(/Start Date/)
    fireEvent.change(node, { target: { value: 'December 22, 2020' } })
    expect(node).toHaveValue('')
  })

  it('endDate - ISO format works', () => {
    const node = screen.getByLabelText(/End Date/)
    fireEvent.change(node, { target: { value: '2020-12-22' } })
    expect(node).toHaveValue('2020-12-22')
  })

  it('endDate - other formats not allowed', () => {
    const node = screen.getByLabelText(/End Date/)
    fireEvent.change(node, { target: { value: '2020' } })
    expect(node).toHaveValue('')
  })
})
