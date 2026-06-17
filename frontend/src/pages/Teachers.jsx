import { useEffect, useState } from "react";
import {
  primaryBtn,
  editBtn,
  deleteBtn,
  inputStyle,
} from "../utils/styles";

import {
  getTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} from "../api/timetableApi";

function Teachers() {
  const [teachers, setTeachers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await getTeachers();
      setTeachers(response.data);
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
      name: "",
      email: "",
      department: "",
    });

    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateTeacher(editingId, form);
        alert("Teacher updated successfully");
      } else {
        await createTeacher(form);
        alert("Teacher added successfully");
      }

      resetForm();
      fetchTeachers();
    } catch (error) {
      console.error(error);
      alert("Operation failed");
    }
  };

  const handleEdit = (teacher) => {
    setEditingId(teacher.id);

    setForm({
      name: teacher.name,
      email: teacher.email,
      department: teacher.department,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete teacher?")) return;

    try {
      await deleteTeacher(id);
      fetchTeachers();
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          Teachers
        </h1>

        <p className="text-slate-500 mt-2">
          Manage faculty members and departments.
        </p>
      </div>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md border"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Teacher Name"
            value={form.name}
            onChange={handleChange}
            className={inputStyle}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className={inputStyle}
            required
          />

          <input
            type="text"
            name="department"
            placeholder="Department"
            value={form.department}
            onChange={handleChange}
            className={inputStyle}
            required
          />
        </div>

        <div className="mt-5 flex gap-3">
          <button
            type="submit"
            className={primaryBtn}
          >
            {editingId
              ? "Update Teacher"
              : "Add Teacher"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-slate-500 hover:bg-slate-600 text-white px-5 py-2 rounded-xl shadow-md transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="p-4 text-left">
                ID
              </th>
              <th className="p-4 text-left">
                Name
              </th>
              <th className="p-4 text-left">
                Email
              </th>
              <th className="p-4 text-left">
                Department
              </th>
              <th className="p-4 text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {teachers.length > 0 ? (
              teachers.map((teacher) => (
                <tr
                  key={teacher.id}
                  className="border-b hover:bg-slate-50 transition"
                >
                  <td className="p-4">
                    {teacher.id}
                  </td>

                  <td className="p-4 font-semibold">
                    {teacher.name}
                  </td>

                  <td className="p-4">
                    {teacher.email}
                  </td>

                  <td className="p-4">
                    {teacher.department}
                  </td>

                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() =>
                          handleEdit(teacher)
                        }
                        className={editBtn}
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(
                            teacher.id
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
                  No teachers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Teachers;