export type PolygonZoneDTO = Array<{
  lat: number;
  lng: number;
}>;

export interface ShapeDataProps {
  polygon: google.maps.Polygon | null;
  circle: google.maps.Circle | null;
}

export type ShapeTypes = keyof ShapeDataProps;

export interface ZoneDTO {
  color: string;
  name: string;
  shapeType: ShapeTypes;
  shapeData: ShapeDataProps;
}

export interface DrawingToolProps {
  state: ShapeTypes | null;
  polygon: (activeZone: ZoneDTO) => void;
  circle: (activeZone: ZoneDTO) => void;
  clear: () => void;
}

export interface UpdateSelectedZoneShapeDTO {
  type: ShapeTypes;
  shapeData: ShapeDataProps;
}
