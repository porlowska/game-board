// SplineDesign.js
import React, { useEffect, useRef } from "react";
import { Application } from "@splinetool/runtime";

const SplineDesign = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const app = new Application(canvasRef.current);
    const splineLink = "https://prod.spline.design/AryXIi3yVfUNDe0p/scene.splinecode";
    app.load(splineLink);

    // Cleanup on unmount to free resources
    return () => app.dispose();
  }, []);

  return <canvas ref={canvasRef} id="canvas3d" className="w-full h-full" />;
};

export default SplineDesign;
