import styled from "styled-components";
import { Button, Avatar } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import UserCard from "./UserCard";

const Radar = styled.div`
  width: 100%;
  height: 400px;
  background-color: #fff;
  border-radius: 1rem;
  padding: 1rem;
  .title {
    display: flex;
    justify-content: space-between;
  }
  .list-item {
    display: flex;
    margin: 1.5rem 0;
  }
  .company {
    margin: 0 0.5rem;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-content: space-between;

  @media (min-width: 800px) {
    width: 40%;
  }

  @media (min-width: 1200px) {
    width: 40%;
  }
`;

const Aside = () => {
  return (
    <Wrapper>
      <UserCard />
      <Radar>
        <div className="title">
          <h2>On Your Radar</h2>
          <Button shape="round" icon={<PlusOutlined />}>
            Add company
          </Button>
        </div>
        <div className="list-item">
          <Avatar size={48} />
          <div className="company">
            <h3>Company Name</h3>
            <a href="https://">See openings</a>
          </div>
        </div>
        <div className="list-item">
          <Avatar size={48} />
          <div className="company">
            <h3>Company Name</h3>
            <a href="https://">See openings</a>
          </div>
        </div>
        <div className="list-item">
          <Avatar size={48} />
          <div className="company">
            <h3>Company Name</h3>
            <a href="https://">See openings</a>
          </div>
        </div>
        <div className="list-item">
          <Avatar size={48} />
          <div className="company">
            <h3>Company Name</h3>
            <a href="https://">See openings</a>
          </div>
        </div>
      </Radar>
    </Wrapper>
  );
};

export default Aside;
