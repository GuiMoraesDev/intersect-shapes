import { CircleZoneDTO, PolygonZoneDTO } from "../dtos";

export const getShapeCircle = (circleShape: any): CircleZoneDTO => ({
  center: {
    lat: circleShape.center.lat(),
    lng: circleShape.center.lng(),
  },
  radius: circleShape.radius,
});

export const getShapePolygon = (mapShape: any): PolygonZoneDTO => {
  const vertices = mapShape.getPath();

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
