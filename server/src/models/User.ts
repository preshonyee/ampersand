import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please add your first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please add your last name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      match: [
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please add a valid email",
      ],
    },
    username: {
      type: String,
      required: [true, "Please add a username"],
      unique: true,
      match: [/^[a-z0-9_-]{3,16}$/, "Username not available"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: 6,
      select: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    profilePicture: {
      type: String,
      default:
        "https://res.cloudinary.com/beaniegram/image/upload/v1613140307/Profile_avatar_placeholder_large_mhniuv.png",
    },
    location: {
      type: String,
      default: "",
    },
    portfolio: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    interests: {
      type: String,
      default: "",
    },
    twitter: {
      type: String,
      default: "",
      unique: true,
    },
    linkedin: {
      type: String,
      default: "",
      unique: true,
    },
    github: {
      type: String,
      default: "",
      unique: true,
    },
  },
  { timestamps: true }
);

export default model("User", UserSchema);
