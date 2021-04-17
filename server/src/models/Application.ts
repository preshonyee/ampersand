import { Schema, model } from "mongoose";

const { ObjectId } = Schema.Types;

const ApplicationSchema = new Schema(
  {
    dateApplied: {
      type: Date,
      default: Date.now,
      required: [true, "Please add an application date"],
    },
    company: {
      type: String,
      required: [true, "Please add a company"],
    },
    location: {
      type: String,
      required: [true, "Please add a location"],
    },
    position: [
      {
        positionTitle: {
          type: String,
          required: [true, "Please add position title"],
        },
        linkToOpening: {
          type: String,
          required: [true, "Please add link to opening"],
        },
      },
    ],
    type: {
      type: String,
      enum: ["Part Time", "Full Time", "Contract", "Internship", "Agency"],
      required: [true, "Please choose a type"],
    },
    source: {
      type: String,
      enum: [
        "LinkedIn",
        "Indeed",
        "Company Jobs/Careers Page",
        "Remote Job Boards",
        "HackerNews",
        "Reddit",
        "Discord Channel",
        "StackOverflow",
        "Twitter",
        "Newsletter",
        "Other",
      ],
      required: [true, "Please choose a source"],
    },
    strategy: {
      type: String,
      enum: [
        "Twitter DM",
        "Cold Email",
        "Referral",
        "Fund Raise Announcement",
        "VC Portfolio",
        "Search Term/Queries",
        "Tweet",
        "Other",
      ],
      required: [true, "Please choose a strategy"],
    },
    coverLetter: {
      type: String,
      required: [true, "Please add a link to your cover letter"],
    },
    resume: {
      type: String,
      required: [true, "Please add a link to your resume"],
    },
    referral: {
      type: String,
      enum: ["YES", "NO"],
      required: [true, "Please add a referral"],
    },
    relocation: {
      type: String,
      enum: [
        "Require Relocation",
        "Support With Relocation",
        "No Relocation Support",
        "N/A",
      ],
      required: [true, "Please select a relocation option"],
    },
    remote: {
      type: String,
      enum: ["Fully Remote", "Remote (US-Only)", "No Remote"],
      required: [true, "Please select a remote option"],
    },
    mainContact: [
      {
        mainContactName: {
          type: String,
          required: [true, "Please add main contact name"],
        },
        mainContactPhone: {
          type: String,
          required: [true, "Please add main contact phone number"],
        },
      },
    ],
    receptionMail: {
      type: String,
      enum: ["YES", "NO"],
      required: [true, "Please choose an option"],
    },
    status: {
      type: String,
      enum: [
        "Prospect",
        "Applied",
        "First Interviews",
        "Requires Follow-up",
        "Negotiating Offer",
        "Closed",
        "Hired",
      ],
      required: [true, "Please select a status option"],
    },
    likelihoodOfHiring: {
      type: String,
      enum: [
        "0%: Declined offer",
        "0%: Lost opportunity",
        "5%: Too early to tell",
        "10%: Made contact",
        "10%: Weak Phone screening",
        "15%: Scheduled Phone Screening",
        "15%: Weak first round interview",
        "20%: Strong Phone screen",
        "25%: Weak second round interview",
        "30%: Scheduled Interviews",
        "40%: Strong first round interviews",
        "50%: Scheduled second round interviews",
        "60%: Strong second round interviews",
        "80%: Received offer",
        "100%: Accepted offer",
      ],
      required: [true, "Please select an option"],
    },
    lastTimeContacted: {
      type: Date,
      required: [true, "Please select an option"],
    },
    tags: {
      type: [String],
      enum: [
        "Benefits",
        "Internal Connections",
        "Below Desired Salary",
        "Above Desired Salary",
        "Within Salary Range",
        "Equity",
        "Hourly Salary",
        "Required Travel",
        "Strong Parental Leave Policy",
        "Weak Parental Leave Policy",
      ],
      required: [true, "Please choose a tag"],
    },
    addedBy: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default model("Application", ApplicationSchema);
