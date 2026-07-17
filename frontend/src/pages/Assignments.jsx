import { useEffect, useMemo, useState } from "react";

import {
  primaryBtn,
  secondaryBtn,
  editBtn,
  deleteBtn,
  inputStyle,
} from "../utils/styles";

import {
  getAssignments,
  createAssignment,
  updateAssignment,
  deleteAssignment,
  getTeachers,
  getSubjects,
  getClassGroups,
} from "../api/timetableApi";

function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [classGroups, setClassGroups] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    teacherId: "",
    subjectId: "",
    classGroupId: "",
    weeklyFrequency: 1,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [
        assignmentRes,
        teacherRes,
        subjectRes,
        groupRes,
      ] = await Promise.all([
        getAssignments(),
        getTeachers(),
        getSubjects(),
        getClassGroups(),
      ]);

      setAssignments(assignmentRes.data);
      setTeachers(teacherRes.data);
      setSubjects(subjectRes.data);
      setClassGroups(groupRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setForm({
      teacherId: "",
      subjectId: "",
      classGroupId: "",
      weeklyFrequency: 1,
    });

    setEditingId(null);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      teacherId: Number(form.teacherId),
      subjectId: Number(form.subjectId),
      classGroupId: Number(form.classGroupId),
      weeklyFrequency: Number(form.weeklyFrequency),
    };

    try {
      if (editingId) {
        await updateAssignment(editingId, payload);
        alert("Assignment updated successfully");
      } else {
        await createAssignment(payload);
        alert("Assignment created successfully");
      }

      resetForm();
      loadData();
    } catch (error) {
      console.error(error);
      alert("Operation failed");
    }
  };

  const handleEdit = (assignment) => {
    setEditingId(assignment.id);

    setForm({
      teacherId: assignment.teacher?.id || "",
      subjectId: assignment.subject?.subjectId || "",
      classGroupId: assignment.classGroup?.id || "",
      weeklyFrequency: assignment.weeklyFrequency || 1,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this assignment?")) return;

    try {
      await deleteAssignment(id);
      loadData();
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  const filteredAssignments = useMemo(() => {
    const value = search.toLowerCase();

    return assignments.filter((assignment) => {
      return (
        assignment.teacher?.name
          ?.toLowerCase()
          .includes(value) ||
        assignment.subject?.subjectName
          ?.toLowerCase()
          .includes(value) ||
        assignment.classGroup?.name
          ?.toLowerCase()
          .includes(value)
      );
    });
  }, [assignments, search]);

  return (
      <div className="min-h-screen bg-slate-50 p-6">

        {/* Header */}

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <div className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">

              📋 Teaching Assignment Management

            </div>

            <h1 className="mt-3 text-4xl font-bold text-slate-900">

              Teaching Assignments

            </h1>

            <p className="mt-2 text-slate-500">

              Map teachers, subjects and class groups for automatic timetable generation.

            </p>

          </div>

          <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-lg">

            <p className="text-sm text-blue-100">

              Total Assignments

            </p>

            <h2 className="mt-2 text-4xl font-bold">

              {assignments.length}

            </h2>

          </div>

        </div>

        {/* Form */}

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

          <div className="mb-6 flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-bold text-slate-900">

                {editingId ? "Edit Assignment" : "Create Assignment"}

              </h2>

              <p className="mt-1 text-sm text-slate-500">

                Connect a teacher with a subject and a class group.

              </p>

            </div>

            {editingId && (

              <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">

                Editing

              </span>

            )}

          </div>

          <form onSubmit={handleSubmit}>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">

                  Teacher

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

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">

                  Subject

                </label>

                <select
                  name="subjectId"
                  value={form.subjectId}
                  onChange={handleChange}
                  className={inputStyle}
                  required
                >

                  <option value="">

                    Select Subject

                  </option>

                  {subjects.map((subject) => (

                    <option
                      key={subject.subjectId}
                      value={subject.subjectId}
                    >
                      {subject.subjectName}
                    </option>

                  ))}

                </select>

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">

                  Class Group

                </label>

                <select
                  name="classGroupId"
                  value={form.classGroupId}
                  onChange={handleChange}
                  className={inputStyle}
                  required
                >

                  <option value="">

                    Select Class Group

                  </option>

                  {classGroups.map((group) => (

                    <option
                      key={group.id}
                      value={group.id}
                    >
                      {group.name}
                    </option>

                  ))}

                </select>

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">

                  Weekly Frequency

                </label>

                <input
                  type="number"
                  name="weeklyFrequency"
                  min="1"
                  value={form.weeklyFrequency}
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
                {editingId ? "Update Assignment" : "Add Assignment"}
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

                Assignment Directory

              </h3>

              <p className="text-sm text-slate-500">

                Search assignments by teacher, subject or class group.

              </p>

            </div>

            <div className="w-full md:w-80">

              <input
                type="text"
                placeholder="Search assignments..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={inputStyle}
              />

            </div>

          </div>

        </div>

            {/* Assignments Table */}

            <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

              <div className="overflow-x-auto">

                <table className="min-w-full">

                  <thead className="bg-slate-100">

                    <tr className="text-left text-sm font-semibold text-slate-700">

                      <th className="px-6 py-4">

                        Assignment

                      </th>

                      <th className="px-6 py-4">

                        Weekly Frequency

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

                    {filteredAssignments.length > 0 ? (

                      filteredAssignments.map((assignment) => (

                        <tr
                          key={assignment.id}
                          className="border-t border-slate-200 transition hover:bg-blue-50"
                        >

                          <td className="px-6 py-5">

                            <div className="space-y-3">

                              {/* Teacher */}

                              <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">

                                  👨‍🏫

                                </div>

                                <div>

                                  <p className="text-xs uppercase tracking-wide text-slate-400">

                                    Teacher

                                  </p>

                                  <h3 className="font-semibold text-slate-900">

                                    {assignment.teacher?.name}

                                  </h3>

                                </div>

                              </div>

                              <div className="ml-5 border-l-2 border-dashed border-blue-200 pl-6">

                                <span className="rounded-full bg-sky-100 px-3 py-1 text-sm font-semibold text-sky-700">

                                  📘 {assignment.subject?.subjectName}

                                </span>

                              </div>

                              <div className="ml-5 border-l-2 border-dashed border-blue-200 pl-6">

                                <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700">

                                  🎓 {assignment.classGroup?.name}

                                </span>

                              </div>

                            </div>

                          </td>

                          <td className="px-6 py-5">

                            <span className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">

                              📅 {assignment.weeklyFrequency} / Week

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
                                onClick={() => handleEdit(assignment)}
                                className={editBtn}
                              >
                                Edit
                              </button>

                              <button
                                onClick={() => handleDelete(assignment.id)}
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

                                          📋

                                        </div>

                                        <h3 className="text-xl font-semibold text-slate-700">

                                          No Assignments Found

                                        </h3>

                                        <p className="mt-2 max-w-md text-slate-500">

                                          Create your first teaching assignment by connecting a
                                          teacher, subject and class group to begin generating
                                          optimized timetables.

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

                  export default Assignments;