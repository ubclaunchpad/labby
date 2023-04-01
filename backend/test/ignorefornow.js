// import request from "supertest";
// import express from "express";
// import bodyParser from "body-parser";
// import quoteRouter from "../src/routes/quoteRoute.js";

// describe("Test Quote Route", function () {
//     const app = new express();
//     app.use(bodyParser.json());
//     app.use(bodyParser.urlencoded({ extended: true }));
//     app.use("/", quoteRouter);
  
//     test("getQuote", async () => {
//       const res = await request(app).get("/");
//       expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
//       expect(res.statusCode).toBe(200);
//     });
  
//     test("postQuote", async () => {
//       const costId = 123;
//       const answerId = 321;
//       const quantifiable = 1;
//       const orgType = "External";
//       const payload = {
//         cost_id: costId,
//         cost: 2,
//         answer_id: answerId,
//         org_type: orgType,
//         quantifiable: quantifiable, 
//         unit: "CAD",
//       };

//       const res = await request(app)
//         .post("/")
//         .send(payload)
//         .set("Content-Type", "application/json")
//         .set("Accept", "application/json");
//       expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
//       expect(res.statusCode).toBe(200);
//       expect(res.body);
//       expect(JSON.parse(res.text)["result"]).toEqual(
//         `Cost of ${payload.cost} Saved Successfully for Answer ID: ${payload.answer_id}, Inserted ID: ${payload.cost_id}`
//       );
    

//       const delRes = await request(app)
//         .delete(`/${answerId}`)
//         .set("Content-Type", "application/json")
//         .set("Accept", "application/json");
//       expect(delRes.statusCode).toBe(200);

//       const updatePayload = {
//           answer_id: answerId,
//           quantifiable: quantifiable,
//       }
  
//       const updateRes = await request(app)
//       .post("/updateQuantifiable")
//       .send(updatePayload)
//       .set("Content-Type", "application/json")
//       .set("Accept", "application/json");
//       expect(updateRes.statusCode).toBe(200);


//       const quotePayload = {
//         reponses: [321, 111], 
//         org_type: orgType,
//       }

//       const getQuoteRes = await request(app)
//       .post("/getQuote")
//       .send(quotePayload)
//       .set("Content-Type", "application/json")
//       .set("Accept", "application/json");
//       expect(getQuoteRes.statusCode).toBe(200);
//     });

//   });
  
