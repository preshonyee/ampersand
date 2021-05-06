import styled from "styled-components";
import {
  Button,
  Avatar,
  Empty,
  Skeleton,
  Space,
  Modal,
  Form,
  Input,
  message,
} from "antd";
import { CloseCircleFilled, PlusOutlined } from "@ant-design/icons";
import UserCard from "./UserCard";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/BaseURL";
import axios, { AxiosResponse } from "axios";
import { TOKEN } from "../constants/Token";
import { ExternalLink } from "react-feather";

const { Item } = Form;

const Radar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 58%;
  background-color: #fff;
  border-radius: 1rem;
  padding: 1rem;
  margin: 1rem 0;
  .list-item {
    display: flex;
    margin: 0.75rem 0;
  }
  .company {
    margin: 0 0.5rem;
  }
  .empty {
    padding: 2rem 0;
  }
  .add-company {
    margin-top: 2rem;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (min-width: 800px) {
    width: 40%;
    min-height: 70vh;
  }

  @media (min-width: 1200px) {
    width: 40%;
    min-height: 70vh;
  }
`;

const ItemWrapper = styled.div`
  .ant-form-item {
    margin-bottom: 1rem;
  }
`;

interface IEntries {
  _id: string;
  avatar: string;
  companyName: string;
  linkToCareersPage: string;
}

const Aside = () => {
  const [loading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [entries, setEntries] = useState<IEntries[]>([]);

  const getRadarEntries = () => {
    axios
      .get(`${BASE_URL}/radar`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((response: AxiosResponse<any>) => {
        setEntries(response.data.result);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        if (response.data.count === 0) {
          setIsEmpty(true);
        }
      });
  };

  useEffect(() => {
    getRadarEntries();
  }, []);

  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [addRadarLoading, setAddRadarLoading] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAddCompany = (values: any) => {
    setAddRadarLoading(true);
    axios
      .post(`${BASE_URL}/radar`, values, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setAddRadarLoading(false);
        message.success(response.data.message, 3);
        setIsModalVisible(false);
        setTimeout(function () {
          window.location.reload();
        }, 100);
      })
      .catch((error) => {
        message.error(error.response.data.message, 3);
        setAddRadarLoading(false);
      });
  };

  return (
    <Wrapper>
      <UserCard />
      <Radar>
        <h2>On Your Radar</h2>
        {isEmpty ? (
          <div className="empty">
            <Empty />
          </div>
        ) : (
          <>
            {entries.map((entry) => (
              <div key={entry._id} className="list-item">
                <Skeleton
                  avatar={{ size: 40, shape: "circle" }}
                  active
                  loading={loading}
                  paragraph={false}>
                  <Avatar size={48} src={entry.avatar} />
                  <div className="company">
                    <h3>{entry.companyName}</h3>
                    <span>
                      <a href={entry.linkToCareersPage}>See openings</a>{" "}
                      <ExternalLink color="#ff5a5f" size={14} />
                    </span>
                  </div>
                </Skeleton>
              </div>
            ))}
          </>
        )}
        <Button
          className="add-company"
          block
          size="large"
          shape="round"
          onClick={showModal}
          icon={<PlusOutlined />}>
          Add company
        </Button>
        <Modal
          title="Add Company"
          width={400}
          visible={isModalVisible}
          closeIcon={<CloseCircleFilled />}
          destroyOnClose
          footer={false}>
          <Form preserve={false} form={form} onFinish={handleAddCompany}>
            <ItemWrapper>
              <label>Company Name</label>
              <Item
                name="companyName"
                rules={[
                  { required: true, message: "Please add company name" },
                ]}>
                <Input placeholder="Company Name" />
              </Item>
            </ItemWrapper>
            <ItemWrapper>
              <label>Link to careers page</label>
              <Item
                name="linkToCareersPage"
                rules={[
                  { required: true, message: "Please add link to career page" },
                ]}>
                <Input
                  addonBefore="https://"
                  placeholder="Link to careers page"
                />
              </Item>
            </ItemWrapper>
            <div className="form-buttons">
              <Space size="small">
                <Button shape="round" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button
                  shape="round"
                  loading={addRadarLoading}
                  type="primary"
                  htmlType="submit">
                  Add company
                </Button>
              </Space>
            </div>
          </Form>
        </Modal>
      </Radar>
    </Wrapper>
  );
};

export default Aside;
