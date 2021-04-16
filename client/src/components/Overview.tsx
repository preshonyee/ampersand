import {Tag, Timeline} from "antd";
import React, { useEffect, useState } from "react";
import { Compass, FileText, Folder, Mail } from "react-feather";
import styled, { css } from "styled-components";
import axios from "axios";
import { BASE_URL } from "../constants/BaseURL";

const { Item } = Timeline;

type activityType = "application" | "email" | "resume" | "radar";
interface IOverview {
  activityType?: activityType;
}
interface IActivities {
  _id: number;
  activityTitle: string;
  activityBody: {
    company: string;
    location: string;
    message: string;
    position: string;
    remote: string;
    tags: [];
    type: string;
  }
  activityType: activityType;
  activityDate: Date;
}

const OverviewContainer = styled.div`
  margin-top: 1rem;
  width: 100%;
  background-color: #fff;
  padding: 2rem 1rem;
  border-radius: 1rem;
  h1 {
    margin: 0 0 3rem 1rem;
  }
  span {
    display: inline-block;
    line-height: 1.5;
    margin-top: 0.5rem;
  }
  .ant-timeline {
    margin: 2rem;
  }
  .ant-timeline-item {
    padding-bottom: 50px;
  }
  .ant-timeline-item-tail {
    /* border: 1px solid #dadce0; */
  }
  .ant-timeline-item-head-custom {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    padding-bottom: 30px;
  }

  .ant-timeline-item-content {
    top: -24px;
    width: 95%;
    margin: 0 0 0 40px;
  }

  @media (min-width: 640px) {
    .ant-timeline-item-content {
      top: -24px;
      width: 90%;
      margin: 0 0 0 40px;
    }
  }

  @media (min-width: 800px) {
    width: 58%;
    .ant-timeline-item-content {
      top: -24px;
      width: 80%;
      margin: 0 0 0 40px;
    }
  }

  @media (min-width: 1200px) {
    width: 58%;
    .ant-timeline-item-content {
      top: -24px;
      width: 90%;
      margin: 0 0 0 40px;
    }
  }
`;

const DotContainer = styled.div<Partial<IOverview>>`
  ${(props) =>
      props.activityType === "application" &&
      css`
        .ant-timeline-item-head-custom {
          background-color: #e0f5f1;
        }
      `}
  ${(props) =>
      props.activityType === "email" &&
      css`
        .ant-timeline-item-head-custom {
          background-color: #dae1fb;
        }
      `}
  ${(props) =>
      props.activityType === "resume" &&
      css`
        .ant-timeline-item-head-custom {
          background-color: #fde9d8;
        }
      `}
  ${(props) =>
      props.activityType === "radar" &&
      css`
        .ant-timeline-item-head-custom {
          background-color: #ebe7fe;
        }
      `}
`;

const DotIcon = ({ activityType }: IOverview) => {
  switch (activityType) {
    case "application":
      return (
          <span className="dot">
            <Folder color="#1C6B5D" />
          </span>
      );
    case "email":
      return (
          <span className="dot">
            <Mail color="#4C6CEB" />
          </span>
      );
    case "resume":
      return (
          <span className="dot">
            <FileText color="#F59547" />
          </span>
      );
    case "radar":
      return (
          <span className="dot">
            <Compass color="#7052F6" />
          </span>
      );
    default:
      return null;
  }
};

const Overview: React.FC<IOverview> = () => {
  const [activities, setActivities] = useState<IActivities[]>([]);

  const getTimelineActivities = () => {
    axios.get(`${BASE_URL}/timeline`).then((response) => {
      setActivities(response.data.result);
    });
  };

  useEffect(() => {
    getTimelineActivities();
  }, []);

  console.log(activities)

  return (
      <OverviewContainer>
        <h1>Overview</h1>
        <Timeline>
          {activities.map((activity) => {
            const {_id, activityBody, activityDate, activityTitle, activityType} = activity;
            switch (activityType){
              case "application":
                return (
                    <DotContainer key={_id} activityType={activityType}>
                  <Item dot={<DotIcon activityType={activityType} />}>
                  <span>
                    <h3>{activityTitle}</h3>
                    <p>
                      <Tag color="magenta">{activityBody.position}</Tag>
                      <Tag color="red">{activityBody.location}</Tag>
                      <Tag color="volcano">{activityBody.type}</Tag>
                      <Tag color="orange">{activityBody.remote}</Tag>
                    </p>
                    <p>{activityDate.toString().substring(0, 10)}</p>
                  </span>
                  </Item>
                </DotContainer>
                );
              case "resume":
                return (
                    <DotContainer key={_id} activityType={activityType}>
                      <Item dot={<DotIcon activityType={activityType} />}>
                      <span>
                        <h3>{activityTitle}</h3>
                        <p>{activityBody.message}</p>
                        <p>{activityDate.toString().substring(0, 10)}</p>
                      </span>
                      </Item>
                    </DotContainer>
                );
              case "radar":
                return (
                    <DotContainer key={_id} activityType={activityType}>
                      <Item dot={<DotIcon activityType={activityType} />}>
                      <span>
                        <h3>{activityTitle}</h3>
                        <p>
                          <Tag color="geekblue">{activityBody.company}</Tag>
                        </p>
                        <p>{activityDate.toString().substring(0, 10)}</p>
                      </span>
                      </Item>
                    </DotContainer>
                )
              default:
                return null;
            }
          })}
        </Timeline>
      </OverviewContainer>
  );
};

export default Overview;

// new application
// updated application
// created resume profile
// updated resume profile
// added to radar
