import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import renderer from 'react-test-renderer'
import Training from '../pages/training'

const { act } = renderer

describe('<Training /> snapshot', () => {
  it('matches component', () => {
    const examTree = renderer.create(<Training />).toJSON()
    expect(examTree).toMatchSnapshot()
  })
})

describe('<Training /> renders', () => {
  it('user name', async () => {
    render(<Training />)
    expect(
      await screen.findByRole('textbox', { name: 'Employee Name' }),
    ).toHaveValue('Test User')
  })
})

describe('<Training /> events', () => {
  it('bootstrap validation on submit', async () => {
    render(<Training />)
    await act(async () => screen.findByRole('textbox', { name: 'Employee Name' }))
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }))
    expect(
      screen.getByRole('form', { name: /Training Request Form/ }),
    ).toHaveClass('was-validated')
  })

  it('submits filled in form', async () => {
    render(<Training />)
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
    fireEvent.change(screen.getByRole('textbox', { name: 'Course Name' }), {
      target: { value: 'Test Course' },
    })
    fireEvent.change(screen.getByRole('textbox', { name: 'Vendor' }), {
      target: { value: 'GIS for Dummies' },
    })
    fireEvent.change(screen.getByRole('textbox', { name: 'Justification' }), {
      target: { value: 'I want to be smart' },
    })
    fireEvent.change(screen.getByRole('textbox', { name: 'Comments' }), {
      target: { value: 'Thanks!' },
    })
    fireEvent.change(screen.getByLabelText(/Start Date/), {
      target: { value: '2020-12-22' },
    })
    fireEvent.change(screen.getByLabelText(/End Date/), {
      target: { value: '2020-12-22' },
    })

    // submit the form
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }))

    expect(window.confirm).toBeCalled()
  })
})
