import styled from "styled-components";
import Overview from "../components/Overview";
import Aside from "../components/Aside";
import Layout from "../components/Layout";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const HomePage = () => {
  return (
    <Layout>
      <Wrapper>
        <Overview />
        <Aside />
      </Wrapper>
    </Layout>
  );
};

export default HomePage;
