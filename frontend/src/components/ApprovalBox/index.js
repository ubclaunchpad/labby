import "./index.css";
import { appColor } from "../../constants";
import AcceptUser from "../../assets/AcceptUser.png";
import RejectUser from "../../assets/RejectUser.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  APPROVE_ALL_USER,
  DELETE_USER,
  GET_PENDING_USER,
} from "../../redux/actions/userActions";

function ApprovalBox() {
  const dispatch = useDispatch();
  const pendingUserList = useSelector(
    (state) => state.userReducer.pendingUserList
  );

  useEffect(() => {
    dispatch({ type: GET_PENDING_USER });
  }, [dispatch]);

  if (pendingUserList.length === 0) return null;

  return (
    <div className="approvalBox">
      <div className="approveAllBox">
        <div className="approveAllBoxTitleContainer">
          <div className="approveAllBoxTitle"> You have </div>
          <div className="approveAllBoxTitle" style={{ fontWeight: "600" }}>
            {pendingUserList.length}
          </div>
          <div className="approveAllBoxTitle"> Pending Accounts</div>
          <button
            className="approveAllButton"
            style={{
              backgroundColor: appColor.primaryLight,
              color: appColor.white,
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = appColor.primary;
              e.target.style.color = "#FFFFFF";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = appColor.primaryLight;
              e.target.style.color = appColor.white;
            }}
            onClick={() => {
              dispatch({
                type: APPROVE_ALL_USER,
                payload: pendingUserList,
              });
            }}
          >
            Approve All
          </button>
        </div>
      </div>
      <div className="seperatorLine"></div>
      <div className="userListBox">
        <div className="userSectionRowItem">
          <div className="userSectionHeader">
            <div className="userListItem40 userListItemTitle">Name</div>
            <div className="userListItem userListItemTitle">Email</div>
            <div className="userListIcons" />
            <div className="userListIcons" />
          </div>
          <div className="userListDivider" />
        </div>
        {pendingUserList.map((item) => (
          <div className="userSectionRowItem" key={item.user_id}>
            <div className="userSectionHeader">
              <div className="userListItem40">{item.username}</div>
              <div className="userListItem">{item.email}</div>
              <img
                className="userListIcons"
                src={AcceptUser}
                alt="Accept"
                onClick={() => {
                  dispatch({
                    type: APPROVE_ALL_USER,
                    payload: [item],
                  });
                }}
              />
              <img
                className="userListIcons"
                src={RejectUser}
                alt="Reject"
                onClick={() => {
                  dispatch({
                    type: DELETE_USER,
                    payload: { user_id: item.user_id },
                  });
                }}
              />
            </div>
            <div className="userListDivider" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ApprovalBox;
