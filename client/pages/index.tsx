import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import styled from "styled-components";
import Layout from "../components/Layout";
import { BASE_URL } from "../constants/BaseURL";
import { login } from "../redux/store/user";
import { Button, message } from "antd";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
  text-align: center;

  h1 {
    font-size: 2rem;
  }

  p {
    font-size: 1rem;
  }

  img {
    width: 100%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    margin: 0.5rem auto;
  }

  .cta {
    margin: 1rem 0;
  }
  .cta button {
    border: 1px solid #ff5a5f;
    &:hover {
      border-color: #fa474d;
    }
  }
  .cta > a {
    margin: 4px;
    padding: 0.75rem 1.5rem;
    border-radius: 2rem;
    min-width: 300px;
    font-size: 1rem;
    font-weight: 500;
    background-color: #ff5a5f;
    color: #fff;
    &:hover {
      background-color: #fa474d;
    }
  }

  @media (min-width: 640px) {
    width: 60%;
    margin: 0 auto;
  }

  @media (min-width: 1200px) {
    h1 {
      font-size: 4rem;
    }

    p {
      font-size: 1.25rem;
    }

    .cta {
      margin: 2rem 0;
    }

    img {
      display: block;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
      margin: 0.5rem auto;
    }
  }
`;

const LandingPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.user);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      router.push("/app/resume");
    } else {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loginUser = (values: { email: string; password: string }) => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/auth/signin`, values)
      .then((response) => {
        const result = response.data;
        setLoading(false);
        dispatch(login({ payload: result }));
        message.success("Login successfully", 3);
        router.push("/app/resume");
      })
      .then(() => {
        setTimeout(function () {
          window.location.reload();
        }, 10);
      })
      .catch((error) => {
        message.error(error.response.data.error, 3);
        setLoading(false);
      });
  };

  return (
    <Layout background="#FFECEC">
      <Wrapper>
        <h1>Elevate your job hunt</h1>
        <p>
          The simplest way to create a solid resume and keep track of all your
          job applications
        </p>
        <div className="cta">
          <Link href="/register">Get started</Link>
          <Button
            loading={loading}
            shape="round"
            size="large"
            onClick={() =>
              loginUser({
                email: process.env.NEXT_PUBLIC_LIVE_DEMO_EMAIL,
                password: process.env.NEXT_PUBLIC_LIVE_DEMO_PASSWORD,
              })
            }>
            Live demo
          </Button>
        </div>
        <img src="sample-resume.jpg" />
      </Wrapper>
    </Layout>
  );
};

export default LandingPage;
