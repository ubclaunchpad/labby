import { combineReducers } from "redux";
import { SET_ALL_COST } from "../actions/costActions";

const defaultCostDataSourceData = [
  {
    key: "1",
    service: "Sectioning",
    description: "Lorem ipsum dolor sit amet",
    internal: "$150",
    external: "$",
    industry: "$",
  },
  {
    key: "2",
    service: "Macrodisection",
    description: "Lorem ipsum dolor sit amet",
    internal: "$150",
    external: "$",
    industry: "$",
  },
  {
    key: "3",
    service: "Scrolling",
    description: "Lorem ipsum dolor sit amet",
    internal: "$150",
    external: "$",
    industry: "$",
  },
];

const costTableServices = (state = defaultCostDataSourceData, action) => {
  switch (action.type) {
    case SET_ALL_COST: {
      var pricingMap = new Map();
      action.payload.forEach((item) => {
        if (pricingMap.has(item.fk_answer_id)) {
          let price = pricingMap.get(item.fk_answer_id);
          pricingMap.set(item.fk_answer_id, {
            ...price,
            idMap: {
              internal:
                item.price_category === "Internal"
                  ? item.cost_id
                  : price.idMap.internal,
              external:
                item.price_category === "External"
                  ? item.cost_id
                  : price.idMap.external,
              industry:
                item.price_category === "Industry"
                  ? item.cost_id
                  : price.idMap.industry,
            },
            internal:
              item.price_category === "Internal"
                ? `$${item.cost}`
                : price.internal,
            external:
              item.price_category === "External"
                ? `$${item.cost}`
                : price.external,
            industry:
              item.price_category === "Industry"
                ? `$${item.cost}`
                : price.industry,
          });
        } else {
          pricingMap.set(item.fk_answer_id, {
            key: item.fk_answer_id,
            service: item.answer,
            description: item.question,
            idMap: {
              internal: item.price_category === "Internal" ? item.cost_id : "",
              external: item.price_category === "External" ? item.cost_id : "",
              industry: item.price_category === "Industry" ? item.cost_id : "",
            },
            internal:
              item.price_category === "Internal" ? `$${item.cost}` : "$0",
            external:
              item.price_category === "External" ? `$${item.cost}` : "$0",
            industry:
              item.price_category === "Industry" ? `$${item.cost}` : "$0",
          });
        }
      });
      return Array.from(pricingMap.values());
    }
    default:
      return state;
  }
};

export default combineReducers({ costTableServices });
