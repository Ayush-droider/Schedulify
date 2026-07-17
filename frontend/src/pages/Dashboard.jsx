import { useEffect, useState } from "react";
import {
  Users,
  BookOpen,
  Building,
  Layers,
  History,
  Trophy,
  Clock3,
  PlayCircle,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import {
  primaryBtn,
  secondaryBtn,
} from "../utils/styles";
import { getStats } from "../api/timetableApi";
import StatsCard from "../components/StatsCard";
import { useNavigate } from "react-router-dom";



function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);

      const response = await getStats();
      console.log(response.data);

      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-2xl font-semibold">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="p-8 bg-slate-50 min-h-screen">

      {/* ================= Hero Section ================= */}

      <div className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-xl">

        <div className="flex flex-col lg:flex-row justify-between items-center gap-10 p-10">

          {/* Left */}
          <div className="max-w-3xl">

            <p className="text-blue-100 text-lg mb-3">
              Welcome Back 👋
            </p>

            <h1 className="text-5xl font-extrabold">
              Schedulify
            </h1>

            <h2 className="mt-2 text-2xl font-semibold text-blue-100">
              Smart Timetable Generator
            </h2>

            <p className="mt-6 text-blue-100 leading-8 text-lg">
              Generate optimized, conflict-free academic timetables
              for educational institutions using intelligent
              constraint optimization.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">

              <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur">
                ✓ Optimized with Timefold
              </span>

              <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur">
                Built by Ayush Pandey
              </span>

            </div>

          </div>

          {/* Right */}

          <div className="flex flex-col items-center">

            <button
              className={primaryBtn}
              onClick={() => navigate("/generate")}
            >
              Generate Timetable
            </button>

            <p className="mt-4 text-sm text-blue-100 text-center">
              Create an optimized timetable in seconds
            </p>

          </div>

        </div>

      </div>

      {/* ================= Dashboard Header ================= */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h2 className="text-3xl font-bold text-slate-800">
            Dashboard Overview
          </h2>

          <p className="text-slate-500 mt-2">
            Monitor your timetable generation and academic resources.
          </p>

        </div>

        <button
          className={secondaryBtn}
          onClick={fetchStats}
        >
          Refresh Statistics
        </button>

      </div>

      {/* ================= Stats ================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatsCard
          title="Teachers"
          value={stats?.totalTeachers}
          icon={Users}
          subtitle="Registered Teachers"
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
        />

        <StatsCard
          title="Subjects"
          value={stats?.totalSubjects}
          icon={BookOpen}
          subtitle="Available Subjects"
          iconBg="bg-green-100"
          iconColor="text-green-600"
        />

        <StatsCard
          title="Rooms"
          value={stats?.totalRooms}
          icon={Building}
          subtitle="Available Rooms"
          iconBg="bg-orange-100"
          iconColor="text-orange-600"
        />

        <StatsCard
          title="Class Groups"
          value={stats?.totalClassGroups}
          icon={Layers}
          subtitle="Academic Classes"
          iconBg="bg-purple-100"
          iconColor="text-purple-600"
        />

        <StatsCard
          title="Total Runs"
          value={stats?.totalRun}
          icon={History}
          subtitle="Generated Timetables"
          iconBg="bg-cyan-100"
          iconColor="text-cyan-600"
        />

        <StatsCard
          title="Latest Run"
          value={stats?.latestRun}
          icon={Clock3}
          subtitle="Most Recent Run"
          iconBg="bg-yellow-100"
          iconColor="text-yellow-600"
        />

        <StatsCard
          title="Best Score"
          value={stats?.bestScore}
          icon={Trophy}
          subtitle="Optimization Score"
          iconBg="bg-pink-100"
          iconColor="text-pink-600"
        />

      </div>

      <div className="mt-10 grid grid-cols-1 xl:grid-cols-2 gap-8">

        {/* Quick Actions */}

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">

          <div className="flex items-center gap-3 mb-6">

            <Sparkles className="text-blue-600" />

            <h2 className="text-2xl font-bold text-slate-800">
              Quick Actions
            </h2>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <button
              onClick={() => navigate("/generate")}
              className="rounded-2xl border border-blue-200 bg-blue-50 p-5 hover:bg-blue-100 transition"
            >
              <PlayCircle className="text-blue-600 mb-3" />
              <h3 className="font-semibold">
                Generate
              </h3>
              <p className="text-sm text-slate-500">
                Create timetable
              </p>
            </button>

            <button
              onClick={() => navigate("/teachers")}
              className="rounded-2xl border border-slate-200 p-5 hover:bg-slate-50 transition"
            >
              <Users className="text-blue-600 mb-3" />
              <h3 className="font-semibold">
                Teachers
              </h3>
              <p className="text-sm text-slate-500">
                Manage faculty
              </p>
            </button>

            <button
              onClick={() => navigate("/subjects")}
              className="rounded-2xl border border-slate-200 p-5 hover:bg-slate-50 transition"
            >
              <BookOpen className="text-blue-600 mb-3" />
              <h3 className="font-semibold">
                Subjects
              </h3>
              <p className="text-sm text-slate-500">
                View subjects
              </p>
            </button>

            <button
              onClick={() => navigate("/runs")}
              className="rounded-2xl border border-slate-200 p-5 hover:bg-slate-50 transition"
            >
              <History className="text-blue-600 mb-3" />
              <h3 className="font-semibold">
                Runs
              </h3>
              <p className="text-sm text-slate-500">
                Generated timetables
              </p>
            </button>

          </div>

        </div>

        {/* Solver Status */}

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">

          <div className="flex items-center gap-3 mb-6">

            <CheckCircle2 className="text-green-600" />

            <h2 className="text-2xl font-bold text-slate-800">
              Solver Status
            </h2>

          </div>

          <div className="space-y-5">

            <div className="flex justify-between">

              <span className="text-slate-500">
                Engine
              </span>

              <span className="font-semibold text-blue-600">
                Timefold
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-slate-500">
                Status
              </span>

              <span className="text-green-600 font-semibold">
                Ready
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-slate-500">
                Latest Run
              </span>

              <span className="font-semibold">
                {stats?.latestRun ?? "-"}
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-slate-500">
                Best Score
              </span>

              <span className="font-semibold">
                {stats?.bestScore ?? "-"}
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;