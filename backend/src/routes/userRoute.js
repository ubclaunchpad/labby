import { Router } from "express";
import authorize from "../auth/authorize.js";
import UserController from "../controllers/userController.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const router = Router();
const userController = new UserController();
const OTPMap = new Map();
const OTPExpiry = new Map();

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

router.post("/forgot", (req, res) => {
  // Clear Expired OTP
  OTPExpiry.forEach((value, key) => {
    if (value < new Date().getTime()) {
      OTPMap.delete(key);
      OTPExpiry.delete(key);
    }
  });

  // Generate a OTP Code
  const OTP = Math.floor(100000 + Math.random() * 900000);
  const expiryTime = new Date().getTime() + 5 * 60 * 1000;

  // Store OTP Code for 5 minutes
  OTPMap.set(OTP, req.body.email);
  OTPExpiry.set(OTP, expiryTime);

  // Send Email to User with OTP Code
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.MY_EMAIL,
    to: req.body.email,
    subject: 'Labby Password Reset',
    html: `<html>
             <body>
               <h2>Password Recovery</h2>
               <p>Use this code to reset your password. Code is valid for 5 minute</p>
               <h3>${process.env.FRONTEND + "reset-password/" + OTP}</h3>
             </body>
           </html>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send({ message: "An error occurred while sending the email" });
    } else {
      console.log('Email sent: ' + info.response);
      console.log(OTPMap);
      res.status(200).send({ message: "Email sent successfully" });
    }
  });
});

router.post("/resetpassword", (req, res) => {
  // Check if OTP Code is valid
  const OTP = Number(req.body.otp);
  if (OTPExpiry.has(OTP) && OTPMap.has(OTP) && OTPExpiry.get(OTP) > new Date().getTime()) {
    // Reset Password
    userController
      .updateUserPassword(req, OTPMap.get(OTP))
      .then((response) => {
        OTPMap.delete(OTP);
        OTPExpiry.delete(OTP);
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  } else {
    res.status(400).send({ message: "OTP Code is invalid or expired" });
  }
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
  if (!req.body && !req.body.user_id && !req.body.email && !req.body.password) {
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

router.put("/", authorize(), (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  userController
    .updateUser(req)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json(err);
    });
});

export default router;
