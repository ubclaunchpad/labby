import { Input } from "antd";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import StrictModeDroppable from "../DragAndDrop/StrictModeDroppable";
import { useDispatch, useSelector } from "react-redux";
import {
  ASSIGN_USER,
  GET_ATTACHMENTS,
  GET_SERVICE_COST,
  GET_SUBTASKS,
  GET_TICKET_BOARD,
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
import { LOAD_EMPLOYEE } from "../../redux/actions/userActions";
import Subtasks from "./Subtasks";
import ServiceList from "./ServiceList";

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
    <Draggable draggableId={props.task.id.toString()} index={props.index}>
      {(provided, snapshot) => (
        <div
          className="task-card-container"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          key={props.task.code}
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
              <div className="task-card__code">{`SOW-${props.task.code}`}</div>
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
              return <Task key={task?.code} task={task} index={index} />;
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
  const currentTicketAttachments = useSelector(
    (state) => state.ticketReducer.currentTicketAttachments
  );

  const [assigneeAddModal, setAssigneeAddModal] = useState(false);
  const allTasks = ticketBoardDndData.tasks;
  const [sortedTasks, setSortedTasks] = useState(allTasks);
  const [filtering, setFiltering] = useState(false);
  const [filterTerm, setFilterTerm] = useState("Filter...");

  useEffect(() => {
    dispatch({ type: LOAD_EMPLOYEE });
    dispatch({ type: GET_TICKET_BOARD });
    if (currentTicket?.id) {
      dispatch({
        type: GET_SERVICE_COST,
        payload: { sow_id: currentTicket?.task_uuid },
      });
      dispatch({
        type: GET_SUBTASKS,
        payload: currentTicket?.id,
      });
      dispatch({
        type: GET_ATTACHMENTS,
        payload: { survey_id: currentTicket.fk_survey_id },
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

  // Searches for tickets that match the given search term
  function onSearchHandler(searchTerm) {
    if (searchTerm === "") {
      setSortedTasks(allTasks);
      return;
    } else {
      const filteredTasksArray = Object.entries(allTasks).filter(
        ([key, value]) => {
          const lowerCaseSearchTerm = searchTerm.toLowerCase();
          const matchedId =`SOW-${value?.id}`
            ?.toLowerCase()
            .includes(lowerCaseSearchTerm);
          const matchedDescription = value?.description
            ?.toLowerCase()
            .includes(lowerCaseSearchTerm);
          const matchedTitle = value?.title
            ?.toLowerCase()
            .includes(lowerCaseSearchTerm);
          return matchedId || matchedDescription || matchedTitle;
        }
      );
      const filteredTaskObject = Object.fromEntries(filteredTasksArray);
      setSortedTasks(filteredTaskObject);
    }
  }

  // Filter by employee Id
  function onFilterHandler(filterTerm = "Filter...") {
    if (filterTerm === "Filter...") {
      setSortedTasks(allTasks);
    } else {
      const filteredTasksArray = Object.entries(allTasks).filter(
        ([key, value]) =>
          value?.assignees
            .map((assignee) => assignee?.user_id)
            .includes(filterTerm)
      );
      const filteredTaskObject = Object.fromEntries(filteredTasksArray);
      setSortedTasks(filteredTaskObject);
    }
  }

  return (
    <div className="ticketBoardContainer">
      <div className="searchTicketSection">
        <Input
          placeholder="Search..."
          className="ticketBoardSearch"
          onChange={(e) => {
            if (e.target.value !== "") {
              setFiltering(true);
            } else {
              setFiltering(false);
            }
            onSearchHandler(e.target.value);
          }}
        />
        <select
          className="ticketBoard__filter-dropdown"
          value={filterTerm}
          onChange={(e) => {
            if (e.target.value !== "Filter...") {
              setFiltering(true);
            } else {
              setFiltering(false);
            }
            setFilterTerm(e.target.value);
            onFilterHandler(e.target.value);
          }}
        >
          <option key="filter" value="Filter...">
            Filter
          </option>

          {employeeList.map((employee) => (
            <option key={employee?.user_id} value={employee?.user_id}>
              {employee.username}
            </option>
          ))}
        </select>
      </div>
      <div className="ticketBoard">
        <DragDropContext onDragEnd={ticketDragEndHandler}>
          {ticketBoardDndData.columnOrder.map((columnId) => {
            const column = ticketBoardDndData.columns[columnId];
            var tasks = column.taskIds.map(
              (taskId) => ticketBoardDndData.tasks[taskId]
            );
            if (filtering) {
              tasks = column.taskIds
                .map((taskId) => {
                  return sortedTasks?.[taskId];
                })
                .filter(Boolean);
            }
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
              <div className="ticketTitleId">{`SOW-${currentTicket.code}`}</div>
              <div>{currentTicket.title}</div>
            </div>
            <div>
              <NavLink to={`/preview/${currentTicket.id}`}>
                <p
                  className="TicketPreviewButton"
                  style={{
                    color: "grey",
                  }}
                >
                  View Summary
                </p>
              </NavLink>
            </div>
            <div className="assignees-title">Assignees</div>
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
              <div className="ticketColumn subtasksColumn">
                <Subtasks />
                <div className="ticketAttachments">
                  <div className="ticketSectionTitle">Attachments</div>
                  <div className="attachmentsWrapper">
                    {Object.entries(currentTicketAttachments).map(
                      (attachment) => {
                        return (
                          <button
                            key={attachment[0]}
                            onClick={() => {
                              window.open(attachment[1]);
                            }}
                          >
                            {attachment[0].split("/")[2]}
                          </button>
                        );
                      }
                    )}
                    {/* <div className="addAttachment">
                      <img
                        className="Add"
                        src={Add}
                        alt="Add"
                        onClick={() => {
                          dispatch({
                            type: ADD_SUBTASKS,
                            payload: { task_id: currentTicket.code },
                          });
                        }}
                      />
                    </div>
                    <div className="addAttachment">
                      <img
                        className="Add"
                        src={Add}
                        alt="Add"
                        onClick={() => {
                          dispatch({
                            type: ADD_SUBTASKS,
                            payload: { task_id: currentTicket.code },
                          });
                        }}
                      />
                    </div>
                    <div className="addAttachment">
                      <img
                        className="Add"
                        src={Add}
                        alt="Add"
                        onClick={() => {
                          dispatch({
                            type: ADD_SUBTASKS,
                            payload: { task_id: currentTicket.code },
                          });
                        }}
                      />
                      </div> */}
                  </div>
                </div>
              </div>
              <div className="ticketColumn servicesColumn">
                <ServiceList />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
