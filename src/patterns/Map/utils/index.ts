import { Position } from "@turf/turf";
import chroma from "chroma-js";
import { DEFAULT_SHAPE_METADATA } from "../constants";

import { ShapeDataProps, ShapeTypes, ZoneDTO } from "../dtos";

export function generateZoneMetadata(
  shapeType: ShapeTypes,
  shapeData?: ShapeDataProps,
  color?: string
): ZoneDTO {
  const zoneMetadata: ZoneDTO = {
    color: color || String(chroma.random()),
    name: "New zone",
    shapeType,
    shapeData: {
      ...DEFAULT_SHAPE_METADATA,
      ...shapeData,
    },
  };

  return zoneMetadata;
}

export const getPolygonShapeData = (shape: google.maps.Polygon): Position[] => {
  const shapePath = shape.getPath();

  const pathArray = shapePath.getArray();

  const parsedPaths = pathArray.map((path) => [path.lat(), path.lng()]);

  const duplicateFirstPoint = [...parsedPaths, parsedPaths[0]];

  return duplicateFirstPoint;
};

type CircleShapeResponse = {
  center: number[];
  radius: number;
};

export const getCircleShapeData = (
  shape: google.maps.Circle
): CircleShapeResponse => {
  const shapeRadius = shape.getRadius();
  const shapeCenter = shape.getCenter();

  const lat = shapeCenter.lat();
  const lng = shapeCenter.lng();

  const circleShape = {
    center: [lat, lng],
    radius: shapeRadius, // from meters to kilometers,
  };

  console.log({ circleShape });

  return circleShape;
};
