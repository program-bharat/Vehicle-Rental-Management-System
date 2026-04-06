const express = require('express');
const cors = require('cors');
const app = express();

// Local Module
const authRoute = require('./routes/authRoute')
const vehicleRoute = require('./routes/vehicleRoute')
const userRoute = require('./routes/userRoute')
const bookingRoute = require('./routes/bookingRoute')

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/vehicles", vehicleRoute);
app.use("/api/users", userRoute);
app.use("/api/bookings", bookingRoute);

module.exports = app;