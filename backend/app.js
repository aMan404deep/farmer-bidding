const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const farmerRoutes = require("./routes/farmer");
const transporterRoutes = require("./routes/transporter");
const bidRoutes = require("./routes/bid");

const app = express();

// Middleware
// Enable CORS for specific origins
const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your frontend URL
    optionsSuccessStatus: 200,
  };
  
  app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/farmer", farmerRoutes);
app.use("/api/transporters", transporterRoutes);
app.use("/api/bid", bidRoutes);

// Connect to DB
connectDB();

module.exports = app;
