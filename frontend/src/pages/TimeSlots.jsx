import { useEffect, useMemo, useState } from "react";

import {
  primaryBtn,
  secondaryBtn,
  editBtn,
  deleteBtn,
  inputStyle,
} from "../utils/styles";

import {
  getTimeSlots,
  createTimeSlot,
  updateTimeSlot,
  deleteTimeSlot,
} from "../api/timetableApi";

function TimeSlots() {
  const [slots, setSlots] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    day: "",
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      const response = await getTimeSlots();
      setSlots(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setFormData({
      day: "",
      startTime: "",
      endTime: "",
    });

    setEditingId(null);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      startTime: formData.startTime + ":00",
      endTime: formData.endTime + ":00",
    };

    try {
      if (editingId) {
        await updateTimeSlot(editingId, payload);
        alert("Time slot updated successfully");
      } else {
        await createTimeSlot(payload);
        alert("Time slot added successfully");
      }

      resetForm();
      fetchSlots();
    } catch (error) {
      console.error(error);
      alert("Operation failed");
    }
  };

  const handleEdit = (slot) => {
    setEditingId(slot.Id || slot.id);

    setFormData({
      day: slot.day,
      startTime: slot.startTime.substring(0, 5),
      endTime: slot.endTime.substring(0, 5),
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this time slot?")) return;

    try {
      await deleteTimeSlot(id);
      fetchSlots();
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  const filteredSlots = useMemo(() => {
    const value = search.toLowerCase();

    return slots.filter((slot) => {
      return (
        slot.day.toLowerCase().includes(value) ||
        slot.startTime.toLowerCase().includes(value) ||
        slot.endTime.toLowerCase().includes(value)
      );
    });
  }, [slots, search]);

  return (
      <div className="min-h-screen bg-slate-50 p-6">

        {/* Header */}

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <div className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">

              ⏰ Time Slot Management

            </div>

            <h1 className="mt-3 text-4xl font-bold text-slate-900">

              Time Slots

            </h1>

            <p className="mt-2 text-slate-500">

              Configure working days and lecture periods used by the timetable generator.

            </p>

          </div>

          <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-lg">

            <p className="text-sm text-blue-100">

              Total Time Slots

            </p>

            <h2 className="mt-2 text-4xl font-bold">

              {slots.length}

            </h2>

          </div>

        </div>

        {/* Form */}

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

          <div className="mb-6 flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-bold text-slate-900">

                {editingId ? "Edit Time Slot" : "Create Time Slot"}

              </h2>

              <p className="mt-1 text-sm text-slate-500">

                Define lecture timings for each day of the week.

              </p>

            </div>

            {editingId && (

              <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">

                Editing

              </span>

            )}

          </div>

          <form onSubmit={handleSubmit}>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">

                  Day

                </label>

                <select
                  name="day"
                  value={formData.day}
                  onChange={handleChange}
                  className={inputStyle}
                  required
                >

                  <option value="">Select Day</option>

                  <option value="MONDAY">MONDAY</option>

                  <option value="TUESDAY">TUESDAY</option>

                  <option value="WEDNESDAY">WEDNESDAY</option>

                  <option value="THURSDAY">THURSDAY</option>

                  <option value="FRIDAY">FRIDAY</option>

                  <option value="SATURDAY">SATURDAY</option>

                </select>

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">

                  Start Time

                </label>

                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className={inputStyle}
                  required
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">

                  End Time

                </label>

                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className={inputStyle}
                  required
                />

              </div>

            </div>

            <div className="mt-6 flex flex-wrap gap-3">

              <button
                type="submit"
                className={primaryBtn}
              >
                {editingId ? "Update Time Slot" : "Add Time Slot"}
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

                Time Slot Directory

              </h3>

              <p className="text-sm text-slate-500">

                Search time slots by day or time.

              </p>

            </div>

            <div className="w-full md:w-80">

              <input
                type="text"
                placeholder="Search time slots..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={inputStyle}
              />

            </div>

          </div>

        </div>
              {/* Time Slots Table */}

              <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

                <div className="overflow-x-auto">

                  <table className="min-w-full">

                    <thead className="bg-slate-100">

                      <tr className="text-left text-sm font-semibold text-slate-700">

                        <th className="px-6 py-4">

                          Schedule

                        </th>

                        <th className="px-6 py-4">

                          Time Range

                        </th>

                        <th className="px-6 py-4 text-center">

                          Status

                        </th>

                        <th className="px-6 py-4 text-center">

                          Actions

                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {filteredSlots.length > 0 ? (

                        filteredSlots.map((slot) => (

                          <tr
                            key={slot.Id || slot.id}
                            className="border-t border-slate-200 transition hover:bg-blue-50"
                          >

                            <td className="px-6 py-5">

                              <div className="flex items-center gap-4">

                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-xl text-white shadow">

                                  📅

                                </div>

                                <div>

                                  <h3 className="font-semibold text-slate-900">

                                    {slot.day}

                                  </h3>

                                  <p className="text-sm text-slate-500">

                                    Teaching Period

                                  </p>

                                </div>

                              </div>

                            </td>

                            <td className="px-6 py-5">

                              <span className="inline-flex rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">

                                ⏰ {slot.startTime.substring(0, 5)} - {slot.endTime.substring(0, 5)}

                              </span>

                            </td>

                            <td className="px-6 py-5 text-center">

                              <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">

                                ✅ Active

                              </span>

                            </td>

                            <td className="px-6 py-5">

                              <div className="flex justify-center gap-3">

                                <button
                                  onClick={() => handleEdit(slot)}
                                  className={editBtn}
                                >
                                  Edit
                                </button>

                                <button
                                  onClick={() =>
                                    handleDelete(slot.Id || slot.id)
                                  }
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

                                ⏰

                              </div>

                              <h3 className="text-xl font-semibold text-slate-700">

                                No Time Slots Found

                              </h3>

                              <p className="mt-2 max-w-md text-slate-500">

                                Create your first time slot by selecting a day and
                                defining the lecture start and end time.

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

        export default TimeSlots;