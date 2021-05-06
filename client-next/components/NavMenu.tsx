import { Avatar, Dropdown, Menu } from "antd";
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

const { Item } = Menu;

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
      width: 80%;
      @media (min-width: 400px) {
        width: 60%;
      }
      @media (min-width: 640px) {
        width: 50%;
      }
      @media (min-width: 800px) {
        width: 28%;
      }
      @media (min-width: 1200px) {
        width: 20%;
      }
      @media (min-width: 1600px) {
        width: 15%;
      }
    }
  }

  .ant-dropdown-link {
    margin-bottom: 0;
  }

  .login-links a {
    text-decoration: none;
    margin-right: 1.5rem;
  }
`;

const StyledMenuActions = styled.div`
  display: flex;

  .routeLinks .links,
  .desktop-dropdown {
    display: none;
  }

  .routeLinks a {
    text-decoration: none;
    margin-right: 1.5rem;
  }

  .desktop-dropdown {
    p:hover {
      cursor: pointer;
    }
  }
  .mobile-dropdown {
  }

  @media (min-width: 1200px) {
    .routeLinks .links,
    .desktop-dropdown {
      display: block;
    }

    .routeLinks .mobile-dropdown {
      display: none;
    }
  }
`;

const NavMenu: React.FC = () => {
  const { user } = useSelector((state: any) => state.user);
  const ISSERVER = typeof window === "undefined";

  let MODE;

  if (!ISSERVER) {
    MODE = localStorage.getItem("appMode");
  }

  const router = useRouter();
  const dispatch = useDispatch();

  const UserMenu = () => {
    const handleMenuClick = (e: any) => {
      if (e.key === "1") {
        router.push("/account");
      }
      if (e.key === "2") {
        dispatch(logout({ router }));
      }
    };
    return (
      <div className="dropdown-menu">
        <Menu onClick={handleMenuClick}>
          <Item key="1" icon={<UserOutlined />}>
            Profile
          </Item>
          <Item key="2" icon={<DisconnectOutlined />}>
            Logout
          </Item>
          <Item disabled key="3" icon={<SettingOutlined />}>
            Dark Mode
          </Item>
        </Menu>
      </div>
    );
  };

  const MobileMenu = () => {
    const handleMenuClick = (e: any) => {
      if (e.key === "1") {
        router.push("/app");
      }
      if (e.key === "2") {
        router.push("/app/tracker");
      }
      if (e.key === "3") {
        router.push("/app/resume");
      }
      if (e.key === "4") {
        router.push("/account");
      }
      if (e.key === "5") {
        dispatch(logout({ router }));
      }
    };
    return (
      <div className="dropdown-menu">
        <Menu onClick={handleMenuClick}>
          <Item key="1" icon={<UserOutlined />}>
            Home
          </Item>
          <Item key="2" icon={<UserOutlined />}>
            Tracker
          </Item>
          <Item key="3" icon={<UserOutlined />}>
            Resume
          </Item>
          <Item key="4" icon={<UserOutlined />}>
            Profile
          </Item>
          <Item key="5" icon={<DisconnectOutlined />}>
            Logout
          </Item>
          <Item disabled key="6" icon={<SettingOutlined />}>
            Dark Mode
          </Item>
        </Menu>
      </div>
    );
  };

  return (
    <StyledMenu>
      <div className="brandItems">
        <Link href="/app">
          <img src="/logo-wordmark.svg" alt="Ampersand Logo" />
        </Link>
      </div>
      {user && MODE === "app" ? (
        <StyledMenuActions>
          <span className="routeLinks">
            <div className="links">
              <Link href="/app">Home</Link>
              <Link href="/app/tracker">Track Applications</Link>
              <Link href="/app/resume">Resume Profile</Link>
              {/* <Link href="/app/analytics">Analytics</Link> */}
            </div>
            <div className="mobile-dropdown">
              <Dropdown
                placement="bottomLeft"
                overlayStyle={{
                  boxShadow:
                    "0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%)",
                }}
                overlay={MobileMenu}
                trigger={["click"]}>
                <p className="ant-dropdown-link">
                  <Avatar
                    size={24}
                    src={user.profilePicture && user.profilePicture}
                    style={{ backgroundColor: "#FF5A5F" }}
                    icon={<UserOutlined />}
                  />{" "}
                  {`${user.firstName} ${user.lastName}`} <DownOutlined />
                </p>
              </Dropdown>
            </div>
          </span>
          <div className="desktop-dropdown">
            <Dropdown
              overlayStyle={{
                boxShadow:
                  "0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%)",
              }}
              overlay={UserMenu}
              trigger={["click"]}>
              <p className="ant-dropdown-link">
                <Avatar
                  size={24}
                  src={user.profilePicture && user.profilePicture}
                  style={{ backgroundColor: "#FF5A5F" }}
                  icon={<UserOutlined />}
                />{" "}
                {`${user.firstName} ${user.lastName}`} <DownOutlined />
              </p>
            </Dropdown>
          </div>
        </StyledMenuActions>
      ) : (
        <div className="login-links">
          <Link href="/login">Login</Link>
        </div>
      )}
    </StyledMenu>
  );
};

export default NavMenu;
