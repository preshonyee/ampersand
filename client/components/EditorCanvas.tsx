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
import LoadingSpinner from "./LoadingSpinner";

const MainWrapper = styled.div`
  width: 95%;
  margin: 0 auto;
  @media (min-width: 1200px) {
    width: 90%;
  }
`;

const CanvasWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;

  @media (min-width: 1200px) {
    flex-direction: row;
  }
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

interface IEditorCanvas {
  resumeID: string | string[];
}

const EditorCanvas: React.FC<IEditorCanvas> = ({ resumeID }) => {
  const [isReady, setIsReady] = useState(false);
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
      .get(`${BASE_URL}/resume/`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((response) => {
        const result = response.data.result;
        setFormData(result);
        setIsReady(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchFormData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainWrapper>
      <div>
        <h1>Update Resume</h1>
        <p>Keep your resume fresh and up to date</p>
      </div>
      {!isReady ? (
        <LoadingSpinner />
      ) : (
        <CanvasWrapper>
          <ResumePane profile={formData} />
          <EditForm
            resumeID={resumeID}
            formData={formData}
            setFormData={setFormData}
          />
        </CanvasWrapper>
      )}
    </MainWrapper>
  );
};

export default EditorCanvas;
