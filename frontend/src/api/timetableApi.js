import api from "./axios";

// ======================
// TEACHERS API
// ======================

export const getTeachers = () =>
  api.get("/teachers");

export const createTeacher = (teacher) =>
  api.post("/teachers", teacher);

export const updateTeacher = (id, teacher) =>
  api.put(`/teachers/${id}`, teacher);

export const deleteTeacher = (id) =>
  api.delete(`/teachers/${id}`);

// ======================
// TEACHING AVAILABILITY API
// ======================

export const getAvailabilities = () =>
  api.get("/teaching-availability");

export const getAvailabilityById = (id) =>
  api.get(`/teaching-availability/${id}`);

export const createAvailability = (availability) =>
  api.post("/teaching-availability", availability);

export const updateAvailability = (id, availability) =>
  api.put(`/teaching-availability/${id}`, availability);

export const deleteAvailability = (id) =>
  api.delete(`/teaching-availability/${id}`);

// ======================
// TEACHING ASSIGNMENTS API
// ======================

export const getAssignments = () =>
  api.get("/teaching-assignments");

export const getAssignmentById = (id) =>
  api.get(`/teaching-assignments/${id}`);

export const createAssignment = (assignment) =>
  api.post("/teaching-assignments", assignment);

export const updateAssignment = (id, assignment) =>
  api.put(`/teaching-assignments/${id}`, assignment);

export const deleteAssignment = (id) =>
  api.delete(`/teaching-assignments/${id}`);

// ======================
// SUBJECTS API
// ======================

export const getSubjects = () =>
  api.get("/subjects");

export const getSubjectById = (id) =>
  api.get(`/subjects/${id}`);

export const createSubject = (subject) =>
  api.post("/subjects", subject);

export const updateSubject = (id, subject) =>
  api.put(`/subjects/${id}`, subject);

export const deleteSubject = (id) =>
  api.delete(`/subjects/${id}`);

// CLASS GROUPS API

export const getClassGroups = () => {
  return api.get("/classgroups");
};

export const getClassGroupById = (id) => {
  return api.get(`/classgroups/${id}`);
};

export const createClassGroup = (classGroup) => {
  return api.post("/classgroups", classGroup);
};

export const updateClassGroup = (id, classGroup) => {
  return api.put(`/classgroups/${id}`, classGroup);
};

export const deleteClassGroup = (id) => {
  return api.delete(`/classgroups/${id}`);
};

// TIMESLOT API

export const getTimeSlots = () => {
  return api.get("/timeslot");
};

export const getTimeSlotById = (id) => {
  return api.get(`/timeslot/${id}`);
};

export const createTimeSlot = (slot) => {
  return api.post("/timeslot", slot);
};

export const updateTimeSlot = (id, slot) => {
  return api.put(`/timeslot/${id}`, slot);
};

export const deleteTimeSlot = (id) => {
  return api.delete(`/timeslot/${id}`);
};

// ======================
// Room API
// ======================

export const getRooms = () => api.get("/rooms");

export const getRoomById = (id) =>
  api.get(`/rooms/${id}`);

export const createRoom = (room) =>
  api.post("/rooms", room);

export const updateRoom = (id, room) =>
  api.put(`/rooms/${id}`, room);

export const deleteRoom = (id) =>
  api.delete(`/rooms/${id}`);



// ======================
// TIMETABLE API
// ======================

export const getStats = () =>
  api.get("/timetable/stats");

export const getRuns = () =>
  api.get("/timetable/runs");

export const generateTimetable = () =>
  api.post("/timetable/generate");

export const deleteRun = (id) =>
  api.delete(`/timetable/runs/${id}`);

export const getRunById = (id) =>
  api.get(`/timetable/runs/${id}`);

// ======================
// EXPORT API
// ======================

export const exportPdf = (runId) => {
  return api.get(`/timetable/export/pdf/${runId}`, {
    responseType: "blob",
  });
};

export const exportExcel = (runId) => {
  return api.get(
    `/timetable/export/excel/${runId}`,
    {
      responseType: "blob",
    }
  );
};