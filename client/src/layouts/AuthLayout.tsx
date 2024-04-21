import { ReactNode } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useGetUserQuery } from "@services/userApi";
import { logout, setCredentials } from "@features/authSlice";

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

    const response: ResponseTypes = useGetUserQuery();
    const { data, error, isSuccess } = response;

    if (error) {
        toast.error(error.data.error);
        dispatch(logout());
    }

    if (isSuccess) {
        toast.success("Logged in");
        dispatch(setCredentials({...data}));
    }

    return <>{children}</>;
}
