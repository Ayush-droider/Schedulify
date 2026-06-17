import { useEffect, useState } from "react";
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

  const [form, setForm] = useState({
    roomNumber: "",
    capacity: "",
    roomType: "CLASSROOM",
  });

  const [editingId, setEditingId] = useState(null);

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
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete room?")) return;

    try {
      await deleteRoom(id);
      fetchRooms();
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          Rooms
        </h1>

        <p className="text-slate-500 mt-2">
          Manage classrooms and laboratories efficiently.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md border"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="roomNumber"
            placeholder="Room Number"
            value={form.roomNumber}
            onChange={handleChange}
            className={inputStyle}
            required
          />

          <input
            type="number"
            name="capacity"
            placeholder="Capacity"
            value={form.capacity}
            onChange={handleChange}
            className={inputStyle}
            required
          />

          <select
            name="roomType"
            value={form.roomType}
            onChange={handleChange}
            className={inputStyle}
          >
            <option value="CLASSROOM">
              Classroom
            </option>

            <option value="LAB">
              Laboratory
            </option>
          </select>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="submit"
            className={primaryBtn}
          >
            {editingId
              ? "Update Room"
              : "Add Room"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className={secondaryBtn}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="p-4 text-left">
                  ID
                </th>

                <th className="p-4 text-left">
                  Room Number
                </th>

                <th className="p-4 text-left">
                  Capacity
                </th>

                <th className="p-4 text-left">
                  Type
                </th>

                <th className="p-4 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {rooms.length > 0 ? (
                rooms.map((room) => (
                  <tr
                    key={room.id}
                    className="border-b hover:bg-slate-50 transition"
                  >
                    <td className="p-4">
                      {room.id}
                    </td>

                    <td className="p-4 font-semibold">
                      {room.roomNumber}
                    </td>

                    <td className="p-4">
                      {room.capacity}
                    </td>

                    <td className="p-4">
                      {room.roomType ===
                      "LAB" ? (
                        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                          🧪 Lab
                        </span>
                      ) : (
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                          🏫 Classroom
                        </span>
                      )}
                    </td>

                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() =>
                            handleEdit(room)
                          }
                          className={editBtn}
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(
                              room.id
                            )
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
                    colSpan="5"
                    className="p-6 text-center text-slate-500"
                  >
                    No rooms found.
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