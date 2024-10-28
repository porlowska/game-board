// Home.js
import React, { useEffect, useRef } from "react";
import { Application } from "@splinetool/runtime";

const Home = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const app = new Application(canvasRef.current);

      // Determine the screen type and set the appropriate Spline link
      const splineLink =
        window.innerWidth >= 768
          ? "https://prod.spline.design/AryXIi3yVfUNDe0p/scene.splinecode" // Desktop link
          : "https://prod.spline.design/YourMobileLink/scene.splinecode"; // Mobile link

      app.load(splineLink);

      // Optional: Update the Spline link on resize
      const handleResize = () => {
        const newSplineLink =
          window.innerWidth >= 768
            ? "https://prod.spline.design/AryXIi3yVfUNDe0p/scene.splinecode"
            : "https://prod.spline.design/mJGbkRK8XLr-hwxB/scene.splinecode";
        app.load(newSplineLink);
      };

      // Add resize event listener
      window.addEventListener("resize", handleResize);

      // Cleanup event listener on component unmount
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
    <div className="w-full h-screen bg-[#f8f8f8]">
      <canvas ref={canvasRef} id="canvas3d" className="w-full h-full" />
    </div>
  );
};

export default Home;
