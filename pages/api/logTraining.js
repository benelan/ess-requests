import path from 'path'
import csvLogger from '../../utils/csvLogger'

export default async (req, res) => {
  // get path to csv
  const filePath = path.resolve('./data', 'training_logs.csv')
  // log the data to csv
  return await csvLogger(res, req, filePath)
}