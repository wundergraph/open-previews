import { motion } from "framer-motion";
import React, { ReactNode, useEffect, useRef, useState } from "react";

export const Draggable: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Create a ref to the element to which the drag constraints will be applied
  const constraintsRef = useRef(null);

  // Define the height and width of the draggable element
  const elementHeight = 48; // in px
  const elementWidth = 250; // in px

  // state to keep track of window dimensions
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Get the top and left positions of the draggable element from localStorage, or default to calculated values
  // Use Math.min to ensure that the positions are within the viewport's dimensions
  const initialTop = Math.min(
    Number(localStorage.getItem("top")) ||
      windowDimensions.height - elementHeight - 24,
    windowDimensions.height - elementHeight - 24
  );

  const initialLeft = Math.min(
    Number(localStorage.getItem("left")) ||
      windowDimensions.width / 2 - elementWidth / 2,
    windowDimensions.width - elementWidth
  );

  // On drag end, get the bounding rectangle of the draggable element and store its top and left positions in localStorage
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent) => {
    // @ts-expect-error
    const rect = event.target?.getBoundingClientRect();
    localStorage.setItem("top", rect.top);
    localStorage.setItem("left", rect.left);
  };

  useEffect(() => {
    function handleResize() {
      // Handle window resize event
      // Update window dimensions on resize
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // The div is as large as the viewport and the constraintsRef is assigned to it.
  // Inside, there is a motion.div that represents the draggable element.
  // On drag end, handleDragEnd function is called.
  // dragConstraints is set to constraintsRef, ensuring the element stays within the viewport.
  // dragMomentum is set to false, preventing the element from continuing to move after the drag ends.
  // dragElastic is set to 0, preventing the element from bouncing when it hits a constraint.
  // The position and dimensions of the draggable element are set in the style prop.
  return (
    <div
      ref={constraintsRef}
      className="preview-control"
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
      }}
    >
      <motion.div
        drag
        onDragEnd={handleDragEnd}
        dragConstraints={constraintsRef}
        dragMomentum={false}
        dragElastic={0}
        style={{
          background: "black",
          borderRadius: "30px",
          width: `${elementWidth}px`,
          height: `${elementHeight}px`,
          position: "fixed",
          top: `${initialTop}px`,
          left: `${initialLeft}px`,
          pointerEvents: "all",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};
