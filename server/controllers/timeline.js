const Timeline = require("../models/Timeline");
const ErrorResponse = require("../utils/errorResponse");

// @description:    Create new timeline activity
// @route:          POST /api/v1/timeline/create
// @access          Private
exports.createTimelineActivity = (req, res, next) => {
  const { activityTitle, activityBody, activityType, activityDate } = req.body;

  // Check if fields are empty
  if (!activityTitle || !activityBody || !activityType || !activityDate) {
    return next(new ErrorResponse("Please enter all the fields", 422));
  }

  const timeline = new Timeline({
    activityTitle: activityTitle,
    activityBody: activityBody,
    activityType: activityType,
    activityDate: activityDate,
  });

  timeline
    .save()
    .then((result) => {
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

// @description:    Fetch all timeline activity
// @route:          GET /api/v1/timeline/
// @access          Private
exports.getTimelineActivities = (req, res) => {
  Timeline.find()
    .sort("-createdAt")
    .then((activities) => {
      res.status(200).json({ count: activities.length, result: activities });
    })
    .catch((error) => {
      console.log(error);
    });
};
