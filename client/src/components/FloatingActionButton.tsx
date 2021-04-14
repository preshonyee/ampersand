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
    width: 50px;
    height: 50px;
    border-radius: 100%;
    background: #016fb9;

    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }

  .fab-icon-holder:hover {
    opacity: 0.8;
  }

  .fab-icon-holder i {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 100%;
    font-size: 25px;
    color: #ffffff;
  }

  .fab {
    width: 60px;
    height: 60px;
    background: #d23f31;
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

const FAB = () => {
  return (
    <Wrapper>
      <div className="fab-container">
        <div className="fab fab-icon-holder">
          <i className="fas fa-question"></i>
        </div>
        <ul className="fab-options">
          <li>
            <span className="fab-label">Documentation</span>
            <div className="fab-icon-holder">
              <i className="fas fa-file-alt"></i>
            </div>
          </li>
          <li>
            <span className="fab-label">Video Tutorials</span>
            <div className="fab-icon-holder">
              <i className="fas fa-video"></i>
            </div>
          </li>
          <li>
            <span className="fab-label">Live Chat</span>
            <div className="fab-icon-holder">
              <i className="fas fa-comments"></i>
            </div>
          </li>
          <li>
            <span className="fab-label">Feedback</span>
            <div className="fab-icon-holder">
              <i className="fas fa-comment-alt"></i>
            </div>
          </li>
        </ul>
      </div>
    </Wrapper>
  );
};

export default FAB;
