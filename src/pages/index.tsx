import useStore from "@/helpers/store";
import React, {
  Suspense,
  useCallback,
  useEffect,
  useState,
  useRef,
} from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Raytracer } from "@react-three/lgl";
import { Environment } from "@react-three/drei";
import { useDropzone } from "react-dropzone";
import fs from "fs/promises";
import path from "path";
import fetch from "isomorphic-unfetch";
import axios from "axios";
import { GetServerSideProps } from "next";
import Link from "next/link";
import styled from "styled-components";
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
  model: string;
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

const ModelInspcetor = styled.div`
  display: flex;
  width: 20vw;
  height: 100%;
  flex-direction: column;
  border: 1px solid black;
`;

const DropZone = styled.div`
  padding: 10px;
  border: 1px solid red;
`;

const ModelList = styled.div`
  padding: 10px;
  border: 1px solid blue;
`;

const DOM = ({ dirs, model }) => {
  const [progress, setProgress] = useState<number>(0);

  console.log(dirs[dirs.length - 1]);

  const onDrop = async (acceptedFiles: FormData) => {
    // Do something with the files

    try {
      const formData = new FormData();
      formData.append(acceptedFiles[0].fileName, acceptedFiles[0]);
      console.log(formData);
      const data = await axios
        .post("/api/3dUpload", formData)
        .then(() => model(acceptedFiles[0].name));
    } catch (error: any) {
      console.log(error.response?.data);
    }
  };

  const handleItemList = useCallback(({ e, item }) => {
    e.preventDefault();
    console.log(item);
    model(item);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <ModelInspcetor>
      <DropZone {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </DropZone>
      <ModelList>
        <ul>
          {dirs.map((item) => (
            <li key={item} onClick={(e) => handleItemList({ e, item })}>
              {item}
            </li>
          ))}
        </ul>
      </ModelList>
    </ModelInspcetor>
  );
};

const R3F = ({ model }) => {
  const gltf = useLoader(GLTFLoader, `/${model}`);

  useEffect(() => {
    if (model !== null) {
    }
  }, [model]);

  const modelDetail = useCallback((e) => {
    e.object.material.color.set([77, 25, 25]);
  }, []);

  return (
    <>
      <Environment preset="forest" blur={0.5} />
      <Suspense fallback={null}>
        <directionalLight position={[0, 10, 0]} intensity={10} />
        <primitive object={gltf.scene} onClick={modelDetail} />
      </Suspense>
    </>
  );
};

function Page({ dirs }) {
  const [model, setModel] = useState<String>("tora-kun.glb");
  const callback = useCallback((payload) => {
    setModel(payload);
  }, []);
  console.log("model", model);
  return (
    <>
      <DOM dirs={dirs} model={callback} />

      <R3F model={model} />
    </>
  );
}

export default Page;
