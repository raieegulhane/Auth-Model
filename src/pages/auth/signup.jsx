import "./auth.css"
import "../../styles.css";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"
import { signupService } from "../../services/signup-service";
import { useAuth } from "../../contexts/auth-context";
import { useToast } from "../../custom-hook";
import { PasswordInput } from "../../components";

export const Signup = () => {
    const { showToast } = useToast();
    const navigate = useNavigate();
    const location = useLocation();

    const { authDispatch } = useAuth();

    const initialUserDetails = {
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: ""
    }
    const [ userDetails, setUserDetails ] = useState(initialUserDetails);
    const {
        email,
        password,
        confirmPassword,
        firstName,
        lastName
    } = userDetails;

    const updateUserDetails = (event) => {
        const { name, value } = event.target;
        setUserDetails((userDetails) => ({ ...userDetails, [name]: value }))
    }

    const signupHandler = async (event) => {
        event.preventDefault();

        try {
            if (!email || !password || !confirmPassword || !firstName || !lastName) {
                showToast("warning", "All fields must be filled.");
                return;
            }

            const response = await signupService(userDetails);
            const { createdUser, encodedToken } = response.data;

            authDispatch({
                type: "AUTH_INIT",
                payload: {
                    isAuth: true,
                    authToken: encodedToken,
                    userData: { ...createdUser }
                }
            })

            // we store this because when you reload a page the reducers will be cleared and the user data that is entered and 
            // isAuth status will be gone. returned to initial values. to keep the data even after reload. we store this in local
            // stoarage and we access this data is context later.
            localStorage.setItem("auth-token", encodedToken);
            localStorage.setItem("user-data", JSON.stringify(createdUser));

            //here we use the function navigate and not Navigate because we have to go to the requred page on click.
            //it acts kinda like Link but without the link name
            // For applications like notes app where navbar is in private pages only direct navigation to
            // home page from signup is okay. but for apps like ecomm where nav is publically accesssed you should return to
            // the location from where you started.
            navigate(location?.state?.from ? location.state.from : "/home", {replace: true});
            showToast("success", "Signed up");
        } catch (error) {
            console.log("SIGNUP_ERROR: ", error);
            if (error.message.includes(422)) {
                showToast("error", "Email already exists. Login instead")
                return;
            }
            
            showToast("error", "Error occured while signing in.");
        }
    }

    return(
        <div className="auth-form-wrapper">
            <form className="auth-form flex-col">
                <h1 className="auth-heading">Signup</h1>
                
                <label
                    className="auth-label flex-col"
                    htmlFor="firstName"
                >
                    First Name: 
                    <input 
                        id="firstName"
                        className="inp"
                        name="firstName"
                        type="text"
                        placeholder="Jane"
                        required
                        onChange={updateUserDetails}
                        value={firstName}
                    />
                </label>
                <label
                    className="auth-label flex-col"
                    htmlFor="lastName"
                >
                    Last Name: 
                    <input 
                        id="lastName"
                        className="inp"
                        name="lastName"
                        type="text"
                        placeholder="Doe"
                        required
                        onChange={updateUserDetails}
                        value={lastName}
                    />
                </label>
                <label
                    className="auth-label flex-col"
                    htmlFor="email"
                >
                    Email: 
                    <input 
                        id="email"
                        className="inp"
                        name="email"
                        type="email"
                        placeholder="email@example.com"
                        required
                        onChange={updateUserDetails}
                        value={email}
                    />
                </label>
                <label
                    className="auth-label flex-col"
                    htmlFor="newPassword"
                >
                    New Password:
                    <PasswordInput 
                        id={"newPassword"}
                        name={"password"}
                        placeholder={"Minimum 6 charachters"}
                        onChange={updateUserDetails}
                        value={password}
                    />
                </label>
                {
                    password.length !== 0 && 
                    password.length < 6 &&
                    <div className="warning">
                        <i className="fa-solid fa-circle-exclamation"></i>
                        <p>Password should have atleast 6 characters</p>
                    </div>
                }
                <label
                    className="auth-label flex-col"
                    htmlFor="confirmPassword"
                >
                    Confirm Password:
                    <PasswordInput 
                        id={"confirmPassword"}
                        name={"confirmPassword"}
                        placeholder={"Re-enter password"}
                        onChange={updateUserDetails}
                        value={confirmPassword}
                    />
                </label>
                {
                    confirmPassword.length > 0 &&
                    password !== confirmPassword &&
                    <div className="warning">
                        <i className="fa-solid fa-circle-exclamation"></i>
                        <p>Passwords do not match.</p>
                    </div>
                }
                <div className="form-btn-container flex-col">
                    <button
                        className="auth-btn pri-btn btn"
                        onClick={signupHandler}
                    >
                        Continue
                    </button>
                </div>
            </form>
            <p className="alt-cta">Already an user? <Link to="/login" className="alt-cta-btn">Login</Link> to your account</p>
        </div>
    );
}