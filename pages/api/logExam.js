var fs = require('fs');
const jsonexport = require('jsonexport');
var path = require('path')

export default (req, res) => {
  // get path to csv
  var filePath = path.resolve('./data', 'exam_logs.csv');

  try {
    // convert the request body to csv format
    jsonexport([JSON.parse(req.body)], function (err, csv) {
      if (err) return console.error(err);

      // check if there is a csv file
      fs.stat(filePath, function (err, stat) {
        // if there is a csv file
        if (err == null) {
          // remove the header line from the converted csv data
          const noHeadersCSV = csv.split('\n').pop() + "\r\n";
          // append the data to the csv file
          fs.appendFile(filePath, noHeadersCSV, function (err) {
            // send response to client
            if (err) {
              console.log(err);
              res.statusCode = 500
              res.json({ response: err })
              return res.end()
            }
            else {
              res.statusCode = 200
              res.json({ response: 'success' })
              return res.end()
            }
          });
        }
        // if there is not a csv file
        else {
          // create one and write the headers and data
          fs.writeFile(filePath, csv + "\r\n", function (err) {
            // send response to client
            if (err) {
              console.log(err);
              res.statusCode = 500
              res.json({ response: err })
              return res.end()
            }
            else {
              res.statusCode = 200
              res.json({ response: 'success' })
              return res.end()
            }
          });
        }
      });

    });
  } catch (err) {
    console.error(err);
  }
}