import { Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NavMenu from "../components/NavMenu";
import { BASE_URL } from "../constants/BaseURL";
import { TOKEN } from "../constants/LocalData";

const Wrapper = styled.div`
  width: 97%;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
`;

type ApplicationsDataType = {
  count: number;
  applications: [];
};

// type BreakPointType =

interface IApplication {
  _id: string;
  title: string;
  dataIndex: string;
  key: string;
  width: number;
  render: React.ReactNode;
  responsive: ["xxl", "xl", "lg", "md", "sm", "xs"];
}

const ApplicationTracker: React.FC = () => {
  const columns: ColumnsType<IApplication> = [
    {
      title: "S/N",
      dataIndex: "sno",
      key: "sno",
      width: 50,
      render: (value: any, item: any, index: any) => (page - 1) * 10 + index,
    },
    {
      title: "Date Applied",
      dataIndex: "dateApplied",
      key: "dateApplied",
      render: (dateApplied: string) => (
        <span>{new Date(dateApplied).toDateString()}</span>
      ),
      responsive: ["md"],
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
      render: (position: any) => (
        <div>
          {position.map((role: any, index: any) => (
            <span key={index}>
              <a
                href={role.linkToOpening}
                target="_blank"
                rel="noopener noreferrer">
                {role.positionTitle}
              </a>
            </span>
          ))}
        </div>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      responsive: ["lg"],
    },
    {
      title: "Source",
      dataIndex: "source",
      key: "source",
      responsive: ["xxl"],
    },
    {
      title: "Strategy",
      dataIndex: "strategy",
      key: "strategy",
      responsive: ["xxl"],
    },
    {
      title: "Cover Letter",
      dataIndex: "coverLetter",
      render: (coverLetter: string) => (
        <span>
          <a href={coverLetter} target="_blank" rel="noopener noreferrer">
            Cover Letter
          </a>
        </span>
      ),
      responsive: ["xxl"],
    },
    {
      title: "Resume",
      dataIndex: "resume",
      key: "resume",
      render: (resume: string) => (
        <span>
          <a href={resume} target="_blank" rel="noopener noreferrer">
            Resume
          </a>
        </span>
      ),
      responsive: ["xxl"],
    },
    {
      title: "Referral",
      dataIndex: "referral",
      key: "referral",
      responsive: ["xxl"],
    },
    {
      title: "Relocation",
      dataIndex: "relocation",
      key: "relocation",
      responsive: ["xl"],
    },
    {
      title: "Remote",
      dataIndex: "remote",
      key: "remote",
      responsive: ["lg"],
    },
    {
      title: "Main Contact",
      dataIndex: "mainContact",
      key: "mainContact",
      render: (text: any) => (
        <div>
          {text.map((text: any, index: any) => (
            <span key={index}>
              {text.mainContactName} {text.mainContactPhone}
            </span>
          ))}
        </div>
      ),
      responsive: ["xxl"],
    },
    {
      title: "Reception Mail",
      dataIndex: "receptionMail",
      key: "receptionMail",
      responsive: ["xxl"],
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      responsive: ["lg"],
    },
    {
      title: "Likelihood of Hiring",
      dataIndex: "likelihoodOfHiring",
      key: "likelihoodOfHiring",
      responsive: ["xl"],
    },
    {
      title: "Last Time Contacted",
      dataIndex: "lastTimeContacted",
      key: "lastTimeContacted",
      render: (dateApplied: string) => (
        <span>{new Date(dateApplied).toDateString()}</span>
      ),
      responsive: ["xl"],
    },
    {
      title: "Tags",
      dataIndex: "tags",
      width: 200,
      key: "tags",
      render: (tags: any) => (
        <>
          {tags.map((tag: any) => {
            let color;
            switch (tag) {
              case "Benefits":
                color = "red";
                break;
              case "Internal Connections":
                color = "geekblue";
                break;
              case "Below Desired Salary":
                color = "green";
                break;
              case "Above Desired Salary":
                color = "volcano";
                break;
              case "Within Salary Range":
                color = "purple";
                break;
              case "Equity":
                color = "blue";
                break;
              case "Hourly Salary":
                color = "orange";
                break;
              case "Required Travel":
                color = "magenta";
                break;
              case "Strong Parental Leave Policy":
                color = "tomato";
                break;
              case "Weak Parental Leave Policy":
                color = "cyan";
                break;
              default:
                color = "black";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
      responsive: ["xxl"],
    },
  ];

  const [page, setPage] = React.useState(1);

  const [applicationsData, setApplicationsData] = useState<
    ApplicationsDataType | any
  >(null);

  const [isReady, setIsReady] = useState(true);

  const fetchUserApplicationData = () => {
    axios
      .get(`${BASE_URL}/application/myApplications`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((response) => {
        const result = response.data;
        setApplicationsData(result.applications);
        setIsReady(false);
      });
  };

  useEffect(() => {
    fetchUserApplicationData();
  }, []);

  return (
    <Wrapper>
      <NavMenu />
      <Table
        bordered
        rowKey={(applicationsData) => applicationsData._id}
        loading={isReady}
        size="small"
        columns={columns}
        dataSource={applicationsData}
        pagination={{
          onChange(current) {
            setPage(current);
          },
          pageSize: 10,
        }}
        sticky
      />
    </Wrapper>
  );
};

export default ApplicationTracker;
