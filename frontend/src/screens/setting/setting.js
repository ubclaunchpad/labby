import "./setting.css";
import { useDispatch, useSelector } from "react-redux";
import {
  LOAD_USERLIST,
  SET_CURRENT_USER,
} from "../../redux/actions/userActions";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { appColor } from "../../constants";
import { startOfQuarter } from "date-fns";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useForm } from "react-hook-form";
import { AssigneeIcon } from "../../components/Icons/AssigneeIcon";

function Setting() {
  const dispatch = useDispatch();
  const handleSignout = (e) => {
    e.preventDefault();
    localStorage.removeItem("currentUser");
    dispatch({
      type: SET_CURRENT_USER,
      payload: null,
    });
  };

  const onSubmit = (e) => {
    console.log(e.target.value);
  };

  const currentUser = useSelector((state) => state.userReducer.currentUser);
  // console.log(currentUser);

  const userList = useSelector((state) => state?.userReducer?.userList);
  // const usersData = useSelector((state) => state?.userReducer?.userList);
  const [userSettings, setUserSettings] = useState("");

  // Move this to constants:
  const userFieldLabels = {
    firstName: "First Name",
    lastName: "Last Name",
    username: "User Name",
    email: "Email",
    bio: "Bio Statement ",
    role: "Role",
  };

  const userRoles = {
    lab_assistant: "Lab Assistant",
  };

  // Move this to constants:
  const userFieldEditable = {
    firstName: false,
    lastName: false,
    username: true,
    email: false,
    bio: true,
    role: false,
  };

  const fakeUserSettings = {
    username: "Miyato9232",
    firstName: "Miyato",
    lastName: "Kurachenova",
    email: "Mknova@gmail.com",
    bio: "I am half russian, half japanese",
    role: "lab_assistant",
  };

  const fakeCustomerSettings = {
    firstName: "Sakura",
    lastName: "Yamamotonova",
    email: "Synova@gmail.com",
    phoneNumber: "7782345801",
    costCenter: "metroville",
    role: "customer",
  };

  const SettingsPopup = ({ field, onChange, userSettings }) => {
    // const currentUser = useSelector((state) => state.userReducer.currentUser);
    const currentUser = fakeUserSettings;
    const [mutateUser, setMutateUser] = useState({});
    const [settingsInput, setSettingsInput] = useState(currentUser[field]);
    return (
      <Popup
        trigger={
          <button
            className="settings-info__edit-button"
            onClick={() => {
              console.log("Clicked Button", field);
            }}
          >
            Edit {">"}
          </button>
        }
        modal
      >
        {(close) => (
          <div className="settings-popup__container">
            <div className="settings-popup__title">{`Edit ${userFieldLabels[field]}`}</div>
            <label className="settings-popup__label">
              {userFieldLabels[field]}
              <input
                className="settings-popup__input"
                type="text"
                name="field"
                value={settingsInput}
                // defaultValue={mutateUser[field]}
                onChange={(e) => {
                  let tempUserSettings = { ...currentUser };
                  tempUserSettings[field] = e.target.value;
                  setSettingsInput(e.target.value);
                  setMutateUser(tempUserSettings);
                }}
              />
            </label>
            <div className="settings-popup__button-row">
              <button
                className="settings-popup__cancel"
                onClick={() => {
                  setSettingsInput(currentUser[field]);
                  setMutateUser({});
                  close();
                }}
              >
                Cancel
              </button>
              <button
                className="settings-popup__submit"
                onClick={() => {
                  if (mutateUser === {}) {
                    // Should make button greyed out if this is the case.
                    return;
                  } else {
                    console.log(mutateUser);
                  }
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        )}
      </Popup>
    );
  };

  const UserSettingsInfo = ({ settings }) => {
    const array = Object.entries(settings);
    // console.log(array);
    return array.map(([field, value]) => {
      // Need a way to determine if value is editable
      const editable = userFieldEditable[field];
      return (
        <div className="settings-info__row" key={field}>
          <div className="settings-info__display-values">
            <div className="settings-info__title">{userFieldLabels[field]}</div>
            <div className="settings-info__value">
              <div>{field !== "role" ? value : userRoles[value]}</div>
              {editable && <SettingsPopup field={field} />}
            </div>
          </div>

          {editable && <div className="settings-info__edit-row"></div>}
          <hr className="settings-info-rule"></hr>
        </div>
      );
    });
  };

  return (
    <div className="settings-page">
      <div className="headerComponent">
        <Header />
      </div>
      <div className="settings-content">
        <div className="settings-header">
          {/* Add specific title for if user or lab or not */}
          <div className="settings-title" style={{ color: appColor.gray }}>
            User Settings
          </div>
          {/* <div className="LoginContainer"> */}
          <button className="sign-out-button" onClick={handleSignout}>
            Sign Out
          </button>
        </div>
        <div className="settings-information__container">
          <div className="settings-information__profile">
            <div className="settings-information__square">
              <div>{currentUser?.username[0]}</div>
            </div>
            <div className="settings-information__greeting">{`Hello, ${currentUser?.username}`}</div>
          </div>
          <hr className="settings-info-rule"></hr>

          <UserSettingsInfo settings={fakeUserSettings} />
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}

export default Setting;
