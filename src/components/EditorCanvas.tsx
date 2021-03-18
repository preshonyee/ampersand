import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BASE_URL } from "../constants/BaseURL";
import { TOKEN } from "../constants/Token";
import EditForm from "./EditForm";
import ResumePane from "./ResumePane";

import {
  achievementType,
  educationType,
  experienceType,
  projectType,
  skillType,
} from "../Types";
import { Alert } from "antd";

const MainWrapper = styled.div`
  padding: 2rem 0;

  .alert {
    width: 40%;
    margin-left: 1rem;
  }
`;

const CanvasWrapper = styled.div`
  width: 99%;
  margin: 0 auto;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  padding: 2rem 0;
`;

interface IFormData {
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

const EditorCanvas = () => {
  const [isReady, setIsReady] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [formData, setFormData] = useState<Array<IFormData>>([
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
  ]);

  const fetchFormData = () => {
    axios
      .get(`${BASE_URL}/profile/myProfile`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((response) => {
        const result = response.data.result;
        console.log({ result });
        if (result[0] === undefined) {
          setIsEmpty(true);
        } else {
          setIsEmpty(false);
          setFormData(result);
        }
        setIsReady(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchFormData();
  }, []);

  return (
    <MainWrapper>
      <div className="alert">
        <Alert
          message="Changes you make on the editor will auto update on the resume pane"
          type="info"
          showIcon
        />
      </div>
      <CanvasWrapper>
        {!isReady ? (
          <div>
            <p>Loading...</p>
          </div>
        ) : (
          <>
            {isEmpty ? (
              <EditForm formData={formData} setFormData={setFormData} />
            ) : (
              <EditForm formData={formData} setFormData={setFormData} />
            )}
            <ResumePane profile={formData} />
          </>
        )}
      </CanvasWrapper>
    </MainWrapper>
  );
};

export default EditorCanvas;
