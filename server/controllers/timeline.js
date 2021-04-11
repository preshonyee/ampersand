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
