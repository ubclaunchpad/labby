import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import Add from "../../../assets/AddBlack.png";
import {
  ADD_SUBTASKS,
  SET_ACTIVE_TICKET
} from "../../../redux/actions/ticketActions";

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
  return (
    <div
      className="ticketSubtasks"
      style={{ borderRadius: readOnly ? 10 : null }}
    >
      <div className="ticketSubtasksContainer">
        <div className="contentList">
          <div className="ticketSectionTitle">Subtasks</div>
          <div className="subtaskCostRows">
            {currentTicketSubtasks.map((subtasks) => {
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
                    <span className="subtasksLabel">
                      {subtasks.subtask_title}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {!readOnly ? (
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
