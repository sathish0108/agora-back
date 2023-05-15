import React, { Suspense, useEffect, useRef, useState } from "react";
import { Interactive, XR, ARButton, Controllers, useXR } from "@react-three/xr";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Loader, useGLTF } from "@react-three/drei";
// import { ControllerGestures } from './Assets/ControllerGestures.js'
import { DragControls } from "three/examples/jsm/controls/DragControls";
import ArEvents from "./Events";
import ArDragControls from "./ArDragControls";
import Model from "./Model";
import html2canvas from "html2canvas";

import { create } from "zustand";
import Webcam from "react-webcam";

export const useObjectStore = create((set) => ({
  object: null,
  setObject: (x) => set(() => ({ object: x })),
  play: 0,
  setPlay: (x) => set(() => ({ play: x })),
}));

export default function App() {
  let canvas = useRef();

  // const { scene } = useGLTF('/scene.glb')
  let plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  // const { camera } = useCamera();
  let camera;
  let [cam, setCam] = useState();
  let [Scene, setScene] = useState();
  let [renderer, setRenderer] = useState();
  let [active, setActive] = useState(false);
  let ref = useRef();
  let { object, play, setPlay } = useObjectStore();
  const webcamRef = useRef(null);
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  //working
  // const capture = () => {
  //   // document.querySelector("canvas")

  //   const can = document.querySelector("canvas");

  //   const dataURI = can.toDataURL("image/jpeg");
  //   console.log(dataURI);
  //   console.log(can);
  // };

  const capture = () => {
    // document.querySelector("canvas")
    console.log(document.body);
    html2canvas(document.body).then((canvas) => {
      const dataURI = canvas.toDataURL("image/jpeg");
      console.log(dataURI);
    });

    // const can = document.querySelector("canvas");

    // const dataURI = can.toDataURL("image/jpeg");
    // console.log(dataURI);
    // console.log(can);
  };

  return (
    <div id="test" className="canvas" ref={canvas}>
      <button
        className="play-btn"
        onClick={() => {
          play++;
          setPlay(play);
          //  console.log('play: ', play);
        }}
      >
        Play
      </button>
      <button onClick={capture} className="capture-btn">
        Capture
      </button>

      {!active ? (
        <ArEvents box={object} canvas={canvas} />
      ) : (
        <ArDragControls
          box={object}
          cam={cam}
          renderer={renderer}
          active={active}
        />
      )}
      <ARButton />
      {/* <Button camera={cam} /> */}
      <Canvas
        gl={{ preserveDrawingBuffer: true, autoClear: true }}
        onCreated={({ scene, camera, raycaster, gl }) => {
          setCam(camera);
          setScene(scene);
          setRenderer(gl);
        }}
      >
        <Suspense fallback={null}>
          <XR
            referenceSpace="local"
            ref={ref}
            onSessionEnd={() => location.reload()}
          >
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Model
              onClick={() => {
                if (active === false) {
                  setActive(true);
                }
              }}
              onPointerUp={() => {
                if (active === true) {
                  setActive(false);
                }
              }}
            />
            <Controllers />
          </XR>
        </Suspense>
      </Canvas>
      <Loader />
    </div>
  );
}
