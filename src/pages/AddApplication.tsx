import { Button, DatePicker, Form, Input, message, Select } from "antd";
import styled from "styled-components";
import React, { useState } from "react";
import { BASE_URL } from "../constants/BaseURL";
import axios from "axios";
import { TOKEN } from "../constants/LocalData";
import { useHistory } from "react-router-dom";
import NavMenu from "../components/NavMenu";

interface IValues {
  company: string;
  contactName: string;
  contactPhone: string;
  coverLetter: string;
  dateApplied: string;
  lastTimeContacted: string;
  likelihoodOfHiring: string;
  linkToOpening: string;
  location: string;
  mainContact: [];
  position: string;
  receptionMail: string;
  referral: string;
  relocation: string;
  remote: string;
  resume: string;
  source: string;
  status: string;
  strategy: string;
  tags: [];
  type: string;
}

const { Item } = Form;

const Wrapper = styled.div`
  width: 97%;
  margin: 2rem auto;
  form {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  form > * {
    width: 32%;
  }
`;

const AddApplication: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const sourceOptions = [
    { id: 1, label: "LinkedIn", value: "LinkedIn" },
    { id: 2, label: "Indeed", value: "Indeed" },
    {
      id: 3,
      label: "Company Jobs/Careers Page",
      value: "Company Jobs/Careers Page",
    },
    { id: 4, label: "Remote Job Boards", value: "Remote Job Boards" },
    { id: 5, label: "HackerNews", value: "HackerNews" },
    { id: 6, label: "Reddit", value: "Reddit" },
    { id: 7, label: "Discord Channel", value: "Discord Channel" },
    { id: 8, label: "StackOverflow", value: "StackOverflow" },
    { id: 9, label: "Twitter", value: "Twitter" },
    { id: 10, label: "Newsletter", value: "Newsletter" },
    { id: 11, label: "Other", value: "Other" },
  ];

  const strategyOptions = [
    { id: 1, label: "Twitter DM", value: "Twitter DM" },
    { id: 2, label: "Cold Email", value: "Cold Email" },
    { id: 3, label: "Referral", value: "Referral" },
    {
      id: 4,
      label: "Fund Raise Announcement",
      value: "Fund Raise Announcement",
    },
    { id: 5, label: "VC Portfolio", value: "VC Portfolio" },
    { id: 6, label: "Search Term/Queries", value: "Search Term/Queries" },
    { id: 7, label: "Tweet", value: "Tweet" },
    { id: 8, label: "Other", value: "Other" },
  ];

  const statusOptions = [
    { id: 1, label: "Prospect", value: "Prospect" },
    { id: 2, label: "Applied", value: "Applied" },
    { id: 3, label: "First Interviews", value: "First Interviews" },
    { id: 4, label: "Requires Follow-up", value: "Requires Follow-up" },
    { id: 5, label: "Negotiating Offer", value: "Negotiating Offer" },
    { id: 6, label: "Closed", value: "Closed" },
    { id: 7, label: "Hired", value: "Hired" },
  ];

  const remoteOptions = [
    { id: 1, label: "Fully Remote", value: "Fully Remote" },
    { id: 2, label: "Remote (US-Only)", value: "Remote (US-Only)" },
    { id: 3, label: "No Remote", value: "No Remote" },
  ];

  const typeOptions = [
    { id: 1, label: "Part Time", value: "Part Time" },
    { id: 2, label: "Full Time", value: "Full Time" },
    { id: 3, label: "Contract", value: "Contract" },
    { id: 4, label: "Agency", value: "Agency" },
  ];

  const referralOptions = [
    { id: 1, label: "YES", value: "YES" },
    { id: 2, label: "NO", value: "NO" },
  ];

  const receptionMailOptions = [
    { id: 1, label: "YES", value: "YES" },
    { id: 2, label: "NO", value: "NO" },
  ];

  const relocationOptions = [
    { id: 1, label: "Require Relocation", value: "Require Relocation" },
    {
      id: 2,
      label: "Support With Relocation",
      value: "Support With Relocation",
    },
    { id: 3, label: "No Relocation Support", value: "No Relocation Support" },
    { id: 4, label: "N/A", value: "N/A" },
  ];

  const tagsOptions = [
    { id: 1, label: "Benefits", value: "Benefits" },
    { id: 2, label: "Internal Connections", value: "Internal Connections" },
    { id: 3, label: "Below Desired Salary", value: "Below Desired Salary" },
    { id: 4, label: "Above Desired Salary", value: "Above Desired Salary" },
    { id: 5, label: "Within Salary Range", value: "Within Salary Range" },
    { id: 6, label: "Equity", value: "Equity" },
    { id: 7, label: "Hourly Salary", value: "Hourly Salary" },
    { id: 8, label: "Required Travel", value: "Required Travel" },
    {
      id: 9,
      label: "Strong Parental Leave Policy",
      value: "Strong Parental Leave Policy",
    },
    {
      id: 10,
      label: "Weak Parental Leave Policy",
      value: "Weak Parental Leave Policy",
    },
  ];

  const likelihoodOptions = [
    { id: 1, label: "0%: Declined offer", value: "0%: Declined offer" },
    { id: 2, label: "0%: Lost opportunity", value: "0%: Lost opportunity" },
    { id: 3, label: "5%: Too early to tell", value: "5%: Too early to tell" },
    { id: 4, label: "10%: Made contact", value: "10%: Made contact" },
    {
      id: 5,
      label: "10%: Weak Phone screening",
      value: "10%: Weak Phone screening",
    },
    {
      id: 6,
      label: "15%: Scheduled Phone Screening",
      value: "15%: Scheduled Phone Screening",
    },
    {
      id: 7,
      label: "15%: Weak first round interview",
      value: "15%: Weak first round interview",
    },
    {
      id: 8,
      label: "20%: Strong Phone screen",
      value: "20%: Strong Phone screen",
    },
    {
      id: 9,
      label: "25%: Weak second round interview",
      value: "25%: Weak second round interview",
    },
    {
      id: 10,
      label: "30%: Scheduled Interviews",
      value: "30%: Scheduled Interviews",
    },
    {
      id: 11,
      label: "40%: Strong first round interviews",
      value: "40%: Strong first round interviews",
    },
    {
      id: 12,
      label: "50%: Scheduled second round interviews",
      value: "50%: Scheduled second round interviews",
    },
    {
      id: 13,
      label: "60%: Strong second round interviews",
      value: "60%: Strong second round interviews",
    },
    {
      id: 14,
      label: "80%: Received offer",
      value: "80%: Received offer",
    },
    {
      id: 15,
      label: "100%: Accepted offer",
      value: "100%: Accepted offer",
    },
  ];

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
      mainContact: [
        {
          mainContactName: values.contactName,
          mainContactPhone: values.contactPhone,
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
        history.push("/");
      })
      .catch((error) => {
        message.error(error.message, 3);
        setLoading(false);
      });
  };

  const dateFormat = "ddd, Do MMM, YYYY";

  return (
    <Wrapper>
      <NavMenu />
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
            <DatePicker format={dateFormat} style={{ width: "100%" }} />
          </Item>
        </div>

        <div>
          <label>Name of Company</label>
          <Item
            name="company"
            rules={[
              { required: true, message: "Please input the company name!" },
            ]}>
            <Input placeholder="Name of Company" />
          </Item>
        </div>

        <div>
          <label>Location</label>
          <Item
            name="location"
            rules={[
              { required: true, message: "Please input the company location!" },
            ]}>
            <Input placeholder="Location" />
          </Item>
        </div>

        <div>
          <label>Position</label>
          <Item
            name="position"
            rules={[
              { required: true, message: "Please input the job position!" },
            ]}>
            <Input placeholder="Position" />
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
            <Input addonBefore="https://" placeholder="Link To Opening" />
          </Item>
        </div>

        <div>
          <label>Type</label>
          <Item
            name="type"
            rules={[
              { required: true, message: "Please select the job type!" },
            ]}>
            <Select placeholder="Select Type Options" options={typeOptions} />
          </Item>
        </div>

        <div>
          <label>Source</label>
          <Item
            name="source"
            rules={[
              { required: true, message: "Please select the job source!" },
            ]}>
            <Select placeholder="Select Source" options={sourceOptions} />
          </Item>
        </div>

        <div>
          <label>Strategy</label>
          <Item
            name="strategy"
            rules={[
              { required: true, message: "Please select a job hunt strategy!" },
            ]}>
            <Select placeholder="Select Strategy" options={strategyOptions} />
          </Item>
        </div>

        <div>
          <label>Copy of Cover Letter</label>
          <Item
            name="coverLetter"
            rules={[
              {
                required: true,
                message: "Please input the link to the copy of cover letter!",
              },
            ]}>
            <Input
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
            <Select placeholder="Select Referral" options={referralOptions} />
          </Item>
        </div>

        <div>
          <label>Relocation</label>
          <Item
            name="relocation"
            rules={[
              { required: true, message: "Please select a relocation option!" },
            ]}>
            <Select
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
              placeholder="Select Remote Option"
              options={remoteOptions}
            />
          </Item>
        </div>

        <div>
          <label>Main Contact Name</label>
          <Item
            name="contactName"
            rules={[
              { required: true, message: "Please input a contact name!" },
            ]}>
            <Input placeholder="Contact Name" />
          </Item>
        </div>

        <div>
          <label>Main Contact Phone</label>
          <Item
            name="contactPhone"
            rules={[
              {
                required: true,
                message: "Please input the contact phone number!",
              },
            ]}>
            <Input placeholder="Contact Phone" />
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
              placeholder="Select Likelihood Options"
              options={likelihoodOptions}
            />
          </Item>
        </div>

        <div>
          <label>Last Time Contacted</label>
          <Item
            name="lastTimeContacted"
            rules={[
              {
                required: true,
                message: "Please include the last time you were contacted!",
              },
            ]}>
            <DatePicker format={dateFormat} style={{ width: "100%" }} />
          </Item>
        </div>

        <div>
          <label>Tags</label>
          <Item
            name="tags"
            rules={[
              {
                required: true,
                message: "Please select multiple appropriate tags!",
              },
            ]}>
            <Select
              mode="tags"
              placeholder="Select Tags"
              options={tagsOptions}
            />
          </Item>
        </div>

        <div>
          <Item></Item>
        </div>

        <div>
          <Button loading={loading} type="primary" htmlType="submit">
            Add Application
          </Button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddApplication;
