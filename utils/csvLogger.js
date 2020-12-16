/** @module csvLogger */
import fs from 'fs'
import jsonexport from 'jsonexport'

/**
   * receives JSON data from POST and converts it to JSON
   * Either creates a new csv file or appends data to an existing file
   * @func
   * @param {object} res - REST response
   * @param {object} data - JSON object with form data
   * @param {string} filePath - the path to the csv file
   * @return {promise}
 */
export default async (res, data, filePath) => {
  return new Promise(resolve => {
    // handles successful response
    function successful() {
      res.statusCode = 200
      res.json({ response: 'logging successful' })
      return resolve()
    }

    // handles failed response
    function fail(failureError) {
      console.error(failureError)
      res.statusCode = 500
      res.json({ response: failureError })
      return resolve()
    }

    // convert the request data to csv format
    jsonexport([JSON.parse(data)], function (exportError, csv) {
      if (exportError) fail(exportError)

      // check if there is a csv file
      fs.stat(filePath, function (noFile) {
        if (noFile) {  // if there is not a csv file create one and write the headers and data
          fs.writeFile(filePath, csv + "\r\n", (createFail) => createFail ? fail(createFail) : successful())
        }
        else {  // if there is a csv file remove the header and append the data
          const noHeadersCSV = csv.split('\n').pop() + "\r\n"
          fs.appendFile(filePath, noHeadersCSV, (appendFail) => appendFail ? fail(appendFail) : successful())
        }
      })
    })
  })
}