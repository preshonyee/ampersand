import { Timeline } from "antd";
import { Compass, FileText, Folder, Mail } from "react-feather";
import styled, { css } from "styled-components";

const { Item } = Timeline;

type activityType = "application" | "email" | "resume" | "radar";
interface IOverview {
  activityType?: activityType;
}

type IActivities = {
  id: number;
  activityTitle: string;
  activityBody: string;
  activityType: activityType;
  activityDate: string;
};

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

const Overview: React.FC<IOverview> = ({ activityType }) => {
  const activities: IActivities[] = [
    {
      id: 1,
      activityTitle: "You submitted an application at Twitter",
      activityBody:
        "Use our automated actions and customizable templates to strengthen your hiring. Take your recruiting to the next level by introducing best practices and standardizing techniques.",
      activityType: "application",
      activityDate: "2021-03-27",
    },
    {
      id: 2,
      activityTitle: "You added Shopify to your radar",
      activityBody:
        "Use our automated actions and customizable templates to strengthen your hiring. Take your recruiting to the next level by introducing best practices and standardizing techniques.",
      activityType: "radar",
      activityDate: "2021-03-27",
    },
    {
      id: 3,
      activityTitle: "You updated your application at Webflow",
      activityBody:
        "Use our automated actions and customizable templates to strengthen your hiring. Take your recruiting to the next level by introducing best practices and standardizing techniques.",
      activityType: "application",
      activityDate: "2021-03-27",
    },
    {
      id: 4,
      activityTitle: "You created your resume profile",
      activityBody:
        "Use our automated actions and customizable templates to strengthen your hiring. Take your recruiting to the next level by introducing best practices and standardizing techniques.",
      activityType: "resume",
      activityDate: "2021-03-27",
    },
    {
      id: 5,
      activityTitle: "You created a new cover letter",
      activityBody:
        "Use our automated actions and customizable templates to strengthen your hiring. Take your recruiting to the next level by introducing best practices and standardizing techniques.",
      activityType: "email",
      activityDate: "2021-03-27",
    },
    {
      id: 6,
      activityTitle: "You updated resume profile",
      activityBody:
        "Use our automated actions and customizable templates to strengthen your hiring. Take your recruiting to the next level by introducing best practices and standardizing techniques.",
      activityType: "resume",
      activityDate: "2021-03-27",
    },
  ];

  return (
    <OverviewContainer>
      <h1>Overview</h1>
      <Timeline>
        {activities.map((activity) => {
          return (
            <DotContainer activityType={activity.activityType}>
              <Item
                key={activity.id}
                dot={<DotIcon activityType={activity.activityType} />}>
                <span>
                  <h3>{activity.activityTitle}</h3>
                  <p>{activity.activityBody}</p>
                  <p>{activity.activityDate}</p>
                </span>
              </Item>
            </DotContainer>
          );
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
