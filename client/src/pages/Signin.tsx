import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../app/store";
import { useSigninMutation } from "@services/userApi";
import { setCredentials } from "@features/authSlice";
import Loading from "@components/Loading";
import Input from "@components/ui/Input";
import Button from "@components/ui/Button";

export default function Signin() {
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();
    const [useSignIn, { isLoading, isSuccess, data }] = useSigninMutation();

    useEffect(() => {
        if (userInfo) {
            navigate("/");
        }
    }, [navigate, userInfo]);

    const handleSignin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const user = Object.fromEntries(new FormData(event.currentTarget));

        try {
            const res = await useSignIn(user).unwrap();
            dispatch(setCredentials({ ...res.user }));
        } catch (err: any) {
            toast.error(err?.data?.error || err.error);
        }
    };

    useEffect(() => {
        if (isSuccess && data) {
            navigate("/dashboard");
            toast.success(data.data.message);
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
                    Sign in to your account
                </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSignin} className="space-y-6">
                    <Input name={"username"} type={"text"} />
                    <Input
                        name={"password"}
                        type={"password"}
                        autoComplete={"password"}
                    />

                    <div>
                        <Button type="submit" variant="formButton">
                            Sign in
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
