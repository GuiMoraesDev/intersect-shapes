import { Position } from "@turf/turf";
import chroma from "chroma-js";
import { DEFAULT_SHAPE_METADATA } from "../constants";

import { ShapeDataProps, ZoneDTO } from "../dtos";

export function generateZoneMetadata(
  shapeData?: ShapeDataProps,
  color?: string
): ZoneDTO {
  const zoneMetadata: ZoneDTO = {
    color: color || String(chroma.random()),
    name: "New zone",
    shapeType: shapeData?.circle ? "circle" : "polygon",
    shapeData: {
      ...DEFAULT_SHAPE_METADATA,
      ...shapeData,
    },
  };

  return zoneMetadata;
}

export const getPolygonShapeData = (
  shape: google.maps.Polygon
): Position[] => {
  const shapePath = shape.getPath();

  const pathArray = shapePath.getArray();

  const parsedPaths = pathArray.map((path) => [path.lat(), path.lng()]);

  const duplicateFirstPoint = [...parsedPaths, parsedPaths[0]];

  return duplicateFirstPoint;
};
