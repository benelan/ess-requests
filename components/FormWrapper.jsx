import React from 'react'
import PropTypes from 'prop-types'
import { esriLogin } from '../utils/authenticator'
import { handleValidSubmit } from '../utils/formSubmitter'
import { getUnits, getOfficeLocations } from '../utils/constGetter'

/**
 * The wrapper for forms which handles authentication and form submission
 * @name FormWrapper
 * @class
 */
export default class FormWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nameEmployee: '',
      emailEmployee: '',
    }
    this.validateSubmit = this.validateSubmit.bind(this)
  }

  async componentDidMount() {
    try {
      const { name, email } = await esriLogin()
      this.setState({ nameEmployee: name, emailEmployee: email })
    } catch (err) {
      console.error('login failed:', err)
    }
  }

  /**
   * Validates that all required form fields are filled out
   * @func
   * @param {object} event - submit event
   * @param {string} type - the type of form being submitted
   * @param {string} state - the form data
   */
  validateSubmit(event, type, state) {
    console.log(event)
    const forms = document.getElementsByClassName('needs-validation')
    // Loop over them and prevent submission
    Array.prototype.filter.call(forms, (form) => {
      event.preventDefault()
      form.classList.add('was-validated')
      if (form.checkValidity()) {
        const { nameEmployee, emailEmployee } = this.state
        const formData = { ...state, nameEmployee, emailEmployee }
        handleValidSubmit(type, formData)
      }
    })
  }

  render() {
    const { nameEmployee } = this.state
    const { children } = this.props
    // get the units and office locations
    const units = getUnits()
    const offices = getOfficeLocations()

    return (
      React.cloneElement(children, {
        units,
        offices,
        nameEmployee,
        validateSubmit: this.validateSubmit,
      })
    )
  }
}

FormWrapper.propTypes = {
  /** the type of form */
  children: PropTypes.element.isRequired,
}
