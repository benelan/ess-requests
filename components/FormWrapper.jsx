/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Button, Modal, ModalBody, ModalFooter,
} from 'reactstrap'
import { esriLogin } from '../utils/authenticateUser'
import { submitForm } from '../utils/submitForm'
import {
  getUnits,
  getStLouisUnit,
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

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [modal, setModal] = useState(false)
  const toggleModal = () => setModal(!modal)

  /* Login with ArcGIS OAuth */
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
   * Validates that all required form fields are filled out. If they are, the form is submitted.
   * If there is an issue sending the email, a template is generated on the client side
   * @func
   * @param {object} event - submit event
   * @param {string} type - the type of form being submitted
   * @param {string} formData - the form data
   */
  const validateSubmit = (event, type, formData) => {
    // spinner on submit
    setLoading(true)
    const forms = document.getElementsByClassName('needs-validation')
    // Loop over them and prevent submission
    Array.prototype.filter.call(forms, async (form) => {
      event.preventDefault()
      form.classList.add('was-validated')
      if (form.checkValidity()) {
        // St Louis only goes to Enterprise alias
        const updatedUnit = getStLouisUnit(formData.unit, formData.locationEmployee)
        const updatedData = { ...formData }
        updatedData.unit = updatedUnit

        // get charge code and cost center
        const chargeCode = getChargeCode(updatedData.unit)
        const costCenter = getCostCenter(
          updatedData.unit,
          updatedData.locationEmployee,
        )
        const completeData = {
          ...updatedData,
          nameEmployee,
          emailEmployee,
          chargeCode,
          costCenter,
        }
        // attempt to log request to csv and auto send email
        const mailtoString = await submitForm(type, completeData)
        let body
        // if there is an error, try again
        if (mailtoString === 'error') {
          body = (
            <ModalBody>
              There was an error submitting the request, please try again.
            </ModalBody>
          )
          // if the email is sent, show charge code
        } else if (mailtoString === 'sent') {
          body = (
            <ModalBody>
              Request sent. Please remember your charge code:
              {' '}
              {chargeCode}
            </ModalBody>
          )
          // if the email doesn't send automatically do it manually
        } else {
          window.open(mailtoString)
          body = (
            <ModalBody>
              There was an issue sending the request automatically. An email
              template should popup to send it manually. If the popup was
              blocked,
              {' '}
              <a style={{ color: 'blue' }} href={mailtoString}>
                click here
              </a>
              .
            </ModalBody>
          )
        }
        setMessage(body)
        toggleModal()
      }
      setLoading(false)
    })
  }

  return (
    <>
      {loading ? (
        <>
          <div className="spinner-border text-primary center" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </>
      ) : (
        React.cloneElement(children, {
          nameEmployee,
          validateSubmit,
          units: getUnits(),
          offices: getOfficeLocations(),
        })
      )}

      <Modal isOpen={modal} toggle={toggleModal} centered>
        {message}
        <ModalFooter>
          <Button color="primary" onClick={toggleModal}>
            Okay
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

FormWrapper.propTypes = {
  /** the type of form */
  children: PropTypes.element.isRequired,
}

export default FormWrapper
