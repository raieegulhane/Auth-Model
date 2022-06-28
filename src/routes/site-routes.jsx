import { Routes, Route } from "react-router-dom";
import Mockman from 'mockman-js';
import { Home, Private1, Private2, Private3, Login, Signup, NotFound } from "../pages";

export const SiteRoutes = () => {
    return(
        <Routes>
            <Route exact path="/mockman" element={<Mockman />} />
            <Route exact path="/Login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="*" element={<NotFound />} />
            <Route exact path="/" element={<Home />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/private1" element={<Private1 />} />
            <Route exact path="/private2" element={<Private2 />} />
            <Route exact path="/private3" element={<Private3 />} />
        </Routes>
    );
}