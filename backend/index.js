import express from "express";
import bodyParser from "body-parser";
import questionRouter from "./src/routes/questionRoute.js";

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (_, res) => {
  res.send("Hello Labby!");
});

app.use("/question", questionRouter);

app.listen(port, () => {
  console.log(`Labby backend listening on port ${port}`);
});
