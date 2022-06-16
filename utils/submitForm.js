/**
 * This module handles form submission workflows. The exported named function submitForm determines if the data is valid and which type of form to submit. It then sends a POST to the API to log the request to CSV and send an email. If the email does not send on the server, a template will be generated on the client.
 * @module submitForm
 * */

import { examSchemaIsValid, trainingSchemaIsValid } from './validateData'

/**
   * Generates and returns an email with the training request data
   * @func
   * @param {object} formData - the form data and costCenter and chargeCode
   * @return {string} mailto string
 */
export const generateTrainingEmail = (formData) => {
  try {
    const to = `${formData.unit}, ${formData.emailEmployee}`
    const subject = 'Request for Training'
    const text = `Employee Name: ${formData.nameEmployee}
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

    return { subject, text, to }
  } catch (e) {
    console.error(e)
    return null
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
    const to = `${formData.unit}, ${formData.emailEmployee}`
    const subject = 'Request for Exam Certification'
    const text = `Employee Name: ${formData.nameEmployee}
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

    return { subject, text, to }
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
const apiTrainingPOST = async (formData) => new Promise((resolve, reject) => {
  fetch(`${process.env.basePath}/api/submitTrainingRequest`, {
    method: 'post',
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch((e) => reject(e))
})

/**
   * Sends a POST to the api to log the exam request form data to csv
   * @func
   * @param {object} formData - the form data and costCenter and chargeCode
 */
const apiExamPOST = async (formData) => new Promise((resolve, reject) => {
  fetch(`${process.env.basePath}/api/submitExamRequest`, {
    method: 'post',
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch((e) => reject(e))
})

/**
     * Validates data by type and schema, then submits the form
     * @func
     * @param {string} formType - the type of form being submitted
     * @param {string} inputData - the form data
     * @return {string} mailto string
   */
export const submitForm = async (formType, inputData) => {
  try {
    // check training form schema validity
    if (formType === 'training' && trainingSchemaIsValid(inputData)) {
      // send data to server for csv logging and emailing
      const response = await apiTrainingPOST(inputData)
      // if the server was unable to send the email
      if (!response.sent) {
        // generate the email on the client side
        const { text, subject } = generateTrainingEmail(inputData)
        // create and return a mailto string
        return `mailto:${inputData.unit}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`
      }
      // if the email sent from the server no need to return mailto string
      return 'sent'
    }
    // same steps as above, only for exam forms
    if (formType === 'exam' && examSchemaIsValid(inputData)) {
      const response = await apiExamPOST(inputData)
      if (!response.sent) {
        const { text, subject } = generateExamEmail(inputData)

        return `mailto:${inputData.unit}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`
      }
      return 'sent'
    }
    // if there were issues with the schemas
    console.error('invalid data schema')
    return 'error'
  } catch (e) {
    console.error(e)
    return 'error'
  }
}
