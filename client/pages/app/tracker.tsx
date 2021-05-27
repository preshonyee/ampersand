import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, message, Popconfirm, Space, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ExternalLink } from "react-feather";
import { useRouter } from "next/router";
import styled from "styled-components";
import Layout from "../../components/Layout";
import { BASE_URL } from "../../constants/BaseURL";
import { TOKEN } from "../../constants/Token";
import ButtonLink from "../../components/ButtonLinks";

const Wrapper = styled.div`
  width: 80%;
  margin: 0 auto;
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
  const router = useRouter();
  const [page, setPage] = useState(1);

  const [applicationsData, setApplicationsData] = useState<
    ApplicationsDataType | any
  >([]);

  const [isReady, setIsReady] = useState(true);
  const [confirmLoading, setConfirmLoading]: any = useState({
    applicationID: false,
  });

  const fetchUserApplicationData = () => {
    axios
      .get(`${BASE_URL}/application`, {
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
  }, [isReady]);

  const handleDeleteApplication = (applicationID: string) => {
    setConfirmLoading((prev: any) => ({ ...prev, [applicationID]: true }));
    axios
      .delete(`${BASE_URL}/application/${applicationID}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((response) => {
        message.success(response.data.message, 3);
        setConfirmLoading((prev: any) => ({ ...prev, [applicationID]: false }));
        setIsReady(true);
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  const handleEdit = (applicationID: string) => {
    router.push(`/app/application/${applicationID}`);
  };

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
      responsive: ["md"],
      render: (dateApplied: string) => (
        <span>{new Date(dateApplied).toDateString()}</span>
      ),
      fixed: "left",
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      width: 150,
      fixed: "left",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      width: 200,
      responsive: ["md"],
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
      width: 200,
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
      responsive: ["md"],
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
      responsive: ["md"],
      width: 200,
    },

    {
      title: "Tags",
      dataIndex: "tags",
      width: 200,
      key: "tags",
      responsive: ["md"],
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
      key: "operation",
      responsive: ["md"],
      render: (text, record: any) => {
        return (
          <Space key={record._id} size="middle">
            <Button
              block
              icon={<EditOutlined />}
              size="small"
              onClick={() => handleEdit(record._id)}
            />
            <Popconfirm
              placement="left"
              title={`Delete ${record.position[0].positionTitle} at ${record.company}`}
              onConfirm={() => handleDeleteApplication(record._id)}
              okText="Yes, Delete"
              cancelText="No"
              okButtonProps={{ loading: confirmLoading[record._id] }}>
              <Button
                id={record._id}
                loading={confirmLoading[record._id]}
                block
                icon={<DeleteOutlined />}
                size="small"
              />
            </Popconfirm>
          </Space>
        );
      },
      fixed: "right",
    },
  ];

  return (
    <Layout background="#fff">
      <Wrapper>
        <div>
          <h1>Applications Tracker</h1>
          <p>Keep track of all your job applications</p>
          <ButtonLink to="/app/application">Add Application</ButtonLink>
        </div>
        <Table
          bordered
          rowKey={(applicationsData) => applicationsData._id}
          size="small"
          columns={columns}
          dataSource={applicationsData}
          loading={isReady}
          pagination={{
            onChange(current) {
              setPage(current);
            },
            pageSize: 10,
            total: applicationsData.length,
            showTotal: (total: number, range) => (
              <p>{`${range[0]}-${range[1]} of ${total} applications`}</p>
            ),
          }}
          scroll={{ x: "max-content", scrollToFirstRowOnChange: true }}
          sticky
        />
      </Wrapper>
    </Layout>
  );
};

export default ApplicationTracker;
