import React from 'react'
import { render, screen } from '@testing-library/react'
import renderer from 'react-test-renderer'
import Exam from '../pages/exam'
import { getUnits, getOfficeLocations } from '../utils/constGetter'

beforeEach(() => {
  render(<Exam />)
})

describe('<Exam /> snapshot', () => {
  it('matches component', () => {
    const examTree = renderer.create(<Exam />).toJSON()
    expect(examTree).toMatchSnapshot()
  })
})

describe('<Exam /> renders', () => {
  it('user name', async () => {
    expect(await screen.findByRole('textbox', { name: 'Employee Name' })).toHaveValue('Test User')
  })

  it('title', () => {
    expect(screen.getByText(/Request for Exam Certification/)).toBeInTheDocument()
  })

  it('unit options', () => {
    const units = getUnits()
    Object.keys(units).forEach((u) => {
      expect(screen.getByText(u)).toBeInTheDocument()
    })
  })

  it('employee and exam locations', () => {
    const locations = getOfficeLocations()

    // check to make sure all the offices render on screen twice
    locations.forEach((el) => {
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
