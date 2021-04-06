import styled from "styled-components";
import { Tooltip, Button, Avatar } from "antd";
import React from "react";
import { PlusOutlined } from "@ant-design/icons";

const Radar = styled.div`
  width: 300px;
  height: 400px;
  border: 5px solid #edf2f9;
  background-color: #fff;
  border-radius: 1rem;
  padding: 1rem;
  margin: 0.5rem;
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
  display: flex;
  flex-direction: column;
  align-content: space-between;
`;

const Aside = () => {
  return (
    <Wrapper>
      <Radar>
        <div className="title">
          <h2>On Your Radar</h2>
          <Tooltip title="Add a company">
            <Button shape="circle" icon={<PlusOutlined />} />
          </Tooltip>
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
