import * as React from "react";
import { Landing, Register, ProtectedRoute, Shared, Error } from "./pages";
import { EveryJobs, Addjobs, Profile, Statistics } from "./pages/dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/landing" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Error />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Shared />
            </ProtectedRoute>
          }
        >
          <Route path="/all-jobs" element={<EveryJobs />} />
          <Route path="/add-job" element={<Addjobs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Statistics />} />
        </Route>
      </Routes>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Router>
  );
}

export default App;
