import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BASE_URL } from "../constants/BaseURL";
import {
  achievementType,
  educationType,
  experienceType,
  projectType,
  skillType,
} from "../Types";
import {
  AchievementItem,
  EducationItem,
  ExperienceItem,
  ProjectItem,
  SkillItem,
} from "../components/ListItem";
import { TOKEN } from "../constants/Token";
import { COLORS } from "../constants/Colors";
import UserCard from "../components/UserCard";
import { Empty } from "antd";

const { primary, black100, black200 } = COLORS.light;

const FrontPageWrapper = styled.div`
  background-color: #f2f2f2;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem 0;
`;

const PaneWrapper = styled.div`
  width: 57%;
  min-height: 100vh;

  font-size: 13px;
  background-color: #fff;
  border: 5px solid #edf2f9;
  padding: 3rem;
  display: flex;

  h4 {
    font-weight: 700;
    font-size: 1rem;
    color: ${primary};
    margin: 0.5rem 0;
  }

  .main {
    width: 100%;
  }

  .top_section {
    display: flex;
    justify-content: space-between;
  }

  .personal_info {
    h1 {
      color: ${primary};
    }
    h1,
    h2 {
      font-weight: 700;
    }
  }

  .contact_info {
    color: ${black100};
    text-align: right;
    ul > li {
      list-style-type: none;
    }

    ul :not(:first-child) {
      color: ${black200};
    }
  }

  .sides {
    margin-top: 2rem;
    display: flex;
    justify-content: space-between;
  }

  .education_section,
  .skills_section,
  .projects_section,
  .experiences_section,
  .achievements_section {
    margin-bottom: 3rem;
  }
`;

const LeftSide = styled.div`
  width: 40%;
`;

const RightSide = styled.div`
  width: 53%;
`;

const CardWrapper = styled.div`
  background-color: #ffffff;
  margin-left: 1rem;
  padding: 2rem;
  border: 5px solid #edf2f9;
`;

interface IResumeData {
  firstName: String;
  lastName: String;
  occupation: String;
  location: String;
  website: String;
  email: String;
  telephone: String;
  projects: projectType[];
  experience: experienceType[];
  education: educationType[];
  achievements: achievementType[];
  skills: skillType[];
}

const initialState = [
  {
    achievements: [
      {
        achievementTitle: "",
        awarder: "",
        date: "",
        event: "",
      },
    ],
    education: [
      {
        discipline: "",
        honors: "",
        nameOfInstitution: "",
        yearEnded: "",
      },
    ],
    firstName: "",
    lastName: "",
    occupation: "",
    location: "",
    website: "",
    email: "",
    telephone: "",
    skills: [
      {
        skill: "",
        tools: "",
      },
    ],
    projects: [
      {
        title: "",
        description: "",
      },
    ],
    experience: [
      {
        company: "",
        date: "",
        description: "",
        location: "",
        role: "",
      },
    ],
  },
];

const FrontPage: React.FC = () => {
  const [isReady, setIsReady] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [resumeData, setResumeData] = useState<IResumeData[]>(initialState);

  const {
    firstName,
    lastName,
    occupation,
    website,
    email,
    location,
    telephone,
    achievements,
    education,
    skills,
    experience,
    projects,
  } = resumeData[0];

  console.log(resumeData, firstName);

  const fetchResumeData = () => {
    axios
      .get(`${BASE_URL}/profile/myProfile`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((response) => {
        const result = response.data.result;
        console.log(result);
        if (result[0] === undefined) {
          setIsEmpty(true);
        } else {
          setIsEmpty(false);
          setResumeData(result);
        }
        setIsReady(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchResumeData();
  }, []);

  console.log(resumeData);

  return (
    <FrontPageWrapper>
      {!isReady ? (
        <div>Loading...</div>
      ) : (
        <>
          <PaneWrapper>
            <div className="main">
              {isEmpty ? (
                <Empty />
              ) : (
                <>
                  <div className="top_section">
                    <div className="personal_info">
                      <h1>
                        {firstName} {lastName}
                      </h1>
                      <h2>{occupation}</h2>
                    </div>
                    <div className="contact_info">
                      <ul>
                        <li>{location}</li>
                        <li>{website}</li>
                        <li>{email}</li>
                        <li>{telephone}</li>
                      </ul>
                    </div>
                  </div>
                  <div className="sides">
                    <LeftSide>
                      {education && (
                        <div className="education_section">
                          <h4>EDUCATION</h4>
                          {education?.map(
                            (school: educationType, index: number) => {
                              const {
                                discipline,
                                honors,
                                nameOfInstitution,
                                yearEnded,
                              } = school;
                              return (
                                <EducationItem
                                  key={index}
                                  nameOfInstitution={nameOfInstitution}
                                  yearEnded={yearEnded}
                                  honors={honors}
                                  discipline={discipline}
                                />
                              );
                            }
                          )}
                        </div>
                      )}

                      {skills && (
                        <div className="skills_section">
                          <h4>SKILLS/TOOLS</h4>
                          {skills?.map((skills: skillType, index: number) => {
                            const { skill, tools } = skills;
                            return (
                              <SkillItem
                                key={index}
                                skill={skill}
                                tools={tools}
                              />
                            );
                          })}
                        </div>
                      )}

                      {projects && (
                        <div className="projects_section">
                          <h4>PROJECTS</h4>
                          {projects?.map(
                            (project: projectType, index: number) => {
                              const { title, description } = project;
                              return (
                                <ProjectItem
                                  key={index}
                                  title={title}
                                  description={description}
                                />
                              );
                            }
                          )}
                        </div>
                      )}
                    </LeftSide>
                    <RightSide>
                      {experience && (
                        <div className="experiences_section">
                          <h4>EXPERIENCE</h4>
                          {experience.map(
                            (work: experienceType, index: number) => {
                              const {
                                company,
                                role,
                                location,
                                date,
                                description,
                              } = work;
                              return (
                                <ExperienceItem
                                  key={index}
                                  company={company}
                                  role={role}
                                  location={location}
                                  date={date}
                                  description={description}
                                />
                              );
                            }
                          )}
                        </div>
                      )}

                      {achievements && (
                        <div className="achievements_section">
                          <h4>ACHIEVEMENTS</h4>
                          {achievements.map(
                            (achievement: achievementType, index: number) => {
                              const {
                                achievementTitle,
                                awarder,
                                date,
                                event,
                              } = achievement;
                              return (
                                <AchievementItem
                                  key={index}
                                  achievementTitle={achievementTitle}
                                  awarder={awarder}
                                  event={event}
                                  date={date}
                                />
                              );
                            }
                          )}
                        </div>
                      )}
                    </RightSide>
                  </div>
                </>
              )}
            </div>
          </PaneWrapper>
          <CardWrapper>
            <UserCard isEmpty={isEmpty} />
          </CardWrapper>
        </>
      )}
    </FrontPageWrapper>
  );
};

export default FrontPage;
