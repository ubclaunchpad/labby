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

export const getBillableBySOWID = async (payload) => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`
    };
    var params = {
      sowId: payload.survey_id
    }
    console.log(`billing/${payload.survey_id}`)
    const billables = await axios.get(`billing/${payload.survey_id}`, { headers: headers });
    console.log(billables);
    return billables;
  } catch (err) {
    return console.error(err);
  }
}
