import styled from "styled-components";
import { TitleText, BodyText, CaptionText } from "../components/Typography";
import {
  achievementType,
  educationType,
  experienceType,
  projectType,
  skillType,
} from "../Types";
import { COLORS } from "../constants/Colors";

const Wrapper = styled.div`
  margin: 0 0 1.5rem 0;

  p {
    font-size: 0.75rem;
    margin: 0 0 0.25rem 0;

    @media (min-width: 800px) {
      font-size: 0.875rem;
    }

    @media (min-width: 1200px) {
      font-size: 1rem;
    }
  }

  .inline {
    display: flex;
  }

  .school_year > :first-child {
    font-weight: 700;
    margin-right: 4px;
  }
  .school_year > :last-child {
    letter-spacing: -1.5px;
  }
  .honors_discipline > :first-child {
    margin-right: 4px;
  }

  .skill_title {
    font-weight: 700;
  }

  .project_title {
    font-weight: 700;
  }

  .exp_company {
    margin-right: 4px;
    font-weight: 700;
  }
  .exp_role {
    margin-right: 4px;
    font-weight: 500;
  }
  .exp_location,
  .awarder {
    margin-right: 4px;
    color: ${COLORS.light.black100};
  }
  .exp_date,
  .achievement_date {
    margin-left: 4px;
    color: ${COLORS.light.black100};
  }

  .achievement_title {
    font-weight: 700;
  }
`;

export const ExperienceItem = ({
  company,
  role,
  location,
  date,
  description,
}: experienceType) => {
  return (
    <Wrapper>
      <span className="inline">
        <TitleText className="exp_company">{company} /</TitleText>
        <TitleText className="exp_role"> {role}</TitleText>
      </span>
      <span className="inline">
        <CaptionText className="exp_location">{location}</CaptionText> |{" "}
        <CaptionText className="exp_date">{date}</CaptionText>
      </span>
      <BodyText>{description}</BodyText>
    </Wrapper>
  );
};

export const SkillItem = ({ skill, tools }: skillType) => {
  return (
    <Wrapper>
      <TitleText className="skill_title">{skill}</TitleText>
      <CaptionText>{tools}</CaptionText>
    </Wrapper>
  );
};

export const EducationItem = ({
  nameOfInstitution,
  yearEnded,
  honors,
  discipline,
}: educationType) => {
  return (
    <Wrapper>
      <span className="inline school_year">
        <TitleText>{nameOfInstitution}</TitleText>
        <TitleText>{yearEnded}</TitleText>
      </span>
      <span className="inline honors_discipline">
        <CaptionText>
          {honors}. {discipline}
        </CaptionText>
      </span>
    </Wrapper>
  );
};

export const ProjectItem = ({ title, description }: projectType) => {
  return (
    <Wrapper>
      <TitleText className="project_title">{title}</TitleText>
      <BodyText>{description}</BodyText>
    </Wrapper>
  );
};

export const AchievementItem = ({
  achievementTitle,
  awarder,
  date,
  event,
}: achievementType) => {
  return (
    <Wrapper>
      <TitleText className="achievement_title">{achievementTitle}</TitleText>
      <span className="inline">
        <CaptionText className="awarder">{awarder}</CaptionText> |
        <CaptionText className="achievement_date">{date}</CaptionText>
      </span>
      <BodyText>{event}</BodyText>
    </Wrapper>
  );
};
