import styled, { css } from "styled-components";

import { MiddlewareModalDefaultPropsThatMakeStyles } from ".";

export const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  width: 100%;
  height: 100%;

  z-index: 25;

  :before {
    content: "";

    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    background-color: #333;

    opacity: 0.6;
  }
`;

export const ContentWrapper = styled.div<MiddlewareModalDefaultPropsThatMakeStyles>`
  position: fixed;
  top: 50%;
  left: 50%;

  display: flex;

  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  width: fit-content;
  height: fit-content;

  margin: auto;
  padding: 10px;

  background-color: #fff;

  color: #333;

  border-radius: 5;

  transform: translate(-50%, -50%);

  overflow: auto;

  ${({ dimension }) => {
    if (dimension === "sm")
      return css`
        max-width: 35vw;
        max-height: 46vh;
      `;

    if (dimension === "md")
      return css`
        max-width: 45vw;
        max-height: 56vh;
      `;

    if (dimension === "lg")
      return css`
        max-width: 65vw;
        max-height: 76vh;
      `;

    if (dimension === "full-size")
      return css`
        max-width: 85vw;
        max-height: 96vh;
      `;
  }}
`;

export const CloseTopButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;

  display: flex;

  align-items: center;
  justify-content: center;

  width: 5px;
  height: 5px;

  padding: 1px;

  color: #333;
  background-color: transparent;

  border: none;

  z-index: 1;
  transition: transform 0.2s, color 0.2s;

  > svg.icon {
    width: 100%;
    height: 100%;

    fill: #333;
  }

  :hover {
    color: #333;

    transform: scale(1.1);
  }
`;
