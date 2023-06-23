import { Input } from "antd";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import StrictModeDroppable from "../DragAndDrop/StrictModeDroppable";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_ATTACHMENTS,
  GET_SERVICE_COST,
  GET_SUBTASKS,
  GET_TICKET_BOARD,
  SET_ACTIVE_TICKET,
  UPDATE_TICKET_BOARD,
  UPDATE_TICKET_STATUS,
} from "../../redux/actions/ticketActions";
import "./index.css";
import { clsx } from "clsx";
// import { NotificationIcon } from "../Icons/NotifcationIcon";
import { CheckBoxIcon } from "../Icons/CheckBoxIcon";
import { AssigneeIcon } from "../Icons/AssigneeIcon";
import { appColor, ticketsColors } from "../../constants";
import { useEffect, useState } from "react";
import { LOAD_EMPLOYEE } from "../../redux/actions/userActions";
import { TicketInfo } from "./TicketInfo";
import { NavLink } from "react-router-dom";
import ToastContainer from "../Toasts/ToastContainer";

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
  const isReminder = props?.task?.reminder;
  const tabColorNum = getColorNum(props?.task?.id, ticketsColors);
  const dispatch = useDispatch();
  return (
    <Draggable draggableId={props.task.task_uuid.toString()} index={props.index}>
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
            {props.tasks.sort((task1, task2) => new Date(task1.last_updated).getTime() - new Date(task2.last_updated).getTime()).map((task, index) => {
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
          const matchedId = `SOW-${value?.id}`
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
        <div className="searchArea">
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
        <div className="pendingArea">
          <NavLink to="/pending">
            <button
              className="PendingViewButton"
              style={{
                backgroundColor: appColor.lightGray,
                color: appColor.gray,
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#627BF6";
                e.target.style.color = "#FFFFFF";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = appColor.lightGray;
                e.target.style.color = appColor.gray;
              }}
            >
              Unsubmitted
            </button>
          </NavLink>
        </div>
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
      {currentTicket ? (<TicketInfo />) : null}
      <ToastContainer />
    </div>
  );
};
