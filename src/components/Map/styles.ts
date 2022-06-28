import styled from "styled-components";

export const MapContainer = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 60vh;
  max-height: 800px;
`;

export const MapComponent = styled.div`
  display: block;

  height: 100%;
  width: 100%;
`;

export const MapMenusWrapper = styled.div`
  position: absolute;

  top: 3%;
  right: 3%;

  display: flex;

  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 16px;
`;

export const MenuWrapper = styled.div`
  width: 100%;
  height: 100%;

  padding: 0 12px;

  border-radius: 4px;

  background-color: #fff;
`;
