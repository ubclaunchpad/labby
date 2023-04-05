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

  const userList = useSelector((state) => state?.userReducer?.userList);
  // console.log(userList);
  // const getData = useEffect(() => getUserData, []);
  // const usersData = useSelector((state) => state?.userReducer?.userList);
  const [userData, setUserData] = useState("");
  // const isUser = userData?.user == "user";
  const [test, setTest] = useState();

  useEffect(() => {
    dispatch({ type: LOAD_USERLIST });
  }, []);

  async function logJSONData() {
    const response = await fetch("https://swapi.dev/api/people/1");
    const jsonData = await response.json();
    console.log(jsonData);
    return jsonData;
  }
  useEffect(() => {
    fetch("https://swapi.dev/api/people/1")
      .then((res) => res.json())
      .then((val) => {
        setTest(val);
      });
  }, []);

  // async function getUserData() {
  //   const response = await fetch("https://swapi.dev/api/people/3")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //     });
  // }

  // getUserData();

  // Move this to constants:
  const userFieldLabels = {
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    bio: "Bio Statement ",
    role: "Role",
  };

  const fakeUserSettings = {
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
  const UserSettingsInfo = ({ settings }) => {
    const array = Object.entries(settings);
    // console.log(array);
    return array.map(([field, value]) => {
      // Need a way to determine if value is editable
      const editable = true;
      return (
        <div className="settings-info__row">
          <div className="settings-info__display-values">
            <div className="settings-info__title">{userFieldLabels[field]}</div>
            <div className="settings-info__value">{value}</div>
          </div>

          {editable && (
            <div className="settings-info__edit-row">
              <button
                className="settings-info__edit-button"
                // onChange={console.log("clicked")}
              >
                Edit
              </button>
            </div>
          )}
          <hr></hr>
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
          <UserSettingsInfo settings={fakeUserSettings} />
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}

export default Setting;
