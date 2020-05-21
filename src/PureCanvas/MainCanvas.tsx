import React, { useRef, useEffect } from "react";
import { WEST_WALL, NORTH_WALL, MAIN_MENU_WIDTH } from "../constants";
import { DeviceDataKind } from "../Models/Devices";
import { DictionaryOf } from "../Commons/DictionaryOf";
import { drawFlooPlan } from "./floorPlan";
import { drawDevices } from "./devices";
export interface MainCanvasProps {
  width: number;
  height: number;
  devices: DictionaryOf<DeviceDataKind>;
  isTemperatureModeOn: boolean;
  openConfiguration: (dev: DeviceDataKind, openDrawer: boolean) => void;

}
export const MainCanvas = (props: MainCanvasProps) => {
  const refCanvasFloorPlan = useRef<HTMLCanvasElement>(null);
  const refContextFloorPlan = useRef<CanvasRenderingContext2D | undefined | null>();

  const refCanvasDevices = useRef<HTMLCanvasElement>(null);
  const refContextDevices = useRef<CanvasRenderingContext2D | undefined | null>();
  useEffect(() => {
    refContextFloorPlan.current = refCanvasFloorPlan.current?.getContext("2d")!;
    refContextDevices.current = refCanvasDevices.current?.getContext("2d")!;
    drawFlooPlan(refContextFloorPlan.current);
  }, [
    /*Only when mounting*/
  ]);
  if (refContextDevices !== undefined && refContextDevices.current) {
    window.requestAnimationFrame(() => {
      refContextDevices.current!.clearRect(0, 0, props.width, props.height);
      drawDevices(refContextDevices.current!, props.devices, props.isTemperatureModeOn, props.openConfiguration)
    });
  }
  return <>
    <canvas style={{ position: "absolute", zIndex: 200, left: MAIN_MENU_WIDTH, top: 0 }} ref={refCanvasDevices} width={props.width} height={props.height} onClick={(evt) => {
      console.log(
        `${evt.clientX - WEST_WALL}, ${evt.clientY - NORTH_WALL - 50}`
      );
    }}>Canvas is not supported</canvas>
    <canvas style={{ position: "absolute", zIndex: 100, left: MAIN_MENU_WIDTH, top: 0 }} ref={refCanvasFloorPlan} width={props.width} height={props.height}></canvas>
  </>;
};

