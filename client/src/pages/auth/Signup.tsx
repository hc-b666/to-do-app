import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSignupMutation } from "../../services/authApi";
import "./auth-styles.css";

const Signup = () => {
  const navigate = useNavigate();
  const [signup] = useSignupMutation();

  const signupHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    try {
      const res = await signup(data);
      
      if (res.data.status === 201) {
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token]);

  return (
    <main className="auth-main">
      <div className="p-8 min-w-[400px] flex flex-col rounded-2xl shadow">
        <h2 className="text-2xl mb-8">Sign Up Form</h2>

        <form onSubmit={signupHandler} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-gray-500 text-xs font-semibold">Username</label>
            <input name="username" id="username" type="text" placeholder="Username" className="py-1 px-4 w-full border rounded-lg" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-gray-500 text-xs font-semibold">Password</label>
            <input name="password" id="password" type="password" placeholder="Password" className="py-1 px-4 w-full border rounded-lg" />
          </div>

          <p className='text-gray-500 text-xs font-normal'>
            Already have an account? 
            &nbsp;
            <Link to={"/signin"} className="font-medium underline">Sign In</Link>
          </p>

          <button type="submit" className="text-white text-base font-semibold py-2 px-4 w-full bg-purple-700 hover:bg-purple-500 rounded-lg duration-300">Sign Up</button>
        </form>

      </div>
    </main>
  );
};

export default Signup;