import styled from "styled-components";

export const Container = styled.div``;

export const Header = styled.header``;

export const ZonesListWrapper = styled.ul`
  display: flex;

  flex-direction: column;
  align-items: center;
  justify-content: center;

  list-style: none;

  margin: 0;
  padding: 0;
`;

export const ZoneItem = styled.li`
  display: flex;

  align-items: center;
  justify-content: space-between;

  width: 100%;

  padding: 6px 12px;

  border: 1px solid transparent;

  transition: border 0.2s;

  :hover {
    border-color: #333;
  }
`;

export const ZoneTitle = styled.p``;

export const ControlButtonsWrapper = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;

  gap: 10px;
`;

export const ZoneControlButton = styled.button`
  display: inline-flex;

  align-items: center;
  justify-content: center;

  width: 22px;
  height: 22px;

  padding: 4px;

  background-color: #fff;
  border: none;

  cursor: pointer;

  transition: transform 0.2s;

  :hover {
    transform: scale(1.1);
  }
`;
