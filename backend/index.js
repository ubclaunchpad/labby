import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import questionRouter from "./src/routes/questionRoute.js";
import billingRouter from "./src/routes/billingRoute.js";
import logicRouter from "./src/routes/logicRoute.js";
import answerRouter from "./src/routes/answerRoute.js";
import quoteRouter from "./src/routes/quoteRoute.js";
import orderRouter from "./src/routes/orderRoute.js";
import surveyRouter from "./src/routes/surveyRoute.js";
import formRouter from "./src/routes/formRoute.js";
import taskRouter from "./src/routes/taskRoute.js";
import organizationRouter from "./src/routes/organizationRoute.js";
import assignmentRouter from "./src/routes/assignmentRoute.js";
import userRouter from "./src/routes/userRoute.js";
import projectRouter from "./src/routes/projectRoute.js";

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (_, res) => {
  res.send("Hello Labby!");
});

app.use("/question", questionRouter);
app.use("/billing", billingRouter);
app.use("/logic", logicRouter);
app.use("/answer", answerRouter);
app.use("/quote", quoteRouter);
app.use("/reorder", orderRouter);
app.use("/survey", surveyRouter);
app.use("/form", formRouter);
app.use("/task", taskRouter);
app.use("/organization", organizationRouter);
app.use("/assignment", assignmentRouter);
app.use("/user", userRouter);
app.use("/project", projectRouter);

app.listen(port, () => {
  console.log(`Labby backend listening on port ${port}`);
});
