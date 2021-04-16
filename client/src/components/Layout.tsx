import styled from "styled-components";
import NavMenu from "./NavMenu";

interface ILayout {
  children: React.ReactNode;
}

const Wrapper = styled.div`
  background-color: #fff;
  min-height: 100vh;
  main {
    margin: 3rem 0;
  }
  footer {
    text-align: center;
    padding: 1rem 0;
  }
  footer a {
    color: #ff5a5f;
  }
`;

const Layout: React.FC<ILayout> = ({ children }) => {
  return (
    <Wrapper>
      <NavMenu />
      <main>{children}</main>
      <footer>
        <p>
          &copy; 2021 Ampersand.careers, built with ❤ by{" "}
          <a
            href="https://preshonyee.com"
            target="_blank"
            rel="noopener noreferrer">
            Presh Onyee
          </a>
        </p>
      </footer>
    </Wrapper>
  );
};

export default Layout;
