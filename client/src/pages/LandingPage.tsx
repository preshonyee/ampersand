import { Button } from "antd";
import styled from "styled-components";
import Layout from "../components/Layout";
import HomeImage from "../images/screenshot-1.png";
import TrackerImage from "../images/screenshot-2.png";
import ResumeImage from "../images/screenshot-3.png";

const Wrapper = styled.div`
  text-align: center;

  button {
    margin: 1rem 0;
  }

  h1 {
    font-size: 2rem;
  }
  img {
    width: 100%;
    display: block;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    margin: 0.5rem auto;
  }

  section:first-child {
    background-color: #ffecec;
  }

  section {
    margin: -2.2rem auto;
    padding: 5rem 3rem;
  }

  small {
    color: #ff5a5f;
    font-size: 14px;
  }

  @media (min-width: 640px) {
    p,
    h1,
    h2,
    small {
      width: 70%;
      margin: 0 auto;
    }
    h1 {
      font-size: 2rem;
    }
    p {
      font-size: 1rem;
    }
    h2 {
      font-size: 1.5rem;
    }
    img {
      width: 70%;
    }
  }

  @media (min-width: 1200px) {
    p,
    h1,
    h2,
    small {
      width: 60%;
      margin: 0 auto;
    }
    h1 {
      font-size: 3rem;
    }
    p {
      font-size: 1.25rem;
      margin-top: 1rem;
    }
    h2 {
      font-size: 2rem;
    }
    small {
      font-size: 1rem;
    }
    img {
      width: 55%;
    }
  }
`;

const LandingPage = () => {
  return (
    <Layout background="#fff">
      <Wrapper>
        <section>
          <h1>Empowering Your Job Search</h1>
          <p>
            Ampersand helps you on your job hunt journey, from always up-to-date
            resume profiles, to granular job tracking, to interview scheduling
            and powerful analytics, Ampersand empowers you with the right tools
            you need to be on top of 'looking for that next opportunity'.
          </p>
          <Button type="primary" shape="round">
            Get started
          </Button>
          <img src={HomeImage} alt="screenshot of app homepage" />
        </section>

        <section>
          <small>Granular Tracking</small>
          <h2>Bring more insights to your applications</h2>
          <p>
            Stay on top of your job applications. Keep track of every
            application down to the finest detail
          </p>
          <Button type="primary" shape="round">
            Track your application
          </Button>
          <img src={TrackerImage} alt="screenshot of app tracker page" />
        </section>

        <section>
          <small>Resume Profile</small>
          <h2>A resume that elevates your applications</h2>
          <p>
            Your application deserves an up-to-date, well put together resume.
            Customize your resume with your experiences, projects skills,
            awards, and more.
          </p>
          <Button type="primary" shape="round">
            Create your resume profile
          </Button>
          <img src={ResumeImage} alt="screenshot of app resume page" />
        </section>
      </Wrapper>
    </Layout>
  );
};

export default LandingPage;
