import React from "react";
import { Text } from "react-konva";
import { CommonProps } from "./Common";
import { ContactDevice } from "../Models/Devices";
import { getContactOnOffAttribute } from "../Logics/AttributeLogics";
import { Spring, animated } from "react-spring/renderprops-konva";
import { TEXT_COLOR, LINE_COLOR } from "../constants";
const ContactSize = 35;
export enum ContactDirection {
  North,
  South,
  East,
  West,
  SlideDown,
  SlideUp,
  SlideRight,
  SlideLeft,
}
interface PositionAngle {
  positionTextX: number;
  positionTextY: number;
  positionX: number;
  positionY: number;

  positionXOpen: number;
  positionYOpen: number;
  angleOpen: number;
  angleClose: number;
}
export interface ContactOptions extends CommonProps {
  deviceData: ContactDevice;
  onSave: (deviceData: ContactDevice) => void;
}

function getComponentDoor(
  direction: ContactDirection,
  isContactOpen: boolean,
  positionsAngles: PositionAngle
): JSX.Element | undefined {
  if (
    direction === ContactDirection.East ||
    direction === ContactDirection.West ||
    direction === ContactDirection.North ||
    direction === ContactDirection.South
  ) {
    return (
      <Spring
        native={true}
        from={{ rotation: 0 }}
        to={{
          rotation: isContactOpen
            ? positionsAngles.angleOpen
            : positionsAngles.angleClose,
        }}
      >
        {(props2) => (
          <animated.Line
            {...props2}
            strokeWidth={4}
            stroke={LINE_COLOR}
            x={positionsAngles.positionX}
            y={positionsAngles.positionY}
            points={[
              0,
              0,
              positionsAngles.positionXOpen,
              positionsAngles.positionYOpen,
            ]}
          />
        )}
      </Spring>
    );
  } else if (direction === ContactDirection.SlideLeft) {
    return (
      <Spring
        native={true}
        from={{ x: positionsAngles.positionX }}
        to={{
          x: isContactOpen
            ? positionsAngles.positionX + ContactSize
            : positionsAngles.positionX,
        }}
      >
        {(props2) => (
          <animated.Line
            {...props2}
            strokeWidth={4}
            stroke={LINE_COLOR}
            y={positionsAngles.positionY}
            points={[
              0,
              0,
              positionsAngles.positionXOpen,
              positionsAngles.positionYOpen,
            ]}
          />
        )}
      </Spring>
    );
  } else if (direction === ContactDirection.SlideRight) {
    return (
      <Spring
        native={true}
        from={{ x: positionsAngles.positionX }}
        to={{
          x: isContactOpen
            ? positionsAngles.positionX - ContactSize
            : positionsAngles.positionX,
        }}
      >
        {(props2) => (
          <animated.Line
            {...props2}
            strokeWidth={4}
            stroke={LINE_COLOR}
            y={positionsAngles.positionY}
            points={[
              0,
              0,
              positionsAngles.positionXOpen,
              positionsAngles.positionYOpen,
            ]}
          />
        )}
      </Spring>
    );
  } else if (direction === ContactDirection.SlideDown) {
    return (
      <Spring
        native={true}
        from={{ y: positionsAngles.positionY }}
        to={{
          y: isContactOpen
            ? positionsAngles.positionY + ContactSize
            : positionsAngles.positionY,
        }}
      >
        {(props2) => (
          <animated.Line
            {...props2}
            strokeWidth={4}
            stroke={LINE_COLOR}
            x={positionsAngles.positionX}
            points={[
              0,
              0,
              positionsAngles.positionXOpen,
              positionsAngles.positionYOpen,
            ]}
          />
        )}
      </Spring>
    );
  } else if (direction === ContactDirection.SlideUp) {
    return (
      <Spring
        native={true}
        from={{ y: positionsAngles.positionY }}
        to={{
          y: isContactOpen
            ? positionsAngles.positionY - ContactSize
            : positionsAngles.positionY,
        }}
      >
        {(props2) => (
          <animated.Line
            {...props2}
            strokeWidth={4}
            stroke={LINE_COLOR}
            x={positionsAngles.positionX}
            points={[
              0,
              0,
              positionsAngles.positionXOpen,
              positionsAngles.positionYOpen,
            ]}
          />
        )}
      </Spring>
    );
  }
  return undefined;
}
export const Contact = (props: ContactOptions) => {
  const isContactOpen = getContactOnOffAttribute(props.deviceData);

  let positionsAngles = getDoorStartPositionEndPosition(
    props.deviceData.direction,
    props.textPosition
  );

  return (
    <>
      <Text
        text={`${isContactOpen ? "Open" : "Close"}`}
        x={positionsAngles.positionTextX}
        y={positionsAngles.positionTextY}
        fill={TEXT_COLOR}
      />

      {/* <Line
                strokeWidth={4}
                stroke={LINE_COLOR}
                x={positionsAngles.positionX}
                y={positionsAngles.positionY}
                points={[0, 0, 40, 0]}
            /> */}
      {getComponentDoor(
        props.deviceData.direction,
        isContactOpen,
        positionsAngles
      )}
    </>
  );
};

export function getDoorStartPositionEndPosition(
  direction: ContactDirection,
  positions: [number, number]
): PositionAngle {
  switch (direction) {
    case ContactDirection.South:
      return {
        positionTextX: positions[0] + 10,
        positionTextY: positions[1] + 10,
        positionX: positions[0],
        positionY: positions[1],
        positionXOpen: 22,
        positionYOpen: 22,
        angleOpen: 0,
        angleClose: -45,
      };
    case ContactDirection.North:
      return {
        positionTextX: positions[0] + 10,
        positionTextY: positions[1] + 10,
        positionX: positions[0],
        positionY: positions[1],
        positionXOpen: 22,
        positionYOpen: 22,
        angleOpen: 0,
        angleClose: -45,
      };
    case ContactDirection.East:
      return {
        positionTextX: positions[0] + 10,
        positionTextY: positions[1] + 10,
        positionX: positions[0],
        positionY: positions[1],
        positionXOpen: -22,
        positionYOpen: 22,
        angleOpen: 0,
        angleClose: -45,
      };
    case ContactDirection.West:
      return {
        positionTextX: positions[0] + 10,
        positionTextY: positions[1] + 20,
        positionX: positions[0],
        positionY: positions[1],
        positionXOpen: 22,
        positionYOpen: 22,
        angleOpen: 0,
        angleClose: 45,
      };
    case ContactDirection.SlideDown:
      return {
        positionTextX: positions[0] + 10,
        positionTextY: positions[1] + 20,
        positionX: positions[0],
        positionY: positions[1],
        positionXOpen: 0,
        positionYOpen: ContactSize,
        angleOpen: 0,
        angleClose: 0,
      };
    case ContactDirection.SlideUp:
      return {
        positionTextX: positions[0] + 10,
        positionTextY: positions[1] + 20,
        positionX: positions[0],
        positionY: positions[1],
        positionXOpen: 0,
        positionYOpen: ContactSize,
        angleOpen: 0,
        angleClose: 0,
      };
    case ContactDirection.SlideLeft:
      return {
        positionTextX: positions[0],
        positionTextY: positions[1] + 10,
        positionX: positions[0],
        positionY: positions[1],
        positionXOpen: ContactSize,
        positionYOpen: 0,
        angleOpen: 0,
        angleClose: 0,
      };
    case ContactDirection.SlideRight:
      return {
        positionTextX: positions[0] + 5,
        positionTextY: positions[1] + 10,
        positionX: positions[0],
        positionY: positions[1],
        positionXOpen: ContactSize,
        positionYOpen: 0,
        angleOpen: 0,
        angleClose: 0,
      };
  }
}
