import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ErrorResponse from "../utils/errorResponse";
import User from "../models/User";

// TODO: Fix all any types

// @description:    Register user
// @route:          POST /api/v1/auth/signup
// @access          Public
const signup = (req: any, res: any) => {
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
    .then((savedUser: any) => {
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
            .then((user: any) => {
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
              console.log({ user });
            })
            .catch((error: any) => {
              console.log(error);
              res.json({ error });
            });
        })
        .catch((error) => {
          console.log(error);
          res.json({ error });
        });
    })
    .catch((error: any) => {
      console.log(error);
      res.json({ error });
    });
};

// @description:    Login user
// @route:          POST /api/v1/auth/login
// @access          Public
const signin = (req: any, res: any, next: any) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Please add email or password" });
  }
  User.findOne(
    { email },
    "password firstName lastName email username profilePicture"
  )
    .then((savedUser: any) => {
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
    .catch((error: any) => {
      console.log(error);
      return next(new ErrorResponse(error, 422));
    });
};

// @description:    Get current logged in user
// @route:          GET /api/v1/auth/me
// @access          Private
const getMe = (req: any, res: any) => {
  User.findById(req.user.id)
    .then((user: any) => {
      return res.status(200).json({ success: true, data: user });
    })
    .catch((error: any) => {
      console.log(error);
    });
};

// @description:    Log user out / clear cookie
// @route:          GET /api/v1/auth/logout
// @access          Private
const logout = (req: any, res: any, next: any) => {
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
const updateDetails = (req: any, res: any, next: any) => {
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
  }).exec((error: any, result: any) => {
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
const updatePassword = (req: any, res: any, next: any) => {
  User.findById(req.user._id)
    .select("+password")
    .exec((error: any, user: any) => {
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
                .then((result: any) => {
                  res.status(200).json({
                    user: result,
                    message: "Password updated successfully",
                  });
                })
                .catch((error: any) => {
                  console.log(error);
                  return res.status(422).json({ error });
                });
            });
          } else {
            return res.status(422).json("Password is incorrect", 401);
          }
        });
    });
};

// @description:    Delete user account
// @route:          DELETE /api/v1/auth/delete-user
// @access          Private
const deleteUser = (req: any, res: any) => {
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
  User.findByIdAndDelete(req.user._id).exec((error: any, user: any) => {
    // If error occurs
    if (error) {
      return res.status(422).json({ success: false, message: error.message });
    }
    // compare entered password with record in database
    bcrypt.compare(password, user.password).then((doMatch) => {
      if (doMatch) {
        user
          .remove()
          .then((result: any) => {
            res.json({
              success: true,
              message: "Your account has been deleted successfully",
            });
          })
          .catch((error: any) => {
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
