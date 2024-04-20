import { lazy, Suspense } from "react";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "./layouts/MainLayout";
import Navbar from "./components/Navbar";
import Loading from "./components/Loading";
import { RootState } from "./app/store";
import Modal from "./components/Modal";

const Home = lazy(() => import("./pages/Home"));
const Signin = lazy(() => import("./pages/Signin"));
const Signup = lazy(() => import("./pages/Signup"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

function App() {
    const modalProps = useSelector((state: RootState) => state.modal);

    return (
        <MainLayout>
            <ToastContainer />
            {modalProps.isOpen ? <Modal /> : null}
            <Navbar />
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route element={<PrivateRoute />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Route>
                </Routes>
            </Suspense>
        </MainLayout>
    );
}

export default App;

function PrivateRoute() {
    const { userInfo } = useSelector((state: RootState) => state.auth);
    return userInfo ? <Outlet /> : <Navigate to="/signin" replace />;
}
