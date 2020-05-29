import React, { useRef, useEffect, useCallback } from "react";
import { WEST_WALL, NORTH_WALL, MAIN_MENU_WIDTH, TEMPERATURE_OUTSIDE_LEFT } from "../constants";
import { DeviceDataKind } from "models/devices";
import { DictionaryOf } from "commons/dictionaryOf";
import { drawFlooPlan } from "./floorPlan";
import { drawDevices } from "./devices";
import { drawWeatherOutsideLayer } from "./drawWeatherOutsideLayer";
export interface MainCanvasProps {
  width: number;
  height: number;
  devices: DictionaryOf<DeviceDataKind>;
  isTemperatureModeOn: boolean;
  openConfiguration: (dev: DeviceDataKind, openDrawer: boolean) => void;
}
export const MainCanvas = (props: MainCanvasProps) => {
  const refCanvasFloorPlan = useRef<HTMLCanvasElement>(null);
  const refContextFloorPlan = useRef<
    CanvasRenderingContext2D | undefined | null
  >();

  const refCanvasDevices = useRef<HTMLCanvasElement>(null);
  const refContextDevices = useRef<
    CanvasRenderingContext2D | undefined | null
  >();

  const refCanvasOutsideTemperature = useRef<HTMLCanvasElement>(null);
  const refContextOutsideTemperature = useRef<
    CanvasRenderingContext2D | undefined | null
  >();

  useEffect(
    () => {
      refContextFloorPlan.current = refCanvasFloorPlan.current?.getContext("2d")!;
      refContextDevices.current = refCanvasDevices.current?.getContext("2d")!;
      refContextOutsideTemperature.current = refCanvasOutsideTemperature.current?.getContext("2d")!;

      drawFlooPlan(refContextFloorPlan.current);
    },
    [
      /*Only when mounting*/
    ]
  );

  // ========================================== DEVICES ===========================================
  const requestRef = React.useRef<number>();
  const drawDevicesOnCanvas = useCallback(() => {
    if (refContextDevices !== undefined && refContextDevices.current) {
      refContextDevices.current!.clearRect(0, 0, props.width, props.height);
      drawDevices(
        refContextDevices.current!,
        props.devices,
        props.isTemperatureModeOn,
        props.openConfiguration
      );
    }
    requestRef.current = window.requestAnimationFrame(drawDevicesOnCanvas);
  }, [
    props.devices,
    props.isTemperatureModeOn,
    props.openConfiguration,
    props.height,
    props.width,
  ]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(drawDevicesOnCanvas);
    return () => {
      if (requestRef.current !== undefined) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [drawDevicesOnCanvas]);

  // ========================================== Temperature ===========================================

  const temperatureOutsideRef = React.useRef<number>();
  const drawTemperatureOutsideOnCanvas = useCallback(() => {
    if (refContextOutsideTemperature !== undefined && refContextOutsideTemperature.current) {
      refContextOutsideTemperature.current!.clearRect(0, 0, props.width, props.height);
      drawWeatherOutsideLayer(
        refContextOutsideTemperature.current!
      );
    }
    temperatureOutsideRef.current = window.requestAnimationFrame(drawTemperatureOutsideOnCanvas);
  }, [
    props.height,
    props.width,
  ]);


  useEffect(() => {
    temperatureOutsideRef.current = requestAnimationFrame(drawTemperatureOutsideOnCanvas);
    return () => {
      if (temperatureOutsideRef.current !== undefined) {
        cancelAnimationFrame(temperatureOutsideRef.current);
      }
    };
  }, [drawTemperatureOutsideOnCanvas]);

  // ========================================== CANVAS ===========================================
  return (
    <>
      <canvas
        style={{
          position: "absolute",
          zIndex: 300,
          left: MAIN_MENU_WIDTH + props.width - TEMPERATURE_OUTSIDE_LEFT,
          top: 0,
        }}
        ref={refCanvasOutsideTemperature}
        width={props.width - TEMPERATURE_OUTSIDE_LEFT - MAIN_MENU_WIDTH}
        height={props.height}
        onClick={(evt) => {
          console.log(
            `Temperature: ${evt.clientX - WEST_WALL - MAIN_MENU_WIDTH}, ${
            evt.clientY - NORTH_WALL
            }`
          );
        }}
      ></canvas>
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
          console.log(
            `Devices: ${evt.clientX - WEST_WALL - MAIN_MENU_WIDTH}, ${
            evt.clientY - NORTH_WALL
            }`
          );
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
