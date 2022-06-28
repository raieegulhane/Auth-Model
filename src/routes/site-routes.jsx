import { Routes, Route } from "react-router-dom";
import Mockman from 'mockman-js';
import { Home, Private1, Private2, Private3, Login, Signup, NotFound } from "../pages";

export const SiteRoutes = () => {
    return(
        <Routes>
            <Route path="/mockman" element={<Mockman />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/private1" element={<Private1 />} />
            <Route path="/private2" element={<Private2 />} />
            <Route path="/private3" element={<Private3 />} />
        </Routes>
    );
}