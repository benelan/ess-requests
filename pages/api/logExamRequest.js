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

    const inputData = {
      'Employee Name': req.body.nameEmployee || '',
      'Employee Email': req.body.emailEmployee || '',
      'Employee Number': req.body.numberEmployee || '',
      'Employee Location': req.body.locationEmployee || '',
      'Cost Center': req.body.costCenter || '',
      'Charge Code': req.body.chargeCode || '',
      'Exam Name': req.body.nameExam || '',
      'Exam Cost': req.body.cost || '',
      'Exam Testing Location': req.body.locationExam || '',
      'Exam Vendor': req.body.vendor || '',
      Justification: req.body.justification || '',
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
