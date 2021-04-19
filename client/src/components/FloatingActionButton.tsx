import { Button } from "antd";
import { Download, Edit, MoreHorizontal, Trash } from "react-feather";
import styled from "styled-components";

const Wrapper = styled.div`
  .fab-container {
    position: fixed;
    bottom: 50px;
    right: 50px;
    z-index: 999;
    cursor: pointer;
  }

  .fab-icon-holder {
    margin: 1rem 0;
    border-radius: 100%;

    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }

  .fab-icon-holder:hover {
    opacity: 0.8;
  }

  .fab-icon-holder svg {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 100%;
    font-size: 25px;
    color: #ffffff;
    margin: 0 auto;
  }

  .fab {
    width: 60px;
    height: 60px;
    background: #ff5a5f;
  }

  .fab-options {
    list-style-type: none;
    margin: 0;

    position: absolute;
    bottom: 70px;
    right: 0;

    opacity: 0;

    transition: all 0.3s ease;
    transform: scale(0);
    transform-origin: 85% bottom;
  }

  .fab:hover + .fab-options,
  .fab-options:hover {
    opacity: 1;
    transform: scale(1);
  }

  .fab-options li {
    display: flex;
    justify-content: flex-end;
    padding: 5px;
  }

  .fab-label {
    padding: 2px 5px;
    align-self: center;
    user-select: none;
    white-space: nowrap;
    border-radius: 3px;
    font-size: 16px;
    background: #666666;
    color: #ffffff;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    margin-right: 10px;
  }
`;

const FAB: React.FC = (props: any) => {
  return (
    <Wrapper>
      <div className="fab-container">
        <div className="fab fab-icon-holder">
          <MoreHorizontal />
        </div>
        <ul className="fab-options">
          <li>
            <span className="fab-label">Edit Resume</span>
            <div className="fab-icon-holder">
              <Button shape="circle" size="large" onClick={props.editAction}>
                <Edit color="#ff5a5f" />
              </Button>
            </div>
          </li>
          <li>
            <span className="fab-label">Download Resume</span>
            <div className="fab-icon-holder">
              <Download color="#ff5a5f" />
            </div>
          </li>
          <li>
            <span className="fab-label">Delete Resume</span>
            <div className="fab-icon-holder">
              <Trash color="#ff5a5f" />
            </div>
          </li>
        </ul>
      </div>
    </Wrapper>
  );
};

export default FAB;
