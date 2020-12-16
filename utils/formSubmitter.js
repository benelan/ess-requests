import { getChargeCode, getCostCenter } from './constGetter'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

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

export const handleValidTrainingSubmit = (state) => {
  const { nameEmployee, emailEmployee, numberEmploye, locationEmployee, nameCourse, cost, startDate, endDate, vendor, justification, comments, unit } = state

  // get the charge code and cost centers
  const chargeCode = getChargeCode(unit)
  const costCenter = getCostCenter(unit, locationEmployee)

  const confirmed = confirm('Please remember your charge code: ' + chargeCode)
  if (confirmed) {
    /*********** SEND DATA TO SERVER FOR CSV ***********/
    const outputData = {
      'Employee Name': nameEmployee,
      'Employee Email': emailEmployee,
      'Employee Number': numberEmploye,
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

    // REST POST data to api
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
Employee Number: ${numberEmploye}
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

export const handleValidExamSubmit = (state) => {
  const { nameEmployee, emailEmployee, numberEmployee, locationEmployee, nameExam, cost, locationExam, vendor, justification, unit } = state

  const chargeCode = getChargeCode(unit)
  const costCenter = getCostCenter(unit, locationEmployee)

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
Employee Number: ${numberEmployee}
Cost Center: ${costCenter}
Employee Location: ${locationEmployee}
Charge Code: ${chargeCode}
Exam Name: ${nameExam}
Exam Cost: $${cost}
Exam Testing Location: ${locationExam}
Exam Vendor: ${vendor}
Justification: ${justification}`

    window.open(`mailto:${unit}?cc=${emailEmployee}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`)
  }
}