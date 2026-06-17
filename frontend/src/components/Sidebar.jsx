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
  History
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menus = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Teachers", path: "/teachers", icon: Users },
  { name: "Subjects", path: "/subjects", icon: BookOpen },
  { name: "Rooms", path: "/rooms", icon: Building },
  { name: "Class Groups", path: "/classgroups", icon: Layers },
  { name: "Time Slots", path: "/timeslots", icon: Clock3 },
  { name: "Assignments", path: "/assignments", icon: ClipboardList },
  { name: "Availability", path: "/availability", icon: CalendarCheck },
  { name: "Generate", path: "/generate", icon: PlayCircle },
  { name: "Runs", path: "/runs", icon: History },
];

function Sidebar() {
  return (
    <div className="w-72 bg-slate-900 text-white min-h-screen p-5 shadow-xl">

      <h1 className="text-3xl font-bold mb-10 text-center">
        Schedulify
      </h1>

      <nav className="space-y-2">
        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <NavLink
              key={menu.path}
              to={menu.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-xl transition-all duration-300
                ${
                  isActive
                    ? "bg-indigo-600 shadow-lg"
                    : "hover:bg-slate-800"
                }`
              }
            >
              <Icon size={20} />
              {menu.name}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}

export default Sidebar;