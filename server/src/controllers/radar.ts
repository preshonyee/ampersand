import Radar from "../models/Radar";
import ErrorResponse from "../utils/errorResponse";
import axios from "axios";

// TODO: Fix all any types

// @description:    Add new company to radar
// @route:          POST /api/v1/radar
// @access          Private
const createRadar = (req: any, res: any, next: any) => {
  const { avatar, companyName, linkToCareersPage } = req.body;

  // Check if fields are empty
  if (!companyName || !linkToCareersPage) {
    return next(new ErrorResponse("Please enter all the field", 422));
  }

  const radar = new Radar({
    avatar: avatar,
    companyName: companyName,
    linkToCareersPage: linkToCareersPage,
  });
  radar
    .save()
    .then((result: any) => {
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
            company: companyName,
          },
          activityType: "radar",
          activityDate: Date.now(),
        })
        .then((response) => {
          console.log(response.data);
        });
    })
    .catch((error: any) => {
      console.log(error.message);
      return next(new ErrorResponse(error, 422));
    });
};

// @description:    Fetch all radar entries
// @route:          GET /api/v1/radar
// @access          Private
const getRadarEntries = (req: any, res: any) => {
  Radar.find()
    .then((radar: any) => {
      res.status(200).json({ count: radar.length, result: radar });
    })
    .catch((error: any) => {
      console.log(error);
    });
};

export { createRadar, getRadarEntries };
