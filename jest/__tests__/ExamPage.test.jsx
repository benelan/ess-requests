import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import renderer from 'react-test-renderer'
import ExamPage from '../../pages/exam'

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

  // it('submit filled in form', async () => {
  //   render(<Exam />)
  //   await act(async () => screen.findByRole('textbox', { name: 'Employee Name' }))
  //   const examForm = screen.getByRole('form', { name: /Exam Request Form/ })
  //   expect(examForm).not.toHaveClass('was-validated')
  //   fireEvent.click(screen.getByRole('button', { name: 'Submit' }))
  //   expect(submitForm).not.toHaveBeenCalled()
  //   expect(examForm).toHaveClass('was-validated')
  // })
})
