import "../LoginForm/index.css";
// import Hide from "../../assets/hide.png";
import uuid from "react-uuid";
import { useDispatch } from "react-redux";
import {useState} from 'react';
import { POST_USER } from "../../redux/actions/userActions";
import { useNavigate} from "react-router-dom";
import Logo from "../../assets/LogoIcon.png";

function SignUpForm() {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    const handleUserSubmit = (e) => {
        e.preventDefault();
        const response = dispatch({   // do we have to wait for this to complete?
            type: POST_USER,
            payload: {
              user_id: uuid(),
              fk_organization_id: null,
              username: null,
              email: email,
              password: password,
            },
          });
        if (response.payload.email) {
            alert("Account created successfully! Please login to continue.")
        } else {
            alert("Account creation failed. Please try again.")
        }
        redirectLogin();
    }
    let navigate = useNavigate();
    const redirectLogin = () => {
        navigate('/login');
    }
    return(
        <div className="PageContainer">
    
            <div className="SignUpBackgroundImg">
                <div className="AlreadyUser">
                    Already have an account? 
                </div>
                <button className="LogInBtn" onClick={redirectLogin}>
                    Log in
                </button>
                </div>
            <div className="LoginPage">
                <img src={Logo} className="LogoImg" alt="Background"></img>
    
                <div className="LoginContainer">
                    <div className="LoginForm">
                        <div className="LoginTitle">
                            <h2>Create an Account</h2>
                        </div>
                        <form onSubmit={handleUserSubmit}>
                            <input  className="LoginInput" placeholder="Email" type={"email"} onChange={handleEmailChange}>
                            </input>
                            <input  className="LoginInput" placeholder="First Name" type={"text"} onChange={handlePasswordChange}>
                            </input>
                            <input  className="LoginInput" placeholder="Last Name" type={"text"} onChange={handleEmailChange}>
                            </input>
                            <input  className="LoginInput" placeholder="Password" type={"password"} onChange={handlePasswordChange}>
                            </input>
                            {/* <div className="ForgotPassword">
                                Forgot Password
                            </div> */}
                            <button className="SignInBtn" onClick={handleUserSubmit}>
                                Sign up
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        );    

}

export default SignUpForm;