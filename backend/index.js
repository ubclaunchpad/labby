import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import questionRouter from "./src/routes/questionRoute.js";
import logicRouter from "./src/routes/logicRoute.js";
import answerRouter from "./src/routes/answerRoute.js";
import quoteRouter from "./src/routes/quoteRoute.js";
import orderRouter from "./src/routes/orderRoute.js";
import surveyRouter from "./src/routes/surveyRoute.js"

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
app.use("/answer", answerRouter);
app.use("/quote", quoteRouter);
app.use("/reorder", orderRouter);
app.use("/survey", surveyRouter);

app.listen(port, () => {
  console.log(`Labby backend listening on port ${port}`);
});

