import styled from "styled-components";
import { Link } from "react-router-dom";
import React from "react";

interface IButtonLink {
  children: React.ReactNode;
  to: string;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 1rem 0;
  a {
    background-color: #ff5a5f;
    display: inline-block;
    padding: 0.5rem 1rem;
    color: #fff;
    border-radius: 2rem;

    &:hover,
    &:focus {
      opacity: 0.9;
      color: #fff;
    }
  }
`;

const ButtonLink: React.FC<IButtonLink> = ({ children, to }) => {
  return (
    <Wrapper>
      <Link to={to}>{children}</Link>
    </Wrapper>
  );
};

export default ButtonLink;
