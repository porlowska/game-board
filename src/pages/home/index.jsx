import React, { useEffect, useRef } from "react";
import { Application } from "@splinetool/runtime";

const Home = () => {
  const canvasRef = useRef(null);
  const appRef = useRef(null); // Ref to store the Spline Application instance

  useEffect(() => {
    if (canvasRef.current) {
      appRef.current = new Application(canvasRef.current);

      // Determine the screen type and set the appropriate Spline link
      const loadSplineScene = () => {
        const splineLink =
          window.innerWidth >= 768
            ? "https://prod.spline.design/AryXIi3yVfUNDe0p/scene.splinecode" // Desktop link
            : "https://prod.spline.design/mJGbkRK8XLr-hwxB/scene.splinecode"; // Mobile link

        appRef.current.load(splineLink);
      };

      // Initial load based on current screen size
      loadSplineScene();

      // Optional: Update the Spline link on resize with debouncing
      const handleResize = () => {
        clearTimeout(appRef.current.resizeTimeout);
        appRef.current.resizeTimeout = setTimeout(() => {
          loadSplineScene();
        }, 300); // 300ms debounce delay
      };

      // Add resize event listener
      window.addEventListener("resize", handleResize);

      // Cleanup on component unmount
      return () => {
        window.removeEventListener("resize", handleResize);
        clearTimeout(appRef.current.resizeTimeout);
        if (appRef.current) appRef.current.dispose(); // Stop and clean up Spline app instance
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
