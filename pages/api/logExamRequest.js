import path from 'path'
import logCSV from '../../utils/logCSV'

/**
   * Takes JSON form data and logs it to CSV
   * @route POST /api/logExam
   * @access public
   * @param {object} req - request
   * @param {object} res - response
   */
export default async (req, res) => {
  // get path to csv
  const filePath = path.resolve('./data', 'exam_logs.csv')

  try {
    const log = await logCSV(req.body, filePath)
    res.statusCode = 200
    return res.json({ message: log })
  } catch (e) {
    console.error(e)
    res.statusCode = 500
    return res.json({ message: e.message })
  }
}
