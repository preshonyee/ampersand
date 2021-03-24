import { DeleteOutlined, EditOutlined, LinkOutlined } from "@ant-design/icons";
import { Button, Space, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Edit, ExternalLink, Trash2 } from "react-feather";
import styled from "styled-components";
import NavMenu from "../components/NavMenu";
import { BASE_URL } from "../constants/BaseURL";
import { TOKEN } from "../constants/Token";

const Wrapper = styled.div`
  width: 97%;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;

  .external-link {
    margin-right: 0.25rem;
    &:hover {
      text-decoration: underline;
    }
  }
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
      fixed: "left",
    },
    {
      title: "Date Applied",
      dataIndex: "dateApplied",
      key: "dateApplied",
      responsive: ["xxl"],
      render: (dateApplied: string) => (
        <span>{new Date(dateApplied).toDateString()}</span>
      ),
      fixed: "left",
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      width: 100,
      fixed: "left",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      width: 150,
      responsive: ["xxl"],
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
                className="external-link"
                href={role.linkToOpening}
                target="_blank"
                rel="noopener noreferrer">
                {role.positionTitle}
              </a>
              <ExternalLink size={12} />
            </span>
          ))}
        </div>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 100,
      responsive: ["xxl"],
    },
    {
      title: "Source",
      dataIndex: "source",
      key: "source",
      width: 100,
      responsive: ["xxl"],
    },
    {
      title: "Strategy",
      dataIndex: "strategy",
      key: "strategy",
      width: 100,
      responsive: ["xxl"],
    },
    {
      title: "Cover Letter",
      dataIndex: "coverLetter",
      key: "coverLetter",
      responsive: ["xxl"],
      width: 120,
      render: (coverLetter: string) => (
        <span>
          <a
            className="external-link"
            href={coverLetter}
            target="_blank"
            rel="noopener noreferrer">
            Cover Letter
          </a>
          <ExternalLink size={12} />
        </span>
      ),
    },
    {
      title: "Resume",
      dataIndex: "resume",
      key: "resume",
      width: 100,
      responsive: ["xxl"],
      render: (resume: string) => (
        <span>
          <a
            className="external-link"
            href={resume}
            target="_blank"
            rel="noopener noreferrer">
            Resume
          </a>
          <ExternalLink size={12} />
        </span>
      ),
    },
    {
      title: "Referral",
      dataIndex: "referral",
      key: "referral",
      width: 100,
      responsive: ["xxl"],
    },
    {
      title: "Relocation",
      dataIndex: "relocation",
      key: "relocation",
      responsive: ["xxl"],
    },
    {
      title: "Remote",
      dataIndex: "remote",
      key: "remote",
      responsive: ["xxl"],
    },
    {
      title: "Main Contact",
      dataIndex: "mainContact",
      key: "mainContact",
      width: 100,
      responsive: ["xxl"],
      render: (text: any) => (
        <div>
          {text.map((text: any, index: any) => (
            <span key={index}>
              {text.mainContactName} {text.mainContactPhone}
            </span>
          ))}
        </div>
      ),
    },
    {
      title: "Reception Mail",
      dataIndex: "receptionMail",
      key: "receptionMail",
      width: 100,
      responsive: ["xxl"],
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
    },
    {
      title: "Likelihood of Hiring",
      dataIndex: "likelihoodOfHiring",
      key: "likelihoodOfHiring",
      responsive: ["xxl"],
    },
    {
      title: "Last Time Contacted",
      dataIndex: "lastTimeContacted",
      key: "lastTimeContacted",
      responsive: ["xxl"],
      render: (dateApplied: string) => (
        <span>{new Date(dateApplied).toDateString()}</span>
      ),
    },
    {
      title: "Tags",
      dataIndex: "tags",
      width: 200,
      key: "tags",
      responsive: ["xxl"],
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
    },
    {
      title: "Action",
      key: "action",
      responsive: ["xxl"],
      render: (text, record) => (
        <Space size="middle">
          <Button block icon={<EditOutlined />} size="small" />
          <Button block icon={<DeleteOutlined />} size="small" />
        </Space>
      ),
      fixed: "right",
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
        scroll={{ x: "max-content", scrollToFirstRowOnChange: true }}
        sticky
      />
    </Wrapper>
  );
};

export default ApplicationTracker;
