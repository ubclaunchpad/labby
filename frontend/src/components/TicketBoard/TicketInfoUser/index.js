import { useDispatch, useSelector } from "react-redux";
import {
    GET_ATTACHMENTS,
    GET_SERVICE_COST,
    GET_SUBTASKS,
    GET_TICKET_BOARD,
    SET_ACTIVE_TICKET,
} from "../../../redux/actions/ticketActions";
import { useEffect } from "react";
import { LOAD_EMPLOYEE } from "../../../redux/actions/userActions";
import Subtasks from "../Subtasks";
import ServiceList from "../ServiceList";
import AWS from "aws-sdk";
import { summaryFormat } from "../../../constants";

export const TicketInfoUser = () => {
    const dispatch = useDispatch();
    const currentTicket = useSelector(
        (state) => state.ticketReducer.currentTicket
    );
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
                dispatch({ type: SET_ACTIVE_TICKET, payload: null });
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
                <div className="TicketPreviewButton" onClick={async () => {
                    const config = new AWS.Config({
                        // Deprecated method of passing accessKeyId and secretAccessKey -- could not get new method to work
                        accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
                        secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
                        region: "ca-central-1",
                    });

                    AWS.config.update(config);
                    const S3 = new AWS.S3({});
                    const fileType = summaryFormat === "pdf" ? "application/pdf" : "image/png";
                    const objParams = {
                        Bucket: process.env.REACT_APP_S3_BUCKET,
                        Key: `requestSummary/${currentTicket?.task_uuid}`,
                        ResponseContentType: fileType,
                    };

                    const res = await S3.getObject(objParams).promise();
                    const url = window.URL.createObjectURL(
                        new Blob([res.Body], { type: fileType })
                    );

                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `SOW-${currentTicket.task_id}.${summaryFormat}`;
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
                                                    var link = document.createElement("a");
                                                    link.download = attachment[0].split("/")[2];
                                                    link.href = attachment[1];
                                                    link.click();
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
