export interface UseSvgImageProps {
  svg: string;
}

export const useSvgImage = (props: UseSvgImageProps) => {
  const encodedData = "data:image/svg+xml;base64," + window.btoa(props.svg);

  const img = document.createElement("img");
  img.src = encodedData;

  return [img];
};


export const useSvgImage2 = (props: UseSvgImageProps) => {
    const encodedData = "data:image/svg+xml;base64," + window.btoa(props.svg);
  
    const img = document.createElement("img");
    img.src = encodedData;
  
    return img;
  };
  