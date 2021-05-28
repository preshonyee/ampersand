import Application from "../models/Application";
import ErrorResponse from "../utils/errorResponse";
import { NextFunction, Response } from "express";
import { IGetUserAuthInfoRequest } from "user-auth";
import { IApplication } from "application.interface";

// @description:    Add new application
// @route:          POST /api/v1/application/
// @access          Private
const createApplication = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  const { dateApplied, company, location, position, type, status } = req.body;

  if (!company || !location || !position || !type || !status) {
    return next(new ErrorResponse("Please enter all the fields", 422));
  }
  req.user.password = undefined; // To exempt the password from showing up in the response

  const application = new Application({
    dateApplied,
    company,
    location,
    position,
    type,
    status,
    addedBy: req.user,
  });

  // save application to the database
  application
    .save()
    .then((result: IApplication) => {
      res.status(201).json({
        application: result,
        message: "application successfully created",
      });
    })
    .catch((error) => {
      console.log(error);
      return next(new ErrorResponse(error, 401));
    });
};

// @description:    Get all applications by user
// @route:          GET /api/v1/application/
// @access          Private
const getUserApplications = (req: IGetUserAuthInfoRequest, res: Response) => {
  Application.find({ addedBy: req.user._id })
    .sort("-createdAt")
    .then((myApplications: IApplication[]) => {
      res
        .status(200)
        .json({ count: myApplications.length, applications: myApplications });
    })
    .catch((error) => {
      console.log(error);
    });
};

// @description:    Get single application by user
// @route:          GET /api/v1/application/:applicationID
// @access          Private
const getApplication = (req: IGetUserAuthInfoRequest, res: Response) => {
  Application.findById({ _id: req.params.applicationID })
    .populate("addedBy", "_id firstName lastName email")
    .then((application: IApplication) => {
      if (!application) {
        return res.status(422).json({
          success: false,
          error: `Application with ${req.params.applicationID} ID doesn't exist`,
        });
      }
      res.status(200).json({ success: true, application });
    })
    .catch((error) => {
      console.log(error);
    });
};

// @description:    Delete single application
// @route:          DELETE /api/v1/applications/:applicationID
// @access          Private
const deleteApplication = (req: IGetUserAuthInfoRequest, res: Response) => {
  Application.findOne({ _id: req.params.applicationID }).exec(
    (error, application: IApplication) => {
      // Check that the selected application exists
      if (!application) {
        return res.status(422).json({
          success: false,
          error: `Application with ${req.params.applicationID} doesn't exist`,
        });
      }

      // If error occurs
      if (error) {
        return res.status(422).json({ success: false, error });
      }

      // Make sure user is the owner of the application
      if (application.addedBy._id.toString() !== req.user._id.toString()) {
        return res.status(401).json({
          success: false,
          error: `User ${req.user._id} is not  authorized to delete this application`,
        });
      }

      // Proceed to delete selected application
      if (application.addedBy._id.toString() === req.user._id.toString()) {
        application
          .remove()
          .then((result) => {
            res.json({
              success: true,
              message: "Application successfully deleted",
            });
          })
          .catch((error) => {
            console.log({ error });
          });
      }
    }
  );
};

// @description:    Update an application
// @route:          PUT /api/v1/applications/:applicationID
// @access          Private
const updateApplication = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  Application.findById({ _id: req.params.applicationID }).exec(
    (error, application: IApplication) => {
      // Check that the application exists
      if (!application) {
        return res.status(422).json({
          success: false,
          error: `Application with ${req.params.applicationID} doesn't exist`,
        });
      }

      // If error occurs
      if (error) {
        return res.status(422).json({ success: false, error });
      }

      // Make sure that user is the owner of the application
      if (application.addedBy._id.toString() !== req.user._id.toString()) {
        return res.status(401).json({
          success: false,
          error: `User ${req.user._id} is not authorized to update this application`,
        });
      }

      // Proceed to update the selected application
      if (application.addedBy._id.toString() === req.user._id.toString()) {
        const {
          dateApplied,
          company,
          location,
          position,
          type,
          status,
        } = req.body;

        // Check if fields are empty
        if (
          !dateApplied ||
          !company ||
          !location ||
          !position ||
          !type ||
          !status
        ) {
          return next(new ErrorResponse("Please enter all the fields", 422));
        }

        Application.findByIdAndUpdate(req.params.applicationID, req.body, {
          new: true,
          runValidators: true,
        })
          .populate("addedBy", "_id firstName lastName email")
          .exec((error, result: IApplication) => {
            // Check for error
            if (error) {
              return res.status(422).json({ error });
            }
            res.status(200).json({
              success: true,
              message: "Application updated successfully",
              result,
            });
          });
      }
    }
  );
};

export {
  createApplication,
  updateApplication,
  deleteApplication,
  getApplication,
  getUserApplications,
};
