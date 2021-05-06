import { Alert, Button, Input, Form, message } from "antd";
import styled from "styled-components";
import ProfileLayout from "../components/ProfileLayout";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { BASE_URL } from "../constants/BaseURL";
import { TOKEN } from "../constants/Token";

const { Item } = Form;

const Wrapper = styled.div`
  h2 {
    margin-bottom: 2rem;
  }

  .close {
    margin: 1rem 0;
  }
`;

const CloseAccount = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values: string) => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/auth/delete-user`, values, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((response: AxiosResponse<any>) => {
        setLoading(false);
        message.success(response.data.message, 3);
        localStorage.clear();
        setTimeout(() => {
          history.push("/");
        }, 100);
      })
      .catch((error) => {
        setLoading(false);
        message.error(error.response.data.message, 3);
      });
  };

  return (
    <ProfileLayout>
      <Wrapper>
        <h2>Close account</h2>
        <Alert
          message="Warning"
          description="Closing your account is irreversible. It deletes all of your applications, resume, and stats..."
          type="warning"
          showIcon
        />
        <Form form={form} onFinish={onFinish}>
          <div className="close">
            <label>Current Password</label>
            <Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter your password",
                  min: 6,
                },
              ]}>
              <Input.Password size="large" />
            </Item>
          </div>
          <Button
            loading={loading}
            size="large"
            shape="round"
            htmlType="submit"
            type="primary">
            Delete account
          </Button>
        </Form>
      </Wrapper>
    </ProfileLayout>
  );
};

export default CloseAccount;
