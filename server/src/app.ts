import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import "colors";
import cors from "cors";
import connectDB from "./config/db";
import errorHandler from "./middleware/error";
// Route files
import auth from "./routes/auth";
import profile from "./routes/profile";
import application from "./routes/application";
import timeline from "./routes/timeline";
import radar from "./routes/radar";

// Load ENV variables
config();

console.log(process.env.NODE_ENV);

// Connect to database
connectDB();

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
const { PORT } = process.env;

// Configure server
const server = app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.magenta
      .bold
  )
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (error: any) => {
  console.log(`Error: ${error.message}`.red);

  // Close server and exit process
  server.close(() => process.exit(1));
});
