import { useEffect } from "react";
import { Routes, Route, Outlet, Navigate, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Sidebar } from "./components/Sidebar";
import { Navbar } from "./components/Navbar";

import Signup from "./pages/auth/Signup";
import Singin from "./pages/auth/Signin";
import Home from "./pages/dashboard/Home";
import Week from "./pages/dashboard/Week";

export const App = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token || isTokenExpired(token)) {
      localStorage.removeItem("token"); 
      navigate("/signin");
    }
  }, [token]);

  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Singin />} />
      <Route path="/dashboard" element={<PrivateRoutes />}>
        <Route path="" element={<Home />} />
        <Route path="week" element={<Week />} />
      </Route>
    </Routes>
  );
};

function PrivateRoutes() {
  const token = localStorage.getItem("token");

  return token ? (
    <div className="flex">
      <Sidebar />
      <div className="w-full flex flex-col">
        <Navbar />
        <Outlet />
      </div>
    </div>
  ) : <Navigate to="/signup" />;
};

function isTokenExpired(token: string | null | undefined): boolean {
  if (!token) {
    return true;
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp! < currentTime;
  } catch (err) {
    return true;
  }
}
