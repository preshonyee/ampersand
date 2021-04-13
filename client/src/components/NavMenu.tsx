import { Avatar, Dropdown, Menu } from "antd";
import {
  DisconnectOutlined,
  DownOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React from "react";
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
  padding: 0.5rem 4rem;
  background-color: #fff;
  border-bottom: 1px solid #dadce0;
  vertical-align: middle;
  position: fixed; /* Set the navbar to fixed position */
  top: 0; /* Position the navbar at the top of the page */
  width: 100%; /* Full width */
  z-index: 100;

  .brandItems {
    img {
      width: 40%;
    }
  }

  .ant-dropdown-link {
    margin-bottom: 0;
  }
`;

const StyledMenuActions = styled.div`
  display: flex;

  .routeLinks {
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
`;

const NavMenu: React.FC = () => {
  const { user } = useSelector((state: any) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();

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
        <Link to="/">
          <img src={Logo} alt="Ampersand Logo" />
        </Link>
      </div>
      {user ? (
        <StyledMenuActions>
          <span className="routeLinks">
            <>
              <Link to="/">Home</Link>
              <Link to="/tracker">Track Applications</Link>
              <Link to="/resume">Resume Profile</Link>
              <Link to="/analytics">Analytics</Link>
            </>
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
        </StyledMenuActions>
      ) : null}
    </StyledMenu>
  );
};

export default NavMenu;
