import "./App.css";
import SideBar from "./components/SideBar.jsx";
import NavBar from "./components/NavBar.jsx";
import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";
import Home from "./components/Home/Home.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import Department from "./components/Department/Department.jsx";
import Rank from "./components/Rank/Rank.jsx";
import Compare from "./components/Compare/Compare.jsx";
import ContactUs from "./components/ContactUs.jsx";
import About from "./components/About.jsx";
import GetInfo from "./utilities/GetInfo.js";
import RecoverPassword from "./components/RecoverPassword.jsx";
import { Analytics } from "@vercel/analytics/react";

import { Navigate, Route, Routes, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  const loginOpen =
    location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/recoverpassword";

  return (
    <>

    <GetInfo/>

      <div className={loginOpen ? "blur-sm pointer-events-none" : ""}>
        <div className="h-dvh overflow-hidden bg-slate-50 flex flex-col">
          <div className="h-[60px] w-full flex-shrink-0 z-50">
            <NavBar />
          </div>

          <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden md:flex-row">
            <div className="flex-shrink-0 md:overflow-hidden">
              <SideBar/>
            </div>
            <div className="min-h-0 min-w-0 flex-1 overflow-y-auto">
              <Routes>
                <Route path={"/"} element={<Dashboard />} />
                <Route path={"/home"} element={<Home />} />
                <Route path={"/dashboard"} element={<Dashboard />} />
                <Route path={"/department"} element={<Department />} />
                <Route path={"/topper"} element={<Rank />} />
                <Route path={"/compare"} element={<Compare />} />
                <Route path={"/contactus"} element={<ContactUs />} />
                <Route path={"/about"} element={<About />} />
                <Route path={"/login"} element={<Dashboard />} />
                <Route path={"/signup"} element={<Dashboard />} />
                <Route path={"/recoverpassword"} element={<Dashboard />} />
                <Route path={"*"} element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>

      {/* Login Overlay */}
      {loginOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm z-50 p-4">

          {location.pathname === "/login" && <Login /> }
          {location.pathname === "/signup" && <SignUp /> }
          {location.pathname === "/recoverpassword" && <RecoverPassword/> }
          
        </div>
      )}
      
      <Analytics />
    </>
  );
}

export default App;
