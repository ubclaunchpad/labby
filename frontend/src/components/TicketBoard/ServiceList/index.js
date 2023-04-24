import { useDispatch, useSelector } from "react-redux";
import uuid from "react-uuid";
import X from "../../../assets/X.png";
import "./index.css";
import Add from "../../../assets/AddBlack.png";
import {
  POST_SERVICE_COST,
  REMOVE_SERVICE_COST,
} from "../../../redux/actions/ticketActions";
import { SuccessToast } from "../../Toasts";
import { ToastContainer } from "react-toastify";

function ServiceList({ readOnly }) {
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
                      if (!readOnly) {
                        dispatch({
                          type: POST_SERVICE_COST,
                          payload: {
                            ...serviceCost,
                            sow_id: serviceCost.task_uuid,
                            name: text.target.value,
                          },
                        });
                        SuccessToast("Service Modification Saved!");
                      }
                    }}
                  />
                  <input
                    className="serviceCostInput"
                    defaultValue={serviceCost.quantity}
                    onBlur={(text) => {
                      if (!readOnly) {
                        dispatch({
                          type: POST_SERVICE_COST,
                          payload: {
                            ...serviceCost,
                            sow_id: serviceCost.task_uuid,
                            quantity: text.target.value,
                          },
                        });
                        SuccessToast("Service Modification Saved!");
                      }
                    }}
                  />
                  <input
                    className="serviceCostInput"
                    defaultValue={serviceCost.cost}
                    onBlur={(text) => {
                      if (!readOnly) {
                        dispatch({
                          type: POST_SERVICE_COST,
                          payload: {
                            ...serviceCost,
                            sow_id: serviceCost.task_uuid,
                            cost: text.target.value,
                          },
                        });
                        SuccessToast("Service Modification Saved!");
                      }
                    }}
                  />

                  <div>
                    <div>
                      <img
                        className="delete-service"
                        src={X}
                        alt="Delete Service"
                        onClick={() => {
                          if (!readOnly) {
                            dispatch({
                              type: REMOVE_SERVICE_COST,
                              payload: {
                                billable_id: serviceCost.billable_id,
                                sow_id: serviceCost.task_uuid,
                              },
                            });
                            SuccessToast("Service Removed!");
                          }
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
                        if (!readOnly) {
                          dispatch({
                            type: POST_SERVICE_COST,
                            payload: {
                              ...serviceCost,
                              sow_id: serviceCost.task_uuid,
                              comment: text.target.value,
                            },
                          });
                          SuccessToast("Service Modification Saved!");
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {!readOnly ? <div
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
          SuccessToast("Service Created!");
        }}
      >
        <img className="Add" src={Add} alt="Add" />
        <div className="ticketSectionTitle">Add Service</div>
      </div> : null}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default ServiceList;
