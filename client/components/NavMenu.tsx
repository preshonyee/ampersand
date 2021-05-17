import { Avatar, Button, Dropdown, Menu } from "antd";
import {
  DisconnectOutlined,
  DownOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/store/user";

const StyledMenu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background-color: #fff;
  border-bottom: 1px solid #dadce0;
  vertical-align: middle;
  position: fixed; /* Set the navbar to fixed position */
  top: 0; /* Position the navbar at the top of the page */
  width: 100%; /* Full width */
  z-index: 100;

  .brandItems {
    width: 50%;
    img {
      width: 150px;
    }
  }

  .routeLinks {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .login-links a {
    text-decoration: none;
    margin-right: 1.5rem;
  }
`;

const NavMenu: React.FC = () => {
  const { user } = useSelector((state: any) => state.user);

  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <StyledMenu>
      <div className="brandItems">
        <Link href="/app">
          <a>
            <img src="/logo-wordmark.svg" alt="Ampersand Logo" />
          </a>
        </Link>
      </div>
      {user ? (
        <span className="routeLinks">
          <Link href="/app/tracker">Tracker</Link>
          <Link href="/app/resume">Resume</Link>
          <div>
            <Avatar
              size={24}
              src={user.profilePicture && user.profilePicture}
              style={{ backgroundColor: "#FF5A5F" }}
              icon={<UserOutlined />}
            />{" "}
            {`${user.firstName}`}
          </div>
          <Button onClick={() => dispatch(logout({ router }))}>Logout</Button>
          {/* <Link href="/app/analytics">Analytics</Link> */}
        </span>
      ) : (
        <div className="login-links">
          <Link href="/login">Login</Link>
        </div>
      )}
    </StyledMenu>
  );
};

export default NavMenu;
