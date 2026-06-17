import { useEffect, useState } from "react";

import {
  primaryBtn,
  secondaryBtn,
  editBtn,
  deleteBtn,
  inputStyle,
} from "../utils/styles";

import {
  getClassGroups,
  createClassGroup,
  updateClassGroup,
  deleteClassGroup,
} from "../api/timetableApi";

function ClassGroups() {
  const [groups, setGroups] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    strength: "",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await getClassGroups();
      setGroups(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      strength: "",
    });

    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateClassGroup(
          editingId,
          formData
        );
      } else {
        await createClassGroup(
          formData
        );
      }

      resetForm();
      fetchGroups();
    } catch (error) {
      console.error(error);
      alert("Operation failed");
    }
  };

  const handleEdit = (group) => {
    setEditingId(group.id);

    setFormData({
      name: group.name,
      strength: group.strength,
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this class group?"
    );

    if (!confirmDelete) return;

    try {
      await deleteClassGroup(id);
      fetchGroups();
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-8">
        Class Groups
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow mb-8"
      >
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Class Name"
            value={formData.name}
            onChange={handleChange}
            className={inputStyle}
            required
          />

          <input
            type="number"
            name="strength"
            placeholder="Strength"
            value={formData.strength}
            onChange={handleChange}
            className={inputStyle}
            required
          />
        </div>

        <div className="mt-4 flex gap-3">
          <button
            className={primaryBtn}
            type="submit"
          >
            {editingId
              ? "Update"
              : "Add"}{" "}
            Class Group
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

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">
                Strength
              </th>
              <th className="p-4">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {groups.map((group) => (
              <tr
                key={group.id}
                className="border-b text-center hover:bg-slate-50"
              >
                <td className="p-4">
                  {group.id}
                </td>

                <td className="p-4">
                  {group.name}
                </td>

                <td className="p-4">
                  {group.strength}
                </td>

                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    <button
                      className={editBtn}
                      onClick={() =>
                        handleEdit(
                          group
                        )
                      }
                    >
                      Edit
                    </button>

                    <button
                      className={deleteBtn}
                      onClick={() =>
                        handleDelete(
                          group.id
                        )
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

        {groups.length === 0 && (
          <div className="p-6 text-center text-slate-500">
            No class groups found.
          </div>
        )}
      </div>
    </div>
  );
}

export default ClassGroups;