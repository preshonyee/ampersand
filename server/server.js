const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const connectDB = require("./config/db");
const cors = require("cors");
const errorHandler = require("./middleware/error");

// Load ENV variables
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

// Route files
const auth = require("./routes/auth");
const profile = require("./routes/profile");
const application = require("./routes/application");
const timeline = require("./routes/timeline");
const radar = require("./routes/radar");

const app = express();

// Body parser
app.use(express.json());

// Dev ENV logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Enable CORS
app.use(cors());

// Mount routers
app.use("/api/v1/auth", auth);
app.use("/api/v1/profile", profile);
app.use("/api/v1/application", application);
app.use("/api/v1/timeline", timeline);
app.use("/api/v1/radar", radar);

app.use(errorHandler);

// Define port
const PORT = process.env.PORT || 5000;

// Configure server
const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.magenta
      .bold
  )
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (error, promise) => {
  console.log(`Error: ${error.message}`.red);

  // Close server and exit process
  server.close(() => process.exit(1));
});
