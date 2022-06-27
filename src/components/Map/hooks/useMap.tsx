import React from "react";
import { DEFAULT_MAPS_OPTIONS, DEFAULT_SHAPE_OPTIONS } from "../constants";
import { CircleZoneDTO, PolygonZoneDTO, ZoneDTO } from "../dtos";
import { getShapeCircle, getShapePolygon } from "../utils";

interface UseMapProps {
  zones: ZoneDTO[];
  conflictingZones: ZoneDTO[];
  mapId?: string;
}

const useMap = ({ mapId = "map", zones, conflictingZones }: UseMapProps) => {
  const mapComponentRef = React.useRef<google.maps.Map | null>(null);
  const drawingManagerRef =
    React.useRef<google.maps.drawing.DrawingManager | null>(null);

  const setShape = React.useMemo(
    () => ({
      circle: (
        circleProps: CircleZoneDTO,
        fillColor?: string
      ): google.maps.Circle => {
        const circle = new google.maps.Circle({
          ...DEFAULT_SHAPE_OPTIONS,
          ...circleProps,
          fillColor,
        });

        const listeners = ["radius_changed", "center_changed"];

        listeners.forEach((listener) => {
          circle.addListener(listener, () => {
            const shapeData = getShapeCircle(circle);

            console.log("shapeData", shapeData);
          });
        });

        return circle;
      },
      polygon: (
        polygonProps: PolygonZoneDTO,
        fillColor?: string
      ): google.maps.Polygon => {
        const polygon = new google.maps.Polygon({
          ...DEFAULT_SHAPE_OPTIONS,
          paths: polygonProps,
          fillColor,
        });

        const listeners = ["insert_at", "remove_at", "set_at"];

        listeners.forEach((listener) => {
          polygon.addListener(listener, () => {
            const shapeData = getShapePolygon(polygon);

            console.log("shapeData", shapeData);
          });
        });

        return polygon;
      },
    }),
    []
  );

  const createDefaultZones = React.useCallback(() => {
    zones.forEach((zone) => {
      const { shapeType, shapeData } = zone;
      const currentShapeData = shapeData[shapeType] as CircleZoneDTO &
        PolygonZoneDTO;

      const newZone: google.maps.Circle | google.maps.Polygon | null =
        currentShapeData && setShape[shapeType](currentShapeData);

      newZone?.setMap(mapComponentRef.current);
    });
  }, [setShape, zones]);

  const createDefaultConflictZones = React.useCallback(() => {
    conflictingZones.forEach((zone) => {
      const { shapeType, shapeData } = zone;
      const currentShapeData = shapeData[shapeType] as CircleZoneDTO &
        PolygonZoneDTO;

      const newZone: google.maps.Circle | google.maps.Polygon | null =
        currentShapeData && setShape[shapeType](currentShapeData, "#b81b1b");

      newZone?.setMap(mapComponentRef.current);
    });
  }, [conflictingZones, setShape]);

  const initMap = React.useCallback(() => {
    console.count("Map render");

    const mapElement = document.getElementById(mapId);

    if (!mapElement) {
      throw new Error(`HTML element id "${mapId}" not founded`);
    }

    mapComponentRef.current = new google.maps.Map(
      mapElement,
      DEFAULT_MAPS_OPTIONS
    );

    drawingManagerRef.current = new google.maps.drawing.DrawingManager({
      drawingControl: false,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [
          google.maps.drawing.OverlayType.CIRCLE,
          google.maps.drawing.OverlayType.POLYGON,
        ],
      },
      circleOptions: { ...DEFAULT_SHAPE_OPTIONS },
      polygonOptions: { ...DEFAULT_SHAPE_OPTIONS },
    });

    drawingManagerRef.current.setMap(mapComponentRef.current);

    createDefaultZones();
    createDefaultConflictZones();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    map: mapComponentRef,
    drawingManager: drawingManagerRef,
    initMap,
    setShape,
  };
};

export default useMap;
