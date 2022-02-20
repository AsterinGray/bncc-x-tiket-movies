import { Box } from "@chakra-ui/react";
import { useRef, useState } from "react";

const DragScroll = ({ children }) => {
  const slider = useRef(null);
  const [mouseDown, setMouseDown] = useState(false);
  const [startPos, setStartPos] = useState();
  const [scrollPos, setScrollPos] = useState();

  const startScroll = (e) => {
    setMouseDown(true);
    setStartPos(e.pageX - slider.current.offsetLeft);
    setScrollPos(slider.current.scrollLeft);
  };

  const onMouseMove = (e) => {
    if (!mouseDown) return;
    const x = e.pageX - slider.current.offsetLeft;
    const scroll = x - startPos;
    slider.current.scrollLeft = scrollPos - scroll;
  };

  return (
    <Box
      display={"flex"}
      gridGap={"16px"}
      overflowX={"scroll"}
      py={2}
      onMouseMove={(e) => onMouseMove(e)}
      onMouseDown={(e) => startScroll(e)}
      onMouseUp={() => setMouseDown(false)}
      onMouseLeave={() => setMouseDown(false)}
      userSelect={"none"}
      cursor={mouseDown ? "grabbing" : "grab"}
      ref={slider}
    >
      {children}
    </Box>
  );
};

export default DragScroll;