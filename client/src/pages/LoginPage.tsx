import { Button, Form, Input, message } from "antd";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import Logo from "../images/logo-wordmark-dark.svg";

import { BASE_URL } from "../constants/BaseURL";
import { useDispatch } from "react-redux";
import { login } from "../redux/store/user";
import { Link, useHistory } from "react-router-dom";

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
  height: 400px;
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
    width: 35%;
    backdrop-filter: blur(5px);
    border: 1px solid #dadce0;
  }

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

const LoginPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const loginUser = (values: { email: string; password: string }) => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/auth/signin`, values)
      .then((response) => {
        const result = response.data;
        setLoading(false);
        dispatch(login({ payload: result }));
        message.success("Login successfully", 3);
        history.push("/app");
      })
      .then(() => {
        setTimeout(function () {
          window.location.reload();
        }, 1000);
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
          <img src={Logo} alt="Ampersand Logo" />
          <p>Empowering You on Your Job Hunt Journey</p>
        </div>
        <FormContainer>
          <div className="heading">
            <h1>Sign In</h1>
            <p>
              New user?{" "}
              <Link to="/register" style={{ color: "#FF5A5F" }}>
                Create an account
              </Link>
            </p>
          </div>
          <Form form={form} onFinish={loginUser}>
            <div>
              <label>Email Address</label>
              <Item
                name="email"
                rules={[
                  {
                    pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  },
                ]}>
                <Input size="large" placeholder="Email" />
              </Item>
            </div>

            <div>
              <label>Password</label>
              <Item name="password">
                <Input size="large" type="password" placeholder="password" />
              </Item>
            </div>

            <Button
              size="large"
              loading={loading}
              block
              type="primary"
              htmlType="submit">
              Login
            </Button>
          </Form>
        </FormContainer>
      </div>
    </Wrapper>
  );
};

export default LoginPage;
