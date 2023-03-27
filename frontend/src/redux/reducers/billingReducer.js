import { combineReducers } from "redux";
import {
  SET_BILLABLE,
  SET_INVOICE_LIST,
  SET_OG_BILLABLE,
  SET_BILLABLE_BY_SOWID
} from "../actions/billingActions";

const defaultBillingList = [];
const defaultInvoiceList = [];
const defaultBillablesBySOWID = {};

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

// reducer with map of  sowid to billables
const billablesBySOWIDMap = (state = defaultBillablesBySOWID, action) => {
  switch (action.type) {
    case SET_BILLABLE_BY_SOWID: { 
      state[action.payload.sowId] = action.payload.data;
      return {...state};
    }
    default: {
      return state; 
    }
  }
}

const billingListOG = (state = defaultBillingList, action) => {
  switch (action.type) {
    case SET_OG_BILLABLE: {
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
  billablesBySOWIDMap,
  billingListOG,
});
