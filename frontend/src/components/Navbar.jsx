import { LogOut, Settings } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link, useLocation } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { motion } from "framer-motion";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  const location = useLocation();

  const navLink = (to, label, icon) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all
          ${isActive ? "bg-indigo-500 text-white shadow-md" : "hover:bg-gray-100/60 text-gray-700"}`}
      >
        {icon}
        <span className="hidden sm:inline">{label}</span>
      </Link>
    );
  };

  return (
    <header className="fixed w-full top-0 z-40 bg-white/70 backdrop-blur-lg border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 hover:opacity-80 transition-all"
          >
            <motion.img
              src="https://img.icons8.com/3d-fluency/94/chat.png"
              alt="chat"
              className="w-10 h-10 drop-shadow-md"
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 200 }}
            />
            <h1 className="text-xl font-extrabold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Chatty
            </h1>
          </Link>

          {/* Nav Actions */}
          <div className="flex items-center gap-3">
            {navLink("/settings", "Settings", <Settings className="w-4 h-4" />)}

            {authUser && (
              <>
                {navLink("/profile", "Profile", <FaUser className="w-4 h-4" />)}

                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-all shadow-md"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
