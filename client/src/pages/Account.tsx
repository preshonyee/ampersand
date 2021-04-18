import { useEffect, useState } from "react";
import styled from "styled-components";
import { Avatar, Button, Col, Row, Statistic, Space } from "antd";
import {
  GitHub,
  Twitter,
  Linkedin,
  Mail,
  Folder,
  Compass,
  MapPin,
  Globe,
} from "react-feather";
import { useHistory } from "react-router-dom";
import Layout from "../components/Layout";
import { BASE_URL } from "../constants/BaseURL";
import axios, { AxiosResponse } from "axios";
import { TOKEN } from "../constants/Token";
import LoadingSpinner from "../components/LoadingSpinner";

interface IUserData {
  user: {
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
  };
  coverLetter: number;
  applications: number;
  radar: number;
}

const Wrapper = styled.div`
  width: 50%;
  margin: 0 auto;

  .profile {
    display: flex;
    align-items: flex-start;
  }

  .bio {
    margin-left: 3rem;
  }

  .title {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .title button {
    margin-left: 1rem;
  }

  h1 {
    text-transform: capitalize;
    font-size: 3rem;
  }

  .username {
    margin: 1rem 0;
  }

  .stats {
    margin: 1.5rem 0;
  }

  .ant-statistic-content {
    display: flex;
  }

  .mail svg,
  .globe svg,
  .map svg {
    margin: 0 0.5rem 0 0;
    vertical-align: middle;
  }
`;

const AccountPage = () => {
  const history = useHistory();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [userData, setUserData] = useState<IUserData>({
    user: {
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
    },
    coverLetter: 0,
    applications: 0,
    radar: 0,
  });

  const getUserData = () => {
    axios
      .get(`${BASE_URL}/user`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((response: AxiosResponse<any>) => {
        setUserData(response.data.data);
        setDataLoaded(true);
      });
  };

  useEffect(() => {
    getUserData();
  }, []);

  const {
    profilePicture,
    location,
    portfolio,
    bio,
    interests,
    twitter,
    linkedin,
    github,
    firstName,
    lastName,
    email,
    username,
  } = userData.user;
  const { coverLetter, applications, radar } = userData;

  return (
    <Layout background="#fff">
      <Wrapper>
        {!dataLoaded ? (
          <LoadingSpinner />
        ) : (
          <div className="profile">
            <Avatar size={140} src={profilePicture} />
            <div className="bio">
              <span className="title">
                <h1>
                  {firstName}
                  {lastName}
                </h1>
                <Button onClick={() => history.push("/account")} shape="round">
                  Edit profile
                </Button>
              </span>
              {/* Add social icons here */}
              <Space size="middle">
                <a
                  href={`https://github.com/${github}`}
                  target="_blank"
                  rel="noreferrer noopener">
                  <GitHub size={16} />
                </a>
                <a
                  href={`https://linkedin.com/in/${linkedin}`}
                  target="_blank"
                  rel="noreferrer noopener">
                  <Linkedin size={16} />
                </a>
                <a
                  href={`https://twitter.com/${twitter}`}
                  target="_blank"
                  rel="noreferrer noopener">
                  <Twitter size={16} />
                </a>
                <p></p>
              </Space>
              <p className="username">ampersand.careers/@{username}</p>
              <p className="mail">
                <Mail size={16} color="#bbb" />
                {email}
              </p>
              <p className="globe">
                <Globe size={16} color="#bbb" />
                <a href={portfolio}>{portfolio}</a>
              </p>
              <p className="map">
                <MapPin size={16} color="#bbb" />
                {location}
              </p>
              <div>
                <h4>Bio</h4>
                <p>{bio}</p>
              </div>
              <div>
                <h4>Interests</h4>
                <p>{interests}</p>
              </div>
              <div className="stats">
                <Row gutter={[8, 16]}>
                  <Col span={8}>
                    <Statistic
                      title="Applications"
                      value={applications}
                      prefix={<Folder color="#bbb" size={16} />}
                    />
                  </Col>
                  <Col span={8}>
                    <Statistic
                      title="Cover Letters"
                      value={coverLetter}
                      prefix={<Mail color="#bbb" size={16} />}
                    />
                  </Col>
                  <Col span={8}>
                    <Statistic
                      title="Your Radar"
                      value={radar}
                      prefix={<Compass color="#bbb" size={16} />}
                    />
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        )}
      </Wrapper>
    </Layout>
  );
};

export default AccountPage;
