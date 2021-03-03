import path from 'path'
import { logCSV } from '../../utils/logCSV'
import { generateExamEmail } from '../../utils/submitForm'
import { sendAutoEmail } from '../../utils/sendAutoEmail'

/**
   * Takes JSON form data and sends an email/logs to csv
   * @route POST /api/submitExamRequest
   * @access public
   * @param {object} req - request
   * @param {object} res - response
   */
const submitExamRequest = async (req, res) => {
  try {
    // get path to csv
    const filePath = path.resolve('./data', 'exam_logs.csv')
    const body = JSON.parse(req.body)
    // try to automatically send an email
    const mail = await sendAutoEmail(generateExamEmail(body))
    // format data for csv, remove commas from string inputs
    const inputData = {
      'Employee Name': body.nameEmployee || '',
      'Employee Email': body.emailEmployee || '',
      'Employee Number': body.numberEmployee || '',
      'Employee Location': body.locationEmployee || '',
      'Cost Center': body.costCenter || '',
      'Charge Code': body.chargeCode || '',
      'Exam Name': body.nameExam.replaceAll(',', '-') || '',
      'Exam Cost': body.cost || '',
      'Exam Testing Location': body.locationExam || '',
      'Exam Vendor': body.vendor.replaceAll(',', '-') || '',
      Justification: body.justification.replaceAll(',', '-') || '',
    }
    // log to csv
    const log = await logCSV(inputData, filePath)
    res.statusCode = 200
    // send response containing info about tasks
    return res.json({ message: log, sent: mail })
  } catch (e) {
    console.error(e)
    res.statusCode = 500
    return res.json({ message: e.message, sent: false })
  }
}

export default submitExamRequest
