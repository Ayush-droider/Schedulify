import { useEffect, useMemo, useState } from "react";

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

  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    strength: "",
  });

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

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Delete this class group?"
      )
    )
      return;

    try {
      await deleteClassGroup(id);
      fetchGroups();
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  const filteredGroups = useMemo(() => {
    const value = search.toLowerCase();

    return groups.filter((group) => {
      return (
        group.name
          .toLowerCase()
          .includes(value) ||
        group.strength
          .toString()
          .includes(value)
      );
    });
  }, [groups, search]);

  return (<div className="min-h-screen bg-slate-50 p-6">

            {/* Header */}

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

              <div>

                <div className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">

                  🎓 Class Group Management

                </div>

                <h1 className="mt-3 text-4xl font-bold text-slate-900">

                  Class Groups

                </h1>

                <p className="mt-2 text-slate-500">

                  Manage student batches and their class strength for timetable generation.

                </p>

              </div>

              <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-lg">

                <p className="text-sm text-blue-100">

                  Total Class Groups

                </p>

                <h2 className="mt-2 text-4xl font-bold">

                  {groups.length}

                </h2>

              </div>

            </div>

            {/* Form */}

            <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

              <div className="mb-6 flex items-center justify-between">

                <div>

                  <h2 className="text-2xl font-bold text-slate-900">

                    {editingId ? "Edit Class Group" : "Add New Class Group"}

                  </h2>

                  <p className="mt-1 text-sm text-slate-500">

                    Create student groups and define their total strength.

                  </p>

                </div>

                {editingId && (

                  <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">

                    Editing

                  </span>

                )}

              </div>

              <form onSubmit={handleSubmit}>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                  <div>

                    <label className="mb-2 block text-sm font-medium text-slate-700">

                      Class Group Name

                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="B.Tech CSE - 3rd Year A"
                      className={inputStyle}
                      required
                    />

                  </div>

                  <div>

                    <label className="mb-2 block text-sm font-medium text-slate-700">

                      Student Strength

                    </label>

                    <input
                      type="number"
                      min="1"
                      name="strength"
                      value={formData.strength}
                      onChange={handleChange}
                      placeholder="60"
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
                    {editingId ? "Update Class Group" : "Add Class Group"}
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

                    Class Group Directory

                  </h3>

                  <p className="text-sm text-slate-500">

                    Search groups by name or student strength.

                  </p>

                </div>

                <div className="w-full md:w-80">

                  <input
                    type="text"
                    placeholder="Search class groups..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={inputStyle}
                  />

                </div>

              </div>

            </div>
                 {/* Class Groups Table */}

                 <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

                   <div className="overflow-x-auto">

                     <table className="min-w-full">

                       <thead className="bg-slate-100">

                         <tr className="text-left text-sm font-semibold text-slate-700">

                           <th className="px-6 py-4">Class Group</th>

                           <th className="px-6 py-4">Strength</th>

                           <th className="px-6 py-4 text-center">Status</th>

                           <th className="px-6 py-4 text-center">Actions</th>

                         </tr>

                       </thead>

                       <tbody>

                         {filteredGroups.length > 0 ? (

                           filteredGroups.map((group) => (

                             <tr
                               key={group.id}
                               className="border-t border-slate-200 transition hover:bg-blue-50"
                             >

                               <td className="px-6 py-5">

                                 <div className="flex items-center gap-4">

                                   <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-xl text-white shadow">

                                     🎓

                                   </div>

                                   <div>

                                     <h3 className="font-semibold text-slate-900">

                                       {group.name}

                                     </h3>

                                     <p className="text-sm text-slate-500">

                                       Group ID #{group.id}

                                     </p>

                                   </div>

                                 </div>

                               </td>

                               <td className="px-6 py-5">

                                 <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">

                                   👥 {group.strength} Students

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
                                     onClick={() => handleEdit(group)}
                                     className={editBtn}
                                   >
                                     Edit
                                   </button>

                                   <button
                                     onClick={() => handleDelete(group.id)}
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

                                   🎓

                                 </div>

                                 <h3 className="text-xl font-semibold text-slate-700">

                                   No Class Groups Found

                                 </h3>

                                 <p className="mt-2 text-slate-500">

                                   Create your first class group to start generating timetables.

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

           export default ClassGroups;