import styled from "styled-components";
import NavMenu from "./NavMenu";

interface ILayout {
  children: React.ReactNode;
}

const Wrapper = styled.div`
  main {
    margin: 3rem 0;
  }
`;

const Layout: React.FC<ILayout> = ({ children }) => {
  return (
    <Wrapper>
      <NavMenu />
      <main>{children}</main>
      <footer></footer>
    </Wrapper>
  );
};

export default Layout;
