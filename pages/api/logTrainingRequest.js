import path from 'path'
import { logCSV } from '../../utils/logCSV'

/**
   * Takes JSON form data and logs it to CSV
   * @route POST /api/logTraining
   * @access public
   * @param {object} req - request
   * @param {object} res - response
   */
const logTrainingRequest = async (req, res) => {
  try {
    // get path to csv
    const filePath = path.resolve('./data', 'training_logs.csv')

    const body = JSON.parse(req.body)

    // structure schema
    const inputData = {
      'Employee Name': body.nameEmployee || '',
      'Employee Email': body.emailEmployee || '',
      'Employee Number': body.numberEmployee || '',
      'Employee Location': body.locationEmployee || '',
      'Cost Center': body.costCenter || '',
      'Charge Code': body.chargeCode || '',
      'Course Name': body.nameCourse || '',
      'Exam Cost': body.cost || '',
      'Exam Vendor': body.vendor || '',
      'Start Date': body.startDate || '',
      'End Date': body.endDate || '',
      Comments: body.comments || '',
      Justification: body.justification || '',
    }

    const log = await logCSV(inputData, filePath)
    res.statusCode = 200
    return res.json({ message: log })
  } catch (e) {
    console.error(e.message)
    res.statusCode = 500
    return res.json({ message: e.message })
  }
}

export default logTrainingRequest
