import path from 'path'
import csvLogger from '../../utils/csvLogger'

/**
   * Takes JSON form data and logs it to CSV
   * @route POST /api/logTraining
   * @access public
   * @param {object} req - request
   * @param {object} res - response
   */
export default (req, res) => {
  // get path to csv
  const filePath = path.resolve('./data', 'training_logs.csv')
  // log the data to csv
  return csvLogger(res, req.body, filePath)
}
