import path from 'path'
import csvLogger from '../../utils/csvLogger'

/**
   * Takes JSON form data and logs it to CSV
   * @route POST /api/logTraining
   * @access public
   * @async
   * @param {object} req - request
   * @param {object} res - response
   */
export default async (req, res) => {
  // get path to csv
  const filePath = path.resolve('./data', 'training_logs.csv')
  // log the data to csv
  return await csvLogger(res, req.body, filePath)
}