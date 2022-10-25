import request from "supertest";
import express from "express";
import bodyParser from "body-parser";
import questionRouter from "../src/routes/questionRoute.js";

describe("Test Question Route", function () {
  const app = new express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/", questionRouter);

  test("getQuestion", async () => {
    const res = await request(app).get("/");
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
  });

  test("postQuestion", async () => {
    const id = "ABC";
    const title = "Question Test 1";
    const payload = {
      question_id: id,
      question_title: title,
      question_type: "heading",
      question_index: 0,
    };
    const res = await request(app)
      .post("/")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
    expect(res.body);
    expect(JSON.parse(res.text)["result"]).toEqual(
      `Question ${title} Saved Successfully, Inserted ID: 0`
    );
    const deletePayload = {
      question_id: id,
    };
    const delRes = await request(app)
      .delete("/")
      .send(deletePayload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(delRes.statusCode).toBe(200);
  });
});
