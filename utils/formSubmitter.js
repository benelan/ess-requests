/** @module formSubmitter */
import { getChargeCode, getCostCenter } from './constGetter'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

/**
   * Validates that all required form fields are filled out 
   * If so, submits the form based on the type
   * @func
   * @param {object} event - submit event
   * @param {string} type - the type of form being submitted
   * @param {string} state - the form data
 */
export const validateSubmit = (event, type, state) => {
  var forms = document.getElementsByClassName('needs-validation')
  // Loop over them and prevent submission
  var validation = Array.prototype.filter.call(forms, function (form) {
    event.preventDefault()
    form.classList.add('was-validated')
    if (form.checkValidity()) {
      type === "training" ? handleValidTrainingSubmit(state) : handleValidExamSubmit(state)
    }
  })
}

/**
   * Sends a POST to the api to log the training request form data to csv
   * Generates and opens an email with the data
   * @func
   * @param {string} state - the form data
 */
export const handleValidTrainingSubmit = (state) => {
  // deconstruct form data
  const { nameEmployee, emailEmployee, numberEmployee, locationEmployee, nameCourse, cost, startDate, endDate, vendor, justification, comments, unit } = state

  // get the charge code and cost centers
  const chargeCode = getChargeCode(unit)
  const costCenter = getCostCenter(unit, locationEmployee)

  // have user confirm submission and inform them of the charge code
  const confirmed = confirm('Please remember your charge code: ' + chargeCode)
  if (confirmed) {
    /*********** SEND DATA TO SERVER FOR CSV ***********/
    const outputData = {
      'Employee Name': nameEmployee,
      'Employee Email': emailEmployee,
      'Employee Number': numberEmployee,
      'Employee Location': locationEmployee,
      'Cost Center': costCenter,
      'Charge Code': chargeCode,
      'Course Name': nameCourse,
      'Exam Cost': cost,
      'Exam Vendor': vendor,
      'Start Date': startDate,
      'End Date': endDate,
      'Comments': comments,
      'Justification': justification,
    }

    fetch(`${publicRuntimeConfig.basePath}/api/logTraining`, {
      method: 'post',
      body: JSON.stringify(outputData)
    }).then(function (response) {
      return response.json()
    }).then(function (data) {
      console.log(data.response)
    })

    /****************** CREATE EMAIL ******************/
    const subject = "Request for Training"
    const body =
      `Employee Name: ${nameEmployee}
Employee Email: ${emailEmployee}
Employee Number: ${numberEmployee}
Cost Center: ${costCenter}
Employee Location: ${locationEmployee}
Charge Code: ${chargeCode}
Course Name: ${nameCourse}
Cost: ${cost}
Start Date: ${startDate}
End Date: ${endDate}
Vendor: ${vendor}
Justification: ${justification}
Comments: ${comments}`

    // open email in default email client
    window.open(`mailto:${unit}?cc=${emailEmployee}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`)
  }
}

/**
   * Sends a POST to the api to log the exam request form data to csv
   * Generates and opens an email with the data
   * @func
   * @param {string} state - the form data
 */
export const handleValidExamSubmit = (state) => {
  // deconstruct form data
  const { nameEmployee, emailEmployee, numberEmployeee, locationEmployee, nameExam, cost, locationExam, vendor, justification, unit } = state

  // determine the charge code and cost center
  const chargeCode = getChargeCode(unit)
  const costCenter = getCostCenter(unit, locationEmployee)

  // have user confirm submission and inform them of the charge code
  const confirmed = confirm('Please remember your charge code: ' + chargeCode)
  if (confirmed) {
    /*********** SEND DATA TO SERVER FOR CSV ***********/
    const outputData = {
      'Employee Name': nameEmployee,
      'Employee Email': emailEmployee,
      'Employee Number': numberEmployeee,
      'Employee Location': locationEmployee,
      'Cost Center': costCenter,
      'Charge Code': chargeCode,
      'Exam Name': nameExam,
      'Exam Cost': cost,
      'Exam Testing Location': locationExam,
      'Exam Vendor': vendor,
      'Justification': justification,
    }
    fetch(`${publicRuntimeConfig.basePath}/api/logExam`, {
      method: 'post',
      body: JSON.stringify(outputData)
    }).then(function (response) {
      return response.json()
    }).then(function (data) {
      console.log(data.response)
    })

    /****************** CREATE EMAIL ******************/
    const subject = "Request for Exam Certification"
    const body =
      `Employee Name: ${nameEmployee}
Employee Email: ${emailEmployee}
Employee Number: ${numberEmployeee}
Cost Center: ${costCenter}
Employee Location: ${locationEmployee}
Charge Code: ${chargeCode}
Exam Name: ${nameExam}
Exam Cost: $${cost}
Exam Testing Location: ${locationExam}
Exam Vendor: ${vendor}
Justification: ${justification}`

    // open email in default email client
    window.open(`mailto:${unit}?cc=${emailEmployee}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`)
  }
}