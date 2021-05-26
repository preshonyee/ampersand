import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ErrorResponse from "../utils/errorResponse";
import { User } from "../models/User";
import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "../utils/baseUrl";
import { UserDoc } from "user";
import { IGetUserAuthInfoRequest } from "user-auth";
import { NextFunction, Response } from "express";

// @description:    Register user
// @route:          POST /api/v1/auth/signup
// @access          Public
const signup = (req: IGetUserAuthInfoRequest, res: Response) => {
  const {
    firstName,
    lastName,
    email,
    username,
    password,
    profilePicture,
    location,
    portfolio,
    bio,
    interests,
    twitter,
    linkedin,
    github,
  } = req.body;

  // Validate that fields are not empty
  if (!firstName || !lastName || !username || !email || !password) {
    return res.status(400).json({ error: "Please add all the fields" });
  }

  // Check if user already exists
  User.findOne({ email })
    .then((savedUser) => {
      if (savedUser) {
        return res
          .status(400)
          .json({ error: "User already exists with that email" });
      }
      // Hash the user password
      bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          // Create the new user
          const user = new User({
            firstName,
            lastName,
            email,
            username,
            password: hashedPassword,
            profilePicture,
            location,
            portfolio,
            bio,
            interests,
            twitter,
            linkedin,
            github,
          });
          // Save the user to the database
          user
            .save()
            .then((user: UserDoc) => {
              // Return response result
              res.json({
                message: "saved successfully",
                result: {
                  _id: user._id,
                  firstName,
                  lastName,
                  email,
                  username,
                  profilePicture,
                  location,
                  portfolio,
                  bio,
                  interests,
                  twitter,
                  linkedin,
                  github,
                },
              });
              // create dummy resume for new user
              axios
                .post(`${BASE_URL}/resume`, {
                  addedBy: user._id,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  occupation: "Occupation",
                  location: "City, Country",
                  website: "https://example.com",
                  email: user.email,
                  telephone: "+234 0123 4567",
                  education: [
                    {
                      nameOfInstitution: "Example University",
                      yearEnded: "2018",
                      honors: "Bsc",
                      discipline: "Computer Science and Mathematics",
                    },
                    {
                      nameOfInstitution: "Example University",
                      yearEnded: "2020",
                      honors: "Msc",
                      discipline: "Applied Mathematics",
                    },
                    {
                      nameOfInstitution: "Example University",
                      yearEnded: "2021",
                      honors: "Phd",
                      discipline: "Machine Learning and Data Science",
                    },
                  ],
                  skills: [
                    {
                      skill: "Skill 1",
                      tools: "Tool 1, Tool 2, Tool 3",
                    },
                    {
                      skill: "Skill 2",
                      tools: "Tool 1, Tool 2, Tool 3",
                    },
                    {
                      id: 3,
                      skill: "Web Development",
                      tools: "React, HTML, CSS, JavaScript",
                    },
                    {
                      id: 4,
                      skill: "Backend Development",
                      tools: "NodeJS, MongoDB, AWS",
                    },
                  ],
                  projects: [
                    {
                      id: 1,
                      title: "Project 1",
                      description:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    },
                    {
                      id: 2,
                      title: "Project 2",
                      description:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    },
                    {
                      id: 3,
                      title: "Project 3",
                      description:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    },
                  ],
                  experience: [
                    {
                      id: 1,
                      company: "Company 1 Name",
                      role: "Role 1",
                      location: "Location 1",
                      date: "Year Started - Year Ended",
                      description:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                    },
                    {
                      id: 2,
                      company: "Company 2 Name",
                      role: "Role 2",
                      location: "Location 2",
                      date: "Year Started - Year Ended",
                      description:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                    },
                    {
                      id: 3,
                      company: "Company 3 Name",
                      role: "Role 3",
                      location: "Location 3",
                      date: "Year Started - Year Ended",
                      description:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                    },
                    {
                      id: 4,
                      company: "Company 4 Name",
                      role: "Role 4",
                      location: "Location 4",
                      date: "Year Started - Year Ended",
                      description:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                    },
                  ],
                  achievements: [
                    {
                      achievementTitle: "Semi Finalist",
                      awarder: "Digital Ocean",
                      date: "Summer 2021",
                      event: "Hacktober Fest",
                    },
                    {
                      achievementTitle: "1st Prize Winner",
                      awarder: "Google Inc.",
                      date: "Summer 2021",
                      event: "Google Summer of Code",
                    },
                    {
                      achievementTitle: "Second Runner Up",
                      awarder: "Microsoft",
                      date: "Summer 2021",
                      event: "Imagine Cup Competition",
                    },
                  ],
                })
                .then((response: AxiosResponse<any>) => {
                  console.log(response.data.message);
                })
                .catch((error) => {
                  console.log(error.message);
                });
            })
            .catch((error) => {
              console.log(error);
              res.json({ error });
            });
        })
        .catch((error) => {
          console.log(error);
          res.json({ error });
        });
    })
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
};

// @description:    Login user
// @route:          POST /api/v1/auth/login
// @access          Public
const signin = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Please add email or password" });
  }
  User.findOne(
    { email },
    "password firstName lastName email username profilePicture"
  )
    .then((savedUser: UserDoc) => {
      if (!savedUser) {
        return res.status(422).json({ error: "Invalid email or password" });
      }
      bcrypt
        .compare(password, savedUser.password)
        .then((doMatch) => {
          if (doMatch) {
            const token = jwt.sign(
              { _id: savedUser._id },
              process.env.JWT_SECRET
            );

            const {
              _id,
              firstName,
              lastName,
              email,
              username,
              profilePicture,
            } = savedUser;

            res.json({
              token,
              user: {
                id: _id,
                firstName,
                lastName,
                email,
                username,
                profilePicture,
              },
            });
          } else {
            return res.status(422).json({ error: "Invalid email or password" });
          }
        })
        .catch((error) => {
          console.log(error);
          return next(new ErrorResponse(error, 422));
        });
    })
    .catch((error) => {
      console.log(error);
      return next(new ErrorResponse(error, 422));
    });
};

// @description:    Get current logged in user
// @route:          GET /api/v1/auth/me
// @access          Private
const getMe = (req: IGetUserAuthInfoRequest, res: Response) => {
  User.findById(req.user.id)
    .then((user: UserDoc) => {
      return res.status(200).json({ success: true, data: user });
    })
    .catch((error) => {
      console.log(error);
    });
};

// @description:    Log user out / clear cookie
// @route:          GET /api/v1/auth/logout
// @access          Private
const logout = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: {},
  });
};

// @description:    Update user details
// @route:          PUT /api/v1/auth/update-details
// @access          Private
const updateDetails = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  const {
    firstName,
    lastName,
    email,
    username,
    profilePicture,
    location,
    portfolio,
    bio,
    interests,
    twitter,
    linkedin,
    github,
  } = req.body;

  // Check if fields are empty
  if (!firstName || !lastName || !email || !username || !profilePicture) {
    return res.status(422).json("Please enter all the fields");
  }

  const fieldsToUpdate = {
    firstName,
    lastName,
    email,
    username,
    profilePicture,
    location,
    portfolio,
    bio,
    interests,
    twitter,
    linkedin,
    github,
  };

  User.findByIdAndUpdate(req.user._id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  }).exec((error, result: UserDoc) => {
    // Check for error
    if (error) {
      return res.status(422).json({ error });
    }
    res.status(200).json({
      success: true,
      message: "Account successfully updated",
      user: result,
    });
  });
};

// @description:    Update password
// @route:          PUT /api/v1/auth/update-password
// @access          Private
const updatePassword = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  User.findById(req.user._id)
    .select("+password")
    .exec((error, user: UserDoc) => {
      // Check for error
      if (error) {
        return res.status(422).json({ error });
      }

      // Check that current password is correct
      bcrypt
        .compare(req.body.currentPassword, user.password)
        .then((doMatch) => {
          console.log({ doMatch });
          if (doMatch) {
            // Hash the user password
            bcrypt.hash(req.body.newPassword, 12).then((hashedNewPassword) => {
              user.password = hashedNewPassword;
              user
                .save()
                .then((result: UserDoc) => {
                  res.status(200).json({
                    user: result,
                    message: "Password updated successfully",
                  });
                })
                .catch((error) => {
                  console.log(error);
                  return res.status(422).json({ error });
                });
            });
          } else {
            return res.status(401).json("Password is incorrect");
          }
        });
    });
};

// @description:    Delete user account
// @route:          DELETE /api/v1/auth/delete-user
// @access          Private
const deleteUser = (req: IGetUserAuthInfoRequest, res: Response) => {
  // Delete Applications
  // Delete Radar
  // Delete Timeline
  // Delete Resume
  // Delete Analytics
  // Then delete the user
  const { password } = req.body;
  if (!password) {
    return res
      .status(422)
      .json({ success: false, message: "Please provide a valid credential" });
  }
  User.findByIdAndDelete(req.user._id).exec((error, user: UserDoc) => {
    // If error occurs
    if (error) {
      return res.status(422).json({ success: false, message: error.message });
    }
    // compare entered password with record in database
    bcrypt.compare(password, user.password).then((doMatch) => {
      if (doMatch) {
        user
          .remove()
          .then((result: UserDoc) => {
            res.json({
              success: true,
              message: "Your account has been deleted successfully",
            });
          })
          .catch((error) => {
            console.log({ error });
            return res.status(422).json({
              success: false,
              message: error.message,
            });
          });
      } else {
        return res
          .status(422)
          .json({ success: false, message: "Incorrect credentials provided" });
      }
    });
  });
};

export {
  signup,
  signin,
  getMe,
  logout,
  updateDetails,
  updatePassword,
  deleteUser,
};
