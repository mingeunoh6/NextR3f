import { useState, useEffect } from "react";

import "@google/model-viewer";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": ModelViewerJSX &
        React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

interface ModelViewerJSX {
  src: string;
  poster?: string;
  iosSrc?: string;
  seamlessPoster?: boolean;
  autoplay?: boolean;
  environmentImage?: string;
  exposure?: string;
  interactionPromptThreshold?: string;
  shadowIntensity?: string;
  ar?: boolean;
  arModes?: string;
  autoRotate?: boolean;
  cameraControls?: boolean;
  cameraOrbit?: string;
  alt?: string;
  sx?: any;
}

const Model = (props: any) => {
  const [width, setWidth] = useState("20em");
  const [height, setHeight] = useState("20em");

  console.log(width);
  const iosSrc = props.usdzFile ? props.usdzFile : "";

  return (
    <model-viewer
      id="first"
      src="/public/alfa_romeo_stradale_1967.glb"
      ios-src={iosSrc}
      seamless-poster
      environment-image="neutral"
      exposure="1.0"
      interaction-prompt-threshold="0"
      shadow-intensity="0"
      ar
      autoplay
      ar-modes="webxr scene-viewer quick-look"
      auto-rotate
      camera-controls
      camera-orbit="0deg 90deg 0deg 8.37364m"
      alt="3D model"
      style={{
        display: "block",
        width: width,
        height: height,
      }}
    ></model-viewer>
  );
};
export default Model;
