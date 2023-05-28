import { Router } from "express";
import authorize from "../auth/authorize.js";
import UserController from "../controllers/userController.js";
import jwt from "jsonwebtoken";

const router = Router();
const userController = new UserController();

router.post("/login", (req, res) => {
  userController
    .authenticateUser(req)
    .then((response) => {
      const token = jwt.sign(
        {
          userid: response.user_id,
          email: response.email,
          role: response.employee ? "Admin" : "User",
        },
        process.env.JWT_SECRET,
        {
          algorithm: "HS256",
          expiresIn: "12h",
        }
      );
      res.status(200).json({
        user_id: response.user_id,
        organization_id: response.fk_organization_id,
        username: response.username,
        email: response.email,
        employee: response.employee,
        token: token,
      });
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.get("/pingcheck", authorize(), (_, res) => {
  res.status(200).json({ message: "pong" });
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

router.get("/pending", authorize(), (_, res) => {
  userController
    .getPendingUsers()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.get("/employee", authorize(), (_, res) => {
  userController
    .getEmployee()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.get("/:userId", authorize(), (req, res) => {
  userController
    .getOneUserByID(req.params.userId)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.delete("/:userId", authorize(), (req, res) => {
  userController
    .deleteUser(req.params.userId)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.post("/approve", authorize(), (req, res) => {
  if (!req.body || !req.body.users) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  userController
    .approveUser(req.body.users)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
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
