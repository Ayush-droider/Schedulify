import { useEffect, useState } from "react";
import {
  primaryBtn,
  secondaryBtn,
  editBtn,
  deleteBtn,
  inputStyle,
} from "../utils/styles";

import {
  getSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
  getTeachers,
} from "../api/timetableApi";

function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    subjectName: "",
    subjectCode: "",
    weeklyFrequency: 1,
    isLab: false,
    teacherId: "",
  });

  useEffect(() => {
    fetchSubjects();
    fetchTeachers();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await getSubjects();
      setSubjects(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await getTeachers();
      setTeachers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const resetForm = () => {
    setForm({
      subjectName: "",
      subjectCode: "",
      weeklyFrequency: 1,
      isLab: false,
      teacherId: "",
    });

    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      subjectName: form.subjectName,
      subjectCode: form.subjectCode,
      weeklyFrequency: Number(form.weeklyFrequency),
      isLab: form.isLab,
      teacher: {
        id: Number(form.teacherId),
      },
    };

    try {
      if (editingId) {
        await updateSubject(editingId, payload);
        alert("Subject updated successfully");
      } else {
        await createSubject(payload);
        alert("Subject added successfully");
      }

      resetForm();
      fetchSubjects();
    } catch (error) {
      console.error(error);
      alert("Operation failed");
    }
  };

  const handleEdit = (subject) => {
    setEditingId(subject.subjectId);

    setForm({
      subjectName: subject.subjectName,
      subjectCode: subject.subjectCode,
      weeklyFrequency: subject.weeklyFrequency,
      isLab: subject.isLab,
      teacherId: subject.teacher?.id || "",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete subject?")) return;

    try {
      await deleteSubject(id);
      fetchSubjects();
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
          Subjects
        </h1>

        <p className="text-slate-500 mt-2">
          Manage courses, teachers and weekly frequency.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md border"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <input
            type="text"
            name="subjectName"
            placeholder="Subject Name"
            value={form.subjectName}
            onChange={handleChange}
            className={inputStyle}
            required
          />

          <input
            type="text"
            name="subjectCode"
            placeholder="Subject Code"
            value={form.subjectCode}
            onChange={handleChange}
            className={inputStyle}
            required
          />

          <input
            type="number"
            name="weeklyFrequency"
            placeholder="Weekly Frequency"
            value={form.weeklyFrequency}
            onChange={handleChange}
            className={inputStyle}
            required
          />

          <select
            name="teacherId"
            value={form.teacherId}
            onChange={handleChange}
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

          <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200">
            <input
              type="checkbox"
              name="isLab"
              checked={form.isLab}
              onChange={handleChange}
              className="w-5 h-5 accent-indigo-600"
            />

            <span className="font-medium text-slate-700">
              Is Lab Subject
            </span>
          </label>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="submit"
            className={primaryBtn}
          >
            {editingId
              ? "Update Subject"
              : "Add Subject"}
          </button>

          <button
            type="button"
            onClick={resetForm}
            className={secondaryBtn}
          >
            Reset
          </button>
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
                  Name
                </th>
                <th className="p-4">
                  Code
                </th>
                <th className="p-4">
                  Frequency
                </th>
                <th className="p-4">
                  Teacher
                </th>
                <th className="p-4">
                  Type
                </th>
                <th className="p-4">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {subjects.length > 0 ? (
                subjects.map((subject) => (
                  <tr
                    key={subject.subjectId}
                    className="border-b hover:bg-slate-50 transition"
                  >
                    <td className="p-4 text-center">
                      {subject.subjectId}
                    </td>

                    <td className="p-4 font-semibold">
                      {subject.subjectName}
                    </td>

                    <td className="p-4">
                      {subject.subjectCode}
                    </td>

                    <td className="p-4 text-center">
                      {subject.weeklyFrequency}
                    </td>

                    <td className="p-4">
                      {subject.teacher?.name ||
                        "N/A"}
                    </td>

                    <td className="p-4">
                      {subject.isLab ? (
                        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                          🧪 Lab
                        </span>
                      ) : (
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                          📘 Theory
                        </span>
                      )}
                    </td>

                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() =>
                            handleEdit(
                              subject
                            )
                          }
                          className={editBtn}
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(
                              subject.subjectId
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
                    colSpan="7"
                    className="p-6 text-center text-slate-500"
                  >
                    No subjects found.
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

export default Subjects;