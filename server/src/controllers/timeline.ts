import { NextFunction, Response } from "express";
import { ITimeline } from "timeline.interface";
import { IGetUserAuthInfoRequest } from "user-auth";
import Timeline from "../models/Timeline";
import ErrorResponse from "../utils/errorResponse";

// @description:    Create new timeline activity
// @route:          POST /api/v1/timeline
// @access          Private
const createTimelineActivity = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  const {
    activityTitle,
    activityBody,
    activityType,
    activityDate,
    addedBy,
  } = req.body;

  // Check if fields are empty
  if (!activityTitle || !activityBody || !activityType || !activityDate) {
    return next(new ErrorResponse("Please enter all the fields", 422));
  }

  const timeline = new Timeline({
    activityTitle,
    activityBody,
    activityType,
    activityDate,
    addedBy,
  });
  // save timeline activity to the database
  timeline
    .save()
    .then((result: ITimeline) => {
      res.status(201).json({
        timeline: result,
        message: "timeline activity successfully created",
      });
    })
    .catch((error) => {
      console.log(error);
      return next(new ErrorResponse(error, 401));
    });
};

// @description:    Fetch all timeline activity by logged in user
// @route:          GET /api/v1/timeline/
// @access          Private
const getTimelineActivities = (req: IGetUserAuthInfoRequest, res: Response) => {
  Timeline.find({ addedBy: req.user._id })
    .sort("-createdAt")
    .then((activities: ITimeline[]) => {
      res.status(200).json({ count: activities.length, result: activities });
    })
    .catch((error) => {
      console.log(error);
    });
};

export { createTimelineActivity, getTimelineActivities };
