import { useEffect, useState } from "react";

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
      subjectId:
        assignment.subject?.subjectId || "",
      classGroupId:
        assignment.classGroup?.id || "",
      weeklyFrequency:
        assignment.weeklyFrequency || 1,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete assignment?"))
      return;

    try {
      await deleteAssignment(id);
      loadData();
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          Teaching Assignments
        </h1>

        <p className="text-slate-500 mt-2">
          Manage teacher-subject-class mappings.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md border"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          <select
            name="teacherId"
            value={form.teacherId}
            onChange={handleChange}
            className={inputStyle}
            required
          >
            <option value="">Select Teacher</option>

            {teachers.map((teacher) => (
              <option
                key={teacher.id}
                value={teacher.id}
              >
                {teacher.name}
              </option>
            ))}
          </select>

          <select
            name="subjectId"
            value={form.subjectId}
            onChange={handleChange}
            className={inputStyle}
            required
          >
            <option value="">Select Subject</option>

            {subjects.map((subject) => (
              <option
                key={subject.subjectId}
                value={subject.subjectId}
              >
                {subject.subjectName}
              </option>
            ))}
          </select>

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

          <input
            type="number"
            name="weeklyFrequency"
            value={form.weeklyFrequency}
            onChange={handleChange}
            min="1"
            placeholder="Weekly Frequency"
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
              ? "Update Assignment"
              : "Add Assignment"}
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

      <div className="bg-white rounded-2xl shadow-md overflow-hidden border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Teacher</th>
                <th className="p-4">Subject</th>
                <th className="p-4">Class Group</th>
                <th className="p-4">Frequency</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {assignments.length > 0 ? (
                assignments.map((assignment) => (
                  <tr
                    key={assignment.id}
                    className="border-b hover:bg-slate-50 transition"
                  >
                    <td className="p-4">
                      {assignment.id}
                    </td>

                    <td className="p-4 font-medium">
                      {assignment.teacher?.name}
                    </td>

                    <td className="p-4">
                      {assignment.subject?.subjectName}
                    </td>

                    <td className="p-4">
                      {assignment.classGroup?.name}
                    </td>

                    <td className="p-4">
                      {assignment.weeklyFrequency}
                    </td>

                    <td className="p-4">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() =>
                            handleEdit(
                              assignment
                            )
                          }
                          className={editBtn}
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(
                              assignment.id
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
                    colSpan="6"
                    className="p-6 text-center text-slate-500"
                  >
                    No assignments found
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