const express = require('express');
const cors = require('cors');
const app = express();

// Local Module
const authRoute = require('./routes/authRoute')
const vehicleRoute = require('./routes/vehicleRoute')
const userRoute = require('./routes/userRoute')
const bookingRoute = require('./routes/bookingRoute');
const contactRoute = require('./routes/contactRoute');
const { errorHandler } = require('./middlewares/errorMiddleware');

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/vehicles", vehicleRoute);
app.use("/api/users", userRoute);
app.use("/api/bookings", bookingRoute);
app.use("/api/contact", contactRoute);

// Error Handler
app.use(errorHandler)

module.exports = app;