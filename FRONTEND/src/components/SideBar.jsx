import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandshake,
  faUserGraduate,
  faBuilding,
  faChartLine,
  faLeftRight,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import UserContext from "../utilities/ContextApi.jsx";
import SideBarSkeleton from "./SideBarcopy.jsx";
import { useQueryClient } from "@tanstack/react-query";
import api from "../utilities/Api.js";

const navItems = [
  { icon: faChartLine, label: "Dashboard", to: "/dashboard" },
  { icon: faBuilding, label: "Department", to: "/department" },
  { icon: faUserGraduate, label: "Leaderboard", to: "/topper" },
  { icon: faHandshake, label: "Compare", to: "/compare" },
];

function SideBar() {
  const [openClose, setOpenClose] = useState(true);
  const [logoutPending, setLogoutPending] = useState(false);
  const navigate = useNavigate(); // for nagivation
  const location = useLocation();

  const { loading, loggedIn, setLoggedIn } = useContext(UserContext);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (logoutPending && location.pathname === "/dashboard") {
      setLoggedIn(false);
      setLogoutPending(false);
    }
  }, [location.pathname, logoutPending, setLoggedIn]);

  if (loading) return <SideBarSkeleton />;

  const handleLogout = async () => {
    try {
      const res = await api.post(
        "/api/signout",
        {},
        { withCredentials: true },
      );

      queryClient.removeQueries({
        queryKey: ["student"],
      });

      if (res.data.success) {
        setLogoutPending(true);
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      console.log(error.response?.data ?? error.message);
    }
  };

  return (
    <>
      <div
        className={`h-auto md:h-full w-full ${openClose ? "md:w-[15vw]" : "md:w-[4vw]"} bg-[#015cee] top-13 border-b md:border-b-0 md:border-r border-blue-700/40 shadow-lg shadow-blue-950/10 transition-all duration-300 ease-in-out`}
      >
        <div className="w-full h-auto md:h-[80%] flex md:block overflow-x-auto md:overflow-visible">
          {/* Toggle button */}
          <div className="hidden md:flex h-[10%]">
            <div className="relative group h-full w-15 shrink-0 text-white flex justify-center items-center">
              <button
                className="rounded-lg p-2 transition hover:bg-white/15"
                onClick={() => setOpenClose(!openClose)}
              >
                <FontAwesomeIcon icon={faLeftRight} />
              </button>
              {!openClose && (
                <span className="absolute top-1/2 left-[110%] -translate-y-1/2 bg-black text-white text-sm px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-[9999] pointer-events-none">
                  Expand
                </span>
              )}
            </div>
          </div>

          {/* Nav items */}
          {navItems.map(({ icon, label, to }) => (
            <div
              key={label}
              className="h-16 md:h-[10%] flex flex-1 md:flex-none flex-col md:flex-row items-center justify-center md:justify-start"
            >
              {/* Icon as Link */}
              <div className="relative group h-9 md:h-full w-15 shrink-0 flex justify-center items-center">
                <Link
                  to={to}
                  className="text-white flex justify-center items-center w-11 h-11 rounded-xl transition hover:bg-white/15"
                >
                  <FontAwesomeIcon icon={icon} />
                </Link>
                {!openClose && (
                  <span className="absolute top-1/2 left-[110%] -translate-y-1/2 bg-black text-white text-sm px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-[9999] pointer-events-none">
                    {label}
                  </span>
                )}
              </div>

              {/* Label as Link — hidden when collapsed */}
              <span className="md:hidden text-[11px] font-semibold leading-none text-white/90">
                {label}
              </span>

              <div
                className={`hidden md:flex transition-opacity duration-300 ${openClose ? "opacity-100" : "opacity-0 pointer-events-none"} h-full items-center text-white text-base lg:text-[20px] font-medium pl-2 lg:pl-4 whitespace-nowrap`}
              >
                <Link
                  to={to}
                  className="text-white rounded-lg px-2 py-2 transition hover:bg-white/15"
                >
                  {label}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden md:flex w-full h-[20%]">
          {loggedIn && (
            <div className=" w-full h-[40%] relative top-3">
              <div key="Profile" className="h-full w-full flex items-center">
                {/* Icon as Link */}
                <div className="relative group h-full w-15 shrink-0 flex justify-center items-center">
                  <button
                    type="button"
                    className="text-white flex justify-center items-center w-11 h-11 rounded-xl transition hover:bg-white/15"
                    onClick={handleLogout}
                  >
                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                  </button>
                  {!openClose && (
                    <span className="absolute top-1/2 left-[110%] -translate-y-1/2 bg-black text-white text-sm px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-[9999] pointer-events-none">
                      LogOut
                    </span>
                  )}
                </div>

                {/* Label as Link — hidden when collapsed */}
                <div
                  className={`transition-opacity duration-300 ${openClose ? "opacity-100" : "opacity-0 pointer-events-none"} h-full flex items-center text-white text-base lg:text-[20px] font-medium pl-2 lg:pl-4 whitespace-nowrap`}
                >
                  <button
                    type="button"
                    className="text-white rounded-lg px-2 py-2 transition hover:bg-white/15 "
                    onClick={handleLogout}
                  >
                    LogOut
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SideBar;
