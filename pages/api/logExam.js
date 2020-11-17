// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
var fs = require('fs');
const jsonexport = require('jsonexport');
var path = require('path')

export default (req, res) => {

  var filePath = path.resolve('./public', 'data', 'exam_logs.csv');

  try {
    jsonexport([JSON.parse(req.body)], function (err, csv) {
      if (err) return console.error(err);
      console.log(csv);

      fs.stat(filePath, function (err, stat) {
        if (err == null) {
          const noHeadersCSV = csv.split('\n').pop() + "\r\n";
          fs.appendFile(filePath, noHeadersCSV, function (err) {
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
        else {
          fs.writeFile(filePath, csv + "\r\n", function (err) {
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