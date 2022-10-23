import express from 'express'
import bodyParser from 'body-parser';
import questionRouter from './src/routes/questionRoute.js'
import {Database} from "./src/config/Database.js";
import * as dotenv from 'dotenv'
dotenv.config()


const app = express()
const port = 8080
const config = {
  host: process.env.RDS_HOSTNAME,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DB,
  port: process.env.RDS_PORT
}
const db = new Database(config);
db.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/', (_, res) => {
  res.send('Hello Labby!')

})

app.use('/question', questionRouter)

app.listen(port, () => {
  console.log(`Labby backend listening on port ${port}`)
})
