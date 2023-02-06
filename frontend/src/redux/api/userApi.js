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

export const saveUserApi = async (payload) => { // TODO: update this to use hash
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
    const user = await axios.delete(`user/${payload.user_id}`);

    return user;
  } catch (err) {
    return console.error(err);
  }
};

export const getOrganizationApi = async () => {
  try {
    const organizationList = await axios.get("organization/");
    return organizationList;
  } catch (err) {
    return console.error(err);
  }
};

export const postOrganizationApi = async (payload) => {
  try {
    var data = JSON.stringify({
      organization_id: payload.organization_id,
      organization_name: payload.organization_name,
      organization_contact: payload.organization_contact,
      organization_email: payload.organization_email,
      organization_address: payload.organization_address,
      organization_type: payload.organization_type,
      internal_department: payload.internal_department,
    });

    const organization = await axios.post("organization/", data);

    return organization;
  } catch (err) {
    return console.error(err);
  }
}

export const deleteOrganizationApi = async (payload) => {
  try {
    const org = await axios.delete(`organization/${payload}`);

    return org;
  } catch (err) {
    return console.error(err);
  }
};

export const clearAssignmentApi = async (payload) => {
  try {
    const assignment = await axios.delete(`project/assignment/${payload}`);

    return assignment;
  } catch (err) {
    return console.error(err);
  }
}

export const addAssignmentApi = async (payload) => {
  try {
    var data = JSON.stringify({
      project_id: payload.project_id,
      organization_id: payload.organization_id,
      assignment_id: payload.assignment_id,
    });

    const assignment = await axios.post("project/assignment/", data);

    return assignment;
  } catch (err) {
    return console.error(err);
  }
}

export const authenticateUserApi = async (payload) => {
  try {
    var data = JSON.stringify({
      username: payload.username,
      password: payload.password
    });

    const user = await axios.get("user/login", data);

    return user;
  } catch (err) {
    return console.error(err);
  }

}
