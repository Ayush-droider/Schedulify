import { Bell, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/login");
  };

  let title = "";
  let subtitle = "";
  let badge = "";

  switch (role) {
    case "ROLE_ADMIN":
      title = "Admin Dashboard";
      subtitle = "Manage teachers, subjects, rooms and timetable generation.";
      badge = "Administrator";
      break;

    case "ROLE_TEACHER":
      title = "Teacher Portal";
      subtitle = "View timetable, teachers and subjects.";
      badge = "Teacher";
      break;

    case "ROLE_STUDENT":
      title = "Student Portal";
      subtitle = "View your timetable and academic information.";
      badge = "Student";
      break;

    default:
      title = "Dashboard";
      subtitle = "Welcome to Schedulify.";
      badge = "User";
  }

  return (
    <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between shadow-sm">

      {/* Left */}

      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          {title}
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          {subtitle}
        </p>
      </div>

      {/* Right */}

      <div className="flex items-center gap-6">

        <button className="relative rounded-xl p-3 hover:bg-slate-100 transition">
          <Bell className="text-slate-600" size={22} />

          <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-red-500"></span>
        </button>

        <div className="flex items-center gap-3">

          <div className="h-11 w-11 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow">
            {badge.charAt(0)}
          </div>

          <div className="hidden md:block">
            <h3 className="font-semibold text-slate-800">
              {badge}
            </h3>

            <p className="text-sm text-slate-500">
              {role}
            </p>
          </div>

        </div>

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