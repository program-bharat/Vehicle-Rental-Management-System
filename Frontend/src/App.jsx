import { Routes, Route } from "react-router-dom";

// Layout
import MainLayout from "./components/layout/MainLayout";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VehicleDetails from "./pages/VehicleDetails";
import ConfirmBooking from "./pages/ConfirmBooking";
import MyBookings from "./pages/MyBookings";
import OwnerDashboard from "./pages/OwnerDashboard";
import AdminDashboard from "./pages/AdminDashboard";

// Routes
import PrivateRoute from "./routes/PrivateRoute";
import RoleBasedRoute from "./routes/RoleBasedRoute";

const App = () => {
  return (
    <>
      <Routes>

        {/* ALL pages now use MainLayout */}
        <Route element={<MainLayout />}>

          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/vehicle/:id" element={<VehicleDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/confirm-booking"
            element={
              <PrivateRoute>
                <ConfirmBooking />
              </PrivateRoute>
            }
          />

          <Route
            path="/my-bookings"
            element={
              <PrivateRoute>
                <MyBookings />
              </PrivateRoute>
            }
          />

          <Route
            path="/owner/dashboard"
            element={
              <PrivateRoute>
                <RoleBasedRoute role="owner">
                  <OwnerDashboard />
                </RoleBasedRoute>
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute>
                <RoleBasedRoute role="admin">
                  <AdminDashboard />
                </RoleBasedRoute>
              </PrivateRoute>
            }
          />

        </Route>
      </Routes>
    </>
  );
};

export default App;