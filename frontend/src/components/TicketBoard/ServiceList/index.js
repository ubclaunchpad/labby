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
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  return (
    <div className="ticketCosts">
      <div className="contentList">
        <div className="ticketSectionTitle">Service & Costs</div>
        <div className="serviceTableHeader">
          <div className="serviceTableCol serviceTableColHeading">Service</div>
          <div className="serviceTableCol serviceTableColHeading">Quantity</div>
          <div className="serviceTableCol serviceTableColHeading">Cost ($)</div>
          <div className="deleteServiceSpace"></div>
        </div>
        <div className="serviceListRows">
          {currentTicketServiceCosts.map((serviceCost) => {
            return (
              <div key={serviceCost.billable_id} className="parentServiceRow">
                <div className="serviceTableRow">
                  <input
                    className="serviceNameInput"
                    defaultValue={serviceCost.name}
                    onBlur={(text) => {
                      console.log(serviceCost);
                      dispatch({
                        type: POST_SERVICE_COST,
                        payload: {
                          ...serviceCost,
                          sow_id: serviceCost.task_uuid,
                          name: text.target.value,
                        },
                      });
                    }}
                  />
                  <input
                    className="serviceCostInput"
                    defaultValue={serviceCost.quantity}
                    onBlur={(text) => {
                      dispatch({
                        type: POST_SERVICE_COST,
                        payload: {
                          ...serviceCost,
                          sow_id: serviceCost.task_uuid,
                          quantity: text.target.value,
                        },
                      });
                    }}
                  />
                  <input
                    className="serviceCostInput"
                    defaultValue={serviceCost.cost}
                    onBlur={(text) => {
                      dispatch({
                        type: POST_SERVICE_COST,
                        payload: {
                          ...serviceCost,
                          sow_id: serviceCost.task_uuid,
                          cost: text.target.value,
                        },
                      });
                    }}
                  />

                  <div>
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
                              sow_id: serviceCost.task_uuid,
                            },
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <input
                      className="serviceCommentInput"
                      defaultValue={serviceCost.comment ?? ""}
                      placeholder="Comment"
                      onBlur={(text) => {
                        dispatch({
                          type: POST_SERVICE_COST,
                          payload: {
                            ...serviceCost,
                            sow_id: serviceCost.task_uuid,
                            comment: text.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div
        className="additionBar"
        onClick={() => {
          dispatch({
            type: POST_SERVICE_COST,
            payload: {
              billable_id: uuid(),
              sow_id: currentTicket.task_uuid,
              fk_project_id: currentTicket.project_id,
              name: "New Service",
              quantity: 1,
              cost: 0,
              comment: "",
              createdDate: new Date(),
              completedTime: null,
              billed: false,
              billedTime: null,
              created_by: currentUser.user_id,
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
