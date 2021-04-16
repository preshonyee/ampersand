import { Spin } from "antd";

const LoadingSpinner = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <Spin tip="Loading..." />
    </div>
  );
};

export default LoadingSpinner;
