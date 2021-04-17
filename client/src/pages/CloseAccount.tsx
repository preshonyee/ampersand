import { Button, Input, Form } from "antd";
import { useState } from "react";
import styled from "styled-components";
import ProfileLayout from "../components/ProfileLayout";

const { Item } = Form;

const Wrapper = styled.div``;

const CloseAccount = () => {
  const [form] = Form.useForm();
  const [loading] = useState(false);

  return (
    <ProfileLayout>
      <Wrapper>
        <h2>Close account</h2>
        <Form form={form}>
          <div className="close">
            <Item name="currentPassword">
              <label>Current Password</label>
              <Input size="large" />
            </Item>
          </div>
          <Button loading={loading} size="large" type="primary">
            Delete account
          </Button>
        </Form>
      </Wrapper>
    </ProfileLayout>
  );
};

export default CloseAccount;
