import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "./layouts/MainLayout";
// import PageLayout from "./layouts/PageLayout";
import Navbar from "./components/Navbar";
import Loading from "./components/Loading";

const Home = lazy(() => import("./pages/Home"));
const Signin = lazy(() => import("./pages/Signin"));
const Signup = lazy(() => import("./pages/Signup"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

function App() {
    const loading = useSelector((state: any) => state.loading.loading);

    return (
        <MainLayout>
            <ToastContainer />
            {loading && <Loading />}
            <Navbar />
            <Suspense fallback={<Loading />}>
                {/* <PageLayout> */}
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/signin" element={<Signin />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Routes>
                {/* </PageLayout> */}
            </Suspense>
        </MainLayout>
    );
}

export default App;
