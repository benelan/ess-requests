// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
var fs = require('fs');
var json2csv = require('json2csv');


export default (req, res) => {
  var newLine = "\r\n";
  var fields = ['Employee Name','Employee Email','Employee Number','Employee Location','Cost Center','Charge Code','Course Name','Cost','Start Date','End Date','Vendor','Justification','Comments'];

  var toCsv = {
    data: req.body,
    fields: fields,
    hasCSVColumnTitle: false
  };

  fs.stat('/data/instructor_logs.csv', function (err, stat) {
    if (err == null) {
      //write the actual data and end with newline
      var csv = json2csv(toCsv) + newLine;

      fs.appendFile('/data/instructor_logs.csv', csv, function (err) {
        if (err) {
          res.statusCode = 400
          res.json({ success: false })
          throw err;
        }

        res.statusCode = 200
        res.json({ success: true })
      });
    }
    else {
      //write the headers and newline
      fields = (fields + newLine);

      fs.writeFile('/data/instructor_logs.csv', fields, function (err) {
        if (err) {
          res.statusCode = 400
          res.json({ success: false })
          throw err;
        }

        res.statusCode = 200
        res.json({ success: true })
      });
    }
  });
}
