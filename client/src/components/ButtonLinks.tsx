import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import React from "react";

interface IButtonLink {
  children: React.ReactNode;
  to: string;
  noFlex?: boolean;
}

const Wrapper = styled.div<Partial<IButtonLink>>`
  display: flex;
  justify-content: flex-end;
  margin: 1rem 0;
  ${(props) =>
    props.noFlex &&
    css`
      justify-content: center;
    `}
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

const ButtonLink: React.FC<IButtonLink> = ({ children, to, noFlex }) => {
  return (
    <Wrapper noFlex={noFlex}>
      <Link to={to}>{children}</Link>
    </Wrapper>
  );
};

export default ButtonLink;
