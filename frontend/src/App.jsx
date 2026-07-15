import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

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

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/teachers" element={<Teachers />} />
                  <Route path="/subjects" element={<Subjects />} />
                  <Route path="/rooms" element={<Rooms />} />
                  <Route path="/classgroups" element={<ClassGroups />} />
                  <Route path="/timeslots" element={<TimeSlots />} />
                  <Route path="/assignments" element={<Assignments />} />
                  <Route path="/availability" element={<Availability />} />
                  <Route path="/generate" element={<GenerateTimetable />} />
                  <Route path="/runs" element={<Runs />} />
                  <Route path="/timetable/:id" element={<TimetableView />} />
                </Routes>
              </MainLayout>
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;