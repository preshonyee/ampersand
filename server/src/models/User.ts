import { Schema, model } from "mongoose";
import { UserAttrs, UserDoc, UserModel } from "user";

const UserSchema = new Schema<UserDoc>(
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
      default: "No location added",
    },
    portfolio: {
      type: String,
      default: "No portfolio added",
    },
    bio: {
      type: String,
      default: "No Bio added",
    },
    interests: {
      type: String,
      default: "No interests added",
    },
    twitter: {
      type: String,
      default: "Twitter profile not yet added",
    },
    linkedin: {
      type: String,
      default: "Linkedin profile not yet added",
    },
    github: {
      type: String,
      default: "GitHub profile not yet added",
    },
  },
  { timestamps: true }
);

UserSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = model<UserDoc, UserModel>("User", UserSchema);

export { User };
