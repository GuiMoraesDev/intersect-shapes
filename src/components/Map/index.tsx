import React from "react";

import * as Styles from "./styles";

import useMap from "./hooks/useMap";
import ZonesMenuOverlay from "./components/ZonesMenuOverlay";

import { ZONES, CONFLICTING_ZONES } from "./constants";
import DrawnMenuOverlay from "./components/DrawnMenuOverlay";

const Map = (): JSX.Element => {
  const { initMap, drawingTool, zones } = useMap({
    defaultZones: ZONES,
    conflictingZones: CONFLICTING_ZONES,
  });

  React.useEffect(() => {
    initMap();
  }, [initMap]);

  return (
    <Styles.MapContainer>
      <Styles.MapComponent id="map" />

      <Styles.MapMenusWrapper>
        <Styles.MenuWrapper>
          <DrawnMenuOverlay drawingTool={drawingTool} />
        </Styles.MenuWrapper>

        <Styles.MenuWrapper>
          <ZonesMenuOverlay zones={zones} />
        </Styles.MenuWrapper>
      </Styles.MapMenusWrapper>
    </Styles.MapContainer>
  );
};

export default Map;
