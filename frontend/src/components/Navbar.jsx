import {
  Bell,
  CalendarDays,
  LogOut,
  UserCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const role = localStorage.getItem("role") || "ADMIN";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/login");
  };

  return (
    <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between shadow-sm">

      {/* Left Side */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          Welcome back! Manage your institution efficiently.
        </p>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">

        {/* Notification */}
        <button className="relative rounded-xl p-3 hover:bg-slate-100 transition">
          <Bell className="text-slate-600" size={22} />

          <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-red-500"></span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3">

          <div className="h-11 w-11 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow">
            AP
          </div>

          <div className="hidden md:block">
            <h3 className="font-semibold text-slate-800">
              Ayush Pandey
            </h3>

            <p className="text-sm text-slate-500 capitalize">
              {role.toLowerCase()}
            </p>
          </div>

        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2.5 text-white font-medium transition hover:bg-red-600 shadow-sm"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </header>
  );
}

export default Navbar;