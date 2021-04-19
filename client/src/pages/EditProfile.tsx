import { Avatar, Button, Input, Form, message, Skeleton } from "antd";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import LoadingSpinner from "../components/LoadingSpinner";
import ProfileLayout from "../components/ProfileLayout";
import { BASE_URL } from "../constants/BaseURL";
import { TOKEN } from "../constants/Token";
import { updateProfilePicture } from "../redux/store/user";

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
    margin: 2rem 0;
  }

  .profile-picture {
    width: 30%;
    margin: 0 auto;
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
  const { user } = useSelector((state: any) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [profilePictureLoading, setProfilePictureLoading] = useState(false);
  const [profilePictureURL, setProfilePictureURL] = useState("");
  const [profilePicture, setProfilePicture] = useState(undefined || "");
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
        setProfilePictureLoading(false);
      });
  };

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFinish = (values: IUserData) => {
    setLoading(true);
    axios
      .put(
        `${BASE_URL}/auth/update-details`,
        { ...values, profilePicture: profilePictureURL },
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      )
      .then((response: AxiosResponse<any>) => {
        setLoading(false);
        message.success(response.data.message, 3);
        history.push("/account");
      })
      .catch((error) => {
        setLoading(false);
        message.error(error.response.data.message, 3);
      });
  };

  useEffect(() => {
    if (profilePicture) {
      setProfilePictureLoading(true);
      const data = new FormData();
      data.append("file", profilePicture);
      data.append("upload_preset", "beaniegram");
      data.append("cloud_name", "beaniegram");
      axios
        .post("https://api.cloudinary.com/v1_1/beaniegram/image/upload", data)
        .then((response) => {
          const URL = response.data.secure_url;
          console.log({ URL });

          axios
            .put(
              `${BASE_URL}/user/picture`,
              { profilePicture: URL },
              { headers: { Authorization: `Bearer ${TOKEN}` } }
            )
            .then((response) => {
              const result = response.data.result.profilePicture;
              setProfilePictureLoading(false);
              dispatch(updateProfilePicture({ payload: result }));
              setProfilePictureURL(result);
            })
            .catch((error) => {
              console.log(error);
              setProfilePictureLoading(false);
            });
        })
        .catch((error) => {
          console.log(error);
          setProfilePictureLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profilePicture]);

  const updateProfilePictureHandler = (file: any) => {
    setProfilePicture(file);
  };

  console.log(profilePicture);

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
                <p>Update profile picture</p>
                <Skeleton
                  active
                  loading={profilePictureLoading}
                  avatar={{ size: 160 }}
                  title={false}
                  paragraph={false}>
                  <Item name="profilePicture">
                    <Avatar size={160} src={user.profilePicture} />
                  </Item>
                </Skeleton>
                <input
                  type="file"
                  onChange={(e: any) =>
                    updateProfilePictureHandler(e.target.files[0])
                  }
                />
              </div>
              <div className="personal-info">
                <div className="names">
                  <div>
                    <label>First name</label>
                    <Item
                      name="firstName"
                      rules={[
                        { required: true, message: "Please enter first name" },
                      ]}>
                      <Input size="large" />
                    </Item>
                  </div>
                  <div>
                    <label>Last name</label>
                    <Item
                      name="lastName"
                      rules={[
                        { required: true, message: "Please enter last name" },
                      ]}>
                      <Input size="large" />
                    </Item>
                  </div>
                </div>
                <div>
                  <label>Email address</label>
                  <Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please enter a valid email",
                        pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      },
                    ]}>
                    <Input size="large" />
                  </Item>
                </div>
                <div>
                  <label>Username</label>
                  <Item
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please enter username",
                        pattern: /^[a-z0-9_-]{3,16}$/,
                      },
                    ]}>
                    <Input size="large" />
                  </Item>
                  {/* <small>https://ampersand.careers/@preshonyee</small> */}
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
              shape="round"
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
