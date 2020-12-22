/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { esriLogin } from '../utils/authenticateUser'
import submitForm from '../utils/submitForm'
import {
  getUnits,
  getOfficeLocations,
  getChargeCode,
  getCostCenter,
} from '../utils/getValue'

/**
 * The wrapper for forms which handles authentication and form submission
 * @name FormWrapper
 * @class
 */
const FormWrapper = ({ children }) => {
  const [nameEmployee, setName] = useState('')
  const [emailEmployee, setEmail] = useState('')

  useEffect(() => {
    (async () => {
      try {
        const { name, email } = await esriLogin()
        setName(name)
        setEmail(email)
      } catch (err) {
        console.error('login failed:', err)
      }
    })()
  }, [])

  /**
   * Validates that all required form fields are filled out
   * If they are, the form is submitted
   * @func
   * @param {object} event - submit event
   * @param {string} type - the type of form being submitted
   * @param {string} formData - the form data
   */
  const validateSubmit = (event, type, formData) => {
    const forms = document.getElementsByClassName('needs-validation')
    // Loop over them and prevent submission
    Array.prototype.filter.call(forms, (form) => {
      event.preventDefault()
      form.classList.add('was-validated')
      if (form.checkValidity()) {
        const chargeCode = getChargeCode(formData.unit)
        // eslint-disable-next-line no-restricted-globals
        const confirmed = confirm(
          `Please remember your charge code: ${chargeCode}`,
        )
        if (confirmed) {
          const costCenter = getCostCenter(formData.unit, formData.locationEmployee)
          const completeData = {
            ...formData, nameEmployee, emailEmployee, chargeCode, costCenter,
          }
          const mailtoString = submitForm(type, completeData)
          if (mailtoString) window.open(mailtoString)
        }
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
