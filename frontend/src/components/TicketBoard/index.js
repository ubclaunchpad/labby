import { Input } from "antd";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import StrictModeDroppable from "../DragAndDrop/StrictModeDroppable";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_SUBTASKS,
  ASSIGN_USER,
  GET_SERVICE_COST,
  GET_SUBTASKS,
  GET_TICKET_BOARD,
  POST_SERVICE_COST,
  REMOVE_SERVICE_COST,
  SET_ACTIVE_TICKET,
  UNASSIGN_USER,
  UPDATE_TICKET_BOARD,
  UPDATE_TICKET_DESCRIPTION,
  UPDATE_TICKET_STATUS,
} from "../../redux/actions/ticketActions";
import "./index.css";
import { clsx } from "clsx";
// import { NotificationIcon } from "../Icons/NotifcationIcon";
import { CheckBoxIcon } from "../Icons/CheckBoxIcon";
import { AssigneeIcon } from "../Icons/AssigneeIcon";
import { ticketsColors } from "../../constants";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { appColor } from "../../constants";
import { LOAD_EMPLOYEE } from "../../redux/actions/userActions";
import uuid from "react-uuid";
import X from "../../assets/X.png";

export const getColorNum = (id, colorArray) => {
  if (colorArray) {
    let colorNum = 0;
    for (let i = 0; i < id.length; i++) {
      colorNum += id.charCodeAt(i);
    }
    const mod = colorNum % Object.keys(colorArray).length;
    return mod;
  } else {
    return 0;
  }
};

const Task = (props) => {
  const getCompletedSubtasks = (subtasks = []) => {
    const totalSubtasks = subtasks?.length;
    const completedSubtasks = subtasks
      .map((subtask) => subtask.completed)
      .filter(Boolean).length;
    return { totalSubtasks, completedSubtasks };
  };
  const subtasks = props?.task?.subtasks;
  const { totalSubtasks, completedSubtasks } = getCompletedSubtasks(subtasks);
  const assignees = props?.task?.assignees;
  const isReminder = props?.task.reminder;
  const tabColorNum = getColorNum(props?.task?.id, ticketsColors);
  const dispatch = useDispatch();
  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided, snapshot) => (
        <div
          className="task-card-container"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={() => {
            dispatch({ type: SET_ACTIVE_TICKET, payload: props.task });
          }}
        >
          <div
            style={{ background: ticketsColors[tabColorNum] }}
            className="task-card-color-tab"
          />
          <div className="task-card-content">
            <div className="task-card__header">
              <div className="task-card__code">{props.task.code}</div>
              <div
                className={clsx(
                  isReminder && "task-card__reminder--notify-true",
                  !isReminder && "task-card__reminder--notify-false"
                )}
              >
                {/* <div className="task-card__notificaton-container">
                  <NotificationIcon
                    color={isReminder ? "#FFFFFF" : "#000000"}
                    className="notification-icon"
                    width={25}
                    height={20}
                  />
                </div> */}
              </div>
            </div>
            <div className="task-card__body">
              <div className="task-card__title">{props.task.title}</div>
            </div>
            <div className="task-card__footer">
              {completedSubtasks > 0 && (
                <div className="task-card__subtasks-container">
                  <CheckBoxIcon
                    className={"task-card__subtask-checkbox"}
                    checkColor={"#E4E5EA"}
                    boxColor={"#FFFFFF"}
                    width={14}
                    height={14}
                  />
                  <div className="task-card__subtasks-completed-text">{`${completedSubtasks} / ${totalSubtasks} `}</div>
                </div>
              )}
              <div className="task-card__assignees-container-parent">
                {assignees.map((assignee) => {
                  const colorNumberMod = getColorNum(
                    assignee.user_id,
                    ticketsColors
                  );
                  const assigneeColor = ticketsColors[colorNumberMod];
                  const assigneeInitials = `${assignee.username[0].toUpperCase()}`;
                  return (
                    <div
                      key={assignee.user_id}
                      className="task-card__assignees-container"
                    >
                      <AssigneeIcon
                        shapeColor={assigneeColor}
                        textColor={"white"}
                        className="task-card__assignee-container"
                        label={assigneeInitials}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

const TicketBoardColumn = (props) => {
  return (
    <div className="column">
      <div className="columnTitle">{props.column.title}</div>
      <StrictModeDroppable droppableId={props.column.id}>
        {(provided) => (
          <div
            className="taskList"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {props.tasks.map((task, index) => {
              return <Task key={task.id} task={task} index={index} />;
            })}
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
    </div>
  );
};

export const TicketBoard = () => {
  const dispatch = useDispatch();
  const ticketBoardDndData = useSelector(
    (state) => state.ticketReducer.ticketBoardDndData
  );
  const currentTicket = useSelector(
    (state) => state.ticketReducer.currentTicket
  );
  const employeeList = useSelector((state) => state.userReducer.employeeList);
  const currentTicketServiceCosts = useSelector(
    (state) => state.ticketReducer.currentTicketServiceCosts
  );
  const currentTicketSubtasks = useSelector(
    (state) => state.ticketReducer.currentTicketSubtasks
  );

  const [assigneeAddModal, setAssigneeAddModal] = useState(false);

  useEffect(() => {
    dispatch({ type: LOAD_EMPLOYEE });
    dispatch({ type: GET_TICKET_BOARD });
    if (currentTicket?.id) {
      dispatch({
        type: GET_SERVICE_COST,
        payload: { sow_id: currentTicket?.id },
      });
      dispatch({
        type: GET_SUBTASKS,
        payload: currentTicket?.id,
      });
    }
  }, [dispatch, currentTicket]);

  const ticketDragEndHandler = (result) => {
    const { destination, source, draggableId } = result;
    const droppedOutside = !destination;
    const droppedOnSamePlace =
      destination &&
      destination.droppableId === source.droppableId &&
      destination.index === source.index;
    if (droppedOutside || droppedOnSamePlace) {
      return;
    }
    console.log(`
          Task dropped 
          Dragged Task ID:${draggableId}. 
          source-id:${source.droppableId}.
          source-position:${source.index}.
          destination-id:${destination.droppableId}.
          destination-position:${destination.index}.
      `);
    const sourceColumn = ticketBoardDndData.columns[source.droppableId];
    const destColumn = ticketBoardDndData.columns[destination.droppableId];
    if (sourceColumn === destColumn) {
      const newSourceTaskIds = Array.from(sourceColumn.taskIds);
      newSourceTaskIds.splice(source.index, 1);
      newSourceTaskIds.splice(destination.index, 0, draggableId);
      const newSourceColumn = {
        ...sourceColumn,
        taskIds: newSourceTaskIds,
      };
      const newData = {
        ...ticketBoardDndData,
        columns: {
          ...ticketBoardDndData.columns,
          [newSourceColumn.id]: newSourceColumn,
        },
      };
      dispatch({ type: UPDATE_TICKET_BOARD, payload: newData });
      return;
    }
    //move tasks between columns
    const newSourceTaskIds = Array.from(sourceColumn.taskIds);
    newSourceTaskIds.splice(source.index, 1);
    const newSourceColumn = {
      ...sourceColumn,
      taskIds: newSourceTaskIds,
    };
    const newDestTaskIds = Array.from(destColumn.taskIds);
    newDestTaskIds.splice(destination.index, 0, draggableId);
    const newDestColumn = {
      ...destColumn,
      taskIds: newDestTaskIds,
    };
    const newData = {
      ...ticketBoardDndData,
      columns: {
        ...ticketBoardDndData.columns,
        [sourceColumn.id]: newSourceColumn,
        [destColumn.id]: newDestColumn,
      },
    };
    dispatch({ type: UPDATE_TICKET_BOARD, payload: newData });
    dispatch({
      type: UPDATE_TICKET_STATUS,
      payload: { ticketId: draggableId, status: destColumn.id },
    });
  };

  return (
    <div className="ticketBoardContainer">
      <div className="searchTicketSection">
        <Input placeholder="Search..." className="ticketBoardSearch" />
        <select
          className="ticketBoardDropdown"
          value="Filter..."
          onChange={() => {}}
        >
          <option value="Filter..." disabled>
            Filter
          </option>
          <option value="sectioning">Sectioning</option>
          <option value="macrodisection">Macrodisection</option>
          <option value="scrolling">Scrolling</option>
        </select>
      </div>
      <div className="ticketBoard">
        <DragDropContext onDragEnd={ticketDragEndHandler}>
          {ticketBoardDndData.columnOrder.map((columnId) => {
            const column = ticketBoardDndData.columns[columnId];
            const tasks = column.taskIds.map(
              (taskId) => ticketBoardDndData.tasks[taskId]
            );
            return (
              <TicketBoardColumn key={columnId} column={column} tasks={tasks} />
            );
          })}
        </DragDropContext>
      </div>
      {currentTicket ? (
        <div
          className="ticketDetailBackground"
          onClick={() => {
            if (assigneeAddModal) {
              setAssigneeAddModal(false);
            } else {
              dispatch({ type: SET_ACTIVE_TICKET, payload: null });
            }
          }}
        >
          <div
            className="ticketDetail"
            onClick={(event) => {
              setAssigneeAddModal(false);
              event.stopPropagation();
            }}
          >
            <div className="ticketTitle">
              <div className="ticketTitleId">{currentTicket.code}</div>
              <div>{currentTicket.title}</div>
              <div className="ticketPreview">
                <NavLink to={`/preview/${currentTicket.id}`}>
                  <button
                    className="FormPreviewButton"
                    style={{
                      backgroundColor: appColor.primaryLight,
                      color: appColor.white,
                    }}
                    >
                    Preview
                  </button>
                </NavLink>                  
              </div>
            </div>
            <div className="ticketTags">
              {currentTicket.assignees.map((assignee) => {
                const colorNumberMod = getColorNum(
                  assignee.user_id,
                  ticketsColors
                );
                const assigneeColor = ticketsColors[colorNumberMod];
                const assigneeInitials = `${assignee.username[0].toUpperCase()}`;
                return (
                  <div
                    key={assignee.user_id}
                    className="task-card__assignees-container"
                    onClick={() => {
                      dispatch({
                        type: UNASSIGN_USER,
                        payload: { assignment_id: assignee.assignment_id },
                      });
                    }}
                  >
                    <AssigneeIcon
                      shapeColor={assigneeColor}
                      textColor={"white"}
                      className="task-card__assignee-container"
                      label={assigneeInitials}
                    />
                  </div>
                );
              })}
              <div
                key={"newAssignee"}
                className="task-card__assignees-container"
                onClick={(event) => {
                  event.stopPropagation();
                  setAssigneeAddModal(true);
                }}
              >
                <AssigneeIcon className="task-card__assignee-container" empty />
                {assigneeAddModal ? (
                  <div className="assigneeAddModal">
                    <div className="ticketSectionTitle">Add Members</div>
                    <div className="newMemberView">
                      {employeeList.map((assignee) => {
                        const colorNumberMod = getColorNum(
                          assignee.user_id,
                          ticketsColors
                        );
                        const assigneeColor = ticketsColors[colorNumberMod];
                        const assigneeInitials = `${assignee.username[0].toUpperCase()}`;
                        return (
                          <div
                            key={assignee.user_id}
                            className="task-card__assignees-container"
                            onClick={() => {
                              dispatch({
                                type: ASSIGN_USER,
                                payload: {
                                  assignment_id:
                                    assignee.user_id + currentTicket.code,
                                  user_id: assignee.user_id,
                                  task_id: currentTicket.code,
                                },
                              });
                            }}
                          >
                            <AssigneeIcon
                              shapeColor={assigneeColor}
                              textColor={"white"}
                              className="task-card__assignee-container"
                              label={assigneeInitials}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="ticketDescription">
              <div className="ticketSectionTitle">Description</div>
              <Input.TextArea
                placeholder="Type here..."
                rows={5}
                className="ticketDescriptionInput"
                defaultValue={currentTicket.description}
                onBlur={(e) => {
                  dispatch({
                    type: UPDATE_TICKET_DESCRIPTION,
                    payload: {
                      ticketId: currentTicket.code,
                      description: e.target.value,
                    },
                  });
                }}
              />
            </div>
            <div className="ticketInfo">
              <div className="ticketColumn">
                <div className="ticketSubtasks">
                  <div className="contentList">
                    <div className="ticketSectionTitle">Subtasks</div>
                    <div className="contentListRows">
                    {currentTicketSubtasks.map((subtasks) => {
                      return (
                        <div
                          className="serviceCostRow"
                          key={subtasks.subtask_id}
                        >
                          <div className="inputContainer">
                            <div className="serviceCostQuantity">
                              {subtasks.subtask_title}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    </div>
                  </div>
                  <div className="additionBar">
                    <div
                      className="ticketSectionTitle"
                      onClick={() => {
                        dispatch({
                          type: ADD_SUBTASKS,
                          payload: { task_id: currentTicket.code },
                        });
                      }}
                    >
                      Add Subtask
                    </div>
                  </div>
                </div>
                <div className="ticketAttachments">
                  <div className="contentList">
                    <div className="ticketSectionTitle">Attachments</div>
                  </div>
                </div>
              </div>
              <div className="ticketColumn">
                <div className="ticketCosts">
                  <div className="contentList">
                    <div className="ticketSectionTitle">Service & Costs</div>
                    <div className="contentListRows">
                    {currentTicketServiceCosts.map((serviceCost) => {
                      return (
                        <div
                          className="serviceCostRow"
                          key={serviceCost.billable_id}
                        >
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
                          <div className="inputContainer">
                            <div className="serviceCostQuantity">#</div>
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
                          </div>
                          <div className="inputContainer">
                            <div className="serviceCostCost">$</div>
                            <input
                              className="serviceCostInput"
                              defaultValue={serviceCost.cost}
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
                          </div>
                          <div className="deleteItem">
                            <img
                              className="download-icon-delete"
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
                        </div>
                      );
                    })}
                    </div>
                  </div>
                  <div className="additionBar">
                    <div
                      className="ticketSectionTitle"
                      onClick={() => {
                        dispatch({
                          type: POST_SERVICE_COST,
                          payload: {
                            billable_id: uuid(),
                            sow_id: currentTicket.code,
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
                      Add Service
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
