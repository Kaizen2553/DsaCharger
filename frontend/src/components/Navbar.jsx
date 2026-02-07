import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

function Navbar() {
  const [isOpen, setisOpen] = useState(false);
  const { authUser,logout } = useAuthStore();

  const handleLogout = () => {
        logout();
  }
  return (
    <>
      {!authUser ? (
         <>
          <nav className="bg-slate-900 h-16 flex items-center">
            <div className="p-10">
              <h1 className="text-purple-500 font-bold text-2xl">DsaCharger</h1>
            </div>

            <div className="ml-auto hidden md:flex gap-6 items-center p-10">
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>

            

            <div className="ml-auto p-10 md:hidden">
              <button
                onClick={() => {
                  setisOpen(true);
                }}
                className="text-xl font-bold"
              >
                ⁝|||
              </button>
            </div>
          </nav>
          {/* overlay here */}
          {isOpen && (
            <div
              onClick={() => {
                setisOpen(false);
              }}
              className="inset-0 md:hidden fixed bg-white/30 z-40"
            />
          )}

          <div
            className={`bg-slate-950 md:hidden fixed top-0 z-50 right-0 h-full w-64 text-white transform transition-transform duration-600
       ${isOpen ? "translate-x-0" : "translate-x-full"}`}
          >
            <div className="flex flex-col gap-6  px-3 mt-6 text-lg">
              <Link
                to="/login"
                className="hover:text-purple-400 px-4 py-2 rounded-lg hover:bg-slate-800 focus:outline-none"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hover:text-purple-400 px-4 py-2 rounded-lg hover:bg-slate-800 focus:outline-none"
              >
                Register
              </Link>
              
            </div>
          </div>
        </>
      ) : (
        <>
          <nav className="bg-slate-900 h-16 flex items-center">
            <div className="p-10">
              <h1 className="text-purple-500 font-bold text-2xl">DsaCharger</h1>
            </div>

            <div className="ml-auto hidden md:flex gap-6 items-center p-10">
              <Link to="/">Dashboard</Link>
              <Link to="/problems">Problems</Link>
             
              <button onClick={handleLogout} className="btn btn-sm text-slate-900 bg-purple-300 hover:bg-purple-500">
                logout
              </button>
            </div>

           

            <div className="ml-auto p-10 md:hidden">
              <button
                onClick={() => {
                  setisOpen(true);
                }}
                className="text-xl font-bold"
              >
                ⁝|||
              </button>
            </div>
          </nav>
          {/* overlay here */}
          {isOpen && (
            <div
              onClick={() => {
                setisOpen(false);
              }}
              className="inset-0 md:hidden fixed bg-white/30 z-40"
            />
          )}

          <div
            className={`bg-slate-950 md:hidden fixed top-0 z-50 right-0 h-full w-64 text-white transform transition-transform duration-600
       ${isOpen ? "translate-x-0" : "translate-x-full"}`}
          >
            <div className="flex flex-col gap-6  px-3 mt-6 text-lg">
              <Link
                to="/"
                className="hover:text-purple-400 px-4 py-2 rounded-lg hover:bg-slate-800 focus:outline-none"
              >
                Dashboard
              </Link>
              <Link
                to="/problems"
                className="hover:text-purple-400 px-4 py-2 rounded-lg hover:bg-slate-800 focus:outline-none"
              >
                Problems
              </Link>
              <button onClick={handleLogout} className="hover:text-purple-400 px-4 py-2 rounded-lg hover:bg-slate-800 focus:outline-none text-left w-full">
                Logout
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Navbar;
