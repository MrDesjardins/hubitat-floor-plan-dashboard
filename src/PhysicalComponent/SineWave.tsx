import { Image } from "react-konva";
import React, { useState, useRef, useEffect } from "react";
import Konva from "konva";
import { useInterval } from "../hooks/useInterval";
import { COLOR_MACHINE3 } from "../constants";

interface SiveWaveProps {
  x: number;
  y: number;
}
interface DataT {
  type: string;
  values: number[];
}
export const SineWave = (props: SiveWaveProps) => {
  const [ref, setRef] = useState<Konva.Image | null>(null);
  const offset = useRef<number>(0);

  const img = useRef<HTMLImageElement>(document.createElement("img"));

  const amplitude = 1.05;
  const frequency = 0.25;
  useEffect(() => {
    console.log("Mounted a SineWave");
  }, []);
  useInterval(() => {
    offset.current += 12;
    if (ref) {
      let data: DataT[] = [
        {
          type: "M",
          values: [0, 150],
        },
      ];
      let x = 0;
      while (x < 300) {
        let point = {
          x: x,
          y: 150 - pathFunction(x),
        };
        data.push({
          type: "L",
          values: [point.x, point.y],
        });
        x += 1;
      }
      const path = data.map((d) => d.type + " " + d.values.join(" "));
      const encodedData =
        "data:image/svg+xml;base64," +
        window.btoa(
          `<svg height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke-width="30" stroke="${COLOR_MACHINE3}" d="${path}"/></svg>`
        );
      img.current.src = encodedData;
    }
  }, 100);

  const pathFunction = (x: number) => {
    const result =
      // Function to determine curve
      // 0.2*(Math.sin(Math.sqrt(x)-$scope.offset))*x;
      Math.sin(Math.sqrt(x * frequency) - offset.current) *
      x *
      (0.1 * amplitude);

    return result;
  };

  return (
    <Image
      ref={(x) => {
        console.log("Set Ref Sine Wave");
        setRef(x);
      }}
      image={img.current}
      width={30}
      height={30}
      x={props.x}
      y={props.y}
    />
  );
};
