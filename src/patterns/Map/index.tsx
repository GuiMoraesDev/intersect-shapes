import React from "react";

import * as Styles from "./styles";

import useMap from "./hooks/useMap";
import ZonesMenuOverlay from "./components/ZonesMenuOverlay";

import { ZONES, CONFLICTING_ZONES } from "./constants";
import DrawnMenuOverlay from "./components/DrawnMenuOverlay";
import MiddlewareModal, {
  MiddlewareModalHandles,
} from "../../components/MiddlewareModal";
import NewZoneForm from "./components/NewZoneForm";

const Map = (): JSX.Element => {
  const middlewareRef = React.useRef<MiddlewareModalHandles>(null);

  const {
    initMap,
    drawingTool,
    zones,
    deleteZoneByIndex,
    activeZone,
    saveActiveZone,
    cancelActiveZone,
  } = useMap({
    defaultZones: ZONES,
    conflictingZones: CONFLICTING_ZONES,
    newZoneModalref: middlewareRef,
  });

  React.useEffect(() => {
    initMap();
  }, [initMap]);

  return (
    <>
      <Styles.MapContainer>
        <Styles.MapComponent id="map" />

        <Styles.MapMenusWrapper>
          <Styles.MenuWrapper>
            <DrawnMenuOverlay drawingTool={drawingTool} />
          </Styles.MenuWrapper>

          <Styles.MenuWrapper>
            <ZonesMenuOverlay
              zones={zones}
              deleteZoneByIndex={deleteZoneByIndex}
            />
          </Styles.MenuWrapper>
        </Styles.MapMenusWrapper>
        
        <MiddlewareModal ref={middlewareRef} showCloseButton={false}>
          <NewZoneForm
            name={activeZone?.name}
            saveActiveZone={saveActiveZone}
            cancelActiveZone={cancelActiveZone}
          />
        </MiddlewareModal>
      </Styles.MapContainer>
    </>
  );
};

export default Map;
