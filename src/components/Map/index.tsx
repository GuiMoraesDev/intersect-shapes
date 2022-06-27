import React from "react";

import * as Styles from "./styles";

import { ZoneDTO } from "./dtos";
import useMap from "./hooks/useMap";
import MenuOverlay from "./components/MenuOverlay";

interface MapProps {
  zones: ZoneDTO[];
  conflictingZones: ZoneDTO[];
}

const Map = ({ zones, conflictingZones }: MapProps): JSX.Element => {
  const { initMap } = useMap({
    zones,
    conflictingZones
  });

  React.useEffect(() => {
    initMap();
  }, [initMap]);

  return (
    <Styles.MapContainer>
      <Styles.MapComponent id="map" />

      <MenuOverlay zones={zones} />
    </Styles.MapContainer>
  );
};

export default Map;
