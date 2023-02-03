import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import e from "express";

export default class UserController {

  getUser() {
    return new Promise((resolve, reject) => {
      const UserModel = new User();

      UserModel.getUser((err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }

  getEmployee() {
    return new Promise((resolve, reject) => {
      const UserModel = new User();

      UserModel.getEmployee((err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }

  deleteUser(id) {
    return new Promise((resolve, reject) => {
      const UserModel = new User();

      UserModel.deleteUser(id, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }

  saveUser(req) {
    return new Promise((resolve, reject) => {
      const UserModel = new User();
      const hashPassword = "";
  
        bcrypt.hash(plaintextPassword, 10, function(err, hash) { // generates salt and hashes password
          if (err) {
            console.log({ error: err });
            reject(err);
          }
          hashPassword = hash;
          });


      const user = {
        user_id: req.body.user_id,
        organization_id: req.body.organization_id,
        username: req.body.username,
        email: req.body.email,
        employee: req.body.employee,
        hash: hashPassword,
      };

      UserModel.insertUser(user, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }
}