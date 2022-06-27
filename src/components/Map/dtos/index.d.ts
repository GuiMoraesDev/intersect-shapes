export interface CircleZoneDTO {
  center: {
    lat: number;
    lng: number;
  };
  radius: number;
}

export type PolygonZoneDTO = Array<{
  lat: number;
  lng: number;
}>;

type ShapeTypes = "circle" | "polygon";

interface ShapeDataProps {
  circle: CircleZoneDTO | null;
  polygon: PolygonZoneDTO | null;
}

export interface ZoneDTO {
  id: number;
  color: string;
  name: string;
  shapeType: ShapeTypes;
  shapeData: ShapeDataProps;
}
