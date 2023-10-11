"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";

interface Props {
  title: string;
}

const TearButton = ({ title }: Props) => {
  const [isDragging, setIsDragging] = useState(false);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  const [line, setLine] = useState({ width: 0, rotation: 0 });

  const handleDragStart = (event: any, info: any) => {
    if (ref.current) {
      //@ts-ignore
      const rect = ref.current?.getBoundingClientRect();
      //@ts-ignore
      const parentRect = ref.current?.parentElement.getBoundingClientRect();
      setInitialPosition({
        x: rect.left - parentRect.left,
        y: rect.top - parentRect.top,
      });
    }
  };

  const handleDragStop = () => {
    setIsDragging(false);
  };

  const handleDrag = (event: any, info: any) => {
    // info.point will contain the x and y values of the current drag position
    setCoordinates({
      x: info.offset.x + initialPosition.x,
      y: info.offset.y + initialPosition.y,
    });
    setLine(
      getLineProps(
        0,
        0,
        info.offset.x + initialPosition.x + 16,
        info.offset.y + initialPosition.y
      )
    );
  };

  function getLineProps(x1: number, y1: number, x2: number, y2: number) {
    // Calculate the length (width) of the line
    const width = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

    // Calculate the rotation angle
    const angleRad = Math.atan2(y2 - y1, x2 - x1);
    const angleDeg = angleRad * (180 / Math.PI);

    return { width, rotation: angleDeg };
  }

  return (
    <div className="flex flex-col">
      <div className="relative rounded-full w-96 border-2 border-dashed border-neutral-200 text-center">
        <div className="w-full bg-white py-2 px-2 rounded-full flex flex-row items-center relative">
          <motion.div
            ref={ref}
            drag
            onMouseDown={() => setIsDragging(true)}
            onDrag={handleDrag}
            onDragStart={handleDragStart}
            onDragEnd={handleDragStop}
            dragMomentum={false}
            className="bg-[#B9F921] text-white rounded-full w-[32px] h-[32px] flex items-center justify-center absolute left-1 top-1 active:opacity-0 "
          >
            →
          </motion.div>
          <motion.div
            className="bg-neutral-300 w-[0px] h-[38px] absolute top-0 left-1 rounded-r-full pointer-events-none"
            style={{
              opacity: isDragging ? 1 : 0,
              transformOrigin: "0% 19px",
              rotate: line.rotation,
              width: line.width + 16,
            }}
          ></motion.div>
          <div className="flex-1 text-center">{title}</div>
        </div>
      </div>
    </div>
  );
};

export default TearButton;
