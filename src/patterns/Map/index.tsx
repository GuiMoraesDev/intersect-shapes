import React from "react";

import * as Styles from "./styles";

import useMap from "./hooks/useMap";
import ZonesMenuOverlay from "./components/ZonesMenuOverlay";

import { ZONES, CONFLICTING_ZONES } from "./constants";
import DrawnMenuOverlay from "./components/DrawnMenuOverlay";
import MiddlewareModal, {
  MiddlewareModalHandles,
} from "../../components/MiddlewareModal";

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
      </Styles.MapContainer>

      <MiddlewareModal
        ref={middlewareRef}
        onCloseModal={() => console.log("console.log")}
      >
        <Styles.NewZoneForm>
          <input defaultValue={activeZone?.name} />

          <button type="button" onClick={cancelActiveZone}>
            cancel
          </button>
          <button type="button" onClick={saveActiveZone}>
            save
          </button>
        </Styles.NewZoneForm>
      </MiddlewareModal>
    </>
  );
};

export default Map;
