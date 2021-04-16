import { Request, Response, NextFunction } from "express";
import Application from "../models/Application";
import ErrorResponse from "../utils/errorResponse";
import axios from "axios";

// TODO: Fix all any types

// @description:    Add new application
// @route:          POST /api/v1/application/createApplication
// @access          Private
exports.createApplication = (req: any, res: any, next: any) => {
  const {
    dateApplied,
    company,
    location,
    position,
    type,
    source,
    strategy,
    coverLetter,
    resume,
    referral,
    relocation,
    remote,
    mainContact,
    receptionMail,
    status,
    likelihoodOfHiring,
    lastTimeContacted,
    tags,
  } = req.body;

  if (
    !company ||
    !location ||
    !position ||
    !type ||
    !source ||
    !strategy ||
    !coverLetter ||
    !resume ||
    !referral ||
    !relocation ||
    !remote ||
    !mainContact ||
    !receptionMail ||
    !status ||
    !likelihoodOfHiring ||
    !lastTimeContacted ||
    !tags
  ) {
    return next(new ErrorResponse("Please enter all the fields", 422));
  }

  console.log(req.user);
  req.user.password = undefined; // To exempt the password from showing up in the response

  const application = new Application({
    dateApplied: dateApplied,
    company: company,
    location: location,
    position: position,
    type: type,
    source: source,
    strategy: strategy,
    coverLetter: coverLetter,
    resume: resume,
    referral: referral,
    relocation: relocation,
    remote: remote,
    mainContact: mainContact,
    receptionMail: receptionMail,
    status: status,
    likelihoodOfHiring: likelihoodOfHiring,
    lastTimeContacted: lastTimeContacted,
    tags: tags,
    addedBy: req.user,
  });

  // save application to the database
  application
    .save()
    .then((result: any) => {
      res.status(201).json({
        application: result,
        message: "application successfully created",
      });
      // log out application created activity to Timeline
      axios
        .post("http://localhost:5000/api/v1/timeline/create", {
          activityTitle: `You submitted an application at ${result.company}`,
          activityBody: {
            company: result.company,
            location: result.location,
            position: result.position[0].positionTitle,
            type: result.type,
            remote: result.remote,
            tags: result.tags,
            message: "You added a new application, good luck",
          },
          activityType: "application",
          activityDate: Date.now(),
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    })
    .catch((error: AsyncGenerator) => {
      console.log(error);
      return next(new ErrorResponse(error, 401));
    });
};

// @description:    Get all applications by user
// @route:          GET /api/v1/application/myApplications
// @access          Private
exports.getUserApplications = (req: any, res: any) => {
  Application.find({ addedBy: req.user._id })
    .sort("-createdAt")
    .then((myApplications: any) => {
      res
        .status(200)
        .json({ count: myApplications.length, applications: myApplications });
    })
    .catch((error: any) => {
      console.log(error);
    });
};

// @description:    Get single application by user
// @route:          GET /api/v1/application/:applicationID
// @access          Private
exports.getApplication = (req: any, res: any) => {
  Application.findById({ _id: req.params.applicationID })
    .populate("addedBy", "_id firstName lastName email")
    .then((application: any) => {
      if (!application) {
        return res.status(422).json({
          success: false,
          error: `Application with ${req.params.applicationID} ID doesn't exist`,
        });
      }
      res.status(200).json({ success: true, application: application });
    })
    .catch((error: any) => {
      console.log(error);
    });
};

// @description:    Delete single application
// @route:          DELETE /api/v1/applications/delete/:applicationID
// @access          Private
exports.deleteApplication = (req: any, res: any) => {
  Application.findOne({ _id: req.params.applicationID }).exec(
    (error: any, application: any) => {
      // Check that the selected application exists
      if (!application) {
        return res.status(422).json({
          success: false,
          error: `Application with ${req.params.applicationID} doesn't exist`,
        });
      }

      // If error occurs
      if (error) {
        return res.status(422).json({ success: false, error: error });
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
          .then((result: any) => {
            res.json({
              success: true,
              message: "Application successfully deleted",
            });
          })
          .catch((error: any) => {
            console.log({ error });
          });
      }
    }
  );
};

// @description:    Update an application
// @route:          PUT /api/v1/applications/update/:applicationID
// @access          Private
exports.updateApplication = (req: any, res: any, next: any) => {
  Application.findById({ _id: req.params.applicationID }).exec(
    (error: any, application: any) => {
      // Check that the application exists
      if (!application) {
        return res.status(422).json({
          success: false,
          error: `Application with ${req.params.applicationID} doesn't exist`,
        });
      }

      // If error occurs
      if (error) {
        return res.status(422).json({ success: false, error: error });
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
          source,
          strategy,
          coverLetter,
          resume,
          referral,
          relocation,
          remote,
          mainContact,
          receptionMail,
          status,
          likelihoodOfHiring,
          lastTimeContacted,
          tags,
        } = req.body;

        // Check if fields are empty
        if (
          !dateApplied ||
          !company ||
          !location ||
          !position ||
          !type ||
          !source ||
          !strategy ||
          !coverLetter ||
          !resume ||
          !referral ||
          !relocation ||
          !remote ||
          !mainContact ||
          !receptionMail ||
          !status ||
          !likelihoodOfHiring ||
          !lastTimeContacted ||
          !tags
        ) {
          return next(new ErrorResponse("Please enter all the fields", 422));
        }

        Application.findByIdAndUpdate(req.params.applicationID, req.body, {
          new: true,
          runValidators: true,
        })
          .populate("addedBy", "_id firstName lastName email")
          .exec((error: any, result: any) => {
            // Check for error
            if (error) {
              return res.status(422).json({ error: error });
            } else {
              res.status(200).json({
                success: true,
                message: "Application updated successfully",
                result: result,
              });
              // log out application updated activity to Timeline
              axios
                .post("http://localhost:5000/api/v1/timeline/create", {
                  activityTitle: `You updated your application at ${result.company}`,
                  activityBody: {
                    company: result.company,
                    location: result.location,
                    position: result.position[0].positionTitle,
                    type: result.type,
                    remote: result.remote,
                    tags: result.tags,
                    message: "You updated your application, good luck",
                  },
                  activityType: "application",
                  activityDate: Date.now(),
                })
                .then((response) => {
                  console.log(response.data);
                })
                .catch((error) => {
                  console.log(error.message);
                });
            }
          });
      }
    }
  );
};
