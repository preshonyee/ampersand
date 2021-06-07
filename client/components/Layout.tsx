import Head from "next/head";
import { useEffect, useState } from "react";
import styled from "styled-components";
import NavMenu from "./NavMenu";
import SEO from "./SEO";

interface ILayout {
  children: React.ReactNode;
  background?: string;
}

const Wrapper = styled.div<ILayout>`
  background-color: ${(props) => props.background || "#f5f5f5"};
  min-height: 100vh;
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
  type WindowDimentions = {
    width: number | undefined;
    height: number | undefined;
  };

  const useWindowDimensions = (): WindowDimentions => {
    const [windowDimensions, setWindowDimensions] = useState<WindowDimentions>({
      width: undefined,
      height: undefined,
    });
    useEffect(() => {
      function handleResize(): void {
        setWindowDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      handleResize();
      window.addEventListener("resize", handleResize);
      return (): void => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount

    return windowDimensions;
  };

  return (
    <>
      {useWindowDimensions().width <= 768 ? (
        <div
          style={{
            width: "90%",
            margin: "1rem auto",
            padding: "1rem",
            borderRadius: "8px",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
            backgroundColor: "#fff",
            border: "1px solid #dadce0",
          }}>
          This site is optimized for desktop... Please visit ampersand.careers
          on a desktop to create your resume and track your applications!
        </div>
      ) : (
        <Wrapper background={background}>
          <SEO />
          <Head>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
              href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
              rel="stylesheet"
            />
          </Head>

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
      )}
    </>
  );
};

export default Layout;
