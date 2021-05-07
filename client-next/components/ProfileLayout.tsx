import React from "react";
import Link from "next/link";
import styled from "styled-components";
import Layout from "../components/Layout";

interface IProfileLayout {
  children: React.ReactNode;
}

const Wrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  @media (min-width: 800px) {
    width: 90%;
    flex-direction: row;
  }
  @media (min-width: 1200px) {
    width: 80%;
    flex-direction: row;
  }
`;

const Navigation = styled.div`
  width: 100%;
  border-bottom: 2px solid #dadce0;

  .account-nav-links {
    margin: 0.5rem 0;
  }

  @media (min-width: 800px) {
    width: 30%;
    border-bottom: none;
  }

  @media (min-width: 1200px) {
    width: 30%;
    border-bottom: none;

    .account-nav-links {
      margin: 2rem 0;
    }
  }
`;

const ContentPane = styled.div`
  width: 100%;
  margin-top: 2rem;
  @media (min-width: 800px) {
    width: 70%;
    margin-top: 0;
  }
  @media (min-width: 1200px) {
    width: 70%;
  }
`;

const ProfileLayout: React.FC<IProfileLayout> = ({ children }) => {
  return (
    <Layout background="#fff">
      <Wrapper>
        <Navigation>
          <h2>Account Settings</h2>
          <div className="account-nav-links">
            <p>
              <Link href="/account">Edit profile</Link>
            </p>
            <p>
              <Link href="/account/password">Change password</Link>
            </p>
            <p>
              <Link href="/account/close">Close account</Link>
            </p>
          </div>
        </Navigation>
        <ContentPane>{children}</ContentPane>
      </Wrapper>
    </Layout>
  );
};

export default ProfileLayout;
