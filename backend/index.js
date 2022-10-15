import express from 'express'
import * as dotenv from 'dotenv'
dotenv.config()
import mysql from 'mysql'


const app = express()
const port = 3000


const connection = mysql.createConnection({
  host: process.env.RDS_HOSTNAME,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  port: process.env.RDS_PORT
});



app.get('/', (req, res) => {
  res.send('Hello World!')
  connection.connect(function(err) {
    if (err) {
      console.error('Database connection failed: ' + err.stack);
      return;
    }

    console.log('Connected to database.');
  });
  connection.end();
})

app.listen(port, () => {
  console.log(`Labby backend listening on port ${port}`)
})