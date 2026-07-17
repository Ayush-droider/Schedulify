import {
  CalendarDays,
  ArrowRight,
  GraduationCap,
  BookOpen,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function StudentDashboard() {
  return (
    <div className="space-y-8">

      {/* ================= Welcome ================= */}

      <div className="rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white shadow-lg">

        <h1 className="text-4xl font-bold">
          Welcome Student 🎓
        </h1>

        <p className="mt-3 max-w-2xl text-lg text-emerald-100">
          Welcome to the Schedulify Student Portal. View the latest
          generated timetable and stay updated with your class schedule.
        </p>

      </div>

      {/* ================= Quick Action ================= */}

      <div>

        <h2 className="mb-5 text-2xl font-bold text-slate-800">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <Link
            to="/student/runs"
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-white">
              <CalendarDays size={28} />
            </div>

            <h3 className="mt-6 text-xl font-semibold text-slate-800">
              Timetable Runs
            </h3>

            <p className="mt-2 text-slate-500">
              Browse all generated timetables and open the latest schedule.
            </p>

            <div className="mt-6 flex items-center font-medium text-emerald-600">
              Open
              <ArrowRight
                size={18}
                className="ml-2 transition group-hover:translate-x-1"
              />
            </div>

          </Link>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500 text-white">
              <GraduationCap size={28} />
            </div>

            <h3 className="mt-6 text-xl font-semibold text-slate-800">
              Student Portal
            </h3>

            <p className="mt-2 leading-7 text-slate-600">
              This portal provides read-only access to the published timetable.
              Contact your administrator if any schedule changes are required.
            </p>

          </div>

        </div>

      </div>

      {/* ================= Information ================= */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="flex items-center gap-3">

          <BookOpen className="text-blue-600" size={28} />

          <h2 className="text-2xl font-semibold text-slate-800">
            Academic Information
          </h2>

        </div>

        <p className="mt-4 leading-7 text-slate-600">
          The timetable displayed here is will be followed so be ready to be there in school along with your books and notebooks in proper school uniform.
        </p>

      </div>

    </div>
  );
}