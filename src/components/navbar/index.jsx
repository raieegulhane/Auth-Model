import "./navbar.css"
import { NavLink } from "react-router-dom";

export const Navbar = () => {
    const getActiveStyle = ({ isActive }) =>
	isActive ? "navlink activeLinkStyle" : "navlink"; 
    
    return(
        <nav className="nav">
            <NavLink to="/home" className={getActiveStyle}>Home</NavLink>
            <NavLink to="/private1" className={getActiveStyle}>Private1</NavLink>
            <NavLink to="/private2" className={getActiveStyle}>Private2</NavLink>
            <NavLink to="/private3" className={getActiveStyle}>Private3</NavLink>
        </nav>
    );
}