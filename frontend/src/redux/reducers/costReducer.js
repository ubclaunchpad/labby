import { combineReducers } from "redux";
import { ADD_SERVICE } from "../actions/costActions";

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
    default:
      return state;
  }
};

export default combineReducers({ costTableServices });
