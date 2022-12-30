import { combineReducers } from "redux";
import {
  ADD_SERVICE,
  DELETE_SERVICE,
  SAVE_CELL_DATA,
} from "../actions/costActions";

const defaultCostDataSourceData = [
  {
    key: "1",
    service: "Sectioning",
    description:
      "Lorem ipsum dolor sit amet, et paulo voluptatum pro, erat delenit posidonium est in. Ut iisque ornatus eam, ei ",
    internal: "$150",
    external: "$",
    industry: "$",
  },
  {
    key: "2",
    service: "Macrodisection",
    description:
      "Lorem ipsum dolor sit amet, et paulo voluptatum pro, erat delenit posidonium est in. Ut iisque ornatus eam, ei ",
    internal: "$150",
    external: "$",
    industry: "$",
  },
  {
    key: "3",
    service: "Scrolling",
    description:
      "Lorem ipsum dolor sit amet, et paulo voluptatum pro, erat delenit posidonium est in. Ut iisque ornatus eam, ei ",
    internal: "$150",
    external: "$",
    industry: "$",
  },
];

const costTableServices = (state = defaultCostDataSourceData, action) => {
  switch (action.type) {
    case ADD_SERVICE: {
      state.push(action.payload);
      return [...state];
    }
    case DELETE_SERVICE: {
      return action.payload;
    }
    case SAVE_CELL_DATA:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({ costTableServices });
