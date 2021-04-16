import { Schema, model } from "mongoose";
const { ObjectId } = Schema.Types;

const ProfileSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    occupation: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    telephone: {
      type: String,
      required: true,
    },

    education: [
      {
        nameOfInstitution: {
          type: String,
          required: true,
        },
        yearEnded: {
          type: String,
          required: true,
        },
        honors: {
          type: String,
          required: true,
        },
        discipline: {
          type: String,
          required: true,
        },
      },
    ],
    skills: [
      {
        skill: {
          type: String,
          required: true,
        },
        tools: { type: String, required: true },
      },
    ],

    projects: [
      {
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
      },
    ],
    experience: [
      {
        company: {
          type: String,
          required: true,
        },
        role: {
          type: String,
          required: true,
        },
        location: {
          type: String,
          required: true,
        },
        date: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
      },
    ],

    achievements: [
      {
        achievementTitle: { type: String, required: true },
        awarder: { type: String, required: true },
        date: { type: String, required: true },
        event: { type: String, required: true },
      },
    ],
    owner: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default model("Profile", ProfileSchema);
