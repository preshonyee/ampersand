import { MinusCircleOutlined } from "@ant-design/icons";
import { Form, Input, Button } from "antd";
import TextArea from "antd/lib/input/TextArea";

const { Item, List } = Form;

export const steps = [
  {
    title: "Personal Info",
    content: (
      <div>
        {/* PERSONAL INFO SECTION */}
        <h4>Personal Info Section</h4>
        <div className="parent">
          <div>
            <label>First Name</label>
            <Item name="firstName">
              <Input />
            </Item>
          </div>

          <div>
            <label>Last Name</label>
            <Item name="lastName">
              <Input />
            </Item>
          </div>

          <div>
            <label>Occupation</label>
            <Item name="occupation">
              <Input />
            </Item>
          </div>
        </div>
        <div>
          {/* CONTACT SECTION */}
          <h4>Contact Section</h4>
          <div className="parent">
            <div>
              <label>Location</label>
              <Item name="location">
                <Input />
              </Item>
            </div>

            <div>
              <label>Website</label>
              <Item name="website">
                <Input />
              </Item>
            </div>

            <div>
              <label>Email</label>
              <Item name="email">
                <Input />
              </Item>
            </div>

            <div>
              <label>Telephone</label>
              <Item name="telephone">
                <Input />
              </Item>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Experience",
    content: (
      <div>
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
                        <Input />
                      </Item>
                    </div>

                    <div>
                      <label>Role</label>
                      <Item
                        {...field}
                        name={[field.name, "role"]}
                        fieldKey={[field.fieldKey, "role"]}
                        rules={[{ required: true, message: "Missing role" }]}>
                        <Input />
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
                        <Input />
                      </Item>
                    </div>

                    <div>
                      <label>Date</label>
                      <Item
                        {...field}
                        name={[field.name, "date"]}
                        fieldKey={[field.fieldKey, "date"]}
                        rules={[{ required: true, message: "Missing date" }]}>
                        <Input />
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
                        <TextArea autoSize />
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
      </div>
    ),
  },
  {
    title: "Projects",
    content: (
      <div>
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
                        <Input />
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
                        <TextArea autoSize />
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
      </div>
    ),
  },
  {
    title: "Education",
    content: (
      <div>
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
                        <Input />
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
                        <Input />
                      </Item>
                    </div>

                    <div>
                      <label>Honors</label>
                      <Item
                        {...field}
                        name={[field.name, "honors"]}
                        fieldKey={[field.fieldKey, "honors"]}
                        rules={[{ required: true, message: "Missing honors" }]}>
                        <Input />
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
                        <Input />
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
      </div>
    ),
  },
  {
    title: "Skills",
    content: (
      <div>
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
                        <Input />
                      </Item>
                    </div>

                    <div style={{ width: "100%" }}>
                      <label>Tools</label>
                      <Item
                        {...field}
                        name={[field.name, "tools"]}
                        fieldKey={[field.fieldKey, "tools"]}
                        rules={[{ required: true, message: "Missing tools" }]}>
                        <TextArea />
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
      </div>
    ),
  },
  {
    title: "Achievements",
    content: (
      <div>
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
                        <Input />
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
                        <Input />
                      </Item>
                    </div>

                    <div>
                      <label>Date Awarded</label>
                      <Item
                        {...field}
                        name={[field.name, "date"]}
                        fieldKey={[field.fieldKey, "date"]}
                        rules={[{ required: true, message: "Missing date" }]}>
                        <Input />
                      </Item>
                    </div>

                    <div>
                      <label>Event</label>
                      <Item
                        {...field}
                        name={[field.name, "event"]}
                        fieldKey={[field.fieldKey, "event"]}
                        rules={[{ required: true, message: "Missing event" }]}>
                        <Input />
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
      </div>
    ),
  },
];
