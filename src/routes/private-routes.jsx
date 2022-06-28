import { useLocation, Navigate, Outlet } from "react-router-dom";
import { Navbar } from "../components";
import { useAuth } from "../contexts/auth-context";

export const PrivateRoutes = () => {
    const location = useLocation();
    const { isAuth } = useAuth();
    return(
        
        isAuth ? (
            <div>
                <Navbar />
                <Outlet />
            </div>
        ) : (
            <Navigate to="/login" state={{ from: location}} replace/>
        )
    );
}