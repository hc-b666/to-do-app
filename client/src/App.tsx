import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { Navbar } from "./components/Navbar";

import Signup from "./pages/auth/Signup";
import Singin from "./pages/auth/Signin";
import Home from "./pages/dashboard/Home";
import Week from "./pages/dashboard/Week";

export const App = () => {
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
}
