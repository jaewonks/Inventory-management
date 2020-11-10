const mysql = require('mysql');
const connection = mysql.createConnection({
  host : 'localhost',
  user: 'root',
  password: 'Kk052614..',
  database: 'Inventory_system'
})
connection.connect();

/* const sql = 'SELECT * FROM brand';
connection.query(sql, (err, rows, fields) => {
  if(err) {
    console.log(err);
  } else {
    for(let i=0; i<rows.length; i++) {
      console.log(rows[i].brand_name);
    }
  }
}); */

connection.end();