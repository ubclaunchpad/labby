import { useDispatch, useSelector } from "react-redux";
import {
    GET_ATTACHMENTS,
    GET_SERVICE_COST,
    GET_SUBTASKS,
    GET_TICKET_BOARD,
    SET_ACTIVE_USER_TICKET,
} from "../../../redux/actions/ticketActions";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { LOAD_EMPLOYEE } from "../../../redux/actions/userActions";
import Subtasks from "../Subtasks";
import ServiceList from "../ServiceList";

export const TicketInfoUser = () => {
    const dispatch = useDispatch();
    const currentTicket = useSelector(
        (state) => state.ticketReducer.currentUserTicket
    );
    console.log(currentTicket)
    const currentTicketAttachments = useSelector(
        (state) => state.ticketReducer.currentTicketAttachments
    );

    useEffect(() => {
        console.log(currentTicket)
        dispatch({ type: LOAD_EMPLOYEE });
        dispatch({ type: GET_TICKET_BOARD });
        if (currentTicket?.task_id) {
            dispatch({
                type: GET_SERVICE_COST,
                payload: { sow_id: currentTicket?.task_uuid },
            });
            dispatch({
                type: GET_SUBTASKS,
                payload: currentTicket?.task_id,
            });
            dispatch({
                type: GET_ATTACHMENTS,
                payload: { survey_id: currentTicket.fk_survey_id },
            });
        }
    }, [dispatch, currentTicket]);

    return (
        <div
            className="ticketDetailBackground"
            onClick={() => {
                dispatch({ type: SET_ACTIVE_USER_TICKET, payload: null });
            }}
        >
            <div
                className="ticketDetail"
                onClick={(event) => {
                    event.stopPropagation();
                }}
            >
                <div className="ticketTitle">
                    <div className="ticketTitleId">{`SOW-${currentTicket.task_id}`}</div>
                </div>
                <div className="TicketPreviewButton">
                    <NavLink to={`/preview/${currentTicket.fk_survey_id}`}>
                        <p
                            style={{
                                color: "grey",
                            }}
                        >
                            View Summary
                        </p>
                    </NavLink>
                </div>
                <div className="ticketDescription">
                    <div className="ticketSectionTitle">Description</div>
                    <div>
                        {currentTicket.task_description}
                    </div>
                </div>

                <div className="ticketInfo">
                    <div className="ticketColumn subtasksColumn">
                        <Subtasks readOnly />
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
                            </div>
                        </div>
                    </div>
                    <div className="ticketColumn servicesColumn">
                        <ServiceList readOnly />
                    </div>
                </div>
            </div>
        </div>
    );
};
