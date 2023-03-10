import defaultAxios from "axios";
import { backend } from "../../constants";

const axios = defaultAxios.create({
  baseURL: backend,
  headers: { "Content-Type": "application/json" },
});

export const getUserlist = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`,
    };
    const userList = await axios.get("user/", {
      headers: headers,
    });
    return userList;
  } catch (err) {
    return console.error(err);
  }
};

export const getPendingUserlist = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`,
    };
    const userList = await axios.get("user/pending/", {
      headers: headers,
    });
    return userList;
  } catch (err) {
    return console.error(err);
  }
};

export const approveUserList = async (payload) => {
  try {

    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`,
    };
    var data = JSON.stringify({
      users: payload.users,
    });

    console.log(data);

    const approve = await axios.post("user/approve/", data, {
      headers: headers,
    });

    return approve;
  } catch (err) {
    return console.error(err);
  }
};

export const getEmployeeList = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`,
    };
    const userList = await axios.get("user/employee", {
      headers: headers,
    });
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
      password: payload.password,
    });

    const user = await axios.post("user/", data);

    return user;
  } catch (err) {
    return console.error(err);
  }
};

export const deleteUserApi = async (payload) => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`,
    };
    const user = await axios.delete(`user/${payload.user_id}`, {
      headers: headers,
    });

    return user;
  } catch (err) {
    return console.error(err);
  }
};

export const getOrganizationApi = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`,
    };
    const organizationList = await axios.get("organization/", {
      headers: headers,
    });
    return organizationList;
  } catch (err) {
    return console.error(err);
  }
};

export const postOrganizationApi = async (payload) => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`,
    };
    var data = JSON.stringify({
      organization_id: payload.organization_id,
      organization_name: payload.organization_name,
      organization_contact: payload.organization_contact,
      organization_email: payload.organization_email,
      organization_address: payload.organization_address,
      organization_type: payload.organization_type,
      internal_department: payload.internal_department,
    });

    const organization = await axios.post("organization/", data, {
      headers: headers,
    });

    return organization;
  } catch (err) {
    return console.error(err);
  }
};

export const deleteOrganizationApi = async (payload) => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`,
    };
    const org = await axios.delete(`organization/${payload}`, {
      headers: headers,
    });

    return org;
  } catch (err) {
    return console.error(err);
  }
};

export const clearAssignmentApi = async (payload) => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`,
    };
    const assignment = await axios.delete(`project/assignment/${payload}`, {
      headers: headers,
    });

    return assignment;
  } catch (err) {
    return console.error(err);
  }
};

export const addAssignmentApi = async (payload) => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`,
    };
    var data = JSON.stringify({
      project_id: payload.project_id,
      organization_id: payload.organization_id,
      assignment_id: payload.assignment_id,
    });

    const assignment = await axios.post("project/assignment/", data, {
      headers: headers,
    });

    return assignment;
  } catch (err) {
    return console.error(err);
  }
};

export const authenticateUserApi = async (payload) => {
  try {
    var data = JSON.stringify({
      email: payload.email,
      password: payload.password,
    });

    const user = await axios.post("user/login", data);

    return user;
  } catch (err) {
    return console.error(err);
  }
};

export const pingCheckApi = async (payload) => {
  try {
    var headers = {
      Authorization: `Bearer ${payload.token}`,
    };

    const user = await axios.get("user/pingcheck", { headers: headers });

    return user;
  } catch (err) {
    return err;
  }
};
