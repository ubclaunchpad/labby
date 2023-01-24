import { combineReducers } from "redux";
import { SET_BILLABLE, SET_INVOICE_LIST } from "../actions/billingActions";

const defaultBillingList = [];
const defaultInvoiceList = [];

const billingList = (state = defaultBillingList, action) => {
  switch (action.type) {
    case SET_BILLABLE: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

const invoiceList = (state = defaultInvoiceList, action) => {
  switch (action.type) {
    case SET_INVOICE_LIST: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export default combineReducers({
  billingList,
  invoiceList,
});
