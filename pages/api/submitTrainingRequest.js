import path from 'path'
import { generateTrainingEmail } from '../../utils/submitForm'
import { logCSV } from '../../utils/logCSV'
import { sendAutoEmail } from '../../utils/sendAutoEmail'

/**
   * Takes JSON form data and sends an email/logs to csv
   * @route POST /api/submitTrainingRequest
   * @access public
   * @param {object} req - request
   * @param {object} res - response
   */
const submitTrainingRequest = async (req, res) => {
  try {
    // get path to csv
    const filePath = path.resolve('./data', 'training_logs.csv')
    const body = JSON.parse(req.body)
    // try to automatically send an email
    const mail = await sendAutoEmail(generateTrainingEmail(body))

    // format data for csv, remove commas from string inputs
    const inputData = {
      'Employee Name': body.nameEmployee || '',
      'Employee Email': body.emailEmployee || '',
      'Employee Number': body.numberEmployee || '',
      'Employee Location': body.locationEmployee || '',
      'Cost Center': body.costCenter || '',
      'Charge Code': body.chargeCode || '',
      'Course Name': body.nameCourse.replaceAll(',', '-') || '',
      'Exam Cost': body.cost || '',
      'Exam Vendor': body.vendor.replaceAll(',', '-') || '',
      'Start Date': body.startDate || '',
      'End Date': body.endDate || '',
      Comments: body.comments.replaceAll(',', '-') || '',
      Justification: body.justification.replaceAll(',', '-') || '',
    }

    // log to csv
    const log = await logCSV(inputData, filePath)
    res.statusCode = 200
    // send response containing info about email/log
    return res.json({ message: log, sent: mail })
  } catch (e) {
    console.error(e.message)
    res.statusCode = 500
    return res.json({ message: e.message, sent: false })
  }
}

export default submitTrainingRequest
