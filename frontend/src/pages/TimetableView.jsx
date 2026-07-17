import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Download,
  FileSpreadsheet,
  CalendarDays,
  Users,
  Clock3,
  GraduationCap,
} from "lucide-react";

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
    } catch (err) {
      console.error(err);
      alert("Failed to load timetable.");
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
    } catch (err) {
      console.error(err);
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
    } catch (err) {
      console.error(err);
      alert("Failed to export Excel");
    }
  };

  const classGroups = [
    ...new Set(entries.map((e) => e.classGroupName)),
  ];

  const filteredEntries = entries.filter(
    (e) => e.classGroupName === selectedClass
  );

  const timeSlots = [
    ...new Set(
      entries.map(
        (e) => `${e.startTime} - ${e.endTime}`
      )
    ),
  ].sort();

  const getEntry = (day, slot) =>
    filteredEntries.find(
      (e) =>
        e.day === day &&
        `${e.startTime} - ${e.endTime}` === slot
    );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="mt-3 text-sm text-slate-500">
            Loading timetable...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4">
              {/* Header */}

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5">

                <div>

                  <p className="text-blue-600 text-xs font-semibold uppercase tracking-wider">
                    Timetable Run
                  </p>

                  <h1 className="text-2xl font-bold text-slate-800 mt-1">
                    Timetable #{id}
                  </h1>

                  <p className="text-sm text-slate-500 mt-1">
                    Generated schedule for this solver run.
                  </p>

                </div>

                <div className="flex flex-wrap gap-2">

                  <button
                    onClick={handleExportPdf}
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
                  >
                    <Download size={15} />
                    PDF
                  </button>

                  <button
                    onClick={handleExportExcel}
                    className="flex items-center gap-2 rounded-lg border border-blue-600 bg-white px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 transition"
                  >
                    <FileSpreadsheet size={15} />
                    Excel
                  </button>

                </div>

              </div>

              {/* Summary */}

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">

                  <div className="flex items-center gap-3">

                    <CalendarDays className="text-blue-600" size={18} />

                    <div>

                      <p className="text-xs text-slate-500">
                        Run ID
                      </p>

                      <h3 className="text-lg font-bold">
                        #{id}
                      </h3>

                    </div>

                  </div>

                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">

                  <div className="flex items-center gap-3">

                    <GraduationCap className="text-green-600" size={18} />

                    <div>

                      <p className="text-xs text-slate-500">
                        Classes
                      </p>

                      <h3 className="text-lg font-bold">
                        {classGroups.length}
                      </h3>

                    </div>

                  </div>

                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">

                  <div className="flex items-center gap-3">

                    <Clock3 className="text-orange-500" size={18} />

                    <div>

                      <p className="text-xs text-slate-500">
                        Slots
                      </p>

                      <h3 className="text-lg font-bold">
                        {timeSlots.length}
                      </h3>

                    </div>

                  </div>

                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">

                  <div className="flex items-center gap-3">

                    <Users className="text-purple-600" size={18} />

                    <div>

                      <p className="text-xs text-slate-500">
                        Entries
                      </p>

                      <h3 className="text-lg font-bold">
                        {entries.length}
                      </h3>

                    </div>

                  </div>

                </div>

              </div>

              {/* Class Group */}

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-5">

                <div className="flex flex-col md:flex-row md:items-center gap-3">

                  <label className="text-sm font-semibold text-slate-700">
                    Class Group
                  </label>

                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="w-64 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none"
                  >
                    {classGroups.map((group) => (
                      <option key={group} value={group}>
                        {group}
                      </option>
                    ))}
                  </select>

                </div>

              </div>
                    {/* Timetable */}

                    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">

                      <table className="min-w-max border-collapse">

                        <thead className="bg-blue-600 text-white sticky top-0">

                          <tr>

                            <th className="border border-blue-500 px-3 py-2 text-left text-sm font-semibold w-28">
                              Day
                            </th>

                            {timeSlots.map((slot) => (

                              <th
                                key={slot}
                                className="border border-blue-500 px-2 py-2 text-center text-xs font-semibold min-w-[150px]"
                              >
                                {slot}
                              </th>

                            ))}

                          </tr>

                        </thead>

                        <tbody>

                          {days.map((day) => (

                            <tr
                              key={day}
                              className="hover:bg-slate-50"
                            >

                              <td className="border bg-slate-100 px-3 py-2 font-semibold text-sm text-slate-700">

                                {day}

                              </td>

                              {timeSlots.map((slot) => {

                                const entry = getEntry(day, slot);

                                return (

                                  <td
                                    key={slot}
                                    className="border p-1.5 align-top h-24 min-w-[140px]"
                                  >

                                    {entry ? (

                                      <div className="h-full rounded-md border border-blue-100 bg-blue-50 p-1.5 hover:bg-blue-100 transition">

                                        <div className="flex justify-between items-start">

                                          <span className="rounded bg-blue-600 px-2 py-0.5 text-[10px] font-semibold text-white">

                                            {entry.subjectName}

                                          </span>

                                        </div>

                                        <div className="mt-2 space-y-1">
                                                                        <div className="flex items-center gap-1 text-[11px] text-slate-700">

                                                                          <span>👨‍🏫</span>

                                                                          <span className="truncate">
                                                                            {entry.teacherName}
                                                                          </span>

                                                                        </div>

                                                                        <div className="flex items-center gap-1 text-[11px] text-slate-700">

                                                                          <span>🏫</span>

                                                                          <span className="truncate">
                                                                            {entry.roomNumber}
                                                                          </span>

                                                                        </div>

                                                                        <div className="flex items-center gap-1 text-[11px] text-slate-700">

                                                                          <span>🎓</span>

                                                                          <span className="truncate">
                                                                            {entry.classGroupName}
                                                                          </span>

                                                                        </div>

                                                                      </div>

                                                                    </div>

                                                                  ) : (

                                                                    <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50">

                                                                      <span className="text-[11px] text-slate-400">
                                                                        Free
                                                                      </span>

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
                                                        {/* Legend */}

                                                        <div className="mt-5 bg-white rounded-xl border border-slate-200 shadow-sm p-4">

                                                          <div className="flex flex-wrap items-center gap-6">

                                                            <div className="flex items-center gap-2">

                                                              <div className="h-4 w-4 rounded bg-blue-500"></div>

                                                              <span className="text-xs text-slate-600">
                                                                Scheduled Lecture
                                                              </span>

                                                            </div>

                                                            <div className="flex items-center gap-2">

                                                              <div className="h-4 w-4 rounded border border-dashed border-slate-400 bg-slate-50"></div>

                                                              <span className="text-xs text-slate-600">
                                                                Free Slot
                                                              </span>

                                                            </div>

                                                          </div>

                                                        </div>

                                                        {/* Footer */}

                                                        <div className="mt-5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 p-5 text-white">

                                                          <div className="flex flex-col lg:flex-row justify-between gap-5">

                                                            <div>

                                                              <h2 className="text-lg font-semibold">

                                                                Timetable Summary

                                                              </h2>

                                                              <p className="mt-1 text-xs text-blue-100">

                                                                Currently viewing

                                                                <span className="font-semibold text-white">

                                                                  {" "}{selectedClass}

                                                                </span>

                                                              </p>

                                                            </div>

                                                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

                                                              <div>

                                                                <p className="text-[11px] text-blue-200">

                                                                  Days

                                                                </p>

                                                                <h3 className="text-xl font-bold">

                                                                  {days.length}

                                                                </h3>

                                                              </div>

                                                              <div>

                                                                <p className="text-[11px] text-blue-200">

                                                                  Time Slots

                                                                </p>

                                                                <h3 className="text-xl font-bold">

                                                                  {timeSlots.length}

                                                                </h3>

                                                              </div>

                                                              <div>

                                                                <p className="text-[11px] text-blue-200">

                                                                  Entries

                                                                </p>

                                                                <h3 className="text-xl font-bold">

                                                                  {filteredEntries.length}

                                                                </h3>

                                                              </div>

                                                              <div>

                                                                <p className="text-[11px] text-blue-200">

                                                                  Run ID

                                                                </p>

                                                                <h3 className="text-xl font-bold">

                                                                  #{id}

                                                                </h3>

                                                              </div>

                                                            </div>

                                                          </div>

                                                        </div>
                                                            </div>
                                                          );
                                                        }

                                                        export default TimetableView;