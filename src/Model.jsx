import { useAnimations, useGLTF } from "@react-three/drei";
import React, { useEffect, useRef, useState } from "react";
import { useObjectStore } from "./App";

function Model(props) {
  let box = useRef();

  const { scene, animations } = useGLTF("/Crocodile_02.glb");
  const { actions } = useAnimations(animations, box);
  let { object, setObject, play } = useObjectStore();
  useEffect(() => {
    object = box;
    setObject(object);
    // location.reload();
    //********************************************** */
    if (actions.Animation?.enabled) {
      actions.Animation.play();
      actions.Animation.repetitions = 0;
      actions.Animation.reset();
      actions.Animation.clampWhenFinished = true;
    }
    if (actions["CrocAnim02_Box"]?.enabled) {
      actions["CrocAnim02_Box"].play();
      actions["CrocAnim02_Box"].repetitions = 0;
      actions["CrocAnim02_Box"].reset();
      actions["CrocAnim02_Box"].clampWhenFinished = true;

      actions["CrocAnim02"].play();
      actions["CrocAnim02"].repetitions = 0;
      actions["CrocAnim02"].reset();
      actions["CrocAnim02"].clampWhenFinished = true;
    }
  }, [play, scene]);

  return (
    <primitive ref={box} position={[0, -3, -3]} object={scene} {...props} />
  );
}

export default Model;
