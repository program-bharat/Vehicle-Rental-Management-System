import { Routes, Route } from "react-router-dom";

// Layout
import MainLayout from "./components/layout/MainLayout";

// Pages
import ScrollToTop from "./components/common/ScrollToTop";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VehicleDetails from "./pages/VehicleDetails";
import ConfirmBooking from "./pages/ConfirmBooking";
import MyBookings from "./pages/MyBookings";
import BookingRequests from "./pages/owner/BookingRequests";
import OwnerDashboard from "./pages/owner/OwnerDashboard";
import MyVehicles from "./pages/owner/MyVehicles";
import EditVehicle from "./pages/owner/EditVehicle";
import AddVehicle from "./pages/owner/AddVehicle";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageVehicles from "./pages/admin/ManageVehicles";

// Routes
import PrivateRoute from "./routes/PrivateRoute";
import RoleBasedRoute from "./routes/RoleBasedRoute";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>

        {/* ALL pages now use MainLayout */}
        <Route element={<MainLayout />}>

          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
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
          >
            <Route
              path="my-vehicles"
              element={<MyVehicles />}
            />
            <Route
              path="edit-vehicle/:id"
              element={<EditVehicle />}
            />
            <Route
              path="add-vehicle"
              element={<AddVehicle />}
            />
            <Route
              path="my-bookings"
              element={<MyBookings />}
            />
            <Route
              path="booking-requests"
              element={<BookingRequests />}
            />
          </Route>

          <Route
            path="/admin/dashboard"
            element={
              <RoleBasedRoute role="admin">
                <AdminDashboard />
              </RoleBasedRoute>
            }
          >
            <Route
              path="users"
              element={<ManageUsers />}
            />
            <Route
              path="vehicles"
              element={<ManageVehicles />}
            />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;