import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaLock, FaUser } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import UserContext from "../utilities/ContextApi";
import api from "../utilities/Api.js";

function Login() {
  const [registration, setRegistration] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // for nagivation
  const [loading, setLoading] = useState(false);
  const [consoleMessage, setConsoleMessage] = useState("");

  const [regBorder, setRegBorder] = useState(false);
  const { setHomeInfo , setLoggedIn } = useContext(UserContext)

  const submitLoginForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post(
        "/api/login", // backend route
        {
          registration,
          password,
        },
        {
          withCredentials: true,
        },
      );

      // console.log(response)
      setLoggedIn(true);
      setHomeInfo(response?.data?.data)
      setLoading(false);
      if (response.data.success) {
        navigate("/home");
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
      setConsoleMessage(error?.response?.data?.message);
      setLoading(false);
      setRegBorder(true);
    }
  };

  useEffect(() => {
    document.body.style.cursor = loading ? "wait" : "default";
  }, [loading]);

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl shadow-slate-950/20 flex flex-col border border-slate-200 overflow-hidden">
        <div className="py-8 px-5">
          {/* Heading */}

          <div className="h-full flex justify-center items-center flex-col text-center">
            <p className="text-sm font-bold uppercase tracking-wide text-[#015cee]">
              NIT Jamshedpur CGPA Analyzer
            </p>
            <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-950">
              Welcome Back
            </h1>
            <p className="mt-2 max-w-sm text-sm text-slate-500">
              Sign in to review CGPA, SGPA, ranks, and department performance.
            </p>

            <p className="text-slate-500 text-center pt-1 text-sm sm:text-base">
              Don't have account?
              <span className="text-blue-600 ml-2 cursor-pointer font-semibold">
                {" "}
                <Link to="/signup">Sign Up</Link>{" "}
              </span>
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center border-t border-slate-200 px-5 py-6">
          <div className="w-full flex flex-col justify-evenly">
            <form className="flex flex-col gap-4" onSubmit={submitLoginForm}>
              {/* Registration */}
              <div className="h-12 w-full border border-slate-200 rounded-lg flex items-center bg-slate-50 focus-within:bg-white focus-within:border-[#015cee] focus-within:ring-4 focus-within:ring-blue-100 transition">
                <div className="h-full w-12 flex justify-center items-center">
                  <FaUser className="text-gray-400" />
                </div>

                <input
                  value={registration}
                  onChange={(e) => {
                    setRegistration(e.target.value);
                    setRegBorder(false);
                  }}
                  placeholder="Registration No."
                  className="outline-none relative w-full bg-transparent pr-3 text-slate-800 placeholder:text-slate-400"
                />
              </div>

              {/* Password */}

              <div className="h-12 w-full border border-slate-200 rounded-lg flex items-center bg-slate-50 focus-within:bg-white focus-within:border-[#015cee] focus-within:ring-4 focus-within:ring-blue-100 transition">
                <div className="h-full w-12 flex justify-center items-center">
                  <FaLock className="text-gray-400" />
                </div>

                <input
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setRegBorder(false);
                  }}
                  type="password"
                  placeholder="Password"
                  className="outline-none w-full bg-transparent pr-3 text-slate-800 placeholder:text-slate-400"
                />
              </div>

              {/* Forget */}

              <div>
                <Link
                  to="/recoverpassword"
                  className="text-blue-600 text-sm font-semibold"
                >
                  Forget Password?
                </Link>
              </div>

             {/* {Error message} */}

              {( regBorder ) && (
                <p className="w-full  flex justify-center text-red-600">
                  {consoleMessage}
                </p>
              )}

              {/* Button */}

              <button
                type="submit"
                disabled={loading}
                className={`h-12 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-lg shadow-blue-500/20 transition ${loading ? "cursor-wait" : "cursor-default"} `}
              >
                Sign In
              </button>
            </form>
          </div>
        </div>

        <div className="flex justify-center items-center px-5">
          <div className="w-full flex justify-center items-center">
            <div className="flex-1 border border-slate-200"></div>

            <span className="mx-4 text-gray-400">OR</span>

            <div className="flex-1 border border-slate-200"></div>
          </div>
        </div>

        <div className="flex justify-center items-center px-5 py-6">
          <div className="w-full flex justify-center items-center">
            <button
              className={`h-12 w-full border border-slate-200 rounded-lg flex justify-center items-center gap-3 hover:bg-slate-50 font-semibold text-slate-700 transition ${loading ? "cursor-wait" : "cursor-default"}  `}
              onClick={() => {
                setLoading(true);
               window.location.href =  `${import.meta.env.VITE_BACKEND_URL}/auth/google`
                setLoading(false);
              }}
            >
              <FcGoogle size={25} />
              Continue with Google ( College ID )
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
