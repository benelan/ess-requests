import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { esriLogin } from '../utils/authenticator'
import { handleValidSubmit } from '../utils/formSubmitter'
import { getUnits, getOfficeLocations } from '../utils/constGetter'

/**
 * The wrapper for forms which handles authentication and form submission
 * @name FormWrapper
 * @class
 */
const FormWrapper = ({ children }) => {
  const [nameEmployee, setName] = useState('')
  const [emailEmployee, setEmail] = useState('')

  const signIn = async () => {
    try {
      const { name, email } = await esriLogin()
      setName(name)
      setEmail(email)
    } catch (err) {
      console.error('login failed:', err)
    }
  }

  useEffect(() => {
    signIn()
  }, [])

  /**
   * Validates that all required form fields are filled out
   * @func
   * @param {object} event - submit event
   * @param {string} type - the type of form being submitted
   * @param {string} state - the form data
   */
  const validateSubmit = (event, type, state) => {
    const forms = document.getElementsByClassName('needs-validation')
    // Loop over them and prevent submission
    Array.prototype.filter.call(forms, (form) => {
      event.preventDefault()
      form.classList.add('was-validated')
      if (form.checkValidity()) {
        const formData = { ...state, nameEmployee, emailEmployee }
        handleValidSubmit(type, formData)
      }
    })
  }

  return React.cloneElement(children, {
    nameEmployee,
    validateSubmit,
    units: getUnits(),
    offices: getOfficeLocations(),
  })
}

FormWrapper.propTypes = {
  /** the type of form */
  children: PropTypes.element.isRequired,
}

export default FormWrapper
