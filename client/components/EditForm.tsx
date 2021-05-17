import { Dispatch, SetStateAction, useState } from "react";
import { Button, Form, Input, message } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";

import styled from "styled-components";
import TextArea from "antd/lib/input/TextArea";
import {
  achievementType,
  educationType,
  experienceType,
  projectType,
  skillType,
} from "../Types";
import axios from "axios";
import { BASE_URL } from "../constants/BaseURL";
import { TOKEN } from "../constants/Token";
import { useRouter } from "next/router";

const { Item, List } = Form;

const FormWrapper = styled.div`
  width: 100%;
  height: 85vh;
  background-color: #fff;
  padding: 1rem;
  overflow-y: auto;
  scrollbar-width: thin;
  border-bottom: 1px solid #dadce0;

  @media (min-width: 1200px) {
    width: 38%;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: hsl(204, 6%, 89%);
  }
  ::-webkit-scrollbar-thumb {
    background-color: hsl(200, 4%, 72%);
    border-radius: 10px;
    border: 1.5px solid var(--scrollbarBG);
  }

  .parent {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 1rem 0;
  }

  .parent > * {
    width: 49%;
  }

  h4 {
    font-weight: 700;
    text-transform: uppercase;
  }

  label {
    display: block;
    font-weight: 500;
    padding-bottom: 0.2rem;
  }

  input {
    width: 100%;
  }
`;

interface IFormData {
  firstName: String;
  lastName: String;
  occupation: String;
  location: String;
  website: String;
  email: String;
  telephone: String;
  projects: projectType[];
  experience: experienceType[];
  education: educationType[];
  achievements: achievementType[];
  skills: skillType[];
}

interface IEditForm {
  resumeID: string | string[];
  formData: IFormData[];
  setFormData: Dispatch<SetStateAction<IFormData[]>>;
}

const EditForm: React.FC<IEditForm> = ({ formData, setFormData, resumeID }) => {
  const router = useRouter();
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const onFinish = (values: any) => {
    setLoading(true);
    axios
      .put(`${BASE_URL}/resume/${resumeID}`, values, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((response) => {
        message.success(response.data.message);
        setLoading(false);
        router.push("/app/resume");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        message.error(error.response.data.error);
      });
  };

  const onChange = (allValues: any) => {
    // console.log("DATA", formData);
    // console.log("VALUES", [allValues]);
    setFormData([allValues]);
  };

  return (
    <FormWrapper>
      <Form
        form={form}
        onFinish={onFinish}
        onValuesChange={(changedValues, allValues) => {
          onChange(allValues);
        }}
        initialValues={formData[0]}>
        {/* PERSONAL INFO SECTION */}
        <h4>Personal Info Section</h4>
        <div className="parent">
          <div>
            <label>First Name</label>
            <Item name="firstName">
              <Input size="large" />
            </Item>
          </div>

          <div>
            <label>Last Name</label>
            <Item name="lastName">
              <Input size="large" />
            </Item>
          </div>

          <div>
            <label>Occupation</label>
            <Item name="occupation">
              <Input size="large" />
            </Item>
          </div>
        </div>

        {/* CONTACT SECTION */}
        <h4>Contact Section</h4>
        <div className="parent">
          <div>
            <label>Location</label>
            <Item name="location">
              <Input size="large" />
            </Item>
          </div>

          <div>
            <label>Website</label>
            <Item name="website">
              <Input size="large" />
            </Item>
          </div>

          <div>
            <label>Email</label>
            <Item name="email">
              <Input size="large" />
            </Item>
          </div>

          <div>
            <label>Telephone</label>
            <Item name="telephone">
              <Input size="large" />
            </Item>
          </div>
        </div>

        {/* EXPERIENCE SECTION */}
        <h4>Experience Section</h4>
        <List name="experience">
          {(fields, { add, remove }) => {
            return (
              <>
                {fields.map((field, index) => (
                  <div className="parent" key={index}>
                    <div>
                      <label>Company</label>
                      <Item
                        {...field}
                        name={[field.name, "company"]}
                        fieldKey={[field.fieldKey, "company"]}
                        rules={[
                          { required: true, message: "Missing company" },
                        ]}>
                        <Input size="large" />
                      </Item>
                    </div>

                    <div>
                      <label>Role</label>
                      <Item
                        {...field}
                        name={[field.name, "role"]}
                        fieldKey={[field.fieldKey, "role"]}
                        rules={[{ required: true, message: "Missing role" }]}>
                        <Input size="large" />
                      </Item>
                    </div>

                    <div>
                      <label>Location</label>
                      <Item
                        {...field}
                        name={[field.name, "location"]}
                        fieldKey={[field.fieldKey, "location"]}
                        rules={[
                          { required: true, message: "Missing location" },
                        ]}>
                        <Input size="large" />
                      </Item>
                    </div>

                    <div>
                      <label>Date</label>
                      <Item
                        {...field}
                        name={[field.name, "date"]}
                        fieldKey={[field.fieldKey, "date"]}
                        rules={[{ required: true, message: "Missing date" }]}>
                        <Input size="large" />
                      </Item>
                    </div>

                    <div style={{ width: "100%" }}>
                      <label>Description</label>
                      <Item
                        {...field}
                        name={[field.name, "description"]}
                        fieldKey={[field.fieldKey, "description"]}
                        rules={[
                          { required: true, message: "Missing description" },
                        ]}>
                        <TextArea size="large" autoSize />
                      </Item>
                    </div>
                    {fields.length > 1 ? (
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        onClick={() => remove(field.name)}
                      />
                    ) : null}
                  </div>
                ))}
                <Item>
                  <Button
                    onClick={() =>
                      add({
                        company: "",
                        role: "",
                        location: "",
                        date: "",
                        description: "",
                      })
                    }>
                    Add Another Work Experience
                  </Button>
                </Item>
              </>
            );
          }}
        </List>

        {/* PROJECTS SECTION */}
        <h4>Projects Section</h4>
        <List name="projects">
          {(fields, { add, remove }) => {
            return (
              <>
                {fields.map((field, index) => (
                  <div className="parent" key={index}>
                    <div style={{ width: "100%" }}>
                      <label>Title</label>
                      <Item
                        {...field}
                        name={[field.name, "title"]}
                        fieldKey={[field.fieldKey, "title"]}
                        rules={[{ required: true, message: "Missing title" }]}>
                        <Input size="large" />
                      </Item>
                    </div>

                    <div style={{ width: "100%" }}>
                      <label>Description</label>
                      <Item
                        {...field}
                        name={[field.name, "description"]}
                        fieldKey={[field.fieldKey, "description"]}
                        rules={[
                          { required: true, message: "Missing description" },
                        ]}>
                        <TextArea size="large" autoSize />
                      </Item>
                    </div>
                    {fields.length > 1 ? (
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        onClick={() => remove(field.name)}
                      />
                    ) : null}
                  </div>
                ))}
                <Item>
                  <Button
                    onClick={() =>
                      add({
                        title: "",
                        description: "",
                      })
                    }>
                    Add Another Projects
                  </Button>
                </Item>
              </>
            );
          }}
        </List>

        {/* EDUCATION SCREEN */}
        <h4>Education Section</h4>
        <List name="education">
          {(fields, { add, remove }) => {
            return (
              <>
                {fields.map((field, index) => (
                  <div className="parent" key={index}>
                    <div>
                      <label>Name of Institution</label>
                      <Item
                        {...field}
                        name={[field.name, "nameOfInstitution"]}
                        fieldKey={[field.fieldKey, "nameOfInstitution"]}
                        rules={[
                          {
                            required: true,
                            message: "Missing Name of Institution",
                          },
                        ]}>
                        <Input size="large" />
                      </Item>
                    </div>

                    <div>
                      <label>Year Ended</label>
                      <Item
                        {...field}
                        name={[field.name, "yearEnded"]}
                        fieldKey={[field.fieldKey, "yearEnded"]}
                        rules={[
                          { required: true, message: "Missing Year Ended" },
                        ]}>
                        <Input size="large" />
                      </Item>
                    </div>

                    <div>
                      <label>Honors</label>
                      <Item
                        {...field}
                        name={[field.name, "honors"]}
                        fieldKey={[field.fieldKey, "honors"]}
                        rules={[{ required: true, message: "Missing honors" }]}>
                        <Input size="large" />
                      </Item>
                    </div>

                    <div>
                      <label>Discipline</label>
                      <Item
                        {...field}
                        name={[field.name, "discipline"]}
                        fieldKey={[field.fieldKey, "discipline"]}
                        rules={[
                          { required: true, message: "Missing discipline" },
                        ]}>
                        <Input size="large" />
                      </Item>
                    </div>
                    {fields.length > 1 ? (
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        onClick={() => remove(field.name)}
                      />
                    ) : null}
                  </div>
                ))}
                <Item>
                  <Button
                    onClick={() =>
                      add({
                        nameOfInstitution: "",
                        yearEnded: "",
                        honors: "",
                        discipline: "",
                      })
                    }>
                    Add Another Education
                  </Button>
                </Item>
              </>
            );
          }}
        </List>

        {/* SKILLS SECTION */}
        <h4>Skills section</h4>
        <List name="skills">
          {(fields, { add, remove }) => {
            return (
              <>
                {fields.map((field, index) => (
                  <div className="parent" key={index}>
                    <div style={{ width: "100%" }}>
                      <label>Skill</label>
                      <Item
                        {...field}
                        name={[field.name, "skill"]}
                        fieldKey={[field.fieldKey, "skill"]}
                        rules={[{ required: true, message: "Missing skill" }]}>
                        <Input size="large" />
                      </Item>
                    </div>

                    <div style={{ width: "100%" }}>
                      <label>Tools</label>
                      <Item
                        {...field}
                        name={[field.name, "tools"]}
                        fieldKey={[field.fieldKey, "tools"]}
                        rules={[{ required: true, message: "Missing tools" }]}>
                        <TextArea size="large" />
                      </Item>
                    </div>
                    {fields.length > 1 ? (
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        onClick={() => remove(field.name)}
                      />
                    ) : null}
                  </div>
                ))}
                <Item>
                  <Button
                    onClick={() =>
                      add({
                        skill: "",
                        tools: "",
                      })
                    }>
                    Add Another Skills
                  </Button>
                </Item>
              </>
            );
          }}
        </List>

        {/* ACHIEVEMENTS SECTION */}
        <h4>Achievements Section</h4>
        <List name="achievements">
          {(fields, { add, remove }) => {
            return (
              <>
                {fields.map((field, index) => (
                  <div className="parent" key={index}>
                    <div>
                      <label>Achievement Title</label>
                      <Item
                        {...field}
                        name={[field.name, "achievementTitle"]}
                        fieldKey={[field.fieldKey, "achievementTitle"]}
                        rules={[
                          {
                            required: true,
                            message: "Missing achievement title",
                          },
                        ]}>
                        <Input size="large" />
                      </Item>
                    </div>

                    <div>
                      <label>Awarder</label>
                      <Item
                        {...field}
                        name={[field.name, "awarder"]}
                        fieldKey={[field.fieldKey, "awarder"]}
                        rules={[
                          { required: true, message: "Missing awarder" },
                        ]}>
                        <Input size="large" />
                      </Item>
                    </div>

                    <div>
                      <label>Date Awarded</label>
                      <Item
                        {...field}
                        name={[field.name, "date"]}
                        fieldKey={[field.fieldKey, "date"]}
                        rules={[{ required: true, message: "Missing date" }]}>
                        <Input size="large" />
                      </Item>
                    </div>

                    <div>
                      <label>Event</label>
                      <Item
                        {...field}
                        name={[field.name, "event"]}
                        fieldKey={[field.fieldKey, "event"]}
                        rules={[{ required: true, message: "Missing event" }]}>
                        <Input size="large" />
                      </Item>
                    </div>
                    {fields.length > 1 ? (
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        onClick={() => remove(field.name)}
                      />
                    ) : null}
                  </div>
                ))}
                <Item>
                  <Button
                    onClick={() =>
                      add({
                        achievementTitle: "",
                        awarder: "",
                        date: "",
                        event: "",
                      })
                    }>
                    Add Another Achievements
                  </Button>
                </Item>
              </>
            );
          }}
        </List>

        <Button
          shape="round"
          size="large"
          loading={loading}
          type="primary"
          htmlType="submit">
          Save resume
        </Button>
      </Form>
    </FormWrapper>
  );
};

export default EditForm;
