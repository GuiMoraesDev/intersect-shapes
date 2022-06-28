import styled, { css } from "styled-components";

export const Container = styled.div``;

export const Header = styled.header``;

export const SwitchWrapper = styled.div`
  display: flex;

  align-items: center;
  justify-content: space-around;

  width: 100%;

  gap: 6px;
  padding: 12px;
`;

interface ButtonProps {
  isActive: boolean;
}

export const Button = styled.button<ButtonProps>`
  display: inline-flex;

  align-items: center;
  justify-content: center;

  padding: 8px;
  gap: 4px;

  border-radius: 4px;

  ${({ isActive }) =>
    isActive
      ? css`
          border-color: #ffeb8d;
          background-color: #ffeb8d;
        `
      : css`
          border-color: #fff;
          background-color: #fff;
        `};

  cursor: pointer;

  transition: border-color 0.2s, background-color 0.2s;
`;
