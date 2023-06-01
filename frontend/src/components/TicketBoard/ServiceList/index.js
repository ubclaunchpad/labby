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
import { Button, Divider, Input, Select, Space } from "antd";
import { useEffect, useState } from "react";
import { LOAD_ALL_COST } from "../../../redux/actions/costActions";
import { GET_PROJECT } from "../../../redux/actions/billingActions";
import ToastContainer from "../../Toasts/ToastContainer";

function ServiceList({ readOnly }) {
  const dispatch = useDispatch();
  const currentTicket = useSelector(
    (state) => state.ticketReducer.currentTicket
  );
  const currentTicketServiceCosts = useSelector(
    (state) => state.ticketReducer.currentTicketServiceCosts
  );
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const billables = useSelector(
    (state) => state.costReducer.costTableServices
  );
  const projectList = useSelector((state) => state.projectReducer.projectList);

  // Use the projectList to determine the customer type (Not most efficient, but it works)
  let customerType = "external";
  const projects = projectList.filter((item) => (item.project_id === currentTicket.project_id));
  if (projects.length > 0) {
    const costCenters = projects[0].costcenter;
    if (costCenters.length > 0) {
      const costCenter = costCenters[0];
      if (costCenter.cost_center_type) {
        customerType = costCenter.cost_center_type.toLowerCase();
      }
    }
  }

  const [newService, setNewService] = useState('');
  const [tempEntry, setTempEntry] = useState([]);

  useEffect(() => {
    dispatch({ type: LOAD_ALL_COST });
    dispatch({ type: GET_PROJECT });
  }, [dispatch]);

  return (
    <div className="ticketCosts">
      <div className="serviceContentList">
        <div className="ticketSectionTitle">Service & Costs</div>
        <div className="serviceTableHeader">
          <div className="serviceTableColHeading">Service</div>
          <div className="serviceTableColHeading">Quantity</div>
          <div className="serviceTableColHeading">Unit Cost</div>
          <div className="deleteServiceSpace" />
        </div>
        <div className="serviceListRows">
          {currentTicketServiceCosts.map((serviceCost) => {
            return (
              <div key={serviceCost.billable_id} className="parentServiceRow">
                <div className="serviceTableRow">
                  <div className="serviceEntryValueRow">
                    <div className="serviceInputBox">
                      <Select
                        className="serviceNameInputSelect"
                        showSearch
                        defaultValue={serviceCost.name}
                        showArrow={false}
                        bordered={false}
                        disabled={readOnly}
                        style={{ width: "90%", marginRight: "10%", textAlign: "left", color: '#666666' }}
                        placeholder="Select a Service"
                        onSelect={(text) => {
                          if (!readOnly) {
                            const billMatch = billables.filter((item) => item.service === text);
                            if (billMatch.length > 0) {
                              dispatch({
                                type: POST_SERVICE_COST,
                                payload: {
                                  ...serviceCost,
                                  sow_id: serviceCost.task_uuid,
                                  cost: billMatch[0][customerType].substring(1),
                                  name: text,
                                },
                              });
                            } else {
                              dispatch({
                                type: POST_SERVICE_COST,
                                payload: {
                                  ...serviceCost,
                                  sow_id: serviceCost.task_uuid,
                                  name: text,
                                },
                              });
                            }
                            SuccessToast("Service Name Saved!");
                          }
                        }}
                        dropdownRender={(menu) => (
                          <>
                            {menu}
                            <Divider style={{ margin: '8px 0' }} />
                            <Space style={{ padding: '0 8px 4px' }}>
                              <Input
                                placeholder="Custom..."
                                value={newService}
                                onChange={(e) => {
                                  setNewService(e.target.value)
                                }}
                              />
                              <Button type="text" onClick={() => {
                                setTempEntry([{ key: newService, service: newService }])
                                setNewService('')
                              }}>
                                Add item
                              </Button>
                            </Space>
                          </>
                        )}
                        options={billables.concat(tempEntry).map((item) => ({ label: item.service, value: item.service }))}
                      />
                    </div>
                    <input
                      className="serviceInputBox"
                      defaultValue={serviceCost.quantity}
                      disabled={readOnly}
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
                          SuccessToast("Service Quantity Saved!");
                        }
                      }}
                    />
                    <input
                      key={serviceCost.billable_id + serviceCost.cost}
                      className="serviceInputBox"
                      defaultValue={serviceCost.cost}
                      disabled={readOnly}
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
                          SuccessToast("Service Cost Saved!");
                        }
                      }}
                    />
                  </div>

                  <div className="deleteServiceSpace">
                    {!readOnly ?
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
                          SuccessToast("Service Removed!");
                        }}
                      /> : null}
                  </div>
                </div>
                <div>
                  {!readOnly ?
                    <input
                      className="serviceCommentInput"
                      defaultValue={serviceCost.comment ?? ""}
                      placeholder="Add Comment..."
                      onBlur={(text) => {
                        dispatch({
                          type: POST_SERVICE_COST,
                          payload: {
                            ...serviceCost,
                            sow_id: serviceCost.task_uuid,
                            comment: text.target.value,
                          },
                        });
                        SuccessToast("Service Modification Saved!");
                      }}
                    /> : null}
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
      <ToastContainer />
    </div>
  );
}

export default ServiceList;
