import { Timeline } from "antd";

const { Item } = Timeline;

const Overview = () => {
  return (
    <div>
      <h1>Overview</h1>
      <Timeline>
        <Item>new application</Item>
        <Item>updated application</Item>
        <Item>created resume profile</Item>
        <Item>updated resume profile</Item>
        <Item>added to radar</Item>
      </Timeline>
    </div>
  );
};

export default Overview;

// new application
// updated application
// created resume profile
// updated resume profile
// added to radar
