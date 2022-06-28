import React from "react";
import { FaTimes } from "react-icons/fa";

import { ZoneDTO } from "../../dtos";

import * as Styles from "./styles";

interface ZonesMenuOverlayProps {
  zones: ZoneDTO[];
  deleteZoneByIndex: (index: number) => void;
}

const ZonesMenuOverlay = ({
  zones,
  deleteZoneByIndex,
}: ZonesMenuOverlayProps): JSX.Element | null => {
  const onDeleteZone = (zone: ZoneDTO, zoneIndex: number) => {
    zone.shapeData[zone.shapeType]?.setMap(null);
    
    deleteZoneByIndex(zoneIndex);
  };

  if (!zones.length) {
    return null;
  }

  return (
    <Styles.Container>
      <Styles.Header>
        <h3>Zones created</h3>
      </Styles.Header>
      <Styles.ZonesListWrapper>
        {zones?.map((zone, zoneIndex) => (
          <Styles.ZoneItem key={`zone-buttons_${zone.name}_${zoneIndex}`}>
            <Styles.ZoneTitle>{zone.name}</Styles.ZoneTitle>

            <Styles.ControlButtonsWrapper>
              <Styles.ZoneControlButton onClick={() => onDeleteZone(zone, zoneIndex)}>
                <FaTimes size={22} />
              </Styles.ZoneControlButton>
            </Styles.ControlButtonsWrapper>
          </Styles.ZoneItem>
        ))}
      </Styles.ZonesListWrapper>
    </Styles.Container>
  );
};

export default ZonesMenuOverlay;
