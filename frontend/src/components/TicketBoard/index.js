import { Input } from "antd";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import StrictModeDroppable from "../DragAndDrop/StrictModeDroppable";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_TICKET_BOARD,
  SET_ACTIVE_TICKET,
  UPDATE_TICKET_BOARD,
  UPDATE_TICKET_STATUS,
} from "../../redux/actions/ticketActions";
import "./index.css";
import { useEffect } from "react";

const Task = (props) => {
  const dispatch = useDispatch();
  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided, snapshot) => (
        <div
          className="task"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={() => {
            dispatch({ type: SET_ACTIVE_TICKET, payload: props.task });
          }}
        >
          {props.task.code}
          <br />
          {props.task.title}
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

  useEffect(() => {
    dispatch({ type: GET_TICKET_BOARD });
  }, [dispatch]);

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
    //move  tasks between columns
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
            dispatch({ type: SET_ACTIVE_TICKET, payload: null });
          }}
        >
          <div className="ticketDetail">
            <div className="ticketTitle">
              <div className="ticketTitleId">{currentTicket.code}</div>
              <div>{currentTicket.title}</div>
            </div>
            <div className="ticketTags">
              Assignees
            </div>
            <div className="ticketDescription">
              <div>Description</div>
              <div>Type here...</div>
            </div>
            <div className="ticketInfo">
              <div className="ticketColumn">
                <div className="ticketSubtasks">
                  Subtasks
                </div>
                <div className="ticketAttachments">
                  Attachments
                </div>
              </div>
              <div className="ticketColumn">
                <div className="ticketCosts">
                  Service & Costs
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
