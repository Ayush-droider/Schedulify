import { useState } from "react";
import {
  primaryBtn,
  inputStyle,
} from "../utils/styles";
import { generateTimetable } from "../api/timetableApi";

function Generate() {
  const [loading, setLoading] = useState(false);
  const [entries, setEntries] = useState([]);

  const handleGenerate = async () => {
    try {
      setLoading(true);

      const res = await generateTimetable();

      setEntries(res.data);

      alert("Timetable generated successfully!");
    } catch (error) {
      console.log(error);
      alert("Generation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6">
        Generate Timetable
      </h1>

      <div className="bg-white p-6 rounded-xl shadow">
        <button
          className={primaryBtn}
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading
            ? "Generating..."
            : "Generate Timetable"}
        </button>
      </div>

      {entries.length > 0 && (
        <div className="mt-8 bg-white rounded-xl shadow p-6 overflow-x-auto">
          <h2 className="text-2xl font-semibold mb-4">
            Generated Entries
          </h2>

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-100">
                <th className="border p-3">
                  Teacher
                </th>
                <th className="border p-3">
                  Subject
                </th>
                <th className="border p-3">
                  Class
                </th>
                <th className="border p-3">
                  Room
                </th>
                <th className="border p-3">
                  Day
                </th>
                <th className="border p-3">
                  Time
                </th>
              </tr>
            </thead>

            <tbody>
              {entries.map(
                (e, index) => (
                  <tr
                    key={index}
                    className="hover:bg-slate-50"
                  >
                    <td className="border p-3">
                      {e.teacherName}
                    </td>

                    <td className="border p-3">
                      {e.subjectName}
                    </td>

                    <td className="border p-3">
                      {e.classGroupName}
                    </td>

                    <td className="border p-3">
                      {e.roomNumber}
                    </td>

                    <td className="border p-3">
                      {e.day}
                    </td>

                    <td className="border p-3">
                      {e.startTime} -{" "}
                      {e.endTime}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Generate;