import express from 'express';
import multer from 'multer';
import csv from 'fast-csv';
import fs from 'fs';
import { db } from '../server.js'

fs.readdir('uploads', (err) => {
  if(err) {
    console.log('There is no uploads folder. gonna create');
    fs.mkdirSync('uploads');
  }
})
const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, 'uploads/');
  },
  filename(req, file, callback) {
    callback(null, file.originalname)
  },
  fileFilter(req, file, callback) {
    if(file.mimetype !== "text/yaml" || file.mimetype !== "text/x-yaml") {
      callback(new Error('Forbidden File type'));
    } else {
      callback(null, true);
    }
  }
});
const upload = multer({ storage });
const router = express.Router();
// csv 파싱해서 mysql에 넣기
const importCsvData2MySQL = (filePath) => {
  let stream = fs.createReadStream(filePath);
  let csvData = [];
  let csvStream = csv
      .parse()
      .on("data", (data) => {
          csvData.push(data);
      })
      .on("end", () => {
      // Remove Header ROW
      csvData.shift();
      // Open the MySQL connection
      let query = 'INSERT INTO stock (stock_id, stock_no, stock_pno, stock_name, stock_desc, stock_qty, stock_location, stock_price, stock_buy_at, stock_buy_in, stock_buy_by, stock_receipt, stock_url, stock_created_by, stock_created_at, stock_status, categoryId, brandId) VALUES ?';
      db.query(query, [csvData], (err, result) => {
      if(err) {
          console.log({ error: err });
      }
      if(result) {
      res.send(result)
      } else {
      res.send({ message: "Fail to update stock" });
      }
      });
    // delete file after saving to MySQL database
    // -> you can comment the statement to see the uploaded CSV file.
    fs.unlinkSync(filePath)
      });
  stream.pipe(csvStream);
}

router.post('/', upload.single('file'), (req,res) => {
  importCsvData2MySQL('uploads/' + req.file.filename);
  res.status(201).send({ file : req.file });
})

export default router;
/*   db.query(
    'LOAD DATA LOCAL INFILE "uploads\\" INTO TABLE stock 
    FIELDS TERMINATE BY ','
    LINES TERMINATE  BY '\n'
    IGNORE i LINES
    (stock_no, stock_pno, stock_name, stock_desc, stock_qty, stock_location, stock_price, stock_buy_at, stock_buy_in, stock_buy_by, stock_receipt,stock_url, stock_created_by, stock_created_at, stock_status, categoryId, brandId)
    SET stock_buy_at=STR_TO_DATE, stock_created_at=STR_TO_DATE(@datevar, '%m/%d/%y')'
 */