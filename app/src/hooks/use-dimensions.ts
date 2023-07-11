import { useEffect, useState } from "react";

export const useDimensions = () => {
    const [dimensions, setDimensions] = useState<number>(
        window.innerHeight + window.innerWidth
      );

      useEffect(() => {
        const rerender = () =>
          setDimensions(
            window.innerHeight + window.innerWidth + window.scrollX + window.scrollY
          );
    
        window.addEventListener("resize", rerender);
        window.addEventListener("scroll", rerender);
    
        return () => {
          window.removeEventListener("resize", rerender);
          window.removeEventListener("scroll", rerender);
        };
      }, []);

      return dimensions
}