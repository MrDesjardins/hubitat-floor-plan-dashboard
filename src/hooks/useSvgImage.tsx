import { useRef, useEffect } from "Hooks/node_modules/react";

export interface UseSvgImageProps {
  svg: string;
}

export const useSvgImage = (props: UseSvgImageProps) => {
  const img = useRef<HTMLImageElement>(document.createElement("img"));
  useEffect(() => {
    const encodedData = "data:image/svg+xml;base64," + window.btoa(props.svg);
    img.current.src = encodedData;
  }, [props.svg]);

  return [img.current];
};

export const useSvgImage2 = (props: UseSvgImageProps) => {
  const encodedData = "data:image/svg+xml;base64," + window.btoa(props.svg);

  const img = document.createElement("img");
  img.src = encodedData;

  return img;
};
