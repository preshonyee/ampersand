import { Avatar, Button, Col, Row, Space, Statistic } from "antd";
import {
  Compass,
  Folder,
  GitHub,
  Linkedin,
  Mail,
  Twitter,
} from "react-feather";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  width: 350px;
  margin: 0 1rem 2rem 1rem;
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

const UserCard: React.FC<IUserCard> = () => {
  const history = useHistory();
  const { user } = useSelector((state: any) => state.user);

  console.log({ user });

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
      <Button shape="round" block onClick={() => history.push("/app/editor")}>
        Go to profile
      </Button>
    </Wrapper>
  );
};

export default UserCard;
