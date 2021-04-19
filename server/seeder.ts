import fs from "fs";
import mongoose from "mongoose";
import "colors";
import { config } from "dotenv";

// Load env vars
config();

// Load models
import Resume from "./src/models/Resume";
import Application from "./src/models/Application";
import User from "./src/models/User";

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
});

// Read the JSON files
const resume = JSON.parse(
  fs.readFileSync(`${__dirname}/src/_data/resume.json`, "utf-8")
);
const applications = JSON.parse(
  fs.readFileSync(`${__dirname}/src/_data/applications.json`, "utf-8")
);
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/src/_data/users.json`, "utf-8")
);

// Import into DB
const importData = async () => {
  try {
    await Resume.create(resume);
    await Application.create(applications);
    await User.create(users);
    console.log("Data Imported...".green.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

// Delete from DB
const deleteData = async () => {
  try {
    await Resume.deleteMany();
    await Application.deleteMany();
    await User.deleteMany();
    console.log("Data Destroyed...".red.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

if (process.argv[2] === "-import") {
  importData();
} else if (process.argv[2] === "-delete") {
  deleteData();
}
