import { useEffect, useMemo, useState } from "react";
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

  const [search, setSearch] = useState("");

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

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this subject?")) return;

    try {
      await deleteSubject(id);
      fetchSubjects();
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  const filteredSubjects = useMemo(() => {
    const value = search.toLowerCase();

    return subjects.filter((subject) => {
      return (
        subject.subjectName.toLowerCase().includes(value) ||
        subject.subjectCode.toLowerCase().includes(value) ||
        subject.teacher?.name?.toLowerCase().includes(value)
      );
    });
  }, [subjects, search]);

  return (
      <div className="min-h-screen bg-slate-50 p-6">

        {/* Header */}

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <div className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">

              📘 Subject Management

            </div>

            <h1 className="mt-3 text-4xl font-bold text-slate-900">

              Subjects

            </h1>

            <p className="mt-2 text-slate-500">

              Manage subjects, assigned faculty and weekly teaching frequency.

            </p>

          </div>

          <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-lg">

            <p className="text-sm text-blue-100">

              Total Subjects

            </p>

            <h2 className="mt-2 text-4xl font-bold">

              {subjects.length}

            </h2>

          </div>

        </div>

        {/* Form Card */}

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

          <div className="mb-6 flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-bold text-slate-900">

                {editingId ? "Edit Subject" : "Add New Subject"}

              </h2>

              <p className="mt-1 text-sm text-slate-500">

                Configure course details and assign a faculty member.

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

                  Subject Name

                </label>

                <input
                  type="text"
                  name="subjectName"
                  value={form.subjectName}
                  onChange={handleChange}
                  placeholder="Database Management System"
                  className={inputStyle}
                  required
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">

                  Subject Code

                </label>

                <input
                  type="text"
                  name="subjectCode"
                  value={form.subjectCode}
                  onChange={handleChange}
                  placeholder="CS301"
                  className={inputStyle}
                  required
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">

                  Weekly Frequency

                </label>

                <input
                  type="number"
                  min="1"
                  name="weeklyFrequency"
                  value={form.weeklyFrequency}
                  onChange={handleChange}
                  className={inputStyle}
                  required
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">

                  Assigned Teacher

                </label>

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

              </div>

              <div className="lg:col-span-2">

                <label className="mb-2 block text-sm font-medium text-slate-700">

                  Subject Type

                </label>

                <label className="flex h-[46px] cursor-pointer items-center gap-3 rounded-xl border border-slate-200 px-4 transition hover:border-blue-300 hover:bg-blue-50">

                  <input
                    type="checkbox"
                    name="isLab"
                    checked={form.isLab}
                    onChange={handleChange}
                    className="h-5 w-5 accent-blue-600"
                  />

                  <span className="font-medium text-slate-700">

                    🧪 This is a Lab Subject

                  </span>

                </label>

              </div>

            </div>

            <div className="mt-6 flex flex-wrap gap-3">

              <button
                type="submit"
                className={primaryBtn}
              >
                {editingId ? "Update Subject" : "Add Subject"}
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

        </div>

        {/* Search */}

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div>

              <h3 className="text-lg font-semibold text-slate-900">

                Subject Directory

              </h3>

              <p className="text-sm text-slate-500">

                Search subjects by name, code or faculty.

              </p>

            </div>

            <div className="w-full md:w-80">

              <input
                type="text"
                placeholder="Search subjects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={inputStyle}
              />

            </div>

          </div>

        </div>

            {/* Subjects Table */}

            <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

              <div className="overflow-x-auto">

                <table className="min-w-full">

                  <thead className="bg-slate-100">

                    <tr className="text-left text-sm font-semibold text-slate-700">

                      <th className="px-6 py-4">Subject</th>

                      <th className="px-6 py-4">Teacher</th>

                      <th className="px-6 py-4">Frequency</th>

                      <th className="px-6 py-4">Type</th>

                      <th className="px-6 py-4 text-center">Actions</th>

                    </tr>

                  </thead>

                  <tbody>

                    {filteredSubjects.length > 0 ? (

                      filteredSubjects.map((subject) => (

                        <tr
                          key={subject.subjectId}
                          className="border-t border-slate-200 transition hover:bg-blue-50"
                        >

                          <td className="px-6 py-5">

                            <div>

                              <h3 className="font-semibold text-slate-900">

                                {subject.subjectName}

                              </h3>

                              <div className="mt-2">

                                <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">

                                  {subject.subjectCode}

                                </span>

                              </div>

                            </div>

                          </td>

                          <td className="px-6 py-5">

                            {subject.teacher ? (

                              <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">

                                👨‍🏫 {subject.teacher.name}

                              </span>

                            ) : (

                              <span className="text-slate-400">

                                Not Assigned

                              </span>

                            )}

                          </td>

                          <td className="px-6 py-5">

                            <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">

                              {subject.weeklyFrequency} / Week

                            </span>

                          </td>

                          <td className="px-6 py-5">

                            {subject.isLab ? (

                              <span className="inline-flex rounded-full bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-700">

                                🧪 Lab

                              </span>

                            ) : (

                              <span className="inline-flex rounded-full bg-sky-100 px-3 py-1 text-sm font-semibold text-sky-700">

                                📘 Theory

                              </span>

                            )}

                          </td>

                          <td className="px-6 py-5">

                            <div className="flex justify-center gap-3">

                              <button
                                onClick={() => handleEdit(subject)}
                                className={editBtn}
                              >
                                Edit
                              </button>

                              <button
                                onClick={() => handleDelete(subject.subjectId)}
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

                              📘

                            </div>

                            <h3 className="text-xl font-semibold text-slate-700">

                              No Subjects Found

                            </h3>

                            <p className="mt-2 text-slate-500">

                              Create your first subject to begin timetable generation.

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

export default Subjects;