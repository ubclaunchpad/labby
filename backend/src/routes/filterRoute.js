// import { Router } from "express";
// import FilterController from "../controllers/filterController.js";

// const router = Router();
// const filterController = new FilterController();

// router.post("/", (req, res) => {
//   if (!req.body) {
//     res.status(400).send({
//       message: "Content can not be empty!",
//     });
//     return;
//   }
//   filterController
//     .saveForm(req)
//     .then((response) => {
//       res.status(200).json(response);
//     })
//     .catch((err) => {
//       res.status(404).json(err);
//     });
// });

// router.get("/", (_, res) => {
//   filterController
//     .loadForm()
//     .then((response) => {
//       res.status(200).json(response);
//     })
//     .catch((err) => {
//       res.status(404).json(err);
//     });
// });


// export default router;
