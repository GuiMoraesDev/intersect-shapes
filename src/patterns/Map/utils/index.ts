import chroma from "chroma-js";

import { ShapeDataProps, ZoneDTO } from "../dtos";

export const generateZoneMetadata = (shapeData?: ShapeDataProps): ZoneDTO => {
  const zoneMetadata: ZoneDTO = {
    color: String(chroma.random()),
    name: "New zone",
    shapeType: "circle",
    shapeData: {
      circle: null,
      polygon: null,
      ...shapeData,
    },
  };

  return zoneMetadata;
};
