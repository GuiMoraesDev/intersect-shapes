import React from "react";

import { FaDrawPolygon, FaPlusCircle } from "react-icons/fa";

import { DrawingToolProps, ShapeTypes } from "../../dtos";
import { generateZoneMetadata } from "../../utils";

import * as Styles from "./styles";

interface DrawnMenuOverlayProps {
  drawingTool: DrawingToolProps;
}

const DrawnMenuOverlay = ({
  drawingTool,
}: DrawnMenuOverlayProps): JSX.Element => {
  const onChangeDrawingTool = React.useCallback(
    (type: ShapeTypes) => {
      const newZoneMetadata = generateZoneMetadata();

      drawingTool[type](newZoneMetadata);
    },
    [drawingTool]
  );

  return (
    <Styles.Container>
      <Styles.Header>
        <h3>Drawing tool</h3>
      </Styles.Header>
      <Styles.SwitchWrapper>
        <Styles.Button
          type="button"
          onClick={() => onChangeDrawingTool("circle")}
          isActive={drawingTool.state === "circle"}
        >
          Draw circle <FaPlusCircle />
        </Styles.Button>
        <Styles.Button
          type="button"
          onClick={() => onChangeDrawingTool("polygon")}
          isActive={drawingTool.state === "polygon"}
        >
          Draw polygon <FaDrawPolygon />
        </Styles.Button>
      </Styles.SwitchWrapper>
    </Styles.Container>
  );
};

export default DrawnMenuOverlay;
