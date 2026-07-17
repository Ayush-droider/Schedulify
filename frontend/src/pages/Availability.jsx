import React, { useEffect, useMemo, useState } from "react";

import {
  primaryBtn,
  secondaryBtn,
  editBtn,
  deleteBtn,
  inputStyle,
} from "../utils/styles";

import {
  getAvailabilities,
  createAvailability,
  updateAvailability,
  deleteAvailability,
  getTeachers,
  getTimeSlots,
} from "../api/timetableApi";

function Availability() {
  const [availabilities, setAvailabilities] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [timeslots, setTimeslots] = useState([]);

  const [teacherId, setTeacherId] = useState("");
  const [timeslotId, setTimeslotId] = useState("");
  const [available, setAvailable] = useState(true);

  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [availabilityRes, teacherRes, timeslotRes] =
        await Promise.all([
          getAvailabilities(),
          getTeachers(),
          getTimeSlots(),
        ]);

      setAvailabilities(availabilityRes.data);
      setTeachers(teacherRes.data);
      setTimeslots(timeslotRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  const resetForm = () => {
    setTeacherId("");
    setTimeslotId("");
    setAvailable(true);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      teacherId: Number(teacherId),
      timeslotId: Number(timeslotId),
      available,
    };

    try {
      if (editingId) {
        await updateAvailability(editingId, data);
      } else {
        await createAvailability(data);
      }

      loadData();
      resetForm();
    } catch (error) {
      console.log(error);
      alert(JSON.stringify(error.response?.data));
    }
  };

  const handleEdit = (a) => {
    setEditingId(a.id);
    setTeacherId(a.teacher.id);
    setTimeslotId(a.timeslot.id);
    setAvailable(a.available);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete Availability?")) return;

    await deleteAvailability(id);
    loadData();
  };

  const filteredAvailabilities = useMemo(() => {
    const value = search.toLowerCase();

    return availabilities.filter((a) => {
      return (
        a.teacher?.name
          ?.toLowerCase()
          .includes(value) ||
        a.timeslot?.day
          ?.toLowerCase()
          .includes(value)
      );
    });
  }, [availabilities, search]);

  return (<div className="min-h-screen bg-slate-50 p-6">

            {/* Header */}

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

              <div>

                <div className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">

                  📅 Teaching Availability Management

                </div>

                <h1 className="mt-3 text-4xl font-bold text-slate-900">

                  Teaching Availability

                </h1>

                <p className="mt-2 text-slate-500">

                  Configure teacher availability across different time slots for smarter timetable generation.

                </p>

              </div>

              <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-lg">

                <p className="text-sm text-blue-100">

                  Total Records

                </p>

                <h2 className="mt-2 text-4xl font-bold">

                  {availabilities.length}

                </h2>

              </div>

            </div>

            {/* Form */}

            <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

              <div className="mb-6 flex items-center justify-between">

                <div>

                  <h2 className="text-2xl font-bold text-slate-900">

                    {editingId
                      ? "Edit Availability"
                      : "Create Availability"}

                  </h2>

                  <p className="mt-1 text-sm text-slate-500">

                    Select a teacher, assign a timeslot and mark whether they are available.

                  </p>

                </div>

                {editingId && (

                  <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">

                    Editing

                  </span>

                )}

              </div>

              <form onSubmit={handleSubmit}>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">

                  <div>

                    <label className="mb-2 block text-sm font-medium text-slate-700">

                      Teacher

                    </label>

                    <select
                      value={teacherId}
                      onChange={(e) => setTeacherId(e.target.value)}
                      className={inputStyle}
                      required
                    >

                      <option value="">

                        Select Teacher

                      </option>

                      {teachers.map((teacher) => (

                        <option
                          key={teacher.id}
                          value={teacher.id}
                        >
                          {teacher.name}
                        </option>

                      ))}

                    </select>

                  </div>

                  <div>

                    <label className="mb-2 block text-sm font-medium text-slate-700">

                      Time Slot

                    </label>

                    <select
                      value={timeslotId}
                      onChange={(e) => setTimeslotId(e.target.value)}
                      className={inputStyle}
                      required
                    >

                      <option value="">

                        Select Time Slot

                      </option>

                      {timeslots.map((slot) => (

                        <option
                          key={slot.id}
                          value={slot.id}
                        >
                          {slot.day} ({slot.startTime} - {slot.endTime})
                        </option>

                      ))}

                    </select>

                  </div>

                  <div>

                    <label className="mb-2 block text-sm font-medium text-slate-700">

                      Availability

                    </label>

                    <select
                      value={available}
                      onChange={(e) =>
                        setAvailable(e.target.value === "true")
                      }
                      className={inputStyle}
                    >

                      <option value={true}>

                        ✅ Available

                      </option>

                      <option value={false}>

                        ❌ Not Available

                      </option>

                    </select>

                  </div>

                </div>

                <div className="mt-6 flex flex-wrap gap-3">

                  <button
                    type="submit"
                    className={primaryBtn}
                  >
                    {editingId
                      ? "Update Availability"
                      : "Create Availability"}
                  </button>

                  <button
                    type="button"
                    onClick={resetForm}
                    className={secondaryBtn}
                  >
                    {editingId ? "Cancel" : "Reset"}
                  </button>

                </div>

              </form>

            </div>

            {/* Search */}

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                <div>

                  <h3 className="text-lg font-semibold text-slate-900">

                    Availability Directory

                  </h3>

                  <p className="text-sm text-slate-500">

                    Search availability records by teacher or day.

                  </p>

                </div>

                <div className="w-full md:w-80">

                  <input
                    type="text"
                    placeholder="Search availability..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={inputStyle}
                  />

                </div>

              </div>

            </div>
                  {/* Availability Table */}

                  <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

                    <div className="overflow-x-auto">

                      <table className="min-w-full">

                        <thead className="bg-slate-100">

                          <tr className="text-left text-sm font-semibold text-slate-700">

                            <th className="px-6 py-4">

                              Teacher Schedule

                            </th>

                            <th className="px-6 py-4">

                              Time Slot

                            </th>

                            <th className="px-6 py-4 text-center">

                              Availability

                            </th>

                            <th className="px-6 py-4 text-center">

                              Actions

                            </th>

                          </tr>

                        </thead>

                        <tbody>

                          {filteredAvailabilities.length > 0 ? (

                            filteredAvailabilities.map((availability) => (

                              <tr
                                key={availability.id}
                                className="border-t border-slate-200 transition hover:bg-blue-50"
                              >

                                <td className="px-6 py-5">

                                  <div className="flex items-center gap-4">

                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-xl text-white shadow">

                                      👨‍🏫

                                    </div>

                                    <div>

                                      <h3 className="font-semibold text-slate-900">

                                        {availability.teacher?.name}

                                      </h3>

                                      <p className="text-sm text-slate-500">

                                        Faculty Availability

                                      </p>

                                    </div>

                                  </div>

                                </td>

                                <td className="px-6 py-5">

                                  <div className="space-y-2">

                                    <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">

                                      📅 {availability.timeslot?.day}

                                    </span>

                                    <div>

                                      <span className="inline-flex rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700">

                                        ⏰ {availability.timeslot?.startTime} - {availability.timeslot?.endTime}

                                      </span>

                                    </div>

                                  </div>

                                </td>

                                <td className="px-6 py-5 text-center">

                                  {availability.available ? (

                                    <span className="inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">

                                      ✅ Available

                                    </span>

                                  ) : (

                                    <span className="inline-flex rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700">

                                      ❌ Not Available

                                    </span>

                                  )}

                                </td>

                                <td className="px-6 py-5">

                                  <div className="flex justify-center gap-3">

                                    <button
                                      onClick={() => handleEdit(availability)}
                                      className={editBtn}
                                    >
                                      Edit
                                    </button>

                                    <button
                                      onClick={() => handleDelete(availability.id)}
                                      className={deleteBtn}
                                    >
                                      Delete
                                    </button>

                                  </div>

                                </td>

                              </tr>

                            ))
                                      ) : (

                                        <tr>

                                          <td
                                            colSpan="4"
                                            className="px-6 py-16 text-center"
                                          >

                                            <div className="flex flex-col items-center">

                                              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-4xl">

                                                📅

                                              </div>

                                              <h3 className="text-xl font-semibold text-slate-700">

                                                No Availability Records Found

                                              </h3>

                                              <p className="mt-2 max-w-md text-slate-500">

                                                Add a teacher's availability by selecting a teacher,
                                                assigning a time slot, and marking whether they are
                                                available. This information helps generate conflict-free
                                                timetables.

                                              </p>

                                            </div>

                                          </td>

                                        </tr>

                                      )}

                                    </tbody>

                                  </table>

                                </div>

                              </div>

                            </div>

                          );
                        }

                        export default Availability;