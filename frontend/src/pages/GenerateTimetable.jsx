import { useMemo, useState } from "react";
import { primaryBtn } from "../utils/styles";
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

  const totalTeachers = useMemo(
    () => new Set(entries.map((e) => e.teacherName)).size,
    [entries]
  );

  const totalRooms = useMemo(
    () => new Set(entries.map((e) => e.roomNumber)).size,
    [entries]
  );

  return (
      <div className="min-h-screen bg-slate-50 p-6">

        {/* Header */}

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <div className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">

              🤖 AI Powered Timetable Generator

            </div>

            <h1 className="mt-3 text-4xl font-bold text-slate-900">

              Generate Timetable

            </h1>

            <p className="mt-2 max-w-2xl text-slate-500">

              Generate an optimized timetable using Timefold Solver while considering
              teacher availability, room allocation, class assignments and scheduling
              constraints.

            </p>

          </div>

          <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-lg">

            <p className="text-sm text-blue-100">

              Generated Entries

            </p>

            <h2 className="mt-2 text-4xl font-bold">

              {entries.length}

            </h2>

          </div>

        </div>

        {/* Statistics */}

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <p className="text-sm text-slate-500">

              Teachers Scheduled

            </p>

            <h3 className="mt-3 text-3xl font-bold text-slate-900">

              {totalTeachers}

            </h3>

          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <p className="text-sm text-slate-500">

              Rooms Utilized

            </p>

            <h3 className="mt-3 text-3xl font-bold text-slate-900">

              {totalRooms}

            </h3>

          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <p className="text-sm text-slate-500">

              Timetable Entries

            </p>

            <h3 className="mt-3 text-3xl font-bold text-slate-900">

              {entries.length}

            </h3>

          </div>

        </div>

        {/* Generate Card */}

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <h2 className="text-2xl font-bold text-slate-900">

                Generate Optimized Timetable

              </h2>

              <p className="mt-2 max-w-2xl text-slate-500">

                Timefold Solver will automatically assign teachers, classrooms,
                subjects and time slots while satisfying scheduling constraints and
                minimizing conflicts.

              </p>

            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className={`${primaryBtn} min-w-[230px]`}
            >
              {loading
                ? "Generating Timetable..."
                : "⚡ Generate Timetable"}
            </button>

          </div>

        </div>

        {/* Empty State */}

        {!loading && entries.length === 0 && (

          <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center">

            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-5xl">

              🤖

            </div>

            <h2 className="mt-6 text-2xl font-bold text-slate-900">

              Ready to Generate

            </h2>

            <p className="mx-auto mt-3 max-w-xl text-slate-500">

              Click the <strong>Generate Timetable</strong> button to let Timefold
              create an optimized timetable based on your teachers, rooms,
              assignments, availability and scheduling constraints.

            </p>

          </div>

        )}

        {entries.length > 0 && (

          <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-200 px-6 py-5">

              <h2 className="text-2xl font-bold text-slate-900">

                Generated Timetable

              </h2>

              <p className="mt-1 text-sm text-slate-500">

                Optimized schedule generated successfully.

              </p>

            </div>

                    <div className="overflow-x-auto">

                      <table className="min-w-full">

                        <thead className="bg-slate-100">

                          <tr className="text-left text-sm font-semibold text-slate-700">

                            <th className="px-6 py-4">

                              Schedule

                            </th>

                            <th className="px-6 py-4">

                              Room

                            </th>

                            <th className="px-6 py-4">

                              Day

                            </th>

                            <th className="px-6 py-4">

                              Time

                            </th>

                          </tr>

                        </thead>

                        <tbody>

                          {entries.map((entry, index) => (

                            <tr
                              key={index}
                              className="border-t border-slate-200 transition hover:bg-blue-50"
                            >

                              <td className="px-6 py-5">

                                <div className="space-y-3">

                                  <div className="flex items-center gap-3">

                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">

                                      👨‍🏫

                                    </div>

                                    <div>

                                      <p className="text-xs uppercase tracking-wide text-slate-400">

                                        Teacher

                                      </p>

                                      <h3 className="font-semibold text-slate-900">

                                        {entry.teacherName}

                                      </h3>

                                    </div>

                                  </div>

                                  <div className="ml-5 border-l-2 border-dashed border-blue-200 pl-6">

                                    <span className="inline-flex rounded-full bg-sky-100 px-3 py-1 text-sm font-semibold text-sky-700">

                                      📘 {entry.subjectName}

                                    </span>

                                  </div>

                                  <div className="ml-5 border-l-2 border-dashed border-blue-200 pl-6">

                                    <span className="inline-flex rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700">

                                      🎓 {entry.classGroupName}

                                    </span>

                                  </div>

                                </div>

                              </td>

                              <td className="px-6 py-5">

                                <span className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">

                                  🏫 {entry.roomNumber}

                                </span>

                              </td>

                              <td className="px-6 py-5">

                                <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">

                                  📅 {entry.day}

                                </span>

                              </td>

                              <td className="px-6 py-5">

                                <span className="inline-flex rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">

                                  ⏰ {entry.startTime} - {entry.endTime}

                                </span>

                              </td>

                            </tr>

                          ))}

                        </tbody>

                      </table>

                    </div>

                  </div>

                )}

              </div>

            );

            }

            export default Generate;