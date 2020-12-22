/** @module submitForm */
import getConfig from 'next/config'

const { Validator } = require('jsonschema')

const { publicRuntimeConfig } = getConfig()

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
const logTrainingRequest = (formData) => {
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

    fetch(`${publicRuntimeConfig.basePath}/api/logTrainingRequest`, {
      method: 'post',
      body: JSON.stringify(outputData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message)
      })
  } catch (e) {
    console.error(e)
  }
}

/**
   * Sends a POST to the api to log the exam request form data to csv
   * @func
   * @param {object} formData - the form data and costCenter and chargeCode
 */
const logExamRequest = (formData) => {
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

    fetch(`${publicRuntimeConfig.basePath}/api/logExamRequest`, {
      method: 'post',
      body: JSON.stringify(outputData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message)
      })
  } catch (e) {
    console.error(e)
  }
}

/**
 * Takes an exam data object as an input and validates it's schema
 * @param {object} instance - data to validate
 * @return {boolean} does the data have the proper schema
 */
const examSchemaIsValid = (instance) => {
  const v = new Validator()
  const schema = {
    id: 'examData',
    type: 'object',
    properties: {
      nameEmployee: { type: 'string', required: true },
      emailEmployee: { type: 'string', required: true },
      numberEmployee: { type: 'number', required: true },
      locationEmployee: { type: 'string', required: true },
      costCenter: { type: 'string', required: true },
      chargeCode: { type: 'string', required: true },
      nameExam: { type: 'string', required: true },
      cost: { type: 'number', required: true },
      locationExam: { type: 'string', required: true },
      vendor: { type: 'string', required: true },
      justification: { type: 'string', required: true },
    },
  }
  return v.validate(instance, schema)
}

/**
 * Takes a training data object as an input and validates it's schema
 * @param {object} instance - data to validate
 * @return {boolean} does the data have the proper schema
 */
const trainingSchemaIsValid = (instance) => {
  const v = new Validator()
  const schema = {
    id: 'trainingData',
    type: 'object',
    properties: {
      nameEmployee: { type: 'string', required: true },
      emailEmployee: { type: 'string', required: true },
      numberEmployee: { type: 'number', required: true },
      locationEmployee: { type: 'string', required: true },
      costCenter: { type: 'string', required: true },
      chargeCode: { type: 'string', required: true },
      nameCourse: { type: 'string', required: true },
      cost: { type: 'number', required: true },
      startData: { type: 'string', required: true },
      endData: { type: 'string', required: true },
      vendor: { type: 'string', required: true },
      justification: { type: 'string', required: true },
      comments: { type: 'string', required: true },
    },
  }

  return v.validate(instance, schema)
}

/**
     * validates data by type and schema, then submits the form
     * @func
     * @param {string} formType - the type of form being submitted
     * @param {string} inputData - the form data
   */
const submitForm = (formType, inputData) => {
  try {
    if (formType === 'training' && trainingSchemaIsValid(inputData)) {
      logTrainingRequest(inputData)
      return generateTrainingEmail(inputData)
    }
    if (formType === 'exam' && examSchemaIsValid(inputData)) {
      logExamRequest(inputData)
      return generateExamEmail(inputData)
    }
    console.error('invalid data schema')
    return null
  } catch (e) {
    console.error(e)
    return null
  }
}

export default submitForm
