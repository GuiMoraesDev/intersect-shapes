import React from "react";
import { ZoneDTO } from "../../dtos";

import * as Styles from "./styles";

interface MenuOverlayProps {
  zones: ZoneDTO[];
}

const MenuOverlay = ({ zones }: MenuOverlayProps): JSX.Element => {
  const onEditZone = (zone: ZoneDTO) => {};
  const onDeleteZone = (zone: ZoneDTO) => {};

  return (
    <Styles.Container>
      <button>Add new zone</button>

      <Styles.ZonesListWrapper>
        {zones.length ? (
          zones?.map((zone, zoneIndex) => (
            <li key={`zone-buttons_${zone.name}_${zoneIndex}`}>
              <p>{zone.name}</p>
              <button onClick={() => onEditZone(zone)} >Edit</button>
              <button onClick={() => onDeleteZone(zone)} >delete</button>
            </li>
          ))
        ) : (
          <li>
            <h3>No zones created</h3>
            <p>You haven't create any zones yet</p>
          </li>
        )}
      </Styles.ZonesListWrapper>
    </Styles.Container>
  );
};

export default MenuOverlay;
