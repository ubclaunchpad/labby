import express from 'express'
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv'
dotenv.config()
import mysql from 'mysql'
import questionRouter from './src/routes/questionRoute.js'

const app = express()
const port = 8080
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: process.env.RDS_HOSTNAME,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  port: process.env.RDS_PORT
});

app.get('/', (_, res) => {
  res.send('Hello Labby!')
  connection.connect(function(err) {
    if (err) {
      console.error('Database connection failed: ' + err.stack);
      return;
    }

    console.log('Connected to database.');
  });
  connection.end();
})

app.use('/question', questionRouter)

app.listen(port, () => {
  console.log(`Labby backend listening on port ${port}`)
})