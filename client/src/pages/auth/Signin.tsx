import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSigninMutation } from "@services/authApi";
import { signinSchema } from "../../schemas/register.schema";

const Signin = () => {
  const navigate = useNavigate();
  const [signin] = useSigninMutation();

  const signinHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    try {
      const validatedData = signinSchema.safeParse({
        username: data.username,
        password: data.password,
      });

      if (validatedData.success === true) {
        const res = await signin({
          username: validatedData.data.username,
          password: validatedData.data.password,
        }).unwrap();

        if (res.status === 201) {
          localStorage.setItem("token", res.token);
          navigate("/dashboard");
        }
      } else if (validatedData.success === false) {
        toast.error(validatedData.error.errors[0].message);
      }
    } catch (error) {
      console.error(error);
      const typedError = error as { status?: number; data?: { error: string } };

      if (typedError.status === 500) {
        if (typedError.data && typedError.data.error) {
          toast.error(typedError.data.error);
        }
      }
    }
  };

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token]);

  return (
    <main className="flex h-screen w-full items-center justify-center">
      <div className="flex min-w-[400px] flex-col rounded-2xl p-8 shadow">
        <h2 className="mb-8 text-2xl">Sign In Form</h2>

        <form onSubmit={signinHandler} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="username"
              className="text-xs font-semibold text-gray-500"
            >
              Username
            </label>
            <input
              name="username"
              id="username"
              type="text"
              placeholder="Username"
              className="w-full rounded-lg border px-4 py-1"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-xs font-semibold text-gray-500"
            >
              Password
            </label>
            <input
              name="password"
              id="password"
              type="password"
              placeholder="Password"
              className="w-full rounded-lg border px-4 py-1"
            />
          </div>

          <p className="text-xs font-normal text-gray-500">
            Have not registered yet? &nbsp;
            <Link to={"/signup"} className="font-medium underline">
              Sign Up
            </Link>
          </p>

          <button
            type="submit"
            className="w-full rounded-lg bg-purple-700 px-4 py-2 text-base font-semibold text-white duration-300 hover:bg-purple-500"
          >
            Sign In
          </button>
        </form>
      </div>
    </main>
  );
};

export default Signin;
