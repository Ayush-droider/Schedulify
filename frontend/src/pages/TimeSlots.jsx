import { useEffect, useState } from "react";
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

  const [formData, setFormData] = useState({
    day: "",
    startTime: "",
    endTime: "",
  });

  const [editingId, setEditingId] = useState(null);

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
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Delete this time slot?"
      )
    )
      return;

    try {
      await deleteTimeSlot(id);
      fetchSlots();
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
          Time Slots
        </h1>

        <p className="text-slate-500 mt-2">
          Manage timetable periods and schedules.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md border"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            name="day"
            value={formData.day}
            onChange={handleChange}
            className={inputStyle}
            required
          >
            <option value="">
              Select Day
            </option>
            <option value="MONDAY">
              MONDAY
            </option>
            <option value="TUESDAY">
              TUESDAY
            </option>
            <option value="WEDNESDAY">
              WEDNESDAY
            </option>
            <option value="THURSDAY">
              THURSDAY
            </option>
            <option value="FRIDAY">
              FRIDAY
            </option>
            <option value="SATURDAY">
              SATURDAY
            </option>
          </select>

          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className={inputStyle}
            required
          />

          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            className={inputStyle}
            required
          />
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="submit"
            className={primaryBtn}
          >
            {editingId
              ? "Update Time Slot"
              : "Add Time Slot"}
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
                <th className="p-4">
                  ID
                </th>
                <th className="p-4">
                  Day
                </th>
                <th className="p-4">
                  Start Time
                </th>
                <th className="p-4">
                  End Time
                </th>
                <th className="p-4">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {slots.length > 0 ? (
                slots.map((slot) => (
                  <tr
                    key={
                      slot.Id || slot.id
                    }
                    className="border-b hover:bg-slate-50 transition text-center"
                  >
                    <td className="p-4">
                      {slot.Id ||
                        slot.id}
                    </td>

                    <td className="p-4 font-semibold">
                      <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">
                        {slot.day}
                      </span>
                    </td>

                    <td className="p-4">
                      {slot.startTime}
                    </td>

                    <td className="p-4">
                      {slot.endTime}
                    </td>

                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() =>
                            handleEdit(
                              slot
                            )
                          }
                          className={editBtn}
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(
                              slot.Id ||
                                slot.id
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
                    No time slots found.
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