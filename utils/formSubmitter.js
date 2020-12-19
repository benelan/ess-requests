/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/** @module formSubmitter */
import getConfig from 'next/config'
import { getChargeCode, getCostCenter } from './constGetter'

const { publicRuntimeConfig } = getConfig()

/**
   * Generates and returns an email with the training request data
   * @func
   * @param {object} formData - the form data and costCenter and chargeCode
   * @return {string} mailto string
 */
export const generateTrainingEmail = (formData) => {
  try {
    const subject = 'Request for Training'
    const body = `Employee Name: ${formData.nameEmployee}
Employee Email: ${formData.emailEmployee}
Employee Number: ${formData.numberEmployee}
Cost Center: ${formData.costCenter}
Employee Location: ${formData.locationEmployee}
Charge Code: ${formData.chargeCode}
Course Name: ${formData.nameCourse}
Cost: ${formData.cost}
Start Date: ${formData.startDate}
End Date: ${formData.endDate}
Vendor: ${formData.vendor}
Justification: ${formData.justification}
Comments: ${formData.comments}`

    return `mailto:${formData.unit}?cc=${formData.emailEmployee}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  } catch (e) {
    console.error(e)
    return null
  }
}

/**
   * Sends a POST to the api to log the training request form data to csv
   * @func
   * @param {object} formData - the form data and costCenter and chargeCode
 */
export const logTrainingRequest = (formData) => {
  try {
    const outputData = {
      'Employee Name': formData.nameEmployee,
      'Employee Email': formData.emailEmployee,
      'Employee Number': formData.numberEmployee,
      'Employee Location': formData.locationEmployee,
      'Cost Center': formData.costCenter,
      'Charge Code': formData.chargeCode,
      'Course Name': formData.nameCourse,
      'Exam Cost': formData.cost,
      'Exam Vendor': formData.vendor,
      'Start Date': formData.startDate,
      'End Date': formData.endDate,
      Comments: formData.comments,
      Justification: formData.justification,
    }

    fetch(`${publicRuntimeConfig.basePath}/api/logTraining`, {
      method: 'post',
      body: JSON.stringify(outputData),
    }).then((response) => response.json()).then((data) => {
      console.log(data.message)
    })
  } catch (e) {
    console.error(e)
  }
}

/**
   * Generates and returns an email with the exam request data
   * @func
   * @param {object} formData - the form data and costCenter and chargeCode
   * @return {string} mailto string
 */
export const generateExamEmail = (formData) => {
  try {
    const subject = 'Request for Exam Certification'
    const body = `Employee Name: ${formData.nameEmployee}
Employee Email: ${formData.emailEmployee}
Employee Number: ${formData.numberEmployee}
Cost Center: ${formData.costCenter}
Employee Location: ${formData.locationEmployee}
Charge Code: ${formData.chargeCode}
Exam Name: ${formData.nameExam}
Exam Cost: $${formData.cost}
Exam Testing Location: ${formData.locationExam}
Exam Vendor: ${formData.vendor}
Justification: ${formData.justification}`

    return `mailto:${formData.unit}?cc=${formData.emailEmployee}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  } catch (e) {
    console.error(e)
    return null
  }
}

/**
   * Sends a POST to the api to log the exam request form data to csv
   * @func
   * @param {object} formData - the form data and costCenter and chargeCode
 */
export const logExamRequest = (formData) => {
  try {
    const outputData = {
      'Employee Name': formData.nameEmployee,
      'Employee Email': formData.emailEmployee,
      'Employee Number': formData.numberEmployee,
      'Employee Location': formData.locationEmployee,
      'Cost Center': formData.costCenter,
      'Charge Code': formData.chargeCode,
      'Exam Name': formData.nameExam,
      'Exam Cost': formData.cost,
      'Exam Testing Location': formData.locationExam,
      'Exam Vendor': formData.vendor,
      Justification: formData.justification,
    }

    fetch(`${publicRuntimeConfig.basePath}/api/logExam`, {
      method: 'post',
      body: JSON.stringify(outputData),
    }).then((response) => response.json()).then((data) => {
      console.log(data.message)
    })
  } catch (e) {
    console.error(e)
  }
}

/**
     * Handles valid submits based on form type
     * @func
     * @param {string} type - the type of form being submitted
     * @param {string} state - the form data
   */
export const handleValidSubmit = (type, state) => {
  try {
    const chargeCode = getChargeCode(state.unit)
    // have user confirm submission and inform them of the charge code
    const confirmed = confirm(`Please remember your charge code: ${chargeCode}`)
    if (confirmed) {
      const costCenter = getCostCenter(state.unit, state.locationEmployee)
      const formData = { ...state, costCenter, chargeCode }
      let mailtoString = ''
      if (type === 'training') {
        logTrainingRequest(formData)
        mailtoString = generateTrainingEmail(formData)
      }
      if (type === 'exam') {
        logExamRequest(formData)
        mailtoString = generateExamEmail(formData)
      }
      if (mailtoString) window.open(mailtoString)
    }
  } catch (e) {
    console.error(e)
  }
}
