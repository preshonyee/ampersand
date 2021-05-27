import { Button, DatePicker, Form, Input, message, Select, Space } from "antd";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../constants/BaseURL";
import axios from "axios";
import { TOKEN } from "../../../constants/Token";
import { useRouter } from "next/router";
import Layout from "../../../components/Layout";
import { OPTIONS } from "../../../constants/Options";
import { IValues } from "../../../Types";
import moment from "moment";
import LoadingSpinner from "../../../components/LoadingSpinner";

const { Item } = Form;

const Wrapper = styled.div`
  width: 80%;
  margin: 0 auto;
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
  .heading {
    margin-bottom: 2rem;
  }
`;

const EditApplication: React.FC = () => {
  const { likelihoodOptions, statusOptions, tagsOptions, typeOptions } =
    OPTIONS;

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [formDataLoaded, setFormDataLoaded] = useState(false);
  const [initialFormData, setInitialFormData] = useState({
    position: "",
    linkToOpening: "",
    dateApplied: moment(Date.now()),
    company: "",
    location: "",
    type: [],
    source: [],
    strategy: [],
    coverLetter: "",
    resume: "",
    referral: [],
    relocation: [],
    remote: [],
    receptionMail: [],
    status: [],
    likelihoodOfHiring: [],
    lastTimeContacted: moment(Date.now()),
    tags: [],
  });

  const router = useRouter();

  const { applicationID } = router.query;

  const onFinishEdit = async (values: IValues) => {
    setLoading(true);
    const { position, linkToOpening, ...rest } = values;

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
      .put(`${BASE_URL}/application/${applicationID}`, updatedValues, {
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

  const getSelectedApplication = () => {
    axios
      .get(`${BASE_URL}/application/${applicationID}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((response) => {
        const application = response.data.application;
        const {
          tags,
          dateApplied,
          company,
          location,
          position,
          type,
          source,
          strategy,
          coverLetter,
          resume,
          referral,
          relocation,
          remote,
          receptionMail,
          status,
          likelihoodOfHiring,
          lastTimeContacted,
        } = application;
        setInitialFormData((prev) => ({
          ...prev,
          position: position[0]?.positionTitle,
          linkToOpening: position[0]?.linkToOpening,
          dateApplied: moment(dateApplied),
          company: company,
          location: location,
          type: type,
          source: source,
          strategy: strategy,
          coverLetter: coverLetter,
          resume: resume,
          referral: referral,
          relocation: relocation,
          remote: remote,
          receptionMail: receptionMail,
          status: status,
          likelihoodOfHiring: likelihoodOfHiring,
          lastTimeContacted: moment(lastTimeContacted),
          tags: tags,
        }));
        setFormDataLoaded(true);
      });
  };

  useEffect(() => {
    getSelectedApplication();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dateFormat = "ddd, Do MMM, YYYY";

  return (
    <Layout background="#fff">
      <Wrapper>
        <div className="heading">
          <h1>Update your application at {initialFormData.company}</h1>
          <p>Update the details of your application</p>
        </div>
        {!formDataLoaded ? (
          <LoadingSpinner />
        ) : (
          <Form
            name="applicationForm"
            form={form}
            onFinish={onFinishEdit}
            initialValues={initialFormData}>
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

            <div></div>

            <Space size="small">
              <Button
                size="large"
                shape="round"
                loading={loading}
                type="primary"
                htmlType="submit">
                Update Application
              </Button>
              <Button
                size="large"
                shape="round"
                onClick={() => router.push("/app/tracker")}>
                Cancel Update
              </Button>
            </Space>
          </Form>
        )}
      </Wrapper>
    </Layout>
  );
};

export default EditApplication;
