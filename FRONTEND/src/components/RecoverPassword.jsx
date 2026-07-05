import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../utilities/Api.js";
import OTP from "./OTP.jsx";
import { useContext } from "react";
import UserContext from "../utilities/ContextApi.jsx";




function RecoverPassword() {
  const [registration, setRegistration] = useState(""); //Registration Number
  const [password, setPassword] = useState(""); //Password
  const [showPassword, setShowPassword] = useState(false);
  // const [profileData, setProfileData] = useState({}); // User data from Backend.
  const [OTPPin, setOTPPin] = useState([]); //OTP from OTP form

  const [haveOTP, setHaveOTP] = useState(false); // after sending registration number...
  const [lackOfOTP, setLackOfOTP] = useState(false); // if OTP is missing
  const [verifyedOTP, setVerifyedOTP] = useState(false); // if OTP is verifird
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // for nagivation

  //Error handling...
  const [regBorder, setRegBorder] = useState(false);
  const [OTPBorder, setOTPBorder] = useState(false);
  const [consoleMessage, setConsoleMessage] = useState("");

  const {setLoggedIn , setHomeInfo} = useContext(UserContext);

  const signUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post(
        "/api/finalSignUp",
        {
          registration,
          password,
        },
        {
          withCredentials: true,
        },
      );
      
      setLoggedIn(true);
      setHomeInfo(response?.data?.data)

      if (response.data.success) {
        navigate("/home");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setConsoleMessage(error?.response?.data?.message);
    }
  };

  const verifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post(
        "/api/OTP-verify",
        {
          registration,
          OTPPin,
        },
        {
          withCredentials: false,
        },
      );
      setVerifyedOTP(response.data.success);
      console.log(response.data.success);
      setLoading(false);
    } catch (error) {
      console.log(error.response.data);
      setOTPBorder(!error.response.data.success);
      setLoading(false);
      setConsoleMessage(error.response.data.message);
    }
  };

  const submitSignupForm = async (e) => {
    if (!registration) return;
    setLoading(true);

    e?.preventDefault();
    try {
      const response = await api.post(
        "/api/recoverpassword",
        {
          registration,
        },
        {
          withCredentials: false,
        },
      );

      setHaveOTP(true);
      setLoading(false);

      // console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
      setConsoleMessage(error?.response?.data?.message);
      setRegBorder(!error.response.data.success);
      setLoading(false);
    }
  };

  const submitHandle = (e) => {
    if (!haveOTP && !verifyedOTP) {
      submitSignupForm(e);
    } else if (haveOTP && !verifyedOTP) {
      verifyOTP(e);
    } else {
      signUp(e);
    }
  };

  const buttonHandle = () => {
    if (!haveOTP && !verifyedOTP) {
      return "Get OTP";
    } else if (haveOTP && !verifyedOTP) {
      return "Verify OTP";
    } else {
      return "Registered";
    }
  };

  useEffect(() => {
    document.body.style.cursor = loading ? "wait" : "default";
  }, [loading]);

  return (
    <div
      className={`min-h-screen w-full flex flex-col justify-center items-center p-4  `}
    >
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl shadow-slate-950/20 flex flex-col border border-slate-200 overflow-hidden">
        <div className="py-8 px-5">
          {/* Heading */}

          <div className="h-full flex justify-center items-center flex-col text-center">
            <p className="text-sm font-bold uppercase tracking-wide text-[#015cee]">
              NIT Jamshedpur CGPA Analyzer
            </p>
            <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-950">
              Recover Your Password
            </h1>
            <p className="mt-2 max-w-sm text-sm text-slate-500">
              Join the academic analytics dashboard for NIT Jamshedpur results.
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center border-t border-slate-200 px-5 py-6">
          <div className="w-full flex flex-col justify-evenly">
            <form className="flex flex-col gap-4" onSubmit={submitHandle}>
              {/* Registration */}

              <div
                className={`h-12 w-full  rounded-lg flex items-center bg-slate-50 focus-within:bg-white focus-within:border-[#015cee] focus-within:ring-4 focus-within:ring-blue-100 transition  ${regBorder ? "border border-red-600" : "border border-slate-200"}`}
              >
                <div className="h-full w-12 flex justify-center items-center">
                  <FaUser className="text-gray-400" />
                </div>

                <input
                  value={registration}
                  disabled={verifyedOTP}
                  onChange={(e) => {
                    setRegistration(e.target.value);
                    setRegBorder(false);
                  }}
                  placeholder="Registration No."
                  className={`outline-none relative w-full bg-transparent pr-3 text-slate-800 placeholder:text-slate-400 ${
                    verifyedOTP ? "cursor-not-allowed" : ""
                  }   `}
                />
              </div>

              {/* {OTP} */}

              {haveOTP && registration && !verifyedOTP && (
                <OTP
                  data={(otp) => setOTPPin(otp)}
                  OTPBorder={OTPBorder}
                  setRedSend={submitSignupForm}
                />
              )}

              {/* Password */}

              {verifyedOTP && (
                <div className="h-12 w-full border border-slate-200 rounded-lg flex items-center bg-slate-50 focus-within:bg-white focus-within:border-[#015cee] focus-within:ring-4 focus-within:ring-blue-100 transition">
                  <div className="h-full w-12 flex justify-center items-center">
                    <FaLock className="text-gray-400" />
                  </div>

                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="outline-none w-full bg-transparent pr-3 text-slate-800 placeholder:text-slate-400"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className={`h-full w-12 flex justify-center items-center text-gray-400 hover:text-blue-600 `}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              )}

              {/* {Error message} */}

              {(regBorder || OTPBorder) && (
                <p className="w-full  flex justify-center text-red-600">
                  {consoleMessage}
                </p>
              )}

              {/* Button */}

              <button
                // onClick={()=>(setLoading(true))}
                disabled={loading}
                type="submit"
                className={`h-12 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-lg shadow-blue-500/20 transition ${loading ? "cursor-wait" : "cursor-default"} `}
              >
                {buttonHandle()}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecoverPassword;
