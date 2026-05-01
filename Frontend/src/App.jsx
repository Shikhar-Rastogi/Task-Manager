// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import CreateProject from "./pages/CreateProject";
import ManageMembers from "./pages/ManageMembers";
import CreateTask from "./pages/CreateTask";
import TaskBoard from "./pages/TaskBoard";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects/:id"
          element={
            <ProtectedRoute>
              <ProjectDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects/new"
          element={
            <ProtectedRoute>
              <CreateProject />
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects/:id/members"
          element={
            <ProtectedRoute>
              <ManageMembers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects/:id/tasks/new"
          element={
            <ProtectedRoute>
              <CreateTask />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tasks/board"
          element={
            <ProtectedRoute>
              <TaskBoard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;