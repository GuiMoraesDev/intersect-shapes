import React from "react";
import { DEFAULT_MAPS_OPTIONS, DEFAULT_SHAPE_OPTIONS } from "../constants";
import {
  DrawingToolProps,
  CircleZoneDTO,
  PolygonZoneDTO,
  ShapeDataProps,
  ZoneDTO,
} from "../dtos";
import {
  getShapeCircle,
  getShapePolygon,
  generateZoneMetadata,
} from "../utils";

interface UseMapProps {
  defaultZones: ZoneDTO[];
  conflictingZones: ZoneDTO[];
  mapId?: string;
}

const useMap = ({
  mapId = "map",
  defaultZones,
  conflictingZones,
}: UseMapProps) => {
  const mapComponentRef = React.useRef<google.maps.Map | null>(null);
  const drawingManagerRef =
    React.useRef<google.maps.drawing.DrawingManager | null>(null);

  const [zones, setZones] = React.useState(defaultZones);

  const setShape = React.useMemo(
    () => ({
      circle: (
        circleProps: CircleZoneDTO,
        color?: string
      ): google.maps.Circle => {
        const circle = new google.maps.Circle({
          ...DEFAULT_SHAPE_OPTIONS,
          ...circleProps,
          fillColor: color,
          strokeColor: color,
        });

        const listeners = ["radius_changed", "center_changed"];

        listeners.forEach((listener) => {
          circle.addListener(listener, () => {
            const shapeData = getShapeCircle(circle);

            console.log("ShapeListener - shapeData", shapeData);
          });
        });

        return circle;
      },
      polygon: (
        polygonProps: PolygonZoneDTO,
        color?: string
      ): google.maps.Polygon => {
        const polygon = new google.maps.Polygon({
          ...DEFAULT_SHAPE_OPTIONS,
          paths: polygonProps,
          fillColor: color,
          strokeColor: color,
        });

        const listeners = ["insert_at", "remove_at", "set_at"];

        listeners.forEach((listener) => {
          polygon.addListener(listener, () => {
            const shapeData = getShapePolygon(polygon);

            console.log("ShapeListener - shapeData", shapeData);
          });
        });

        return polygon;
      },
    }),
    []
  );

  const drawingTool: DrawingToolProps = React.useMemo(
    () => ({
      circle: (activeZone: ZoneDTO) => {
        drawingManagerRef.current?.setOptions({
          circleOptions: {
            ...DEFAULT_SHAPE_OPTIONS,
            fillColor: activeZone.color,
          },
        });

        drawingManagerRef.current?.setDrawingMode(
          google.maps.drawing.OverlayType.CIRCLE
        );
      },
      polygon: (activeZone: ZoneDTO) => {
        drawingManagerRef.current?.setOptions({
          polygonOptions: {
            ...DEFAULT_SHAPE_OPTIONS,
            fillColor: activeZone.color,
          },
        });

        drawingManagerRef.current?.setDrawingMode(
          google.maps.drawing.OverlayType.POLYGON
        );
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

  const eventHandle = React.useMemo(
    () => ({
      circle: (shapeOverlay: any): ShapeDataProps => {
        const newShape = {
          polygon: null,
          circle: getShapeCircle(shapeOverlay),
        };

        return newShape;
      },
      polygon: (shapeOverlay: any): ShapeDataProps => {
        const newShape = {
          circle: null,
          polygon: getShapePolygon(shapeOverlay),
        };

        return newShape;
      },
    }),
    []
  );

  const addDrawingManagerListener = React.useCallback(() => {
    if (drawingManagerRef.current) {
      google.maps.event.addListener(
        drawingManagerRef.current,
        "overlaycomplete",
        (event) => {
          const shapeOverlay = event.overlay;

          const eventType = event.type as keyof typeof eventHandle;

          const shapeData: ShapeDataProps =
            eventHandle[eventType](shapeOverlay);

          const shapeMetadata = generateZoneMetadata({
            shapeData,
          });

          setZones((state) => [...state, shapeMetadata]);

          drawingManagerRef.current?.setDrawingMode(null);
        }
      );
    }
  }, [eventHandle]);

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
    addDrawingManagerListener();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    initMap,
    drawingTool,
    zones,
  };
};

export default useMap;
