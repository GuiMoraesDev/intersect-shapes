import React from "react";
import { MiddlewareModalHandles } from "../../../components/MiddlewareModal";
import { NewZoneFormSchemaProps } from "../components/NewZoneForm/validations";
import {
  DEFAULT_MAPS_OPTIONS,
  DEFAULT_SHAPE_METADATA,
  DEFAULT_SHAPE_OPTIONS,
} from "../constants";
import { DrawingToolProps, ZoneDTO, ShapeTypes } from "../dtos";
import { generateZoneMetadata } from "../utils";

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
        const circle = new google.maps.Circle({
          ...DEFAULT_SHAPE_OPTIONS,
          ...circleProps,
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
        const polygon = new google.maps.Polygon({
          ...DEFAULT_SHAPE_OPTIONS,
          ...polygonProps,
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

  const overlayListener = React.useCallback(
    (event: any) => {
      const shapeOverlay = event.overlay;
      const shapeColor = shapeOverlay.fillColor;

      const eventType = event.type as keyof typeof setShape;

      const shapeData = {
        ...DEFAULT_SHAPE_METADATA,
        [eventType]: setShape[eventType](shapeOverlay, shapeColor),
      };

      const shapeMetadata = generateZoneMetadata(shapeData, shapeColor);

      setActiveZone(shapeMetadata);

      newZoneModalref.current?.openModal();

      drawingManagerRef.current?.setDrawingMode(null);
    },
    [newZoneModalref, setShape]
  );

  const addDrawingManagerListener = React.useCallback(() => {
    if (!drawingManagerRef.current) return;

    google.maps.event.addListener(
      drawingManagerRef.current,
      "overlaycomplete",
      (event) => overlayListener(event)
    );
  }, [overlayListener]);

  const createDefaultZones = React.useCallback(() => {
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

    addDrawingManagerListener();
  }, [addDrawingManagerListener, conflictingZones, defaultZones, setShape]);

  const saveActiveZone = React.useCallback(
    (values: NewZoneFormSchemaProps) => {
      if (activeZone)
        setZones((state) => [...state, { ...activeZone, ...values }]);

      newZoneModalref.current?.closeModal();

      drawingTool.clear();
    },
    [activeZone, drawingTool, newZoneModalref]
  );

  const cancelActiveZone = React.useCallback(() => {
    activeZone?.shapeData[activeZone.shapeType]?.setMap(null);

    setActiveZone(null);

    newZoneModalref.current?.closeModal();
    drawingTool.clear();
  }, [activeZone, drawingTool, newZoneModalref]);

  const deleteZoneByIndex = React.useCallback((index: number) => {
    setZones((state) => {
      state.forEach((zone) => {
        zone.shapeData[zone.shapeType]?.setMap(null);
      });

      const copyOfZones = [...state];

      copyOfZones.splice(index, 1);

      copyOfZones.forEach((zone) => {
        zone.shapeData[zone.shapeType]?.setMap(mapComponentRef.current);
      });

      return copyOfZones;
    });
  }, []);

  const initMap = React.useCallback(() => {
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
    initMap,
    drawingTool,
    zones,
    deleteZoneByIndex,
    activeZone,
    saveActiveZone,
    cancelActiveZone,
  };
};

export default useMap;
