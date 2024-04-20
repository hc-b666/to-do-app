import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useSignupMutation } from "../services/userApi";
import Loading from "../components/Loading";
import { RootState } from "../app/store";
import Input from "../components/forms/Input";

export default function Signup() {
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();
    const [useSignUp, { isLoading, isSuccess, data }] = useSignupMutation();

    useEffect(() => {
        if (userInfo) {
            navigate("/");
        }
    }, [navigate, userInfo]);

    const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newUser = Object.fromEntries(new FormData(event.currentTarget));

        try {
            await useSignUp(newUser).unwrap();
        } catch (err: any) {
            console.log(err);
            toast.error(err.data.error);
        }
    };

    useEffect(() => {
        if (isSuccess && data) {
            console.log(data);
            toast.success(data.message);
            navigate("/signin");
        }
    }, [isSuccess, data]);

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            {isLoading && <Loading />}
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign Up to your account
                </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSignUp} className="space-y-6">
                    <Input name={"username"} type={"text"} />
                    <Input name={"email"} type={"email"} autoComplete={"email"} />
                    <Input name={"password"} type={"password"} autoComplete={"password"} />
                    
                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
