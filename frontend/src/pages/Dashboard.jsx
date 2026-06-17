import { useEffect, useState } from "react";
import { primaryBtn } from "../utils/styles";
import { getStats } from "../api/timetableApi";
import StatsCard from "../components/StatsCard";

function Dashboard() {
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
    <div className="p-6">
      {/* Heading */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            Dashboard
          </h1>

          <p className="text-slate-500 mt-2">
            Manage and generate optimized timetables effortlessly.
          </p>
        </div>

        <button
          className={primaryBtn}
          onClick={fetchStats}
        >
          Refresh Stats
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard
          title="Total Runs"
          value={stats?.totalRun}
          color="text-blue-600"
        />

        <StatsCard
          title="Latest Run"
          value={stats?.latestRun}
          color="text-green-600"
        />

        <StatsCard
          title="Best Score"
          value={stats?.bestScore}
          color="text-purple-600"
        />

        <StatsCard
          title="Teachers"
          value={stats?.totalTeachers}
          color="text-orange-600"
        />

        <StatsCard
          title="Subjects"
          value={stats?.totalSubjects}
          color="text-red-600"
        />

        <StatsCard
          title="Rooms"
          value={stats?.totalRooms}
          color="text-indigo-600"
        />

        <StatsCard
          title="Class Groups"
          value={stats?.totalClassGroups}
          color="text-pink-600"
        />
      </div>
    </div>
  );
}

export default Dashboard;