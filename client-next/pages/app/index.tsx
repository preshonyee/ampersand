import styled from "styled-components";
import Overview from "../../components/Overview";
import Aside from "../../components/Aside";
import Layout from "../../components/Layout";

const Wrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;

  @media (min-width: 640px) {
    width: 60%;
  }

  @media (min-width: 800px) {
    width: 90%;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    margin: 0 auto;
  }

  @media (min-width: 1200px) {
    width: 70%;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    margin: 0 auto;
  }

  @media (min-width: 1600px) {
    width: 50%;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    margin: 0 auto;
  }
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
