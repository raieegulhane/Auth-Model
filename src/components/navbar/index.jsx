import "./navbar.css"
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import { useToast } from "../../custom-hook";

export const Navbar = () => {
    const { showToast } = useToast();
    const navigate = useNavigate();
    const { authDispatch } = useAuth();

    const getActiveStyle = ({ isActive }) => {
        return(
            isActive ? "navlink activeLinkStyle" : "navlink" 
        );
    }

    const logoutHandler = () => {
        localStorage.removeItem("auth-token");
        localStorage.removeItem("user-data");

        authDispatch({ type: "AUTH_CLEAR" });

        navigate("/login");
        showToast("success", "Logged out.")
    }

    return(
        <nav className="nav-wrapper">
            <div className="nav">
                <NavLink to="/home" className={getActiveStyle}>Home</NavLink>
                <NavLink to="/private1" className={getActiveStyle}>Private1</NavLink>
                <NavLink to="/private2" className={getActiveStyle}>Private2</NavLink>
                <NavLink to="/private3" className={getActiveStyle}>Private3</NavLink>
            </div>
            <button 
                className="logout-btn"
                onClick={logoutHandler}    
            >
                Logout
            </button>
        </nav>
    );
}