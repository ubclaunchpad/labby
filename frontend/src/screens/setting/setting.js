import "./setting.css";
import { useDispatch } from "react-redux";
import { SET_CURRENT_USER } from "../../redux/actions/userActions";

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

  return (
    <div className="LoginPage">
      <div className="LoginContainer">
        <button className="SignInBtn" onClick={handleSignout}>
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default Setting;
