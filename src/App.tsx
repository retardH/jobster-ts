import Dashboard from './pages/dashboard';
import Landing from './pages/Landing';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Error from './pages/Error';
import Layout from './components/layout';
import AllJobs from './pages/dashboard/AllJobs.tsx';
import AddJob from './pages/dashboard/AddJob.tsx';
import Profile from './pages/dashboard/Profile.tsx';
import ProtectedRoute from './pages/ProtectedRoute.tsx';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 2500,
        }}
        containerStyle={{
          zIndex: 9999,
        }}
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
