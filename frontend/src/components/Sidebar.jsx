import {
  LayoutDashboard,
  Users,
  BookOpen,
  Building,
  Clock3,
  Layers,
  ClipboardList,
  CalendarCheck,
  PlayCircle,
  History,
  Calendar,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const adminMenus = [
  { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Teachers", path: "/admin/teachers", icon: Users },
  { name: "Subjects", path: "/admin/subjects", icon: BookOpen },
  { name: "Rooms", path: "/admin/rooms", icon: Building },
  { name: "Class Groups", path: "/admin/classgroups", icon: Layers },
  { name: "Time Slots", path: "/admin/timeslots", icon: Clock3 },
  { name: "Assignments", path: "/admin/assignments", icon: ClipboardList },
  { name: "Availability", path: "/admin/availability", icon: CalendarCheck },
  { name: "Generate", path: "/admin/generate", icon: PlayCircle },
  { name: "Runs", path: "/admin/runs", icon: History },
];

const teacherMenus = [
  { name: "Dashboard", path: "/teacher/dashboard", icon: LayoutDashboard },
  { name: "Subjects", path: "/teacher/subjects", icon: BookOpen },
  { name: "Teachers", path: "/teacher/teachers", icon: Users },
  { name: "Timetable Runs", path: "/teacher/runs", icon: History },
];

const studentMenus = [
  { name: "Dashboard", path: "/student/dashboard", icon: LayoutDashboard },
  { name: "Timetable Runs", path: "/student/runs", icon: History },
];

function Sidebar() {
    const role = localStorage.getItem("role");
    const menus =
      role === "ROLE_ADMIN"
        ? adminMenus
        : role === "ROLE_TEACHER"
        ? teacherMenus
        : studentMenus;
  return (
    <aside className="w-72 min-h-screen bg-white border-r border-slate-200 shadow-sm flex flex-col">

      <div className="px-6 py-8 border-b border-slate-200">
        <h1 className="text-3xl font-extrabold text-blue-600 tracking-tight">
          Schedulify
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Smart Timetable Generator
        </p>

        <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-blue-500">
          {role === "ROLE_ADMIN"
            ? "Administrator"
            : role === "ROLE_TEACHER"
            ? "Teacher Portal"
            : "Student Portal"}
        </p>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">

        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <NavLink
              key={menu.path}
              to={menu.path}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-slate-700 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1"
                }`
              }
            >
              <Icon size={20} />
              <span>{menu.name}</span>
            </NavLink>
          );
        })}

      </nav>
    </aside>
  );
}

export default Sidebar;