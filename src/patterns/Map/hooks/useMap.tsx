import React from "react";
import * as turf from "@turf/turf";

import { MiddlewareModalHandles } from "../../../components/MiddlewareModal";
import { NewZoneFormSchemaProps } from "../components/NewZoneForm/validations";
import {
  DEFAULT_MAPS_OPTIONS,
  DEFAULT_SHAPE_METADATA,
  DEFAULT_SHAPE_OPTIONS,
} from "../constants";
import { DrawingToolProps, ZoneDTO, ShapeTypes } from "../dtos";
import { generateZoneMetadata, getPolygonShapeData } from "../utils";

interface UseMapProps {
  defaultZones: ZoneDTO[];
  conflictingZones: ZoneDTO[];
  mapId?: string;
  newZoneModalref: React.RefObject<MiddlewareModalHandles>;
}

const useMap = ({
  mapId = "map",
  defaultZones,
  conflictingZones,
  newZoneModalref,
}: UseMapProps) => {
  const mapComponentRef = React.useRef<google.maps.Map | null>(null);
  const drawingManagerRef =
    React.useRef<google.maps.drawing.DrawingManager | null>(null);

  const [activeDrawnwingTool, setActiveDrawnwingTool] =
    React.useState<ShapeTypes | null>(null);
  const [zones, setZones] = React.useState<ZoneDTO[]>([]);
  const [activeZone, setActiveZone] = React.useState<ZoneDTO | null>(null);

  const setShape = React.useMemo(
    () => ({
      circle: (
        circleProps: google.maps.Circle,
        color?: string,
        isConflictingZone: boolean = false
      ): google.maps.Circle => {
        const circle = circleProps;

        circle.setOptions({
          ...DEFAULT_SHAPE_OPTIONS,
          fillColor: isConflictingZone ? "red" : color,
          strokeColor: isConflictingZone ? "red" : undefined,
          fillOpacity: isConflictingZone ? 0.8 : undefined,
          map: mapComponentRef.current || undefined,
        });

        return circle;
      },
      polygon: (
        polygonProps: google.maps.Polygon,
        color?: string,
        isConflictingZone: boolean = false
      ): google.maps.Polygon => {
        const polygon = polygonProps;

        polygon.setOptions({
          ...DEFAULT_SHAPE_OPTIONS,
          fillColor: isConflictingZone ? "red" : color,
          strokeColor: isConflictingZone ? "red" : undefined,
          fillOpacity: isConflictingZone ? 0.8 : undefined,
          map: mapComponentRef.current || undefined,
        });

        return polygon;
      },
    }),
    []
  );

  const drawingTool: DrawingToolProps = React.useMemo(
    () => ({
      state: activeDrawnwingTool,
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

        setActiveDrawnwingTool("circle");
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

        setActiveDrawnwingTool("polygon");
      },
      clear: () => {
        drawingManagerRef.current?.setDrawingMode(null);

        setActiveDrawnwingTool(null);
      },
    }),
    [activeDrawnwingTool]
  );

  const validateZonesConflicts = React.useCallback(
    (newShapeMetadata: ZoneDTO): boolean => {
      const { shapeData, shapeType } = newShapeMetadata;

      if (shapeType === "circle") return true;

      const newShapeData = shapeData[shapeType] as google.maps.Polygon;

      const newShapeFilledData = getPolygonShapeData(newShapeData);

      const newPolygon = turf.polygon([newShapeFilledData]);

      const allZones = [...zones, ...conflictingZones];

      const polygonZonesFiltered = allZones.filter((zone) => {
        const { shapeType: zoneShapeType } = zone;

        return zoneShapeType === "polygon";
      });

      const polygonZonesShapes = polygonZonesFiltered.map((zone) => {
        const { shapeData: zoneShapeData, shapeType: zoneShapeType } = zone;

        const zoneShape = zoneShapeData[zoneShapeType] as google.maps.Polygon;

        const shapeFilledData = getPolygonShapeData(zoneShape);

        return turf.polygon([shapeFilledData]);
      });

      const valuesWithIntersection = polygonZonesShapes.find((polygon) => {
        return turf.intersect(newPolygon, polygon);
      });

      if (!!valuesWithIntersection) {
        return true;
      }

      return false;
    },
    [conflictingZones, zones]
  );

  const createDefaultZones = React.useCallback(() => {
    console.count("createDefaultZones");

    const zonesData = defaultZones.map((zone) => {
      const { shapeType, shapeData, color } = zone;

      const currentShapeData = shapeData[shapeType] as google.maps.Circle &
        google.maps.Polygon;

      const newZone: google.maps.Circle | google.maps.Polygon | null =
        currentShapeData && setShape[shapeType](currentShapeData, color);

      newZone?.setMap(mapComponentRef.current);

      return {
        ...zone,
        shapeData: {
          ...zone.shapeData,
          [zone.shapeType]: newZone,
        },
      };
    });

    conflictingZones.forEach((zone) => {
      const { shapeType, shapeData } = zone;
      const currentShapeData = shapeData[shapeType] as google.maps.Circle &
        google.maps.Polygon;

      const newZone: google.maps.Circle | google.maps.Polygon | null =
        currentShapeData &&
        setShape[shapeType](currentShapeData, "#b81b1b", true);

      newZone?.setMap(mapComponentRef.current);
    });

    setZones(zonesData);
  }, [conflictingZones, defaultZones, setShape]);

  const saveActiveZone = React.useCallback(
    (values: NewZoneFormSchemaProps) => {
      if (!activeZone) return;

      setZones((state) => [...state, { ...activeZone, ...values }]);

      newZoneModalref.current?.closeModal();

      drawingTool.clear();
    },
    [activeZone, drawingTool, newZoneModalref]
  );

  const cancelActiveZone = React.useCallback(() => {
    if (!activeZone) return;

    const { shapeData, shapeType } = activeZone;

    shapeData[shapeType]?.setMap(null);

    setActiveZone(null);

    newZoneModalref.current?.closeModal();
    drawingTool.clear();
  }, [activeZone, drawingTool, newZoneModalref]);

  const deleteZoneByIndex = React.useCallback((index: number) => {
    console.count("deleteZoneByIndex");

    setZones((state) => {
      state.forEach((zone) => {
        const { shapeData, shapeType } = zone;

        shapeData[shapeType]?.setMap(null);
      });

      const copyOfZones = [...state];

      copyOfZones.splice(index, 1);

      copyOfZones.forEach((zone) => {
        const { shapeData, shapeType } = zone;

        shapeData[shapeType]?.setMap(mapComponentRef.current);
      });

      return copyOfZones;
    });
  }, []);

  React.useEffect(() => {
    if (!drawingManagerRef.current) return;

    const listener = google.maps.event.addListener(
      drawingManagerRef.current,
      "overlaycomplete",
      (event) => {
        console.count("overlayListener");
        drawingTool.clear();

        const { overlay, type } = event;
        const { fillColor } = overlay;

        const eventType = type as keyof typeof setShape;

        const shapeData = {
          ...DEFAULT_SHAPE_METADATA,
          [eventType]: setShape[eventType](overlay, fillColor),
        };

        const shapeMetadata = generateZoneMetadata(shapeData, fillColor);

        const isInConflict = validateZonesConflicts(shapeMetadata);

        if (isInConflict) {
          return overlay.setMap(null);
        }

        setActiveZone(shapeMetadata);

        newZoneModalref.current?.openModal();
      }
    );

    return () => {
      console.count("overlayRemoveListener");
      google.maps.event.removeListener(listener);
    };
  }, [drawingTool, newZoneModalref, setShape, validateZonesConflicts]);

  React.useEffect(() => {
    const mapElement = document.getElementById(mapId);

    if (!mapElement) {
      throw new Error(`HTML element id "${mapId}" not founded`);
    }

    const initialMap = new google.maps.Map(mapElement, DEFAULT_MAPS_OPTIONS);

    drawingManagerRef.current = new google.maps.drawing.DrawingManager({
      drawingControl: false,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [
          google.maps.drawing.OverlayType.CIRCLE,
          google.maps.drawing.OverlayType.POLYGON,
        ],
      },
      circleOptions: DEFAULT_SHAPE_OPTIONS,
      polygonOptions: DEFAULT_SHAPE_OPTIONS,
      map: initialMap,
    });

    mapComponentRef.current = initialMap;

    createDefaultZones();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapId]);

  return {
    drawingTool,
    zones,
    deleteZoneByIndex,
    activeZone,
    saveActiveZone,
    cancelActiveZone,
  };
};

export default useMap;
