import axios from "axios";
import Profile from "../models/Profile";
import ErrorResponse from "../utils/errorResponse";

// TODO: Fix all any types

// @description:    Add new resume profile
// @route:          POST /api/v1/profile/createProfile
// @access          Private
const createProfile = (req: any, res: any, next: any) => {
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
    owner: req.user,
  });
  profile
    .save()
    .then((result: any) => {
      res.status(201).json({
        profile: result,
        message: "profile created successfully",
      });
      // log out profile created activity to Timeline
      axios
        .post("http://localhost:5000/api/v1/timeline/create", {
          activityTitle: `You created your resume profile`,
          activityBody: {
            message: `You have just created your resume profile, you can create multiple resumes for different applications. Here are some useful tips for building a solid resume.`,
          },
          activityType: "resume",
          activityDate: Date.now(),
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    })
    .catch((error: any) => {
      console.log(error);
      return next(new ErrorResponse(error, 422));
    });
};

// @description:    Get logged in user resume profile
// @route:          GET /api/v1/profile/myProfile
// @access          Private
const myProfile = (req: any, res: any) => {
  Profile.find({ owner: req.user._id })
    .populate("owner", "_id firstName lastName email profilePicture")
    .then((profile: any) => {
      res.json({ result: profile });
    })
    .catch((error: any) => {
      console.log(error);
    });
};

// @description:    Update user resume profile
// @route:          PUT /api/v1/profile/update/:profileID
// @access          Private
const updateProfile = (req: any, res: any, next: any) => {
  Profile.findById({ _id: req.params.profileID }).exec(
    (error: any, profile: any) => {
      // Check that the resume profile exists
      if (!profile) {
        return res.status(404).json({
          success: false,
          error: `Resume profile with ID ${req.params.profileID} doesn't exist`,
        });
      }

      // If any error occurs
      if (error) {
        return res.status(422).json({ success: false, error });
      }

      // Make sure that the user is the owner of the resume profile
      if (profile.owner._id.toString() !== req.user._id.toString()) {
        return res.status(401).json({
          success: false,
          error: `User ${req.user._id} is not authorized to update this resume profile`,
        });
      }

      // Proceed to update the selected application
      if (profile.owner._id.toString() === req.user._id.toString()) {
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

        // Now update resume profile
        Profile.findByIdAndUpdate(req.params.profileID, req.body, {
          new: true,
          runValidators: true,
        })
          .populate("owner", "_id firstName lastName email")
          .exec((error: any, result: any) => {
            // Check for error
            if (error) {
              return res.status(422).json({ error });
            }
            res.status(200).json({
              success: true,
              message: "Resume profile updated successfully",
              result,
            });

            // log out profile updated activity to Timeline
            axios
              .post("http://localhost:5000/api/v1/timeline/create", {
                activityTitle: `You updated your resume profile`,
                activityBody: {
                  message: `You updated your resume profile, you can create multiple resumes for different applications. Here are some useful tips for building a solid resume.`,
                },
                activityType: "resume",
                activityDate: Date.now(),
              })
              .then((response) => {
                console.log(response.data);
              })
              .catch((error) => {
                console.log(error.message);
              });
          });
      }
    }
  );
};

// @description:    Delete resume profile
// @route:          DELETE /api/v1/profile/delete/:profileID
// @access          Private
const deleteProfile = (req: any, res: any) => {
  Profile.findOne({ _id: req.params.profileID }).exec(
    (error: any, profile: any) => {
      // Check that the selected resume profile exists
      if (!profile) {
        return res.status(422).json({
          success: false,
          error: `Profile with ID ${req.params.profileID} doesn't exist`,
        });
      }

      // If error occurs
      if (error) {
        return res.status(422).json({ success: false, error });
      }

      // Make sure the user is the owner of the profile
      if (profile.owner._id.toString() !== req.user._id.toString()) {
        return res.status(401).json({
          success: false,
          error: `User ${req.user._id} is not authorized to delete this resume profile`,
        });
      }

      // Proceed to delete selected application
      if (profile.owner._id.toString() === req.user._id.toString()) {
        profile
          .remove()
          .then((result: any) => {
            res.json({
              success: true,
              message: "Resume profile successfully deleted",
              result: !result,
            });
          })
          .catch((error: any) => {
            console.log({ error });
          });
      }
    }
  );
};

export { createProfile, updateProfile, myProfile, deleteProfile };
