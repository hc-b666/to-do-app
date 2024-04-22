import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useGetUserQuery } from "@services/userApi";
import { logout, setCredentials } from "@features/authSlice";
import { RootState } from "src/app/store";
// import Cookies from "js-cookie";

interface ErrorProps {
    status: number;
    data: {
        error: string;
    };
}

interface ResponseTypes {
    data: any;
    error: ErrorProps | null;
    isSuccess: boolean;
}

export default function AuthLayout({ children }: { children: ReactNode }) {
    const dispatch = useDispatch();

    // const { userId } = useSelector((state: RootState) => state.auth);

    const response: ResponseTypes = useGetUserQuery();
    const { data, error, isSuccess } = response;

    useEffect(() => {
        // if (userId) {
        //     dispatch(setCredentials({ ...data }));
        //     return;
        // }
        if (error) {
            toast.error(error.data.error);
            dispatch(logout());
        }

        if (isSuccess) {
            toast.success("Logged in");
            dispatch(setCredentials({ ...data }));
        }
    }, [error, isSuccess]);

    return <>{children}</>;
}
