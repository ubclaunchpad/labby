import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import Add from "../../../assets/AddBlack.png";
import {
  ADD_SUBTASKS,
  SET_ACTIVE_TICKET
} from "../../../redux/actions/ticketActions";
import { useEffect, useState } from "react";

function Subtasks({ readOnly }) {
  const dispatch = useDispatch();
  const ticketBoardData = useSelector(
    (state) => state.ticketReducer.ticketBoardDndData
  );
  const currentTicket = useSelector(
    (state) => state.ticketReducer.currentTicket
  );
  const currentTicketSubtasks = useSelector(
    (state) => state.ticketReducer.currentTicketSubtasks
  );
  const allTasks = ticketBoardData.tasks;
  const [isSubtask, setIsSubtask] = useState(false);

  useEffect(() => {
    setIsSubtask(currentTicketSubtasks.some((subtask) => subtask.subtask_uuid === currentTicket.task_uuid));
  }, [currentTicketSubtasks, currentTicket]);

  return (
    <div
      className="ticketSubtasks"
      style={{ borderRadius: (isSubtask || readOnly) ? 10 : null }}
    >
      <div className="ticketSubtasksContainer">
        <div className="contentList">
          <div className="ticketSectionTitle">{isSubtask ? "Related Subtasks" : "Subtasks"}</div>
          <div className="subtaskCostRows">
            {currentTicketSubtasks.map((subtasks) => {
              if (subtasks.subtask_uuid === currentTicket.task_uuid) {
                return null;
              }
              return (
                <div
                  className="subtaskCostRow"
                  key={subtasks.subtask_id}
                  onClick={() => {
                    const subtaskTaskData = allTasks[subtasks?.subtask_uuid];
                    dispatch({
                      type: SET_ACTIVE_TICKET,
                      payload: subtaskTaskData,
                    });
                  }}
                >
                  <div className="subtaskInputContainer">
                    <span className="subtasksStateLabel">
                      {subtasks.subtask_state.toUpperCase()}
                    </span>
                    <span className="subtasksLabel">
                      {subtasks.subtask_title}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {(!readOnly && !isSubtask) ? (
          <div
            className="additionBar"
            onClick={() => {
              dispatch({
                type: ADD_SUBTASKS,
                payload: { task_id: currentTicket.code },
              });
            }}
          >
            <img className="Add" src={Add} alt="Add" />
            <div className="ticketSectionTitle">Add Subtask</div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Subtasks;
