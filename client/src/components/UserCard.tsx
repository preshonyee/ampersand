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
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { BASE_URL } from "../constants/BaseURL";
import axios, { AxiosResponse } from "axios";

const Wrapper = styled.div`
  width: 100%;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
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
  const [dataLoaded, setDataLoaded] = useState(false);

  const getUserData = () => {
    axios.get(`${BASE_URL}/user`).then((response: AxiosResponse<any>) => {
      setUserData(response.data.user);
      setDataLoaded(true);
    });
  };

  useEffect(() => {
    getUserData();
  }, []);

  const { user, coverLetter, applications, radar } = userData;

  return (
    <Wrapper>
      <div className="profile">
        <Avatar size={80} src={user.profilePicture} />
        <div className="bio">
          <h2>
            {user.firstName} {user.lastName}
          </h2>
          <p>{user.email}</p>
          {/* Add social icons here */}
          <Space size="middle">
            <GitHub size={16} />
            <Linkedin size={16} />
            <Twitter size={16} />
            <Mail size={16} />
            <p></p>
          </Space>
        </div>
      </div>
      <div className="stats">
        <Row gutter={[8, 16]}>
          <Col span={8}>
            <Statistic
              title="Applications"
              value={112}
              prefix={<Folder color="#bbb" size={16} />}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="Cover Letters"
              value={18}
              prefix={<Mail color="#bbb" size={16} />}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="Your Radar"
              value={42}
              prefix={<Compass color="#bbb" size={16} />}
            />
          </Col>
        </Row>
      </div>
      <Button
        size="large"
        shape="round"
        block
        onClick={() => history.push("/app/editor")}>
        Go to profile
      </Button>
    </Wrapper>
  );
};

export default UserCard;
