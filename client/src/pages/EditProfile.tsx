import { Avatar, Button, Input, Form, message } from "antd";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import LoadingSpinner from "../components/LoadingSpinner";
import ProfileLayout from "../components/ProfileLayout";
import { BASE_URL } from "../constants/BaseURL";
import { TOKEN } from "../constants/Token";

const { Item } = Form;
const { TextArea } = Input;

interface IUserData {
  profilePicture: string;
  location: string;
  portfolio: string;
  bio: string;
  interests: string;
  twitter: string;
  linkedin: string;
  github: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
}

const Wrapper = styled.div`
  .top-section {
    display: flex;
    justify-content: space-between;
  }

  .profile-picture {
    width: 30%;
    margin: 0 auto;
    padding: 2rem 0;
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
  const history = useHistory();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [userData, setUserData] = useState<IUserData>({
    profilePicture: "",
    location: "",
    portfolio: "",
    bio: "",
    interests: "",
    twitter: "",
    linkedin: "",
    github: "",
    firstName: "",
    lastName: "",
    email: "",
    username: "",
  });

  const getUserData = () => {
    axios
      .get(`${BASE_URL}/user`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((response: AxiosResponse<any>) => {
        setUserData(response.data.data.user);
        setDataLoaded(true);
      });
  };

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFinish = (values: IUserData) => {
    setLoading(true);
    axios
      .put(`${BASE_URL}/auth/update-details`, values, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((response: AxiosResponse<any>) => {
        setLoading(false);
        message.success(response.data.message, 3);
        history.push("/app/@preshonyee");
      })
      .catch((error) => {
        setLoading(false);
        message.error(error.response.data.message, 3);
      });
  };

  return (
    <ProfileLayout>
      <Wrapper>
        <h2>Edit Profile</h2>
        {!dataLoaded ? (
          <LoadingSpinner />
        ) : (
          <Form form={form} initialValues={userData} onFinish={onFinish}>
            <div className="top-section">
              <div className="profile-picture">
                <Item name="profilePicture">
                  <Avatar size={160} src={userData.profilePicture} />
                </Item>
              </div>
              <div className="personal-info">
                <div className="names">
                  <div>
                    <label>First name</label>
                    <Item name="firstName">
                      <Input size="large" />
                    </Item>
                  </div>
                  <div>
                    <label>Last name</label>
                    <Item name="lastName">
                      <Input size="large" />
                    </Item>
                  </div>
                </div>
                <div>
                  <label>Email address</label>
                  <Item name="email">
                    <Input size="large" />
                  </Item>
                </div>
                <div>
                  <label>Username</label>
                  <Item name="username">
                    <Input size="large" />
                  </Item>
                  <small>https://ampersand.careers/@preshonyee</small>
                </div>
              </div>
            </div>
            <div className="about-section">
              <div>
                <label>Location</label>
                <Item name="location">
                  <Input size="large" />
                </Item>
              </div>
              <div>
                <label>Personal site/Portfolio</label>
                <Item name="portfolio">
                  <Input size="large" addonBefore="https" />
                </Item>
              </div>
              <div>
                <label>Bio</label>
                <Item name="bio">
                  <TextArea rows={6} />
                </Item>
              </div>
              <div>
                <label>Interests</label>
                <Item name="interests">
                  <TextArea rows={4} />
                </Item>
              </div>
            </div>
            <div className="social-section">
              <div>
                <label>Twitter username</label>
                <Item name="twitter">
                  <Input size="large" addonBefore="@" />
                </Item>
              </div>
              <div>
                <label>Linkedin username</label>
                <Item name="linkedin">
                  <Input size="large" addonBefore="@" />
                </Item>
              </div>
              <div>
                <label>GitHub username</label>
                <Item name="github">
                  <Input size="large" addonBefore="@" />
                </Item>
              </div>
            </div>
            <Button
              block
              size="large"
              loading={loading}
              htmlType="submit"
              type="primary">
              Update account
            </Button>
          </Form>
        )}
      </Wrapper>
    </ProfileLayout>
  );
};

export default EditProfilePage;
