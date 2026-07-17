import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "./layouts/AdminLayout";
import TeacherLayout from "./layouts/TeacherLayout";
import StudentLayout from "./layouts/StudentLayout";

import Dashboard from "./pages/Dashboard";
import Teachers from "./pages/Teachers";
import Subjects from "./pages/Subjects";
import Rooms from "./pages/Rooms";
import ClassGroups from "./pages/ClassGroups";
import TimeSlots from "./pages/TimeSlots";
import Assignments from "./pages/Assignments";
import Availability from "./pages/Availability";
import GenerateTimetable from "./pages/GenerateTimetable";
import Runs from "./pages/Runs";
import TimetableView from "./pages/TimetableView";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/admin/AdminDashboard";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
   <BrowserRouter>
     <Routes>

       {/* ================= PUBLIC ================= */}

       <Route path="/login" element={<Login />} />
       <Route path="/signup" element={<Signup />} />

       {/* ================= ADMIN ================= */}

       <Route
         path="/admin/*"
         element={
           <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
             <AdminLayout>
               <Routes>
                 <Route path="dashboard" element={<AdminDashboard />} />

                 <Route path="teachers" element={<Teachers />} />
                 <Route path="subjects" element={<Subjects />} />
                 <Route path="rooms" element={<Rooms />} />
                 <Route path="classgroups" element={<ClassGroups />} />
                 <Route path="timeslots" element={<TimeSlots />} />
                 <Route path="assignments" element={<Assignments />} />
                 <Route path="availability" element={<Availability />} />
                 <Route path="generate" element={<GenerateTimetable />} />
                 <Route path="runs" element={<Runs />} />
                 <Route path="timetable/:id" element={<TimetableView />} />
               </Routes>
             </AdminLayout>
           </ProtectedRoute>
         }
       />

       {/* ================= TEACHER ================= */}

       <Route
         path="/teacher/*"
         element={
           <ProtectedRoute allowedRoles={["ROLE_TEACHER"]}>
             <TeacherLayout>
               <Routes>
                 <Route
                   path="dashboard"
                   element={<TeacherDashboard />}
                 />
               </Routes>
             </TeacherLayout>
           </ProtectedRoute>
         }
       />

       {/* ================= STUDENT ================= */}

       <Route
         path="/student/*"
         element={
           <ProtectedRoute allowedRoles={["ROLE_STUDENT"]}>
             <StudentLayout>
               <Routes>
                 <Route
                   path="dashboard"
                   element={<StudentDashboard />}
                 />
               </Routes>
             </StudentLayout>
           </ProtectedRoute>
         }
       />

       {/* ================= DEFAULT ================= */}

       <Route
         path="*"
         element={<Navigate to="/login" replace />}
       />

     </Routes>
   </BrowserRouter>
  );
}

export default App;