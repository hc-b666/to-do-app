import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeToast } from "../features/toast";

interface ToastProps {
    toast: {
        message: string;
        type: string;
        duration: number;
        isOpen: boolean;
    };
}

export default function Toast({ toast }: ToastProps) {
    const dispatch = useDispatch();
    const [countdown, setCountdown] = useState(toast.duration);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (countdown === 0) {
            dispatch(closeToast());
        }
    }, [countdown, dispatch]);

    return (
        <>
            {toast.isOpen && (
                <div className="absolute top-5 right-5 w-[300px] bg-slate-50 h-auto p-5">
                    <h1>{toast.message}</h1>
                    <p>{toast.type}</p>
                    <p>{countdown}</p>
                </div>
            )}
        </>
    );
}
