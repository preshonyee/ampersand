import Timeline from "../models/Timeline";
import ErrorResponse from "../utils/errorResponse";

// TODO: Fix all any types

// @description:    Create new timeline activity
// @route:          POST /api/v1/timeline/create
// @access          Private
const createTimelineActivity = (req: any, res: any, next: any) => {
  const { activityTitle, activityBody, activityType, activityDate } = req.body;

  // Check if fields are empty
  if (!activityTitle || !activityBody || !activityType || !activityDate) {
    return next(new ErrorResponse("Please enter all the fields", 422));
  }

  const timeline = new Timeline({
    activityTitle,
    activityBody,
    activityType,
    activityDate,
  });

  timeline
    .save()
    .then((result: any) => {
      res.status(201).json({
        timeline: result,
        message: "timeline activity successfully created",
      });
    })
    .catch((error: any) => {
      console.log(error);
      return next(new ErrorResponse(error, 401));
    });
};

// @description:    Fetch all timeline activity
// @route:          GET /api/v1/timeline/
// @access          Private
const getTimelineActivities = (req: any, res: any) => {
  Timeline.find()
    .sort("-createdAt")
    .then((activities: any) => {
      res.status(200).json({ count: activities.length, result: activities });
    })
    .catch((error: any) => {
      console.log(error);
    });
};

export { createTimelineActivity, getTimelineActivities };
