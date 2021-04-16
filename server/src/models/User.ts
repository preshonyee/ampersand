import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default:
      "https://res.cloudinary.com/beaniegram/image/upload/v1613140307/Profile_avatar_placeholder_large_mhniuv.png",
  },
});

export default model("User", UserSchema);
