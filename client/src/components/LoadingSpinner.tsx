import { Spin } from "antd";
import styled from "styled-components";

const Wrapper = styled.div`
  text-align: center;
  padding: 5rem 0;
`;

const LoadingSpinner = () => {
  return (
    <Wrapper>
      <Spin tip="Loading..." />
    </Wrapper>
  );
};

export default LoadingSpinner;
