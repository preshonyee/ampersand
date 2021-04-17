import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import "colors";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import XSS from "xss-clean";
import rateLimit from "express-rate-limit";
import hpp from "hpp";
import cors from "cors";
import errorHandler from "./middleware/error";
import connectDB from "./config/db";

// Load ENV variables
config();

// Connect to database
connectDB();

// Route files
import auth from "./routes/auth";
import resume from "./routes/resume";
import application from "./routes/application";
import timeline from "./routes/timeline";
import radar from "./routes/radar";
import user from "./routes/user";

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Dev ENV logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(XSS());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 60 * 1000, // 10 minutes
  max: 100,
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Mount routers
app.use("/api/v1/auth", auth);
app.use("/api/v1/resume", resume);
app.use("/api/v1/application", application);
app.use("/api/v1/timeline", timeline);
app.use("/api/v1/radar", radar);
app.use("/api/v1/user", user);

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
