import {
  Search,
  RefreshCw,
  Eye,
  Trash2,
  CalendarDays,
  Trophy,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRuns, deleteRun } from "../api/timetableApi";

function Runs() {
  const navigate = useNavigate();

  const [runs, setRuns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchRuns();
  }, []);

  const fetchRuns = async () => {
    try {
      setLoading(true);
      const response = await getRuns();
      setRuns(response.data);
    } catch (error) {
      console.error("Error fetching runs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this run?"
    );

    if (!confirmDelete) return;

    try {
      await deleteRun(id);
      fetchRuns();
    } catch (error) {
      console.error(error);
      alert("Failed to delete run");
    }
  };

  const filteredRuns = runs.filter((run) =>
    run.id.toString().includes(search)
  );

  if (loading) {
    return (
      <div className="p-8 text-xl font-semibold">
        Loading timetable runs...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">

      {/* Header */}

      <div className="mb-8">

        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">

          <div>

            <h1 className="text-4xl font-bold text-slate-800">
              Timetable Runs
            </h1>

            <p className="mt-2 text-slate-500">
              View, manage and export generated timetable runs.
            </p>

          </div>

          <button
            onClick={fetchRuns}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700 transition"
          >
            <RefreshCw size={18} />
            Refresh
          </button>

        </div>

        {/* Search */}

        <div className="relative mt-6 max-w-md">

          <Search
            size={18}
            className="absolute left-4 top-3.5 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search by Run ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
          />

        </div>

      </div>

      {/* Table */}

      <div className="overflow-x-auto rounded-2xl bg-white shadow">

        <table className="min-w-full">

          <thead className="bg-slate-50">

            <tr className="text-left text-xs uppercase tracking-wider text-slate-600">

              <th className="px-6 py-4">
                Run ID
              </th>

              <th className="px-6 py-4">
                Score
              </th>

              <th className="px-6 py-4">
                Status
              </th>

              <th className="px-6 py-4">
                Generated At
              </th>

              <th className="px-6 py-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredRuns.length > 0 ? (

              filteredRuns.map((run) => (

                <tr
                  key={run.id}
                  className="border-t hover:bg-slate-50 transition"
                >

                  <td className="px-6 py-5">

                    <span className="font-bold text-blue-600">
                      #{run.id}
                    </span>

                  </td>

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-2">

                      <Trophy
                        size={18}
                        className="text-yellow-500"
                      />

                      <span className="font-medium">
                        {run.score}
                      </span>

                    </div>

                  </td>

                  <td className="px-6 py-5">

                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                      {run.status}
                    </span>

                  </td>

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-2 text-slate-600">

                      <CalendarDays
                        size={17}
                        className="text-slate-400"
                      />

                      {new Date(run.generatedAt).toLocaleString()}

                    </div>

                  </td>

                  <td className="px-6 py-5">

                    <div className="flex justify-center gap-3">

                      <button
                        onClick={() =>
                          navigate(`/timetable/${run.id}`)
                        }
                        className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
                      >
                        <Eye size={16} />
                        View
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(run.id)
                        }
                        className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600 transition"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="5"
                  className="py-16 text-center text-slate-500"
                >
                  No timetable runs found.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Runs;