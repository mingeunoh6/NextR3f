import dynamic from "next/dynamic";
// const Box = dynamic(() => import("@/components/canvas/Box"), {
//   ssr: false,
// });

// DOM elements here
const DOM = () => {
  return <></>;
};

// Canvas/R3F components here
const R3F = () => {
  return <></>;
};

export default function Page() {
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
      title: "Page two",
    },
  };
}
