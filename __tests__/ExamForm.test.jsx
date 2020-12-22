import React from 'react'
import { render, screen } from '@testing-library/react'
import ExamForm from '../components/ExamForm'
import { getUnits, getOfficeLocations } from '../utils/getValue'

beforeEach(() => {
  render(<ExamForm nameEmployee="Test User" units={getUnits()} offices={getOfficeLocations()} />)
})

describe('<ExamForm /> renders', () => {
  it('user name', async () => {
    expect(await screen.findByRole('textbox', { name: 'Employee Name' })).toHaveValue('Test User')
  })

  it('unit options', () => {
    Object.keys(getUnits()).forEach((u) => {
      expect(screen.getByText(u)).toBeInTheDocument()
    })
  })

  it('employee and exam locations', () => {
    // check to make sure all the offices render on screen twice
    getOfficeLocations().forEach((el) => {
      expect(screen.getAllByText(el)).toHaveLength(2)
    })

    // exam locations has an extra 'Remote' option
    expect(screen.getByText(/Remote/)).toBeInTheDocument()
  })

  it('all form inputs', () => {
    expect(screen.getByRole('spinbutton', { name: 'Employee Number' })).toBeInTheDocument()
    expect(screen.getByRole('spinbutton', { name: 'Cost' })).toBeInTheDocument()
    expect(screen.getByRole('combobox', { name: 'Employee Unit' })).toBeInTheDocument()
    expect(screen.getByRole('combobox', { name: 'Exam Location' })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Exam Name' })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Vendor' })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Justification' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument()
  })
})
