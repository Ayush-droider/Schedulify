import { CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/login");
  };

  return (
    <div className="h-16 bg-white border-b shadow-sm px-6 flex justify-between items-center">

      <div className="flex items-center gap-3">
        <CalendarDays className="text-indigo-600" />

        <h1 className="font-bold text-xl text-slate-800">
          Schedulify
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-slate-500">
          Smart Timetable Generator
        </span>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

    </div>
  );
}

export default Navbar;