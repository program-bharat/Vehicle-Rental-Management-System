const dotenv = require('dotenv');
// Loading env module
dotenv.config();

// Local Module
const connectDB = require('./src/config/db');
const app = require('./src/app');

// Connecting to DB
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
