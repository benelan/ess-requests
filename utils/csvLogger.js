import fs from 'fs'
import jsonexport from 'jsonexport'

export default async (res, req, filePath) => {
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

    // convert the request body to csv format
    jsonexport([JSON.parse(req.body)], function (exportError, csv) {
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