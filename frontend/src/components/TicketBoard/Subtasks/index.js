import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import Add from "../../../assets/AddBlack.png";
import Rectangle from "../../../assets/Rectangle.png";
import { ADD_SUBTASKS } from "../../../redux/actions/ticketActions";

function Subtasks() {
  const dispatch = useDispatch();
  const currentTicket = useSelector(
    (state) => state.ticketReducer.currentTicket
  );
  const currentTicketSubtasks = useSelector(
    (state) => state.ticketReducer.currentTicketSubtasks
  );
  return (
    <div className="ticketSubtasks">
      <div className="ticketSubtasksContainer">
        <div className="contentList">
          <div className="ticketSectionTitle">Subtasks</div>
          <div className="subtaskCostRows">
            {currentTicketSubtasks.map((subtasks) => {
              return (
                <div className="subtaskCostRow" key={subtasks.subtask_id}>
                  <div className="subtaskInputContainer">
                    <img
                      className="Rectangle"
                      src={Rectangle}
                      alt="Rectangle"
                    />
                    <div>{subtasks.subtask_title}</div>
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
              type: ADD_SUBTASKS,
              payload: { task_id: currentTicket.code },
            });
          }}
        >
          <img className="Add" src={Add} alt="Add" />
          <div className="ticketSectionTitle">Add Subtask</div>
        </div>
      </div>
    </div>
  );
}

export default Subtasks;
