import { Avatar, Button, Input, Form } from "antd";
import styled from "styled-components";
import ProfileLayout from "../components/ProfileLayout";

const { Item } = Form;
const { TextArea } = Input;

const Wrapper = styled.div`
  .top-section {
    display: flex;
    justify-content: space-between;
  }

  .profile-picture {
    width: 30%;
    margin: 0 auto;
    border: 1px solid red;
    text-align: center;
  }

  .personal-info {
    width: 65%;
  }

  .names,
  .about-section,
  .social-section {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .about-section > *,
  .social-section > * {
    width: 48%;
  }
`;

const EditProfilePage = () => {
  const [form] = Form.useForm();

  return (
    <ProfileLayout>
      <Wrapper>
        <h2>Edit Profile</h2>
        <Form form={form}>
          <div className="top-section">
            <div className="profile-picture">
              <Avatar size={140} />
            </div>
            <div className="personal-info">
              <div className="names">
                <Item>
                  <label>First name</label>
                  <Input size="large" />
                </Item>
                <Item>
                  <label>Last name</label>
                  <Input size="large" />
                </Item>
              </div>
              <Item>
                <label>Email address</label>
                <Input size="large" />
              </Item>
              <Item>
                <label>Username</label>
                <Input size="large" />
              </Item>
              <small>https://ampersand.careers/@preshonyee</small>
            </div>
          </div>
          <div className="about-section">
            <Item name="location">
              <label>Location</label>
              <Input size="large" />
            </Item>
            <Item name="portfolio">
              <label>Personal site/Portfolio</label>
              <Input size="large" addonBefore="https" />
            </Item>
            <Item name="bio">
              <label>Bio</label>
              <TextArea rows={6} />
            </Item>
            <Item name="interests">
              <label>Interests</label>
              <TextArea rows={4} />
            </Item>
          </div>
          <div className="social-section">
            <Item name="twitter">
              <label>Twitter username</label>
              <Input size="large" addonBefore="@" />
            </Item>
            <Item name="linkedin">
              <label>Linkedin username</label>
              <Input size="large" addonBefore="@" />
            </Item>
            <Item name="github">
              <label>GitHub username</label>
              <Input size="large" addonBefore="@" />
            </Item>
          </div>
          <Button block type="primary">
            Update account
          </Button>
        </Form>
      </Wrapper>
    </ProfileLayout>
  );
};

export default EditProfilePage;
