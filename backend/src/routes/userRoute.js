import { Router } from "express";
import authorize from "../auth/authorize.js";
import UserController from "../controllers/userController.js";
import jwt from "jsonwebtoken";
import req from "express/lib/request.js";

const router = Router();
const userController = new UserController();

router.get("/login", (_, res) => {
  userController
      .authenticateUser(req)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(404).json(err);
      });
});

router.get("/", authorize(), (_, res) => {
  userController
    .getUser()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.post("/authenticate", (_, res) => {
  const user = {
    username: "harin",
  };
  const token = jwt.sign(
    { userid: user.username, role: "Admin" },
    process.env.JWT_SECRET,
    {
      algorithm: "HS256",
      expiresIn: "24h",
    }
  );
  res.status(200).json({
    ...user,
    token: token,
  });
});

router.get("/employee", (_, res) => {
  userController
    .getEmployee()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.delete("/:userId", (req, res) => {
  userController
    .deleteUser(req.params.userId)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.post("/", (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  userController
    .saveUser(req)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json(err);
    });
});

export default router;
