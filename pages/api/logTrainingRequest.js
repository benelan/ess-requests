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

    // structure schema
    const inputData = {
      'Employee Name': req.body.nameEmployee || '',
      'Employee Email': req.body.emailEmployee || '',
      'Employee Number': req.body.numberEmployee || '',
      'Employee Location': req.body.locationEmployee || '',
      'Cost Center': req.body.costCenter || '',
      'Charge Code': req.body.chargeCode || '',
      'Course Name': req.body.nameCourse || '',
      'Exam Cost': req.body.cost || '',
      'Exam Vendor': req.body.vendor || '',
      'Start Date': req.body.startDate || '',
      'End Date': req.body.endDate || '',
      Comments: req.body.comments || '',
      Justification: req.body.justification || '',
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
