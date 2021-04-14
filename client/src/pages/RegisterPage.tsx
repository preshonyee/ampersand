import { Button, Form, Input, message } from "antd";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import React, { useState } from "react";
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
    justify-content: space-between;
    align-items: center;
    width: 60%;
    margin: 0 auto;
    /* border: 1px solid red; */
  }

  .brand {
    margin-bottom: 2rem;

    span {
      display: flex;
      img {
        width: 80px;
        height: 80px;
      }
    }
    h1 {
      font-size: 5rem;
      font-weight: bold;
      font-family: "Cedarville Cursive", cursive;
      color: #fff;
      line-height: 1.2;
    }
    h4 {
      font-size: 1.5rem;
      color: #fff;
      a {
        color: #ff5a5f;
        background-color: #fff;
        padding: 0.25rem 0.5rem;
        font-weight: bold;
      }
    }
  }
`;

const FormContainer = styled.div`
  width: 400px;
  padding: 3rem;
  background-color: rgba(255, 255, 255, 1);
  backdrop-filter: blur(5px);
  border: 1px solid #dadce0;
  border-radius: 8px;

  label {
    font-weight: 700;
    color: #333;
  }

  .heading {
    h1 {
      font-size: 2rem;
      font-weight: 700;
    }
  }
`;

const RegisterPage = () => {
  const history = useHistory();

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
        history.push("/login");
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
          <span>
            <img
              src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/facebook/230/bookmark_1f516.png"
              alt="bookmark emoji"
            />
            <h1>Erstwhile</h1>
          </span>
          <h4>
            Personalized Job Application Tracker, Built By{" "}
            <a
              href="https://twitter.com/preshonyee"
              target="_blank"
              rel="noopener noreferrer">
              Presh Onyee
            </a>
          </h4>
        </div>
        <FormContainer>
          <div className="heading">
            <h1>Create an account</h1>
            <p>
              Already have an account?{" "}
              <Link to="/login" style={{ color: "#FF5A5F" }}>
                Sign in
              </Link>
            </p>
          </div>
          <Form form={form} onFinish={registerUser}>
            <div>
              <label>First Name</label>
              <Item name="firstName">
                <Input placeholder="First Name" />
              </Item>
            </div>

            <div>
              <label>Last Name</label>
              <Item name="lastName">
                <Input placeholder="Last Name" />
              </Item>
            </div>

            <div>
              <label>Email Address</label>
              <Item name="email">
                <Input placeholder="Email" />
              </Item>
            </div>

            <div>
              <label>Password</label>
              <Item name="password">
                <Input type="password" placeholder="password" />
              </Item>
            </div>

            <Button loading={loading} block type="primary" htmlType="submit">
              Create account
            </Button>
          </Form>
        </FormContainer>
      </div>
    </Wrapper>
  );
};

export default RegisterPage;
