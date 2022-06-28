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
  circle: CircleZoneDTO | null;
  polygon: PolygonZoneDTO | null;
}

export interface ZoneDTO {
  color: string;
  name: string;
  shapeType: ShapeTypes;
  shapeData: ShapeDataProps;
}

export type PartialZoneDTO = {
  [P in keyof ZoneDTO]?: ZoneDTO[P];
};

export interface ZonesProps extends ZoneDTO {
  makeEditable(value: boolean): void;
  removeShape(): void;
}

export interface DrawingToolProps {
  circle: (activeZone: ZoneDTO) => void;
  polygon: (activeZone: ZoneDTO) => void;
}
