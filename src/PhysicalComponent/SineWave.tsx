import { Image } from "react-konva";
import React, { useState, useRef, useEffect } from "react";
import { useSvgImage } from "../hooks/useSvgImage";
import Konva from "konva";
import { IFrame } from "konva/types/types";

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
  const animation = useRef<Konva.Animation>();
  const offset = useRef<number>(0);
  const x = useRef<number>(0);

  const amplitude = 1.1;
  const frequency = 0.25;
  const increment = 5;

  useEffect(() => {
    if (ref) {
      if (animation.current === undefined) {
        animation.current = new Konva.Animation((frame: IFrame | undefined) => {
          if (frame !== undefined) {
            offset.current += increment / frame.frameRate;
            let data: DataT[] = [
              {
                type: "M",
                values: [0, 150],
              },
            ];
            while (x.current < 300) {
              let point = {
                x: x.current,
                y: 150 - pathFunction(x.current),
              };
              data.push({
                type: "L",
                values: [point.x, point.y],
              });
              x.current += 1;
            }
            setDataUsed(data);
          }
        });
        animation.current.start();
      }
    }

    return () => {
      if (animation.current) {
        animation.current.stop();
      }
    };
  }, [ref]);

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
    svg: `<svg height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><path stroke="red" d="${path}"/></svg>`,
  });
  return (
    <Image
      ref={(x) => {
        setRef(x);
      }}
      image={image}
      width={30}
      height={amplitude}
      x={props.x}
      y={props.y}
    />
  );
};
