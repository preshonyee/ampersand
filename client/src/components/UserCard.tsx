import { Avatar, Button, Col, Row, Skeleton, Space, Statistic } from "antd";
import {
  Compass,
  Folder,
  GitHub,
  Linkedin,
  Mail,
  Twitter,
} from "react-feather";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { BASE_URL } from "../constants/BaseURL";
import axios, { AxiosResponse } from "axios";
import { TOKEN } from "../constants/Token";

const Wrapper = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
  padding: 1rem;
  border-radius: 1rem;

  .profile {
    display: flex;
    align-items: flex-start;
  }

  .bio {
    margin-left: 1rem;
  }

  h2 {
    text-transform: capitalize;
  }
  .stats {
    margin: 1.5rem 0;
  }
`;

interface IUserCard {
  isEmpty?: boolean;
}

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

const UserCard: React.FC<IUserCard> = () => {
  const history = useHistory();
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
  const [dataLoaded, setDataLoaded] = useState(true);

  const getUserData = () => {
    axios
      .get(`${BASE_URL}/user`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((response: AxiosResponse<any>) => {
        setUserData(response.data.data);
        setDataLoaded(false);
      });
  };

  useEffect(() => {
    getUserData();
  }, []);

  const { user, coverLetter, applications, radar } = userData;

  return (
    <Wrapper>
      <div className="profile">
        <Skeleton loading={dataLoaded} active avatar={{ size: 80 }}>
          <Avatar size={80} src={user.profilePicture} />
          <div className="bio">
            <h2>
              {user.firstName} {user.lastName}
            </h2>
            <p>{user.email}</p>
            {/* Add social icons here */}
            <Space size="middle">
              <Link to={user.github}>
                <GitHub size={16} />
              </Link>
              <Link to={user.linkedin}>
                <Linkedin size={16} />
              </Link>
              <Link to={user.twitter}>
                <Twitter size={16} />
              </Link>
              <Link to={user.email}>
                <Mail size={16} />
              </Link>
              <p></p>
            </Space>
          </div>
        </Skeleton>
      </div>
      <div className="stats">
        <Row gutter={[8, 16]}>
          <Col span={8}>
            <Skeleton loading={dataLoaded} active paragraph={{ rows: 0 }}>
              <Statistic
                title="Applications"
                value={applications}
                prefix={<Folder color="#bbb" size={16} />}
              />
            </Skeleton>
          </Col>
          <Col span={8}>
            <Skeleton loading={dataLoaded} active paragraph={{ rows: 0 }}>
              <Statistic
                title="Cover Letters"
                value={coverLetter}
                prefix={<Mail color="#bbb" size={16} />}
              />
            </Skeleton>
          </Col>
          <Col span={8}>
            <Skeleton loading={dataLoaded} active paragraph={{ rows: 0 }}>
              <Statistic
                title="Your Radar"
                value={radar}
                prefix={<Compass color="#bbb" size={16} />}
              />
            </Skeleton>
          </Col>
        </Row>
      </div>
      <Skeleton
        loading={dataLoaded}
        active
        paragraph={{ rows: 1, width: "100%" }}
        title={false}>
        <Button
          size="large"
          shape="round"
          block
          onClick={() => history.push("/app/editor")}>
          Go to profile
        </Button>
      </Skeleton>
    </Wrapper>
  );
};

export default UserCard;
