import axios from "axios";
import Radar from "../models/Radar";
import ErrorResponse from "../utils/errorResponse";
import { BASE_URL } from "../utils/baseUrl";

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
    avatar,
    companyName,
    linkToCareersPage,
    addedBy: req.user._id,
  });

  // save radar to the database
  radar
    .save()
    .then((result: any) => {
      res.status(201).json({
        radar: result,
        message: "radar created successfully",
      });
      // log out radar created activity to Timeline
      axios
        .post(`${BASE_URL}/timeline/create`, {
          activityTitle: `You added ${result.companyName} to your radar`,
          activityBody: {
            message: `You added ${result.companyName} to your radar`,
            company: companyName,
          },
          activityType: "radar",
          activityDate: Date.now(),
          addedBy: req.user._id,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error: any) => {
          console.log(error.message);
          return next(new ErrorResponse(error, 422));
        });
    })
    .catch((error: any) => {
      console.log(error.message);
      return next(new ErrorResponse(error, 422));
    });
};

// @description:    Fetch all radar entries by logged in user
// @route:          GET /api/v1/radar
// @access          Private
const getRadarEntries = (req: any, res: any, next: any) => {
  Radar.find({ addedBy: req.user._id })
    .then((radar: any) => {
      res.status(200).json({ count: radar.length, result: radar });
    })
    .catch((error: any) => {
      console.log(error);
      return next(new ErrorResponse(error, 422));
    });
};

export { createRadar, getRadarEntries };
