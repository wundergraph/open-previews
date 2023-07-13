import { useEffect, useState } from "react";

export const useDimensions = () => {
    const [dimensions, setDimensions] = useState<{width: number, height: number}>({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    useEffect(() => {
      const rerender = () =>
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
  
      window.addEventListener("resize", rerender);
  
      return () => {
        window.removeEventListener("resize", rerender);
      };
    }, []);

    return dimensions
}