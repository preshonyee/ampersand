import { Button, Input, Form, message } from "antd";
import { useState } from "react";
import styled from "styled-components";
import ProfileLayout from "../components/ProfileLayout";
import { BASE_URL } from "../constants/BaseURL";
import axios, { AxiosResponse } from "axios";
import { TOKEN } from "../constants/Token";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/store/user";

interface IPasswordUpdate {
  currentPassword: string;
  newPassword: string;
  passwordConfirmation: string;
}

const { Item } = Form;

const Wrapper = styled.div`
  h2 {
    margin-bottom: 1rem;
  }
`;

const PasswordPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values: IPasswordUpdate) => {
    console.log(values);
    setLoading(true);
    axios
      .put(`${BASE_URL}/auth/update-password`, values, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((response: AxiosResponse<any>) => {
        message.success(response.data.message);
        setLoading(false);
        form.resetFields();
        dispatch(logout({ history }));
      })
      .catch((error) => {
        message.error(error.response.data.message);
        setLoading(false);
      });
  };

  return (
    <ProfileLayout>
      <Wrapper>
        <h2>Change Password</h2>
        <Form form={form} onFinish={onFinish}>
          <div className="password">
            <div>
              <label>Current Password</label>
              <Item
                name="currentPassword"
                rules={[
                  {
                    required: true,
                    message: "Please enter current password",
                    min: 6,
                  },
                ]}>
                <Input.Password size="large" type="password" />
              </Item>
            </div>
            <div>
              <label>New Password</label>
              <Item
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message: "Please enter new password",
                    min: 6,
                  },
                ]}>
                <Input.Password size="large" type="password" />
              </Item>
            </div>
            <div>
              <label>Password Confirmation</label>
              <Item
                name="passwordConfirmation"
                rules={[
                  {
                    required: true,
                    message: "Please enter new password again",
                    min: 6,
                  },
                ]}>
                <Input.Password size="large" type="password" />
              </Item>
            </div>
          </div>
          <Button
            block
            loading={loading}
            size="large"
            htmlType="submit"
            type="primary">
            Change Password
          </Button>
        </Form>
      </Wrapper>
    </ProfileLayout>
  );
};

export default PasswordPage;
