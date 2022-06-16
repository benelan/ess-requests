import React from 'react'
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react'
import renderer from 'react-test-renderer'
import ExamPage from '../../pages/exam'
import * as submit from '../../utils/submitForm'

const { act } = renderer

describe('<Exam /> snapshot', () => {
  it('matches component', () => {
    const examTree = renderer.create(<ExamPage />).toJSON()
    expect(examTree).toMatchSnapshot()
  })
})

describe('<Exam /> renders', () => {
  it('user name', async () => {
    render(<ExamPage />)
    expect(await screen.findByRole('textbox', { name: 'Employee Name' })).toHaveValue('Test User')
  })

  it('navbar with exam active', async () => {
    render(<ExamPage />)
    await act(async () => screen.findByRole('textbox', { name: 'Employee Name' }))
    expect(screen.getByRole('listitem', { name: 'Exam Link' })).toHaveClass('active')
  })
})

describe('<Exam /> events', () => {
  it('bootstrap validation on submit', async () => {
    render(<ExamPage />)
    await act(async () => screen.findByRole('textbox', { name: 'Employee Name' }))
    const examForm = screen.getByRole('form', { name: /Exam Request Form/ })
    expect(examForm).not.toHaveClass('was-validated')
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }))
    expect(examForm).toHaveClass('was-validated')
  })

  it('submits filled in form', async () => {
    render(<ExamPage />)
    // wait for user name to populate after mocked auth
    await act(async () => screen.findByRole('textbox', { name: 'Employee Name' }))

    // fill in the form
    fireEvent.change(
      screen.getByRole('spinbutton', { name: 'Employee Number' }),
      { target: { value: '12345' } },
    )
    fireEvent.change(screen.getByRole('spinbutton', { name: 'Cost' }), {
      target: { value: '54321' },
    })
    fireEvent.change(
      screen.getByRole('combobox', { name: 'Employee Location' }),
      { target: { value: 'St Louis' } },
    )
    fireEvent.change(screen.getByRole('combobox', { name: 'Employee Unit' }), {
      target: { value: 'Enterprise' },
    })
    fireEvent.change(screen.getByRole('textbox', { name: 'Exam Name' }), {
      target: { value: 'Test Exam' },
    })
    fireEvent.change(screen.getByRole('textbox', { name: 'Vendor' }), {
      target: { value: 'GIS for Dummies' },
    })
    fireEvent.change(screen.getByRole('textbox', { name: 'Justification' }), {
      target: { value: 'I want to be smart' },
    })

    // spy on submit function
    const submitMock = jest.spyOn(submit, 'submitForm')
    // submit the form
    act(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Submit' }))
    })
    // form submission succeeds when all inputs are filled out
    await waitFor(() => expect(window.fetch).toReturn())
    // mailto string is only created on error when the email doesn't auto send
    await waitFor(() => expect(submitMock).toReturn())
  })
})
