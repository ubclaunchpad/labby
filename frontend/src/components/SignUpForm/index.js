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
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    }

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    
    const handleUserSubmit = (e) => {
        e.preventDefault();
        if (firstName === "") {
            alert("First Name Required.");
            return;
        }
        if (lastName === "") {
            alert("Last Name Required.");
            return;
        }

        if (email === "") {
            alert("Please enter an email address.");
            return;
        }
        if (password === "") {
            alert("Please enter a password.");
            return;
        }        
        if (!/\S+@\S+\.\S+/.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }
        if (password.length < 8) {
            alert("Password must be at least 8 characters long.");
            return;
        }
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
        navigate('/'); 
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
                            <input  className="LoginInput" placeholder="First Name*" type={"firstName"} onChange={handleFirstNameChange} required> 
                            </input> 
                            <input  className="LoginInput" placeholder="Last Name*" type={"lastName"} onChange={handleLastNameChange} required> 
                            </input>
                            <input  className="LoginInput" placeholder="Email*" type={"email"} onChange={handleEmailChange} required >
                            </input>
                            <input  className="LoginInput" placeholder="Password*" type={"password"} onChange={handlePasswordChange} required>
                            </input>
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