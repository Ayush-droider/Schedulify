import { useEffect, useMemo, useState } from "react";
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

  const [search, setSearch] = useState("");

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

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this teacher?")) return;

    try {
      await deleteTeacher(id);
      fetchTeachers();
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  const filteredTeachers = useMemo(() => {
    return teachers.filter((teacher) => {
      const value = search.toLowerCase();

      return (
        teacher.name.toLowerCase().includes(value) ||
        teacher.email.toLowerCase().includes(value) ||
        teacher.department.toLowerCase().includes(value)
      );
    });
  }, [teachers, search]);

  const getInitials = (name) => {
    if (!name) return "";

    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  return (
      <div className="min-h-screen bg-slate-50 p-6">

            {/* Header */}

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

              <div>

                <div className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">

                  👨‍🏫 Faculty Management

                </div>

                <h1 className="mt-3 text-4xl font-bold text-slate-900">

                  Teachers

                </h1>

                <p className="mt-2 text-slate-500">

                  Manage faculty members, departments and contact details.

                </p>

              </div>

              <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-lg">

                <p className="text-sm text-blue-100">

                  Total Teachers

                </p>

                <h2 className="mt-2 text-4xl font-bold">

                  {teachers.length}

                </h2>

              </div>

            </div>

            {/* Form */}

            <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

              <div className="mb-6 flex items-center justify-between">

                <div>

                  <h2 className="text-2xl font-bold text-slate-900">

                    {editingId ? "Edit Teacher" : "Add New Teacher"}

                  </h2>

                  <p className="mt-1 text-sm text-slate-500">

                    Fill in the teacher information below.

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

                      Teacher Name

                    </label>

                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={handleChange}
                      className={inputStyle}
                      required
                    />

                  </div>

                  <div>

                    <label className="mb-2 block text-sm font-medium text-slate-700">

                      Email Address

                    </label>

                    <input
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={handleChange}
                      className={inputStyle}
                      required
                    />

                  </div>

                  <div>

                    <label className="mb-2 block text-sm font-medium text-slate-700">

                      Department

                    </label>

                    <input
                      type="text"
                      name="department"
                      placeholder="Computer Science"
                      value={form.department}
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
                    {editingId ? "Update Teacher" : "Add Teacher"}
                  </button>

                  {editingId && (

                    <button
                      type="button"
                      onClick={resetForm}
                      className="rounded-xl bg-slate-600 px-5 py-2.5 font-medium text-white transition hover:bg-slate-700"
                    >
                      Cancel
                    </button>

                  )}

                </div>

              </form>

            </div>

            {/* Search */}

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                <div>

                  <h3 className="text-lg font-semibold text-slate-900">

                    Faculty Directory

                  </h3>

                  <p className="text-sm text-slate-500">

                    Search and manage teacher records.

                  </p>

                </div>

                <div className="w-full md:w-80">

                  <input
                    type="text"
                    placeholder="Search teachers..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={inputStyle}
                  />

                </div>

              </div>

            </div>
                  {/* Teachers Table */}

                  <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

                    <div className="overflow-x-auto">

                      <table className="min-w-full">

                        <thead className="bg-slate-100">

                          <tr className="text-left text-sm font-semibold text-slate-700">

                            <th className="px-6 py-4">Teacher</th>

                            <th className="px-6 py-4">Email</th>

                            <th className="px-6 py-4">Department</th>

                            <th className="px-6 py-4 text-center">Actions</th>

                          </tr>

                        </thead>

                        <tbody>

                          {filteredTeachers.length > 0 ? (

                            filteredTeachers.map((teacher) => (

                              <tr
                                key={teacher.id}
                                className="border-t border-slate-200 transition hover:bg-blue-50"
                              >

                                <td className="px-6 py-5">

                                  <div className="flex items-center gap-4">

                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-sm font-bold text-white shadow">

                                      {getInitials(teacher.name)}

                                    </div>

                                    <div>

                                      <h3 className="font-semibold text-slate-900">

                                        {teacher.name}

                                      </h3>

                                      <p className="text-sm text-slate-500">

                                        ID #{teacher.id}

                                      </p>

                                    </div>

                                  </div>

                                </td>

                                <td className="px-6 py-5">

                                  <span className="text-slate-700">

                                    {teacher.email}

                                  </span>

                                </td>

                                <td className="px-6 py-5">

                                  <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">

                                    {teacher.department}

                                  </span>

                                </td>

                                <td className="px-6 py-5">

                                  <div className="flex justify-center gap-3">

                                    <button
                                      onClick={() => handleEdit(teacher)}
                                      className={editBtn}
                                    >
                                      Edit
                                    </button>

                                    <button
                                      onClick={() => handleDelete(teacher.id)}
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

                                    👨‍🏫

                                  </div>

                                  <h3 className="text-xl font-semibold text-slate-700">

                                    No Teachers Found

                                  </h3>

                                  <p className="mt-2 text-slate-500">

                                    Add your first faculty member to get started.

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

            export default Teachers;