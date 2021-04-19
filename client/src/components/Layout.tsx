import styled from "styled-components";
import NavMenu from "./NavMenu";

interface ILayout {
  children: React.ReactNode;
  background?: string;
}

const Wrapper = styled.div<ILayout>`
  min-height: 100vh;
  background-color: ${(props) => props.background || "#f5f5f5"};
  main {
    padding: 5rem 0;
  }
  footer {
    text-align: center;
    padding: 1rem 0;
  }
  footer a {
    color: #ff5a5f;
  }
`;

const Layout: React.FC<ILayout> = ({ children, background }) => {
  return (
    <Wrapper background={background}>
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
