import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useGetUserQuery } from "../services/userApi";
import { setLoading, stopLoading } from "../features/loading";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
    const dispatch = useDispatch();
    const { isLoading, isError, isSuccess } = useGetUserQuery();

    useEffect(() => {
        if (isLoading) dispatch(setLoading());
        if (isSuccess || isError) dispatch(stopLoading());
    }, [isLoading, isError, isSuccess]);

    return (
        <>
            {isError && toast.error("Error occured!")}
            <div className="flex w-full h-screen">
                <Sidebar />
                <main className="w-full">
                    main
                </main>
            </div>
        </>
    );
}
