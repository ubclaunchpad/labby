import { combineReducers } from "redux";
import { SET_BILLABLE, 
         SET_INVOICE_LIST, 
         SET_OG_BILLABLE, 
         SET_ACTIVE_ANALYTICS, 
         SET_ACTIVE_PROJECT_ANALYTICS,
         SET_ACTIVE_SOW_ANALYTICS,
         SET_BILLABLE_BY_SOWID
        } from "../actions/billingActions";

const defaultBillingList = [];
const defaultInvoiceList = [];
const defaultServiceAnalytics = false;
const defaultProjectAnalytics = false;
const defaultSowAnalytics = false;
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

const servicesAnalytics = (state = defaultServiceAnalytics, action) => {
  switch (action.type) {
    case SET_ACTIVE_ANALYTICS: {
      return !state;
    }
    default: {
      return state;
    }
  }
};

const projectsAnalytics = (state = defaultProjectAnalytics, action) => {
  switch (action.type) {
    case SET_ACTIVE_PROJECT_ANALYTICS: {
      return !state;
    }
    default: {
      return state;
    }
  }
};

const sowAnalytics = (state = defaultSowAnalytics, action) => {
  switch (action.type) {
    case SET_ACTIVE_SOW_ANALYTICS: {
      return !state;
    }
    default: {
      return state;
    }
  }
};

export default combineReducers({
  billingList,
  billablesBySOWIDMap,
  billingListOG,
  servicesAnalytics,
  projectsAnalytics,
  sowAnalytics,
  invoiceList
});
