import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleAuth = () => {
    try {
      // window.location.href = "http://localhost:5000/auth/google/callback";
      window.location.href = `${process.env.REACT_APP_API_URL}/auth/google/callback`;
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(email, password, name);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      setLoading(true);
      const { data } = await axios.post(
        // "http://localhost:5000/users/login",
        `${process.env.REACT_APP_API_URL}/users/login`,
        { email, password },
        config
      );
      // console.log(data);
      if (data.message === "User is inactive") {
        alert("User is inactive, please contact admin");
        setLoading(false);
        return;
      }
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
      /*setTimeout(() => {
        setError("");
      }, 1000);*/
    }
  };

  useEffect(() => {
    const userType = JSON.parse(localStorage.getItem("userInfo"))?.userType;
    if (userType === "admin") {
      window.location.href = "/admin-dashboard";
    } else if (userType === "corporate") {
      window.location.href = "/dashboard";
    } else if (userType === "student" || userType === "alumni") {
      window.location.href = "/student-profile";
    }
  }, [loading]);

  return (
    <div className="bg-white p-10 border-gray-200 h-[685px] rounded-lg lg:rounded-l-none">
      {/*error ? (
        <div className="flex items-center justify-center rounded-r-lg">
          <div
            role="alert"
            className=" alert alert-error w-full mb-4 flex items-center justify-center rounded-r-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>{" "}
            <span>Invalid Credentials!</span>
          </div>
        </div>
      ) : (
        <div />
      )*/}

      <p className=" text-2xl text-gray-500 mt-4">
        Welcome back! Please Enter your details
      </p>

      <div className={error ? "mt-1" : "mt-8"}>
        <div>
          {error && (
            <p className="text-red-600 font-bold">*Invalid Credentials*</p>
          )}
          <label className="">Email</label>
          <input
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            placeholder="Enter Your Email"
            onChange={(e) => {
              setEmail(e.target.value.trim());
            }}
          />
        </div>

        <div className="relative">
          <label>Password</label>
          <input
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            placeholder="Enter Your Password"
            type={showPassword ? "text" : "password"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            type="button"
            className="absolute top-1/2 right-4 transform -translate-y-1/2 mt-3"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <div className="mt-8 flex justify-between items-center">
          <div>
            <input type="checkbox" id="remember" />
            <label className="ml-2 font-medium text-base" htmlFor="remember">
              Remember for 30 days
            </label>
          </div>
          <button className="font-medium text-base text-blue-500">
            Forgot password?
          </button>
        </div>

        <div className="mt-8 flex flex-col gap-y-4">
          {!loading ? (
            <button
              className="py-3 rounded-xl bg-blue-500 text-white font-bold 
                        active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all"
              onClick={submitHandler}
            >
              Sign in
            </button>
          ) : (
            <button className="my-2.5 rounded-xl bg-transparent text-white font-bold">
              <span className="loading loading-spinner text-neutral"></span>
            </button>
          )}

          <div className="flex items-center">
            <div className="w-full h-px bg-gray-300"></div>
            <div className="text-sm text-gray-500 mx-2">Or </div>
            <div className="w-full h-px bg-gray-300"></div>
          </div>

          <button
            className="flex items-center justify-center gap-2 border-2 border-gray-100 py-3 rounded-xl
                      active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all"
            onClick={handleGoogleAuth}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.26644 9.76453C6.19903 6.93863 8.85469 4.90909 12.0002 4.90909C13.6912 4.90909 15.2184 5.50909 16.4184 6.49091L19.9093 3C17.7821 1.14545 15.0548 0 12.0002 0C7.27031 0 3.19799 2.6983 1.24023 6.65002L5.26644 9.76453Z"
                fill="#EA4335"
              />
              <path
                d="M16.0406 18.0142C14.9508 18.718 13.5659 19.0926 11.9998 19.0926C8.86633 19.0926 6.21896 17.0785 5.27682 14.2695L1.2373 17.3366C3.19263 21.2953 7.26484 24.0017 11.9998 24.0017C14.9327 24.0017 17.7352 22.959 19.834 21.0012L16.0406 18.0142Z"
                fill="#34A853"
              />
              <path
                d="M19.8342 20.9978C22.0292 18.9503 23.4545 15.9019 23.4545 11.9982C23.4545 11.2891 23.3455 10.5255 23.1818 9.81641H12V14.4528H18.4364C18.1188 16.0119 17.2663 17.2194 16.0407 18.0108L19.8342 20.9978Z"
                fill="#4A90E2"
              />
              <path
                d="M5.27698 14.2663C5.03833 13.5547 4.90909 12.7922 4.90909 11.9984C4.90909 11.2167 5.03444 10.4652 5.2662 9.76294L1.23999 6.64844C0.436587 8.25884 0 10.0738 0 11.9984C0 13.918 0.444781 15.7286 1.23746 17.3334L5.27698 14.2663Z"
                fill="#FBBC05"
              />
            </svg>
            Sign in with Google
          </button>
          <div className="mt-5 flex flex-col justify-center items-center">
            <div className="flex justify-center items-center">
              <p className="font-medium text-base">Don't have an account?</p>
              <button
                className="text-blue-500 text-base font-medium ml-2"
                onClick={() => {
                  window.location.href = "/user-register";
                }}
              >
                Register
              </button>
            </div>

            <div>
              <button
                className="text-blue-500 text-base font-medium ml-2"
                onClick={() => {
                  window.location.href = "/corporate-register";
                }}
              >
                Corporate Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
