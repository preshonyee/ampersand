const Radar = require("../models/Radar");
const ErrorResponse = require("../utils/errorResponse");
const axios = require("axios");

// @description:    Add new company to radar
// @route:          POST /api/v1/radar
// @access          Private
exports.createRadar = (req, res, next) => {
  const { avatar, companyName, linkToCareersPage } = req.body;

  // Check if fields are empty
  if ((!companyName, !linkToCareersPage)) {
    return next(new ErrorResponse("Please enter all the field", 422));
  }

  const radar = new Radar({
    avatar: avatar,
    companyName: companyName,
    linkToCareersPage: linkToCareersPage,
  });
  radar
    .save()
    .then((result) => {
      res.status(201).json({
        radar: result,
        message: "radar created successfully",
      });
      // log out profile updated activity to Timeline
      axios
          .post("http://localhost:5000/api/v1/timeline/create", {
            activityTitle: `You added ${result.companyName} to your radar`,
            activityBody: {
              message: `You added ${result.companyName} to your radar`,
              company: companyName
            },
            activityType: "radar",
            activityDate: Date.now(),
          })
          .then((response) => {
            console.log(response.data);
          })
    })
    .catch((error) => {
      console.log(error.message);
      return next(new ErrorResponse(error));
    });
};
