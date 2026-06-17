import { useEffect, useState } from "react";
import {
  primaryBtn,
  secondaryBtn,
  editBtn,
  deleteBtn,
  inputStyle,
} from "../utils/styles";
import { useParams } from "react-router-dom";
import {
  getRunById,
  exportPdf,
  exportExcel,
} from "../api/timetableApi";

function TimetableView() {
  const { id } = useParams();

  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState("");

  const days = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
  ];

  useEffect(() => {
    fetchTimetable();
  }, []);

  const fetchTimetable = async () => {
    try {
      setLoading(true);

      const response = await getRunById(id);

      setEntries(response.data);

      if (response.data.length > 0) {
        setSelectedClass(response.data[0].classGroupName);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to fetch timetable");
    } finally {
      setLoading(false);
    }
  };

  const handleExportPdf = async () => {
    try {
      const response = await exportPdf(id);

      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );

      const link = document.createElement("a");

      link.href = url;
      link.download = `timetable-${id}.pdf`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Failed to export PDF");
    }
  };

    const handleExportExcel = async () => {
      try {
        const response = await exportExcel(id);

        const url = window.URL.createObjectURL(
          new Blob([response.data])
        );

        const link = document.createElement("a");

        link.href = url;
        link.download = `timetable-${id}.xlsx`;

        document.body.appendChild(link);
        link.click();
        link.remove();

        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error(error);
        alert("Failed to export Excel");
      }
    };

  // Unique class groups
  const classGroups = [
    ...new Set(
      entries.map((entry) => entry.classGroupName)
    ),
  ];

  // Filter entries by selected class
  const filteredEntries = entries.filter(
    (entry) =>
      entry.classGroupName === selectedClass
  );

  // Unique time slots
  const timeSlots = [
    ...new Set(
      entries.map(
        (entry) =>
          `${entry.startTime} - ${entry.endTime}`
      )
    ),
  ].sort();

  const getEntry = (day, timeSlot) => {
    return filteredEntries.find(
      (entry) =>
        entry.day === day &&
        `${entry.startTime} - ${entry.endTime}` ===
          timeSlot
    );
  };

  if (loading) {
    return (
      <div className="p-6 text-2xl font-semibold">
        Loading timetable...
      </div>
    );
  }

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">
          Timetable #{id}
        </h1>

        <div className="flex gap-3">
          <button
              className="
                  bg-indigo-600
                  hover:bg-indigo-700
                  text-white
                  px-5
                  py-2
                  rounded-xl
                  shadow-md
                  hover:shadow-lg
                  transition-all
                  duration-300
                "
            onClick={handleExportPdf}
          >
            Export PDF
          </button>

          <button
              className="
                  bg-indigo-600
                  hover:bg-indigo-700
                  text-white
                  px-5
                  py-2
                  rounded-xl
                  shadow-md
                  hover:shadow-lg
                  transition-all
                  duration-300
                "
            onClick={handleExportExcel}
          >
            Export Excel
          </button>
        </div>
      </div>

      {/* Class Group Filter */}
      <div className="mb-6 flex items-center gap-3">
        <label className="font-semibold text-lg">
          Class Group:
        </label>

        <select
          value={selectedClass}
          onChange={(e) =>
            setSelectedClass(e.target.value)
          }
          className="border border-gray-300 rounded-lg px-4 py-2"
        >
          {classGroups.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>
      </div>

      {/* Timetable */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-slate-800 text-white">
              <th className="border p-4">
                Day
              </th>

              {timeSlots.map((slot) => (
                <th
                  key={slot}
                  className="border p-4"
                >
                  {slot}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {days.map((day) => (
              <tr key={day}>
                <td className="border p-4 font-bold bg-slate-100">
                  {day}
                </td>

                {timeSlots.map((slot) => {
                  const entry = getEntry(day, slot);

                  return (
                    <td
                      key={slot}
                      className="border p-2 align-top min-w-[220px] h-36"
                    >
                      {entry ? (
                        <div className="bg-blue-50 rounded-lg p-3 h-full">
                          <p className="font-bold text-blue-700 text-lg">
                            {entry.subjectName}
                          </p>

                          <p className="text-sm mt-2">
                            👨‍🏫 {entry.teacherName}
                          </p>

                          <p className="text-sm">
                            🏫 {entry.roomNumber}
                          </p>

                          <p className="text-sm text-gray-600">
                            {entry.classGroupName}
                          </p>
                        </div>
                      ) : (
                        <div className="text-center text-gray-300 text-xl">
                          -
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default TimetableView;