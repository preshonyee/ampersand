import { Button, Input, Form } from "antd";
import { useState } from "react";
import styled from "styled-components";
import ProfileLayout from "../components/ProfileLayout";

const { Item } = Form;

const Wrapper = styled.div``;

const PasswordPage = () => {
  const [form] = Form.useForm();
  const [loading] = useState(false);

  return (
    <ProfileLayout>
      <Wrapper>
        <h2>Change Password</h2>
        <Form form={form}>
          <div className="password">
            <Item name="currentPassword">
              <label>Current Password</label>
              <Input size="large" />
            </Item>
            <Item name="newPassword">
              <label>New Password</label>
              <Input size="large" />
            </Item>
            <Item name="passwordConfirmation">
              <label>Password Confirmation</label>
              <Input size="large" />
            </Item>
          </div>
          <Button loading={loading} size="large" block type="primary">
            Change Password
          </Button>
        </Form>
      </Wrapper>
    </ProfileLayout>
  );
};

export default PasswordPage;
