import Dashboard from './pages/dashboard';
import Landing from './pages/Landing';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Error from './pages/Error';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Layout from './components/layout';
import AllJobs from './pages/dashboard/AllJobs.tsx';
import AddJob from './pages/dashboard/AddJob.tsx';
import Profile from './pages/dashboard/Profile.tsx';
import ProtectedRoute from './pages/ProtectedRoute.tsx';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        style={{ zIndex: 99999 }}
      />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
          <Route index element={<Dashboard />} />
          <Route path="all-jobs" element={<AllJobs />} />
          <Route path="add-job" element={<AddJob />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/landing" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;