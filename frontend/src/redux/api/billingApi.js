import defaultAxios from "axios";
import { backend } from "../../constants";

const axios = defaultAxios.create({
  baseURL: backend,
  headers: { "Content-Type": "application/json" },
});

export const getBillable = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`,
    };
    const billingList = await axios.get("billing/", { headers: headers });
    
    return billingList;
  } catch (err) {
    return console.error(err);
  }
};

export const getBillableByFilter = async (payload) => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`,
    };

    var data = JSON.stringify({
      service: payload.service,
      costcenter_id: payload.costcenter_id,
      project_id: payload.project_id,
      organization_id: payload.organization_id,
      user_id: payload.user_id,
      start_date: payload.start_date,
      end_date: payload.end_date,
    });

    const billingList = await axios.post("billing/filter/", data, {
      headers: headers,
    });

    return billingList;
  } catch (err) {
    return console.error(err);
  }
};

export const saveClick = async (payload) => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`,
    };
    var data = JSON.stringify(payload);

    const clicks = await axios.post("clicks/", data, { headers: headers });

    return clicks;
  } catch (err) {
    return console.error(err);
  }
};
export const getBillableBySOWID = async (payload) => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`
    };
    const billables = await axios.get(`billing/${payload.sowId}`, { headers: headers });
    return billables;
  } catch (err) {
    return console.error(err);
  }
};