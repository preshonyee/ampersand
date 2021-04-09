import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { logout } from "../redux/store/user";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 4rem;
  border-bottom: 0.5px solid #dadce0;

  span {
    display: flex;
    p {
      margin: 0;
    }
  }

  h1 {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0 0.5rem 0 0;
    line-height: 15px;
  }
`;

const NavBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { user } = useSelector((state: any) => state.user);

  console.log(history);

  const logoutHandler = () => {
    dispatch(logout({ history }));
  };
  return (
    <Wrapper>
      <div>
        <span>
          <h1>Orchestra </h1>
          <p> | Your online resume profile</p>
        </span>
      </div>
      <div>
        {user ? (
          <>
            <Button type="link" onClick={() => history.push("/")}>
              Back to home
            </Button>
            <Button type="link" onClick={logoutHandler}>
              Logout
            </Button>
          </>
        ) : null}

        {history.location.pathname === "/login" && (
          <Link to="/register">Register</Link>
        )}
      </div>
    </Wrapper>
  );
};

export default NavBar;
