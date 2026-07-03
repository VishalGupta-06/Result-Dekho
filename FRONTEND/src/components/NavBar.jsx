import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import UserContext from "../utilities/ContextApi.jsx";
import api from "../utilities/Api.js";




const navTag = [
  { label: "Home", to: "/home" },
  { label: "NIT Jamshedpur", to: "https://nitjsr.ac.in/" },
  { label: "Contact Us", to: "/contactus" },
  { label: "About", to: "/about" },
];

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutPending, setLogoutPending] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const { loggedIn, setLoggedIn } = useContext(UserContext);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (logoutPending && location.pathname === "/dashboard") {
      setLoggedIn(false);
      setLogoutPending(false);
      setMenuOpen(false);
    }
  }, [location.pathname, logoutPending, setLoggedIn]);

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

      <div className="relative h-[60px] bg-[#015cee] flex border-b border-blue-700/40 justify-between shadow-lg shadow-blue-950/10 px-3 sm:px-6">
        <Link to="/home" className="flex h-full min-w-0 items-center gap-3 text-white">
          <img
            src="../need/logo3 (2).png "
            className="h-full w-20 sm:w-28 object-contain"
          ></img>
          <div className="min-w-0 leading-tight">
            <p className="truncate text-sm sm:text-lg font-bold">
              NIT Jamshedpur
            </p>
            <p className="truncate text-[11px] sm:text-xs font-medium text-blue-100">
              CGPA Analyzer
            </p>
          </div>
        </Link>

        <div className="h-full flex flex-1 justify-end text-white items-center gap-3">
          <div className="hidden h-full md:flex flex-1 max-w-xl justify-around items-center text-sm lg:text-base font-medium">
            {navTag.map(({ label, to }) => (
              <div  key={label} >
                <Link
                  to={to}
                  className="rounded-full px-3 py-2 transition hover:bg-white/15"
                 
                  target={label === "NIT Jamshedpur" ? "_blank" : "_self"}
                  rel={label === "NIT Jamshedpur" ? "noopener noreferrer" : ""}
                >
                  {label}
                </Link>
              </div>
            ))}
          </div>

          { !loggedIn && (
            <div className="hidden h-full md:flex justify-center items-center">
            <Link to="/login" className="h-full flex justify-center items-center">
              <button className="bg-white text-[#015cee] h-10 px-4 sm:px-5 rounded-full mt-0.5 text-sm font-semibold shadow-sm transition hover:bg-blue-50">
                Sign in
              </button>
            </Link>
          </div>
          )}
          
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-white transition hover:bg-white/15 md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} />
          </button>
        </div>

        {menuOpen && (
          <div className="absolute left-3 right-3 top-[calc(100%+0.5rem)] z-[999] rounded-lg border border-blue-100 bg-white p-2 text-slate-800 shadow-xl md:hidden">
            <div className="flex flex-col">
              {navTag.map(({ label, to }) => (
                <Link
                  key={label}
                  to={to}
                  className="rounded-lg px-3 py-3 text-sm font-semibold transition hover:bg-blue-50 hover:text-[#015cee]"
                  target={label === "NIT Jamshedpur" ? "_blank" : "_self"}
                  rel={label === "NIT Jamshedpur" ? "noopener noreferrer" : ""}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}

              <div className="my-1 h-px bg-slate-100" />

              {!loggedIn ? (
                <Link
                  to="/login"
                  className="rounded-lg px-3 py-3 text-sm font-semibold text-[#015cee] transition hover:bg-blue-50"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign in
                </Link>
              ) : (
                <button
                  type="button"
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <FontAwesomeIcon icon={faArrowRightFromBracket} />
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default NavBar;
