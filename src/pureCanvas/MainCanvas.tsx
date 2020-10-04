import React, { useRef, useEffect, useCallback } from "react";
import { MAIN_MENU_WIDTH, WEST_WALL, NORTH_WALL } from "../constants";
import { drawFlooPlan } from "./floorPlan";
import { drawDevices } from "./devices";
import { isDeviceInBox } from "../logics/deviceDataLogics";
import { Mode } from "../models/mode";
import { contactDrawingLastValues, contactsTranslationLastValues } from "./contactDrawing";
import { deadBoltLastValues } from "./deadboltDrawing";
import { tvPowerLastValues, tvPowerEnergyLastValues } from "./tvDrawing";
import { lightSwitchLastValues } from "./lightSwitchDrawing";
import { dimmerPowerLastValues, dimmerEnergyLastValues } from "./dimmerSwitchDrawing";
import { motionLastValues } from "./motionDrawing";
import { washingMachinePowerLastValues, washingMachineEnergyLastValues } from "./washingMachineDrawing";
import { airPurifierLastValues } from "./airpurifierDrawing";
import { starsLastValues, starsPowerLastValues } from "./projectionLightDrawing";
import { leakSensorLastValues } from "./drawLeakSensor";
import { DictionaryOf } from "../commons/dictionaryOf";
import { DeviceDataKind } from "../models/devices";
export interface MainCanvasProps {
  width: number;
  height: number;
  devices: DictionaryOf<DeviceDataKind>;
  mode: Mode;
  openConfiguration: (dev: DeviceDataKind, openDrawer: boolean) => void;
  animationEnabled: boolean;
  redrawCounter: number;
}
export const MainCanvas = (props: MainCanvasProps) => {
  const lastUpdated = useRef<number>(Date.now());
  const refCanvasFloorPlan = useRef<HTMLCanvasElement>(null);
  const refContextFloorPlan = useRef<
    CanvasRenderingContext2D | undefined | null
  >();

  const refCanvasDevices = useRef<HTMLCanvasElement>(null);
  const refContextDevices = useRef<
    CanvasRenderingContext2D | undefined | null
  >();

  const refCanvasDevicesBuffer = useRef<HTMLCanvasElement>(
    document.createElement("canvas")
  );
  const refContextDevicesBuffer = useRef<
    CanvasRenderingContext2D | undefined | null
  >();
  const lastRedrawCount = useRef<number>(-1);

  useEffect(
    () => {
      refContextFloorPlan.current = refCanvasFloorPlan.current?.getContext(
        "2d"
      )!;
      refContextDevices.current = refCanvasDevices.current?.getContext("2d")!;
      refContextDevicesBuffer.current = refCanvasDevicesBuffer.current?.getContext(
        "2d"
      )!;

      refCanvasDevicesBuffer.current.width = props.width;
      refCanvasDevicesBuffer.current.height = props.height;;

      drawFlooPlan(refContextFloorPlan.current);
    },
    // eslint-disable-next-line 
    [
      /*Only when mounting*/
    ]
  );

  useEffect(() => {
    // Clean the buffer canvas completely
    refContextDevicesBuffer.current!.clearRect(0, 0, props.width, props.height);

    // Reset the cache to ensure we redraw
    resetDrawingCaches();
  }, [props.mode, props.height, props.width]);
  // ========================================== DEVICES ===========================================
  const requestRef = React.useRef<number>();
  const drawDevicesOnCanvas = useCallback(() => {
    if (refContextDevices !== undefined && refContextDevices.current) {
      if (props.mode !== Mode.DEVICES) {
        lastRedrawCount.current = props.redrawCounter;
        refContextDevicesBuffer.current!.clearRect(0, 0, props.width, props.height);
      }
      drawDevices(
        refContextDevicesBuffer.current!,
        props.devices,
        props.mode,
        props.openConfiguration,
        props.animationEnabled
      );
      const timeElapsed = Date.now() - lastUpdated.current;
      if (timeElapsed >= 1000 / 60) {
        window.requestAnimationFrame(() => {
          refContextDevices.current!.clearRect(0, 0, props.width, props.height);
          refContextDevices.current?.drawImage(refCanvasDevicesBuffer.current, 0, 0);
        });
        lastUpdated.current = Date.now();
      }
    }
    requestRef.current = window.requestAnimationFrame(drawDevicesOnCanvas);
  }, [
    props.devices,
    props.mode,
    props.openConfiguration,
    props.height,
    props.width,
    props.animationEnabled,
    props.redrawCounter
  ]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(drawDevicesOnCanvas);
    return () => {
      if (requestRef.current !== undefined) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [drawDevicesOnCanvas]);

  // ========================================== CANVAS ===========================================
  return (
    <>
      <canvas
        style={{
          position: "absolute",
          zIndex: 200,
          left: MAIN_MENU_WIDTH,
          top: 0,
        }}
        ref={refCanvasDevices}
        width={props.width}
        height={props.height}
        onClick={(evt) => {
          const x = evt.clientX - WEST_WALL - MAIN_MENU_WIDTH;
          const y = evt.clientY - NORTH_WALL;
          console.log(`Devices: ${x}, ${y} => alldevices.tsx {x1:WEST_WALL+${x - WEST_WALL}, y1:NORTH_WALL+${y - NORTH_WALL}]`);
          const allDevices = Object.values(props.devices);
          for (let i = 0; i < allDevices.length; i++) {
            if (isDeviceInBox(x, y, allDevices[i].clickingBox)) {
              props.openConfiguration(allDevices[i], true);
              break;
            }
          }
        }}
      ></canvas>
      <canvas
        style={{
          position: "absolute",
          zIndex: 100,
          left: MAIN_MENU_WIDTH,
          top: 0,
        }}
        ref={refCanvasFloorPlan}
        width={props.width}
        height={props.height}
      ></canvas>
    </>
  );
};


function resetDrawingCaches(): void {
  cleanMap(contactDrawingLastValues);
  cleanMap(contactsTranslationLastValues);
  cleanMap(deadBoltLastValues);
  cleanMap(tvPowerLastValues);
  cleanMap(tvPowerEnergyLastValues);
  cleanMap(lightSwitchLastValues);
  cleanMap(dimmerPowerLastValues);
  cleanMap(dimmerEnergyLastValues);
  cleanMap(motionLastValues);
  cleanMap(washingMachinePowerLastValues);
  cleanMap(washingMachineEnergyLastValues);
  cleanMap(airPurifierLastValues);
  cleanMap(starsLastValues);
  cleanMap(starsPowerLastValues);
  cleanMap(leakSensorLastValues);
}


function cleanMap(obj: any): void {
  for (const prop of Object.getOwnPropertyNames(obj)) {
    delete obj[prop];
  }
}