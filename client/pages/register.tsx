import { Button, Form, Input, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";

import { BASE_URL } from "../constants/BaseURL";

const { Item } = Form;

const Wrapper = styled.div`
  background-color: #000;
  background: linear-gradient(0deg, #00000088 100%, #ffffff44 100%),
    url("https://source.unsplash.com/collection/15791857/1920x1080");
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .content {
    display: flex;
    flex-direction: column;
    /* border: 1px solid red; */
    @media (min-width: 1200px) {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 70%;
      margin: 0 auto;
      /* border: 1px solid red; */
    }
  }

  .brand {
    display: none;
    @media (min-width: 1200px) {
      display: block;
      width: 40%;
    }

    margin-bottom: 2rem;

    img {
      width: 400px;
      height: 80px;
    }

    p {
      font-size: 1rem;
      color: #fff;
      margin-left: 0.5rem;
      width: 400px;
    }
  }
`;

const FormContainer = styled.div`
  width: 90%;
  height: 550px;
  margin: 1rem auto;
  background-color: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border-radius: 8px;
  backdrop-filter: blur(5px);
  border: 1px solid #dadce0;
  @media (min-width: 480px) {
    width: 80%;
  }
  @media (min-width: 640px) {
    width: 60%;
  }
  @media (min-width: 800px) {
    width: 40%;
  }
  @media (min-width: 1200px) {
    width: 40%;
    backdrop-filter: blur(5px);
    border: 1px solid #dadce0;
  }

  label {
    font-weight: 700;
    color: #333;
  }

  .heading {
    h1 {
      font-size: 1.75rem;
      font-weight: 700;
    }
  }
  .name {
    display: flex;
    justify-content: space-between;
  }

  .name > * {
    width: 49%;
  }
`;

const RegisterPage = () => {
  const router = useRouter();

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const registerUser = (values: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/auth/signup`, values)
      .then((response) => {
        setLoading(false);
        message.success(response.data.message, 3);
        router.push("/login");
      })
      .catch((error) => {
        message.error(error.response.data.error, 3);
        setLoading(false);
      });
  };

  return (
    <Wrapper>
      <div className="content">
        <div className="brand">
          <img src="/logo-wordmark-dark.svg" alt="Ampersand Logo" />
          <p>Elevate You on Your Job Hunt Journey</p>
        </div>
        <FormContainer>
          <div className="heading">
            <h1>Create an account</h1>
            <p>
              Already have an account?{" "}
              <Link href="/login">
                <a style={{ color: "#FF5A5F" }}>Sign in</a>
              </Link>
            </p>
          </div>
          <Form form={form} onFinish={registerUser}>
            <div className="name">
              <div>
                <label>First Name</label>
                <Item name="firstName">
                  <Input size="large" placeholder="First Name" />
                </Item>
              </div>

              <div>
                <label>Last Name</label>
                <Item name="lastName">
                  <Input size="large" placeholder="Last Name" />
                </Item>
              </div>
            </div>

            <div>
              <label>Username</label>
              <Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please enter a username",
                    pattern: /^[a-z0-9_-]{3,16}$/,
                  },
                ]}>
                <Input size="large" placeholder="Username" />
              </Item>
            </div>

            <div>
              <label>Email Address</label>
              <Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please enter a valid email address",
                    pattern:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  },
                ]}>
                <Input size="large" placeholder="Email" />
              </Item>
            </div>

            <div>
              <label>Password</label>
              <Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please enter your password",
                    min: 6,
                  },
                ]}>
                <Input.Password
                  size="large"
                  type="password"
                  placeholder="password"
                />
              </Item>
            </div>

            <Button
              block
              size="large"
              shape="round"
              loading={loading}
              type="primary"
              htmlType="submit">
              Create account
            </Button>
          </Form>
        </FormContainer>
      </div>
    </Wrapper>
  );
};

export default RegisterPage;
