import { useEffect, useState } from "react";
import { primaryBtn, deleteBtn } from "../utils/styles";
import { useNavigate } from "react-router-dom";
import { getRuns, deleteRun } from "../api/timetableApi";

function Runs() {
  const navigate = useNavigate();

  const [runs, setRuns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRuns();
  }, []);

  const fetchRuns = async () => {
    try {
      setLoading(true);

      const response = await getRuns();
      console.log(response.data);

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

  if (loading) {
    return (
      <div className="p-6 text-2xl font-semibold">
        Loading Runs...
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-slate-800">
          Timetable Runs
        </h1>

        <button
          className={primaryBtn}
          onClick={fetchRuns}
        >
          Refresh
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Score</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Generated At</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {runs.map((run) => (
              <tr
                key={run.id}
                className="border-b hover:bg-slate-50"
              >
                <td className="p-4 font-semibold">
                  {run.id}
                </td>

                <td className="p-4">
                  {run.score}
                </td>

                <td className="p-4">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    {run.status}
                  </span>
                </td>

                <td className="p-4">
                  {new Date(
                    run.generatedAt
                  ).toLocaleString()}
                </td>

                <td className="p-4">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() =>
                        navigate(
                          `/timetable/${run.id}`
                        )
                      }
                      className={primaryBtn}
                    >
                      View
                    </button>

                    <button
                      className={deleteBtn}
                      onClick={() =>
                        handleDelete(run.id)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {runs.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No timetable runs found.
          </div>
        )}
      </div>
    </div>
  );
}

export default Runs;