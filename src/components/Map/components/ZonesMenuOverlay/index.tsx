import React from "react";
import { FaPen, FaTimes } from "react-icons/fa";

import { ZoneDTO } from "../../dtos";

import * as Styles from "./styles";

interface ZonesMenuOverlayProps {
  zones: ZoneDTO[];
}

const ZonesMenuOverlay = ({
  zones,
}: ZonesMenuOverlayProps): JSX.Element | null => {
  const onEditZone = (zone: ZoneDTO) => {};
  const onDeleteZone = (zone: ZoneDTO) => {};

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
              <Styles.ZoneControlButton onClick={() => onEditZone(zone)}>
                <FaPen size={22} />
              </Styles.ZoneControlButton>

              <Styles.ZoneControlButton onClick={() => onDeleteZone(zone)}>
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
