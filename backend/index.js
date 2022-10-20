import express from 'express'
import bodyParser from 'body-parser';
import questionRouter from './src/routes/questionRoute.js'
import {Database} from "./src/config/Database.js";


const app = express()
const port = 8080
const db = new Database();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/', (_, res) => {
  res.send('Hello Labby!')
  if (!db.isConnected()) {
    db.connect();
  }

})

app.use('/question', questionRouter)

app.listen(port, () => {
  console.log(`Labby backend listening on port ${port}`)
})
