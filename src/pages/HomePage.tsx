import NavMenu from "../components/NavMenu";
import styled from "styled-components";
import Overview from "../components/Overview";
import Aside from "../components/Aside";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const HomePage = () => {
  return (
    <div>
      <NavMenu />
      <Wrapper>
        <Overview />
        <Aside />
      </Wrapper>
    </div>
  );
};

export default HomePage;
