import { Avatar, Button, Drawer, Dropdown, Menu } from "antd";
import {
  CloseCircleFilled,
  DisconnectOutlined,
  DownOutlined,
  MenuOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/store/user";
import Logo from "../images/logo-wordmark.svg";

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
  .dropdown {
    display: none;
  }

  .routeLinks a {
    text-decoration: none;
    margin-right: 1.5rem;
  }

  .dropdown {
    p:hover {
      cursor: pointer;
    }
  }

  @media (min-width: 1200px) {
    .routeLinks .links,
    .dropdown {
      display: block;
    }

    .routeLinks button {
      display: none;
    }
  }
`;

const StyledDrawerLinks = styled.div`
  a {
    display: block;
    margin: 1rem 0;
    font-size: 1rem;
    border-left: 5px solid #ff5a5f;
    background-color: #ffecec;
    padding: 0.5rem 0 0.5rem 1rem;
  }
`;

const NavMenu: React.FC = () => {
  const { user } = useSelector((state: any) => state.user);
  const MODE = localStorage.getItem("appMode");

  const history = useHistory();
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const UserMenu = () => {
    const handleMenuClick = (e: any) => {
      if (e.key === "2") {
        dispatch(logout({ history }));
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

  return (
    <StyledMenu>
      <div className="brandItems">
        <Link to="/app">
          <img src={Logo} alt="Ampersand Logo" />
        </Link>
      </div>
      {user && MODE === "app" ? (
        <StyledMenuActions>
          <span className="routeLinks">
            <div className="links">
              <Link to="/app">Home</Link>
              <Link to="/app/tracker">Track Applications</Link>
              <Link to="/app/resume">Resume Profile</Link>
              {/* <Link to="/app/analytics">Analytics</Link> */}
            </div>
            <Button onClick={showDrawer} icon={<MenuOutlined />} />
          </span>
          <div className="dropdown">
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
          <Drawer
            title="Menu"
            placement="right"
            closable={true}
            closeIcon={<CloseCircleFilled />}
            onClose={onClose}
            visible={visible}>
            <StyledDrawerLinks>
              <Link to="/app">Home</Link>
              <Link to="/app/tracker">Track Applications</Link>
              <Link to="/app/resume">Resume Profile</Link>
              <Link to="/app/analytics">Analytics</Link>
            </StyledDrawerLinks>
          </Drawer>
        </StyledMenuActions>
      ) : (
        <div className="login-links">
          <Link to="/login">Login</Link>
        </div>
      )}
    </StyledMenu>
  );
};

export default NavMenu;
