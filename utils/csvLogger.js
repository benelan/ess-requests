/** @module csvLogger */
import fs from 'fs'
import readline from 'readline'
import jsonexport from 'jsonexport'

/**
 * Checks to see if the new data matches the headers of an existing csv file
 * @param {string} csvHeader - the header of the new csv data
 * @param {string} filePath - the path of the csv file to check
 * @return {boolean} are the headers equal
 */
const dataContainsAllProperties = async (csvHeader, filePath) => {
  const readable = fs.createReadStream(filePath)
  const reader = readline.createInterface({ input: readable })
  const line = await new Promise((resolve) => {
    reader.on('line', (l) => {
      reader.close()
      resolve(l)
    })
  })
  readable.close()
  return (line.trim() === csvHeader.trim())
}

/**
   * receives JSON data from POST and converts it to JSON
   * Either creates a new csv file or appends data to an existing file
   * @func
   * @name logCSV
   * @param {object} data - JSON object with form data
   * @param {string} filePath - the path to the csv file
   * @return {promise}
 */
export default async (data, filePath) => new Promise((resolve, reject) => {
  // convert the request data to csv format
  jsonexport([JSON.parse(data)], (exportError, csv) => {
    if (exportError) reject(exportError)

    // check if there is a csv file
    fs.stat(filePath, async (noFile) => {
      if (noFile) { // if there is not a csv file create one and write the headers and data
        fs.writeFile(filePath, `${csv}\r\n`, (createFail) => (createFail
          ? reject(createFail)
          : resolve('csv created')))
      } else {
        // split header from data
        const noHeadersCSV = `${csv.split('\n')[1]}\r\n`
        const headerCSV = `${csv.split('\n').slice(0, 1)}`
        // check if the header matches the schema of the current csv file
        const dataMatches = dataContainsAllProperties(headerCSV, filePath)
        // append the data if the new header matches the current schema
        if (dataMatches) {
          fs.appendFile(filePath, noHeadersCSV, (appendFail) => (appendFail
            ? reject(appendFail)
            : resolve('csv appended')))
        } else {
          const noMatch = new Error('New data properties do not match the csv headers')
          reject(noMatch)
        }
      }
    })
  })
})
