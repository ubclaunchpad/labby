import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import questionRouter from "./src/routes/questionRoute.js";
import logicRouter from "./src/routes/logicRoute.js";

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.get("/", (_, res) => {
  res.send("Hello Labby!");
});

app.use("/question", questionRouter);
app.use("/logic", logicRouter);

app.listen(port, () => {
  console.log(`Labby backend listening on port ${port}`);
});
