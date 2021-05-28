import { Button, DatePicker, Form, Input, message, Select, Space } from "antd";
import styled from "styled-components";
import React, { useState } from "react";
import { BASE_URL } from "../../../constants/BaseURL";
import axios from "axios";
import { TOKEN } from "../../../constants/Token";
import { useRouter } from "next/router";
import Layout from "../../../components/Layout";
import { OPTIONS } from "../../../constants/Options";
import { IValues } from "../../../Types";

const { Item } = Form;

const Wrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  .heading {
    margin-bottom: 2rem;
  }
  form {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  form > * {
    width: 100%;
  }

  @media (min-width: 800px) {
    form > * {
      width: 48%;
    }
  }
  @media (min-width: 1200px) {
    form > * {
      width: 32%;
    }
  }
`;

const NewApplication: React.FC = () => {
  const { likelihoodOptions, statusOptions, tagsOptions, typeOptions } =
    OPTIONS;

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // const [formData, setFormData] = useState();

  const onFinish = async (values: IValues) => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/application/`, values, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((response) => {
        const result = response.data;
        setLoading(false);
        message.success(result.message, 3);
        form.resetFields();
        router.push("/app/tracker");
      })
      .catch((error) => {
        message.error(error.message, 3);
        setLoading(false);
      });
  };

  const dateFormat = "ddd, Do MMM, YYYY";

  return (
    <Layout background="#fff">
      <Wrapper>
        <div className="heading">
          <h1>Track new application</h1>
          <p>
            Fill in the details below to add a new application to the tracker
          </p>
        </div>
        <Form name="applicationForm" form={form} onFinish={onFinish}>
          <div>
            <label>Date Applied</label>
            <Item
              name="dateApplied"
              rules={[
                {
                  required: true,
                  message: "Please select the application date!",
                },
              ]}>
              <DatePicker
                size="large"
                format={dateFormat}
                style={{ width: "100%" }}
              />
            </Item>
          </div>

          <div>
            <label>Name of Company</label>
            <Item
              name="company"
              rules={[
                { required: true, message: "Please input the company name!" },
              ]}>
              <Input size="large" placeholder="Name of Company" />
            </Item>
          </div>

          <div>
            <label>Location</label>
            <Item
              name="location"
              rules={[
                {
                  required: true,
                  message: "Please input the company location!",
                },
              ]}>
              <Input size="large" placeholder="Location" />
            </Item>
          </div>

          <div>
            <label>Position</label>
            <Item
              name="position"
              rules={[
                { required: true, message: "Please input the job position!" },
              ]}>
              <Input size="large" placeholder="Position" />
            </Item>
          </div>

          <div>
            <label>Type</label>
            <Item
              name="type"
              rules={[
                { required: true, message: "Please select the job type!" },
              ]}>
              <Select
                size="large"
                placeholder="Select Type Options"
                options={typeOptions}
              />
            </Item>
          </div>

          <div>
            <label>Status</label>
            <Item
              name="status"
              rules={[
                {
                  required: true,
                  message: "Please select the job status option!",
                },
              ]}>
              <Select
                size="large"
                placeholder="Select Status Options"
                options={statusOptions}
              />
            </Item>
          </div>

          <Space size="small">
            <Button
              size="large"
              shape="round"
              loading={loading}
              type="primary"
              htmlType="submit">
              Add Application
            </Button>
            <Button
              size="large"
              shape="round"
              onClick={() => router.push("/app/tracker")}>
              Cancel
            </Button>
          </Space>
        </Form>
      </Wrapper>
    </Layout>
  );
};

export default NewApplication;
