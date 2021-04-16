import { Button, Input, Form } from "antd";
import styled from "styled-components";
import ProfileLayout from "../components/ProfileLayout";

const { Item } = Form;

const Wrapper = styled.div``;

const CloseAccount = () => {
  const [form] = Form.useForm();

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
          <Button size="large" type="primary">
            Delete account
          </Button>
        </Form>
      </Wrapper>
    </ProfileLayout>
  );
};

export default CloseAccount;
