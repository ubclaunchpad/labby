import defaultAxios from "axios";
import { backend } from "../../constants";

const axios = defaultAxios.create({
  baseURL: backend,
  headers: { "Content-Type": "application/json" },
});

export const getUserlist = async () => {
  try {
    const userList = await axios.get("user/");
    return userList;
  } catch (err) {
    return console.error(err);
  }
};

export const getEmployeeList = async () => {
  try {
    const userList = await axios.get("user/employee");
    return userList;
  } catch (err) {
    return console.error(err);
  }
};

export const saveUserApi = async (payload) => {
  try {
    var data = JSON.stringify({
      user_id: payload.user_id,
      organization_id: payload.fk_organization_id,
      username: payload.username,
      email: payload.email,
      employee: payload.employee,
    });

    const user = await axios.post("user/", data);

    return user;
  } catch (err) {
    return console.error(err);
  }
};

export const deleteUserApi = async (payload) => {
  try {
    const user = await axios.delete(`user/${payload.user_id}`);

    return user;
  } catch (err) {
    return console.error(err);
  }
};
