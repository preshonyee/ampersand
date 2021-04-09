const Profile = require("../models/Profile");
const ErrorResponse = require("../utils/errorResponse");

exports.createProfile = (req, res, next) => {
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

  req.user.password = undefined; // To exempt the password from showing up in the response

  const profile = new Profile({
    firstName: firstName,
    lastName: lastName,
    occupation: occupation,
    location: location,
    website: website,
    email: email,
    telephone: telephone,
    education: education,
    skills: skills,
    projects: projects,
    experience: experience,
    achievements: achievements,
    owner: req.user,
  });
  profile
    .save()
    .then((result) => {
      res.status(201).json({
        profile: result,
        message: "profile created successfully",
      });
    })
    .catch((error) => {
      console.log(error);
      return next(new ErrorResponse(error));
    });
};

exports.myProfile = (req, res) => {
  Profile.find({ owner: req.user._id })
    .populate("owner", "_id firstName lastName email profilePicture")
    .then((profile) => {
      res.json({ result: profile });
    })
    .catch((error) => {
      console.log(error);
    });
};
