import path from 'path'
import { logCSV } from '../../utils/logCSV'

/**
   * Takes JSON form data and logs it to CSV
   * @route POST /api/logExam
   * @access public
   * @param {object} req - request
   * @param {object} res - response
   */
const logExamRequest = async (req, res) => {
  try {
    // get path to csv
    const filePath = path.resolve('./data', 'exam_logs.csv')

    const body = JSON.parse(req.body)

    const inputData = {
      'Employee Name': body.nameEmployee || '',
      'Employee Email': body.emailEmployee || '',
      'Employee Number': body.numberEmployee || '',
      'Employee Location': body.locationEmployee || '',
      'Cost Center': body.costCenter || '',
      'Charge Code': body.chargeCode || '',
      'Exam Name': body.nameExam || '',
      'Exam Cost': body.cost || '',
      'Exam Testing Location': body.locationExam || '',
      'Exam Vendor': body.vendor || '',
      Justification: body.justification || '',
    }

    const log = await logCSV(inputData, filePath)
    res.statusCode = 200
    return res.json({ message: log })
  } catch (e) {
    console.error(e)
    res.statusCode = 500
    return res.json({ message: e.message })
  }
}

export default logExamRequest
