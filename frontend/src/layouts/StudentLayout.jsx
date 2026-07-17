import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function StudentLayout() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default StudentLayout;