import { useState, useEffect } from "react";
import { Routes, Route, Outlet, Navigate, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Elements
import { Sidebar } from "@/components/sidebar";
import { Navbar } from "@/components/navbar";

// Pages
import { Signup, Signin } from "@/pages/auth";
import { Today } from "@/pages/dashboard/today";
import { Upcoming } from "@/pages/dashboard/upcoming";
import { Project } from "@/pages/dashboard/project";

export const App = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token || isTokenExpired(token)) {
      localStorage.removeItem("token");
      navigate("/signin");
    } else {
      navigate("/dashboard");
    }
  }, [token]);

  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<PrivateRoutes />}>
          <Route path="" element={<Today />} />
          <Route path="upcoming" element={<Upcoming />} />
          <Route path="projects/:projectId" element={<Project />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
};

function PrivateRoutes() {
  const [sidebarState, setSidebarState] = useState(true);
  const token = localStorage.getItem("token");

  return token ? (
    <div className="flex h-screen">
      <Sidebar sidebarState={sidebarState} setSidebarState={setSidebarState} />
      <div className="flex w-full flex-col">
        <Navbar sidebarState={sidebarState} setSidebarState={setSidebarState} />
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to="/signup" />
  );
}

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
