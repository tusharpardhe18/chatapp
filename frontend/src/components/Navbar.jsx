import { Settings } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <Link
            to="/"
            className="flex items-center gap-2.5 hover:opacity-80 transition-all"
          >
            <div className="flex items-center justify-center">
              <img
                width="94"
                height="94"
                src="https://img.icons8.com/3d-fluency/94/chat.png"
                alt="chat"
                className="w-12 h-12"
              />
            </div>
            <h1 className="text-lg font-bold">Chatty</h1>
          </Link>
        </div>

        <div className="flex items-center gap-2 ">
          <Link
            to={"/settings"}
            className={`btn btn-sm gap-2 transition-colors`}
          >
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Settings</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
