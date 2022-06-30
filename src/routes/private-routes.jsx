import { useLocation, Navigate, Outlet } from "react-router-dom";
import { Navbar } from "../components";
import { useAuth } from "../contexts/auth-context";

export const PrivateRoutes = () => {
    const location = useLocation();
    const { authState: { isAuth } } = useAuth();
    console.log(location)
    console.log(isAuth)

    return(
        isAuth ? (
            <main>
                <Navbar />
                <Outlet />
            </main>
        ) : (
            // here we used Navigate and not useNavigate because we want to programmatically jump to the location
            // i.e. whenever we find that isAuth is false. navigate cannot do that without the state being changed (either by pageload or by click/change)
            <Navigate to="/login" state={{ from: location }} replace/>
        )
    );
}