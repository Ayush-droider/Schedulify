import React, { useEffect, useState } from "react";

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
      console.log(error.response);
      console.log(error.response?.data);

      alert(JSON.stringify(error.response?.data));
    }
  };

  const handleEdit = (a) => {
    setEditingId(a.id);
    setTeacherId(a.teacher.id);
    setTimeslotId(a.timeslot.id);
    setAvailable(a.available);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete Availability?")) {
      await deleteAvailability(id);
      loadData();
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">
        Teaching Availability
      </h1>

      {/* FORM CARD */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <select
              value={teacherId}
              onChange={(e) =>
                setTeacherId(e.target.value)
              }
              className={inputStyle}
              required
            >
              <option value="">
                Select Teacher
              </option>

              {teachers.map((t) => (
                <option
                  key={t.id}
                  value={t.id}
                >
                  {t.name}
                </option>
              ))}
            </select>

            <select
              value={timeslotId}
              onChange={(e) =>
                setTimeslotId(e.target.value)
              }
              className={inputStyle}
              required
            >
              <option value="">
                Select Timeslot
              </option>

              {timeslots.map((ts) => (
                <option
                  key={ts.id}
                  value={ts.id}
                >
                  {ts.day} ({ts.startTime} - {ts.endTime})
                </option>
              ))}
            </select>

            <select
              value={available}
              onChange={(e) =>
                setAvailable(
                  e.target.value === "true"
                )
              }
              className={inputStyle}
            >
              <option value={true}>
                Available
              </option>

              <option value={false}>
                Not Available
              </option>
            </select>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              className={primaryBtn}
              type="submit"
            >
              {editingId
                ? "Update"
                : "Create"}
            </button>

            {editingId && (
              <button
                className={secondaryBtn}
                type="button"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white shadow-lg rounded-xl p-6 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-100">
              <th className="border p-3">
                ID
              </th>
              <th className="border p-3">
                Teacher
              </th>
              <th className="border p-3">
                Day
              </th>
              <th className="border p-3">
                Time
              </th>
              <th className="border p-3">
                Available
              </th>
              <th className="border p-3">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {availabilities.map((a) => (
              <tr
                key={a.id}
                className="hover:bg-slate-50"
              >
                <td className="border p-3">
                  {a.id}
                </td>

                <td className="border p-3">
                  {a.teacher.name}
                </td>

                <td className="border p-3">
                  {a.timeslot.day}
                </td>

                <td className="border p-3">
                  {a.timeslot.startTime}
                  {" - "}
                  {a.timeslot.endTime}
                </td>

                <td className="border p-3">
                  {a.available
                    ? "✅ Yes"
                    : "❌ No"}
                </td>

                <td className="border p-3">
                  <div className="flex gap-2">
                    <button
                      className={editBtn}
                      onClick={() =>
                        handleEdit(a)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className={deleteBtn}
                      onClick={() =>
                        handleDelete(a.id)
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
      </div>
    </div>
  );
}

export default Availability;