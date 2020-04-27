import { Image } from "react-konva";
import React, { useState, useRef } from "react";
import { useSvgImage } from "../hooks/useSvgImage";
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
  const [dataUsed, setDataUsed] = useState<DataT[]>([
    {
      type: "M",
      values: [0, 150],
    },
  ]);
  const [ref, setRef] = useState<Konva.Image | null>(null);
  const offset = useRef<number>(0);

  const amplitude = 1.1;
  const frequency = 0.25;

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
      setDataUsed(data);
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

  const path = dataUsed.map((d) => d.type + " " + d.values.join(" "));

  const [image] = useSvgImage({
    svg: `<svg height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke-width="3" stroke="${COLOR_MACHINE3}" d="${path}"/></svg>`,
  });
  return (
    <Image
      ref={(x) => {
        setRef(x);
      }}
      image={image}
      width={30}
      height={30}
      x={props.x}
      y={props.y}
    />
  );
};
