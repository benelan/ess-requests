/**
 * This module handles form submission workflows. The exported named function submitForm determines if the data is valid, which type of form to submit, and then generates the email and sends a POST to the API to log the data to CSV.
 * @module submitForm
 * */

import { examSchemaIsValid, trainingSchemaIsValid } from './validateData'

/**
   * Generates and returns an email with the training request data
   * @func
   * @param {object} formData - the form data and costCenter and chargeCode
   * @return {string} mailto string
 */
const generateTrainingEmail = (formData) => {
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
   * Generates and returns an email with the exam request data
   * @func
   * @param {object} formData - the form data and costCenter and chargeCode
   * @return {string} mailto string
 */
const generateExamEmail = (formData) => {
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
   * Sends a POST to the api to log the training request form data to csv
   * @func
   * @param {object} formData - the form data and costCenter and chargeCode
 */
const apiTrainingPOST = (formData) => {
  fetch(`${process.env.basePath}/api/logTrainingRequest`, {
    method: 'post',
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => console.log(data.message))
    .catch((e) => console.error(e))
}

/**
   * Sends a POST to the api to log the exam request form data to csv
   * @func
   * @param {object} formData - the form data and costCenter and chargeCode
 */
const apiExamPOST = (formData) => {
  fetch(`${process.env.basePath}/api/logExamRequest`, {
    method: 'post',
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => console.log(data.message))
    .catch((e) => console.error(e))
}

/**
     * Validates data by type and schema, then submits the form
     * @func
     * @param {string} formType - the type of form being submitted
     * @param {string} inputData - the form data
     * @return {string} mailto string
   */
// eslint-disable-next-line import/prefer-default-export
export const submitForm = (formType, inputData) => {
  try {
    if (formType === 'training' && trainingSchemaIsValid(inputData)) {
      apiTrainingPOST(inputData)
      return generateTrainingEmail(inputData)
    }
    if (formType === 'exam' && examSchemaIsValid(inputData)) {
      apiExamPOST(inputData)
      return generateExamEmail(inputData)
    }
    console.error('invalid data schema')
    return null
  } catch (e) {
    console.error(e)
    return null
  }
}
