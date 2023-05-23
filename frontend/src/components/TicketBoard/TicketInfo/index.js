import { Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
    ASSIGN_USER,
    DELETE_VIEW_SUMMARY,
    GET_ATTACHMENTS,
    GET_SERVICE_COST,
    GET_SUBTASKS,
    GET_TICKET_BOARD,
    SET_ACTIVE_TICKET,
    UNASSIGN_USER,
    UPDATE_TICKET_DESCRIPTION,
    UPDATE_TICKET_STATUS,
    UPDATE_TICKET_TITLE,
} from "../../../redux/actions/ticketActions";
import { AssigneeIcon } from "../../Icons/AssigneeIcon";
import { ticketsColors } from "../../../constants";
import { useEffect, useState } from "react";
import { LOAD_EMPLOYEE } from "../../../redux/actions/userActions";
import Subtasks from "../Subtasks";
import ServiceList from "../ServiceList";
import { SuccessToast } from "../../Toasts";
import AWS from "aws-sdk";

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

export const TicketInfo = () => {
    const dispatch = useDispatch();
    const currentTicket = useSelector(
        (state) => state.ticketReducer.currentTicket
    );
    const currentTicketSubtasks = useSelector(
        (state) => state.ticketReducer.currentTicketSubtasks
    );
    const employeeList = useSelector((state) => state.userReducer.employeeList);
    const currentTicketAttachments = useSelector(
        (state) => state.ticketReducer.currentTicketAttachments
    );

    const [assigneeAddModal, setAssigneeAddModal] = useState(false);

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

    return (
        <div
            className="ticketDetailBackground"
            onClick={() => {
                if (assigneeAddModal) {
                    setAssigneeAddModal(false);
                } else {
                    const inputs = document.querySelectorAll("input");
                    for (let i = 0; i < inputs.length; i++) {
                        inputs[i].blur();
                    }
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
                    <input
                        className="ticketTitleText"
                        defaultValue={currentTicket.title}
                        onBlur={(e) => {
                            dispatch({
                                type: UPDATE_TICKET_TITLE,
                                payload: {
                                    ticketId: currentTicket.task_uuid,
                                    title: e.target.value,
                                },
                            });
                        }}
                    />
                </div>
                <div className="TicketPreviewButton" onClick={async () => {
                    const config = new AWS.Config({
                        // Deprecated method of passing accessKeyId and secretAccessKey -- could not get new method to work
                        accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
                        secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
                        region: "ca-central-1",
                    });

                    AWS.config.update(config);
                    const S3 = new AWS.S3({});
                    const objParams = {
                        Bucket: process.env.REACT_APP_S3_BUCKET,
                        Key: `requestSummary/${currentTicket?.task_uuid}`,
                        ResponseContentType: "image/png",
                    };

                    const res = await S3.getObject(objParams).promise();
                    const url = window.URL.createObjectURL(
                        new Blob([res.Body], { type: "image/png" })
                    );

                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `SOW-${currentTicket.code}.png`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }}>
                    <p
                        style={{
                            color: "#5976E1",
                        }}
                    >
                        Download Summary
                    </p>
                </div>
                <div className="TicketArchiveButton">
                    <p style={{ color: "red" }}
                        onClick={() => {
                            currentTicketSubtasks.forEach((subtask) => {
                                if (subtask.subtask_uuid) {
                                    dispatch({
                                        type: UPDATE_TICKET_STATUS,
                                        payload: { ticketId: subtask.subtask_uuid, status: "archived" },
                                    });
                                }
                            });
                            dispatch({
                                type: UPDATE_TICKET_STATUS,
                                payload: { ticketId: currentTicket.task_uuid, status: "archived" },
                            });
                            dispatch({
                                type: DELETE_VIEW_SUMMARY,
                                payload: { ticket_id: currentTicket?.task_uuid },
                            })
                            dispatch({ type: SET_ACTIVE_TICKET, payload: null });
                            SuccessToast("Ticket Archived!");
                        }}
                    >
                        Archive Ticket
                    </p>
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
                                                                assignee.user_id + currentTicket.task_uuid,
                                                            user_id: assignee.user_id,
                                                            task_id: currentTicket.task_uuid,
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
                                    ticketId: currentTicket.task_uuid,
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
                            payload: { task_id: currentTicket.task_uuid },
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
                            payload: { task_id: currentTicket.task_uuid },
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
                            payload: { task_id: currentTicket.task_uuid },
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
    );
};
