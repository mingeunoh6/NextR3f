import useStore from "@/helpers/store";
import React, { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Raytracer } from "@react-three/lgl";
import { Environment } from "@react-three/drei";
import { useDropzone } from "react-dropzone";
import fs from "fs/promises";
import path from "path";
import fetch from "isomorphic-unfetch";
import axios from "axios";
import { GetServerSideProps } from "next";
import Link from "next/link";
// import Shader from '@/components/canvas/ShaderExample/ShaderExample'

// Prefer dynamic import for production builds
// But if you have issues and need to debug in local development
// comment these out and import above instead
// https://github.com/pmndrs/react-three-next/issues/49
// const Shader = dynamic(
//   () => import("@/components/canvas/ShaderExample/ShaderExample"),
//   {
//     ssr: false,
//   }
// );

// DOM elements here

interface Props {
  dirs: string[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  const props = { dirs: [] };
  try {
    const dirs = await fs.readdir(path.join(process.cwd(), "/public"));
    props.dirs = dirs as any;

    return { props };
  } catch (error) {
    return { props };
  }
};

const DOM = ({ dirs }) => {
  const [progress, setProgress] = useState<number>(0);
  console.log(dirs);
  const onDrop = async (acceptedFiles: FormData) => {
    // Do something with the files
    try {
      const formData = new FormData();
      formData.append(acceptedFiles[0].fileName, acceptedFiles[0]);
      const data = await axios.post("/api/3dUpload", formData);
      console.log(data);
    } catch (error: any) {
      console.log(error.response?.data);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
      <div>
        {dirs.map((item) => (
          <Link key={item} href={"/" + item}>
            <a>{item}</a>
          </Link>
        ))}
      </div>
    </div>
  );
};

const R3F = () => {
  return (
    <>
      <Environment preset="city" />
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial />
      </mesh>
    </>
  );
};

function Page({ dirs }) {
  return (
    <>
      <DOM dirs={dirs} />
      <R3F />
    </>
  );
}

export default Page;
