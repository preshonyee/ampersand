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
  width: 90%;
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
      render: (value: any, item: any, index: any) => (page - 1) * 10 + index,
    },
    {
      title: "Date Applied",
      dataIndex: "dateApplied",
      key: "dateApplied",
      render: (dateApplied: string) => (
        <span>{new Date(dateApplied).toDateString()}</span>
      ),
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
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "operation",
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
          scroll={{ scrollToFirstRowOnChange: true }}
          sticky
        />
      </Wrapper>
    </Layout>
  );
};

export default ApplicationTracker;
