import { useDispatch, useSelector } from "react-redux";
import uuid from "react-uuid";
import X from "../../../assets/X.png";
import "./index.css";
import Add from "../../../assets/AddBlack.png";
import {
  POST_SERVICE_COST,
  REMOVE_SERVICE_COST,
} from "../../../redux/actions/ticketActions";

function ServiceList() {
  const dispatch = useDispatch();
  const currentTicket = useSelector(
    (state) => state.ticketReducer.currentTicket
  );
  const currentTicketServiceCosts = useSelector(
    (state) => state.ticketReducer.currentTicketServiceCosts
  );
  return (
    <div className="ticketCosts">
      <div className="contentList">
        <div className="ticketSectionTitle">Service & Costs</div>
        <table className="serviceTable">
          <thead>
            <tr className="heading">
              <td>Service</td>
              <td>Quantity</td>
              <td>Cost</td>
              <td>Unit</td>
            </tr>
          </thead>
        </table>
        <div className="serviceListRows">
          <table className="serviceTable">
            <tbody>
              {currentTicketServiceCosts.map((serviceCost) => {
                return (
                  <tr className="serviceTableRow" key={serviceCost.billable_id}>
                    <td>
                      <input
                        className="serviceNameInput"
                        defaultValue={serviceCost.name}
                        onBlur={(text) => {
                          console.log(serviceCost);
                          dispatch({
                            type: POST_SERVICE_COST,
                            payload: {
                              ...serviceCost,
                              sow_id: serviceCost.fk_sow_id,
                              name: text.target.value,
                            },
                          });
                        }}
                      />
                    </td>
                    <td>
                      <input
                        className="serviceCostInput"
                        defaultValue={serviceCost.quantity}
                        onBlur={(text) => {
                          dispatch({
                            type: POST_SERVICE_COST,
                            payload: {
                              ...serviceCost,
                              sow_id: serviceCost.fk_sow_id,
                              quantity: text.target.value,
                            },
                          });
                        }}
                      />
                    </td>
                    <td>
                      <input
                        className="serviceCostInput"
                        defaultValue={"$ " + serviceCost.cost}
                        onBlur={(text) => {
                          dispatch({
                            type: POST_SERVICE_COST,
                            payload: {
                              ...serviceCost,
                              sow_id: serviceCost.fk_sow_id,
                              cost: text.target.value,
                            },
                          });
                        }}
                      />
                    </td>
                    <td>
                      <input
                        className="serviceUnitInput"
                        defaultValue={"CAD"}
                        onBlur={(text) => {
                          dispatch({
                            type: POST_SERVICE_COST,
                            payload: {
                              ...serviceCost,
                              sow_id: serviceCost.fk_sow_id,
                              cost: text.target.value,
                            },
                          });
                        }}
                      />
                    </td>

                    <td>
                      <div>
                        <img
                          className="delete-service"
                          src={X}
                          alt="Delete Service"
                          onClick={() => {
                            dispatch({
                              type: REMOVE_SERVICE_COST,
                              payload: {
                                billable_id: serviceCost.billable_id,
                                sow_id: serviceCost.fk_sow_id,
                              },
                            });
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div
        className="additionBar"
        onClick={() => {
          dispatch({
            type: POST_SERVICE_COST,
            payload: {
              billable_id: uuid(),
              sow_id: currentTicket.code,
              project_id: currentTicket.project_id,
              name: "New Service",
              quantity: 1,
              cost: 0,
              createdDate: new Date(),
              completedTime: null,
              billed: false,
              billedTime: null,
              createdBy: "USER-A",
            },
          });
        }}
      >
        <img className="Add" src={Add} alt="Add" />
        <div className="ticketSectionTitle">Add Service</div>
      </div>
    </div>
  );
}

export default ServiceList;
