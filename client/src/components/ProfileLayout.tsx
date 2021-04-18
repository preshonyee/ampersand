import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Layout from "../components/Layout";

interface IProfileLayout {
  children: React.ReactNode;
}

const Wrapper = styled.div`
  width: 60%;
  margin: 0 auto;
  display: flex;
`;

const Navigation = styled.div`
  width: 30%;

  .account-nav-links {
    margin: 2rem 0;
  }
`;

const ContentPane = styled.div`
  width: 70%;
`;

const ProfileLayout: React.FC<IProfileLayout> = ({ children }) => {
  return (
    <Layout background="#fff">
      <Wrapper>
        <Navigation>
          <h2>Account Settings</h2>
          <div className="account-nav-links">
            <p>
              <Link to="/account">Edit profile</Link>
            </p>
            <p>
              <Link to="/account/password">Change password</Link>
            </p>
            <p>
              <Link to="/account/close">Close account</Link>
            </p>
          </div>
        </Navigation>
        <ContentPane>{children}</ContentPane>
      </Wrapper>
    </Layout>
  );
};

export default ProfileLayout;
