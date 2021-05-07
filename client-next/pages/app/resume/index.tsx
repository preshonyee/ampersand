import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BASE_URL } from "../../constants/BaseURL";
import {
  achievementType,
  educationType,
  experienceType,
  projectType,
  skillType,
} from "../../Types";
import {
  AchievementItem,
  EducationItem,
  ExperienceItem,
  ProjectItem,
  SkillItem,
} from "../../components/ListItem";
import { TOKEN } from "../../constants/Token";
import { COLORS } from "../../constants/Colors";
import { Empty } from "antd";
import Layout from "../../components/Layout";
import FAB from "../../components/FloatingActionButton";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useRouter } from "next/router";

const { primary, black100, black200 } = COLORS.light;

const ResumePageWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  width: 90%;

  @media (min-width: 800px) {
    width: 80%;
    justify-content: space-between;
  }

  @media (min-width: 1200px) {
    width: 70%;
    justify-content: space-between;
  }

  @media (min-width: 1600px) {
    width: 60%;
    justify-content: space-between;
  }
  .heading {
    margin-bottom: 2rem;
  }
`;

const PaneWrapper = styled.div`
  font-size: 13px;
  background-color: #fff;
  padding: 1.5rem;
  display: flex;
  width: 100%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

  @media (min-width: 1200px) {
    padding: 3rem;
  }

  h4 {
    font-weight: 700;
    font-size: 0.875rem;
    color: ${primary};
    margin: 0.5rem 0;

    @media (min-width: 1200px) {
      font-size: 1rem;
    }
  }

  .main {
    width: 100%;
  }

  .top_section {
    display: flex;
    justify-content: space-between;
    font-size: 0.75rem;

    @media (min-width: 800px) {
      font-size: 0.875rem;
    }

    @media (min-width: 1200px) {
      font-size: 1rem;
    }
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

interface IResumeData {
  _id: string;
  firstName: string;
  lastName: string;
  occupation: string;
  location: string;
  website: string;
  email: string;
  telephone: string;
  projects: projectType[];
  experience: experienceType[];
  education: educationType[];
  achievements: achievementType[];
  skills: skillType[];
}

const initialState = [
  {
    _id: "",
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

const ResumePage: React.FC = () => {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [resumeData, setResumeData] = useState<IResumeData[]>(initialState);

  const {
    _id,
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
      .get(`${BASE_URL}/resume`, {
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

  const handleEdit = (resumeID: string) => {
    router.push(`/app/resume/${resumeID}`);
  };

  // const handleDelete = (resumeID: string) => {
  //   axios
  //     .delete(`${BASE_URL}/resume/${resumeID}`, {
  //       headers: {
  //         Authorization: `Bearer ${TOKEN}`,
  //       },
  //     })
  //     .then((response) => {
  //       message.success(response.data.message, 3);
  //       setIsEmpty(true);
  //     })
  //     .catch((error) => {
  //       message.error(error.message);
  //     });
  // };

  return (
    <Layout background="#f8f8f8">
      <ResumePageWrapper>
        <div className="heading">
          <h1>Resume Profile</h1>
          <p>
            Elevate your resume with well designed templates that summarizes
            your story beautifully
          </p>
        </div>
        {!isReady ? (
          <LoadingSpinner />
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
          </>
        )}
        <FAB
          editAction={() => handleEdit(_id)}
          // deleteAction={() => handleDelete(_id)}
        />
      </ResumePageWrapper>
    </Layout>
  );
};

export default ResumePage;
