import { useEffect, useMemo, useState } from "react";
import {
  primaryBtn,
  secondaryBtn,
  editBtn,
  deleteBtn,
  inputStyle,
} from "../utils/styles";

import {
  getRooms,
  createRoom,
  updateRoom,
  deleteRoom,
} from "../api/timetableApi";

function Rooms() {
  const [rooms, setRooms] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    roomNumber: "",
    capacity: "",
    roomType: "CLASSROOM",
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await getRooms();
      setRooms(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setForm({
      roomNumber: "",
      capacity: "",
      roomType: "CLASSROOM",
    });

    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        roomNumber: form.roomNumber,
        capacity: Number(form.capacity),
        roomType: form.roomType,
      };

      if (editingId) {
        await updateRoom(editingId, payload);
        alert("Room updated successfully");
      } else {
        await createRoom(payload);
        alert("Room added successfully");
      }

      resetForm();
      fetchRooms();
    } catch (error) {
      console.error(error);
      alert("Operation failed");
    }
  };

  const handleEdit = (room) => {
    setEditingId(room.id);

    setForm({
      roomNumber: room.roomNumber,
      capacity: room.capacity,
      roomType: room.roomType,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this room?")) return;

    try {
      await deleteRoom(id);
      fetchRooms();
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  const filteredRooms = useMemo(() => {
    const value = search.toLowerCase();

    return rooms.filter((room) => {
      return (
        room.roomNumber.toLowerCase().includes(value) ||
        room.roomType.toLowerCase().includes(value) ||
        room.capacity.toString().includes(value)
      );
    });
  }, [rooms, search]);

  return (<div className="min-h-screen bg-slate-50 p-6">

            {/* Header */}

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

              <div>

                <div className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">

                  🏢 Room Management

                </div>

                <h1 className="mt-3 text-4xl font-bold text-slate-900">

                  Rooms

                </h1>

                <p className="mt-2 text-slate-500">

                  Manage classrooms, laboratories and room capacities.

                </p>

              </div>

              <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-lg">

                <p className="text-sm text-blue-100">

                  Total Rooms

                </p>

                <h2 className="mt-2 text-4xl font-bold">

                  {rooms.length}

                </h2>

              </div>

            </div>

            {/* Form Card */}

            <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

              <div className="mb-6 flex items-center justify-between">

                <div>

                  <h2 className="text-2xl font-bold text-slate-900">

                    {editingId ? "Edit Room" : "Add New Room"}

                  </h2>

                  <p className="mt-1 text-sm text-slate-500">

                    Configure classrooms and laboratories available for timetable generation.

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

                      Room Number

                    </label>

                    <input
                      type="text"
                      name="roomNumber"
                      value={form.roomNumber}
                      onChange={handleChange}
                      placeholder="A-101"
                      className={inputStyle}
                      required
                    />

                  </div>

                  <div>

                    <label className="mb-2 block text-sm font-medium text-slate-700">

                      Capacity

                    </label>

                    <input
                      type="number"
                      min="1"
                      name="capacity"
                      value={form.capacity}
                      onChange={handleChange}
                      placeholder="60"
                      className={inputStyle}
                      required
                    />

                  </div>

                  <div>

                    <label className="mb-2 block text-sm font-medium text-slate-700">

                      Room Type

                    </label>

                    <select
                      name="roomType"
                      value={form.roomType}
                      onChange={handleChange}
                      className={inputStyle}
                    >

                      <option value="CLASSROOM">

                        🏫 Classroom

                      </option>

                      <option value="LAB">

                        🧪 Laboratory

                      </option>

                    </select>

                  </div>

                </div>

                <div className="mt-6 flex flex-wrap gap-3">

                  <button
                    type="submit"
                    className={primaryBtn}
                  >
                    {editingId ? "Update Room" : "Add Room"}
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

                    Room Directory

                  </h3>

                  <p className="text-sm text-slate-500">

                    Search rooms by number, type or capacity.

                  </p>

                </div>

                <div className="w-full md:w-80">

                  <input
                    type="text"
                    placeholder="Search rooms..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={inputStyle}
                  />

                </div>

              </div>

            </div>
                  {/* Rooms Table */}

                  <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

                    <div className="overflow-x-auto">

                      <table className="min-w-full">

                        <thead className="bg-slate-100">

                          <tr className="text-left text-sm font-semibold text-slate-700">

                            <th className="px-6 py-4">Room</th>

                            <th className="px-6 py-4">Capacity</th>

                            <th className="px-6 py-4">Type</th>

                            <th className="px-6 py-4 text-center">Status</th>

                            <th className="px-6 py-4 text-center">Actions</th>

                          </tr>

                        </thead>

                        <tbody>

                          {filteredRooms.length > 0 ? (

                            filteredRooms.map((room) => (

                              <tr
                                key={room.id}
                                className="border-t border-slate-200 transition hover:bg-blue-50"
                              >

                                <td className="px-6 py-5">

                                  <div className="flex items-center gap-4">

                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-xl text-white shadow">

                                      {room.roomType === "LAB" ? "🧪" : "🏫"}

                                    </div>

                                    <div>

                                      <h3 className="font-semibold text-slate-900">

                                        {room.roomNumber}

                                      </h3>

                                      <p className="text-sm text-slate-500">

                                        Room ID #{room.id}

                                      </p>

                                    </div>

                                  </div>

                                </td>

                                <td className="px-6 py-5">

                                  <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">

                                    👥 {room.capacity} Seats

                                  </span>

                                </td>

                                <td className="px-6 py-5">

                                  {room.roomType === "LAB" ? (

                                    <span className="inline-flex rounded-full bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-700">

                                      🧪 Laboratory

                                    </span>

                                  ) : (

                                    <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">

                                      🏫 Classroom

                                    </span>

                                  )}

                                </td>

                                <td className="px-6 py-5 text-center">

                                  <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">

                                    ✅ Available

                                  </span>

                                </td>

                                <td className="px-6 py-5">

                                  <div className="flex justify-center gap-3">

                                    <button
                                      onClick={() => handleEdit(room)}
                                      className={editBtn}
                                    >
                                      Edit
                                    </button>

                                    <button
                                      onClick={() => handleDelete(room.id)}
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
                                colSpan="5"
                                className="px-6 py-16 text-center"
                              >

                                <div className="flex flex-col items-center">

                                  <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-4xl">

                                    🏢

                                  </div>

                                  <h3 className="text-xl font-semibold text-slate-700">

                                    No Rooms Found

                                  </h3>

                                  <p className="mt-2 text-slate-500">

                                    Create your first classroom or laboratory to begin scheduling.

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

            export default Rooms;