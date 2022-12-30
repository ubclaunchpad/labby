import defaultAxios from "axios";
import { backend } from "../../constants";

const axios = defaultAxios.create({
  baseURL: backend,
  headers: { "Content-Type": "application/json" },
});

export const getBillable = async () => {
  try {
    const billingList = await axios.get("billing/");

    return billingList;
  } catch (err) {
    return console.error(err);
  }
};
