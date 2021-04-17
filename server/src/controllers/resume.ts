import axios from "axios";
import Resume from "../models/Resume";
import ErrorResponse from "../utils/errorResponse";

// TODO: Fix all any types

// @description:    Add new resume
// @route:          POST /api/v1/resume
// @access          Private
const createResume = (req: any, res: any, next: any) => {
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

  const resume = new Resume({
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

  // save resume to the database
  resume
    .save()
    .then((result: any) => {
      res.status(201).json({
        resume: result,
        message: "resume created successfully",
      });
      // log out resume created activity to Timeline
      axios
        .post("http://localhost:5000/api/v1/timeline/create", {
          activityTitle: `You created your resume`,
          activityBody: {
            message: `You have just created your resume, you can create multiple resumes for different applications. Here are some useful tips for building a solid resume.`,
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

// @description:    Get logged in user resume
// @route:          GET /api/v1/resume
// @access          Private
const myResume = (req: any, res: any, next: any) => {
  Resume.find({ owner: req.user._id })
    .populate("owner", "_id firstName lastName email profilePicture")
    .then((resume: any) => {
      res.json({ result: resume });
    })
    .catch((error: any) => {
      console.log(error);
      return next(new ErrorResponse(error, 422));
    });
};

// @description:    Update user resume
// @route:          PUT /api/v1/resume/:resumeID
// @access          Private
const updateResume = (req: any, res: any, next: any) => {
  Resume.findById({ _id: req.params.resumeID }).exec(
    (error: any, resume: any) => {
      // Check that the resume exists
      if (!resume) {
        return res.status(404).json({
          success: false,
          error: `Resume with ID ${req.params.resumeID} doesn't exist`,
        });
      }

      // If any error occurs
      if (error) {
        return res.status(422).json({ success: false, error });
      }

      // Make sure that the user is the owner of the resume
      if (resume.owner._id.toString() !== req.user._id.toString()) {
        return res.status(401).json({
          success: false,
          error: `User ${req.user._id} is not authorized to update this resume`,
        });
      }

      // Proceed to update the selected application
      if (resume.owner._id.toString() === req.user._id.toString()) {
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

        // Now update resume
        Resume.findByIdAndUpdate(req.params.resumeID, req.body, {
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
              message: "Resume updated successfully",
              result,
            });

            // log out resume updated activity to Timeline
            axios
              .post("http://localhost:5000/api/v1/timeline/create", {
                activityTitle: `You updated your resume`,
                activityBody: {
                  message: `You updated your resume, you can create multiple resumes for different applications. Here are some useful tips for building a solid resume.`,
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

// @description:    Delete resume
// @route:          DELETE /api/v1/resume/:resumeID
// @access          Private
const deleteResume = (req: any, res: any) => {
  Resume.findOne({ _id: req.params.resumeID }).exec(
    (error: any, resume: any) => {
      // Check that the selected resume exists
      if (!resume) {
        return res.status(422).json({
          success: false,
          error: `Resume with ID ${req.params.resumeID} doesn't exist`,
        });
      }

      // If error occurs
      if (error) {
        return res.status(422).json({ success: false, error });
      }

      // Make sure the user is the owner of the resume
      if (resume.owner._id.toString() !== req.user._id.toString()) {
        return res.status(401).json({
          success: false,
          error: `User ${req.user._id} is not authorized to delete this resume`,
        });
      }

      // Proceed to delete resume
      if (resume.owner._id.toString() === req.user._id.toString()) {
        resume
          .remove()
          .then((result: any) => {
            res.json({
              success: true,
              message: "Resume deleted successfully",
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

// @description:    Dummy resume
// @route:          GET /api/v1/resume/dummy
// @access          Private
const dummyResume = (req: any, res: any, next: any) => {
  res.status(200).json({
    result: [
      {
        firstName: "First name",
        lastName: "Last name",
        occupation: "Occupation",
        location: "Lagos, Nigeria",
        website: "https://example.com",
        email: "example@gmail.com",
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
      },
    ],
  });
};

export { createResume, updateResume, myResume, deleteResume, dummyResume };
