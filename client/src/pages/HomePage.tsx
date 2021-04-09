import styled from "styled-components";
import Overview from "../components/Overview";
import Aside from "../components/Aside";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const HomePage = () => {
  return (
    <Wrapper>
      <Overview />
      <Aside />
    </Wrapper>
  );
};

export default HomePage;
