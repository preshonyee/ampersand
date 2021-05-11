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
  width: 90%;
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
  const {
    likelihoodOptions,
    receptionMailOptions,
    referralOptions,
    relocationOptions,
    remoteOptions,
    sourceOptions,
    statusOptions,
    strategyOptions,
    tagsOptions,
    typeOptions,
  } = OPTIONS;

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // const [formData, setFormData] = useState();

  const onFinish = async (values: IValues) => {
    setLoading(true);
    const {
      contactName,
      contactPhone,
      position,
      linkToOpening,
      ...rest
    } = values;

    const updatedValues = {
      ...rest,
      position: [
        {
          positionTitle: values.position,
          linkToOpening: values.linkToOpening,
        },
      ],
    };

    axios
      .post(`${BASE_URL}/application/createApplication`, updatedValues, {
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
            <label>Link To Opening</label>
            <Item
              name="linkToOpening"
              rules={[
                {
                  required: true,
                  message: "Please input the link to the opening!",
                },
              ]}>
              <Input
                size="large"
                addonBefore="https://"
                placeholder="Link To Opening"
              />
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
            <label>Source</label>
            <Item
              name="source"
              rules={[
                { required: true, message: "Please select the job source!" },
              ]}>
              <Select
                size="large"
                placeholder="Select Source"
                options={sourceOptions}
              />
            </Item>
          </div>

          <div>
            <label>Strategy</label>
            <Item
              name="strategy"
              rules={[
                {
                  required: true,
                  message: "Please select a job hunt strategy!",
                },
              ]}>
              <Select
                size="large"
                placeholder="Select Strategy"
                options={strategyOptions}
              />
            </Item>
          </div>

          <div>
            <label>Copy of Cover Letter</label>
            <Item name="coverLetter">
              <Input
                size="large"
                addonBefore="https://"
                placeholder="Enter link to copy of cover letter"
              />
            </Item>
          </div>

          <div>
            <label>Copy of Resume</label>
            <Item
              name="resume"
              rules={[
                {
                  required: true,
                  message: "Please input the link to the copy of resume!",
                },
              ]}>
              <Input
                size="large"
                addonBefore="https://"
                placeholder="Enter link to copy of Resume"
              />
            </Item>
          </div>

          <div>
            <label>Referral?</label>
            <Item
              name="referral"
              rules={[
                { required: true, message: "Please select a referral option!" },
              ]}>
              <Select
                size="large"
                placeholder="Select Referral"
                options={referralOptions}
              />
            </Item>
          </div>

          <div>
            <label>Relocation</label>
            <Item
              name="relocation"
              rules={[
                {
                  required: true,
                  message: "Please select a relocation option!",
                },
              ]}>
              <Select
                size="large"
                placeholder="Select Relocation Option"
                options={relocationOptions}
              />
            </Item>
          </div>

          <div>
            <label>Remote?</label>
            <Item
              name="remote"
              rules={[
                { required: true, message: "Please select a remote option!" },
              ]}>
              <Select
                size="large"
                placeholder="Select Remote Option"
                options={remoteOptions}
              />
            </Item>
          </div>

          <div>
            <label>Reception Mail (thanks for applying)</label>
            <Item
              name="receptionMail"
              valuePropName="checked"
              rules={[
                {
                  required: true,
                  message: "Please select a reception mail option!",
                },
              ]}>
              <Select
                size="large"
                placeholder="Select Reception Mail Options"
                options={receptionMailOptions}
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

          <div>
            <label>Likelihood of Hiring</label>
            <Item
              name="likelihoodOfHiring"
              rules={[
                {
                  required: true,
                  message: "Please select the likelihood of hiring option!",
                },
              ]}>
              <Select
                size="large"
                placeholder="Select Likelihood Options"
                options={likelihoodOptions}
              />
            </Item>
          </div>

          <div>
            <label>Last Time Contacted</label>
            <Item name="lastTimeContacted">
              <DatePicker
                size="large"
                format={dateFormat}
                style={{ width: "100%" }}
              />
            </Item>
          </div>

          <div>
            <label>Tags</label>
            <Item name="tags">
              <Select
                size="large"
                mode="tags"
                placeholder="Select Tags"
                options={tagsOptions}
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