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

export type ShapeTypes = "circle" | "polygon";

export interface ShapeDataProps {
  circle: google.maps.Circle | null;
  polygon: google.maps.Polygon | null;
}

export interface ZoneDTO {
  color: string;
  name: string;
  shapeType: ShapeTypes;
  shapeData: ShapeDataProps;
}

export interface DrawingToolProps {
  state: ShapeTypes | null;
  circle: (activeZone: ZoneDTO) => void;
  polygon: (activeZone: ZoneDTO) => void;
  clear: () => void;
}

export interface UpdateSelectedZoneShapeDTO {
  type: ShapeTypes;
  shapeData: ShapeDataProps;
}
