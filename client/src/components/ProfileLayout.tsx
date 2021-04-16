import React from "react";
import styled from "styled-components";
import Layout from "../components/Layout";

interface IProfileLayout {
  children: React.ReactNode;
}

const Wrapper = styled.div`
  width: 70%;
  margin: 0 auto;
  padding: 5rem 0;
  display: flex;
`;

const Navigation = styled.div`
  width: 30%;
`;

const ContentPane = styled.div`
  width: 70%;
`;

const ProfileLayout: React.FC<IProfileLayout> = ({ children }) => {
  return (
    <Layout>
      <Wrapper>
        <Navigation>
          <h2>Account Settings</h2>
        </Navigation>
        <ContentPane>{children}</ContentPane>
      </Wrapper>
    </Layout>
  );
};

export default ProfileLayout;
