import { combineReducers } from "redux";
import { TOGGLE_LOGIC } from "../actions/uiActions";
import {SET_COST} from "../actions/costActions";


const defaultCostEstimate = true;


const costEstimateView = (state = defaultCostEstimate, action) => {
  switch (action.type) {
    case TOGGLE_LOGIC: {
      return !state;
    }
    default: {
      return state;
    }
  }
};


const defaultCostEstimateList = [];

const costEstimateList = (state = defaultCostEstimateList, action) => {
  switch (action.type) {
    case SET_COST: {
      var costIds = [];
      var finalCostEstimates = [];
      action.payload.forEach((cost) => { //costEstimates.data
        if (!costIds.includes(cost.cost_id)) {
          costIds.push(cost.cost_id);
          finalCostEstimates.push(cost);
        }
      });
      return finalCostEstimates;
    }
    default: {
      return state;
    }
  }
};

export default combineReducers({
  costEstimateView,
  costEstimateList
});

// };

// const defaultCostDataSourceData = [
//   {
//     key: "1",
//     service: "Sectioning",
//     description:
//       "Lorem ipsum dolor sit amet, et paulo voluptatum pro, erat delenit posidonium est in. Ut iisque ornatus eam, ei ",
//     internal: "$150",
//     external: "$",
//     industry: "$",
//   },
//   {
//     key: "2",
//     service: "Macrodisection",
//     description:
//       "Lorem ipsum dolor sit amet, et paulo voluptatum pro, erat delenit posidonium est in. Ut iisque ornatus eam, ei ",
//     internal: "$150",
//     external: "$",
//     industry: "$",
//   },
//   {
//     key: "3",
//     service: "Scrolling",
//     description:
//       "Lorem ipsum dolor sit amet, et paulo voluptatum pro, erat delenit posidonium est in. Ut iisque ornatus eam, ei ",
//     internal: "$150",
//     external: "$",
//     industry: "$",
//   },
// ];
