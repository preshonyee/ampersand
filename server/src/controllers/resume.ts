import axios from "axios";
import Resume from "../models/Resume";
import ErrorResponse from "../utils/errorResponse";
import { BASE_URL } from "../utils/baseUrl";
import { IGetUserAuthInfoRequest } from "user-auth";
import { NextFunction, Response } from "express";
import { IResume } from "resume.interface";

// @description:    Add new resume
// @route:          POST /api/v1/resume
// @access          Private
const createResume = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  const {
    firstName,
    lastName,
    occupation,
    location,
    website,
    email,
    telephone,
    education,
    skills,
    projects,
    experience,
    achievements,
    addedBy,
  } = req.body;

  // Check if fields are empty
  if (
    !firstName ||
    !lastName ||
    !occupation ||
    !location ||
    !website ||
    !email ||
    !telephone ||
    !education ||
    !skills ||
    !projects ||
    !experience ||
    !achievements
  ) {
    return next(new ErrorResponse("Please enter all the fields", 422));
  }

  const resume = new Resume({
    firstName,
    lastName,
    occupation,
    location,
    website,
    email,
    telephone,
    education,
    skills,
    projects,
    experience,
    achievements,
    addedBy,
  });

  // save resume to the database
  resume
    .save()
    .then((result: IResume) => {
      res.status(201).json({
        resume: result,
        message: "resume created successfully",
      });
      // log out resume created activity to Timeline
      axios
        .post(`${BASE_URL}/timeline/create`, {
          activityTitle: `You created your resume`,
          activityBody: {
            message: `You have just created your resume, you can create multiple resumes for different applications. Here are some useful tips for building a solid resume.`,
          },
          activityType: "resume",
          activityDate: Date.now(),
          addedBy: addedBy,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    })
    .catch((error) => {
      console.log(error);
      return next(new ErrorResponse(error, 422));
    });
};

// @description:    Get logged in user resume
// @route:          GET /api/v1/resume
// @access          Private
const myResume = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  Resume.find({ addedBy: req.user._id })
    .populate("addedBy", "_id firstName lastName email profilePicture")
    .then((resume: IResume[]) => {
      res.json({ result: resume });
    })
    .catch((error) => {
      console.log(error);
      return next(new ErrorResponse(error, 422));
    });
};

// @description:    Update user resume
// @route:          PUT /api/v1/resume/:resumeID
// @access          Private
const updateResume = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  Resume.findById({ _id: req.params.resumeID }).exec(
    (error, resume: IResume) => {
      // Check that the resume exists
      if (!resume) {
        return res.status(404).json({
          success: false,
          error: `Resume with ID ${req.params.resumeID} doesn't exist`,
        });
      }

      // If any error occurs
      if (error) {
        return res.status(422).json({ success: false, error });
      }

      // Make sure that the user is the addedBy of the resume
      if (resume.addedBy._id.toString() !== req.user._id.toString()) {
        return res.status(401).json({
          success: false,
          error: `User ${req.user._id} is not authorized to update this resume`,
        });
      }

      // Proceed to update the selected application
      if (resume.addedBy._id.toString() === req.user._id.toString()) {
        const {
          firstName,
          lastName,
          occupation,
          location,
          website,
          email,
          telephone,
          education,
          skills,
          projects,
          experience,
          achievements,
        } = req.body;

        // Check if fields are empty
        if (
          !firstName ||
          !lastName ||
          !occupation ||
          !location ||
          !website ||
          !email ||
          !telephone ||
          !education ||
          !skills ||
          !projects ||
          !experience ||
          !achievements
        ) {
          return next(new ErrorResponse("Please enter all the fields", 422));
        }

        // Now update resume
        Resume.findByIdAndUpdate(req.params.resumeID, req.body, {
          new: true,
          runValidators: true,
        })
          .populate("addedBy", "_id firstName lastName email")
          .exec((error, result: IResume) => {
            // Check for error
            if (error) {
              return res.status(422).json({ error });
            }
            res.status(200).json({
              success: true,
              message: "Resume updated successfully",
              result,
            });

            // log out resume updated activity to Timeline
            axios
              .post(`${BASE_URL}/timeline/create`, {
                activityTitle: `You updated your resume`,
                activityBody: {
                  message: `You updated your resume, you can create multiple resumes for different applications. Here are some useful tips for building a solid resume.`,
                },
                activityType: "resume",
                activityDate: Date.now(),
              })
              .then((response) => {
                console.log(response.data);
              })
              .catch((error) => {
                console.log(error.message);
              });
          });
      }
    }
  );
};

// @description:    Delete resume
// @route:          DELETE /api/v1/resume/:resumeID
// @access          Private
const deleteResume = (req: IGetUserAuthInfoRequest, res: Response) => {
  Resume.findOne({ _id: req.params.resumeID }).exec(
    (error, resume: IResume) => {
      // Check that the selected resume exists
      if (!resume) {
        return res.status(422).json({
          success: false,
          error: `Resume with ID ${req.params.resumeID} doesn't exist`,
        });
      }

      // If error occurs
      if (error) {
        return res.status(422).json({ success: false, error });
      }

      // Make sure the user is the addedBy of the resume
      if (resume.addedBy._id.toString() !== req.user._id.toString()) {
        return res.status(401).json({
          success: false,
          error: `User ${req.user._id} is not authorized to delete this resume`,
        });
      }

      // Proceed to delete resume
      if (resume.addedBy._id.toString() === req.user._id.toString()) {
        resume
          .remove()
          .then((result: IResume) => {
            res.json({
              success: true,
              message: "Resume deleted successfully",
              result: !result,
            });
          })
          .catch((error) => {
            console.log({ error });
          });
      }
    }
  );
};

export { createResume, updateResume, myResume, deleteResume };
