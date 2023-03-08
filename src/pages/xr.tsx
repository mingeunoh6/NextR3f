import dynamic from "next/dynamic";
import "@google/model-viewer/dist/model-viewer";

const Model = dynamic(() => import("../components/model"), { ssr: false });

// DOM elements here
const DOM = () => {
  return <>hi</>;
};

// Canvas/R3F components here
const R3F = () => {
  return (
    <>
      <Model />
    </>
  );
};

export default function Xr() {
  return (
    <>
      <DOM />
      <R3F />
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      title: "XR view",
    },
  };
}
