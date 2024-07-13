import { useState, useEffect } from "react";
import { Routes, Route, Outlet, Navigate, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Sidebar } from "@components/sidebar";
import { Navbar } from "@components/Navbar";
import { Toaster } from "@components/ui/toaster";

import Signup from "@pages/auth/Signup";
import Singin from "@pages/auth/Signin";
import { Home } from "@pages/dashboard/home";
import Upcoming from "@pages/dashboard/Upcoming";
import { Project } from "@pages/dashboard/project";

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
        <Route path="/signin" element={<Singin />} />
        <Route path="/dashboard" element={<PrivateRoutes />}>
          <Route path="" element={<Home />} />
          <Route path="upcoming" element={<Upcoming />} />
          <Route path="projects/:projectId" element={<Project />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Route>
      </Routes>
      <Toaster />
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
