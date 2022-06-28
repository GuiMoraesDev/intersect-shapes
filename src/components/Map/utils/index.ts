import chroma from "chroma-js";

import {
  CircleZoneDTO,
  PartialZoneDTO,
  PolygonZoneDTO,
  ZoneDTO,
} from "../dtos";

export const getShapeCircle = (circleShape: any): CircleZoneDTO => ({
  center: {
    lat: circleShape.center.lat(),
    lng: circleShape.center.lng(),
  },
  radius: circleShape.radius,
});

export const getShapePolygon = (polygonShape: any): PolygonZoneDTO => {
  const vertices = polygonShape.getPath();

  const latLongs = [];

  for (let i = 0; i < vertices.getLength(); i++) {
    const vertice = vertices.getAt(i);

    latLongs.push({
      lat: vertice.lat(),
      lng: vertice.lng(),
    });
  }

  return latLongs;
};

export const generateZoneMetadata = (zoneData?: PartialZoneDTO) => {
  const defaultZoneMetadata: ZoneDTO = {
    color: String(chroma.random()),
    name: "New zone",
    shapeType: "circle",
    shapeData: {
      circle: null,
      polygon: null,
    },
  };

  const newZone: ZoneDTO = {
    ...defaultZoneMetadata,
    ...zoneData,
  };

  return newZone;
};
