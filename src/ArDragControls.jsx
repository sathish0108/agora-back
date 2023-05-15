import React, { useEffect } from "react";
import { DragControls } from "three/examples/jsm/controls/DragControls";

function ArDragControls({ cam, renderer, box, active }) {
  useEffect(() => {
    let dragC;
    if (box.current && cam && renderer) {
      dragC = new DragControls([box.current], cam, renderer.domElement);
    //   if (active) {
    //     dragC.deactivate();
    //     dragC.enabled = !active;
    //   }
      dragC.transformGroup = true;
    }
    return () => {
      dragC?.dispose();
    };
  }, [renderer, cam, active]);
  return <></>;
}

export default ArDragControls;
