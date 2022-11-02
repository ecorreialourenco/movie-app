import { MouseEvent } from "react";

interface BarProps {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  onMouseEnter: (e: MouseEvent<SVGPathElement>) => void;
  onMouseLeave: () => void;
}

export const Bar = ({
  x,
  y,
  width,
  height,
  color,
  onMouseEnter,
  onMouseLeave,
}: BarProps) => {
  const radius = height === 0 ? 0 : width * 0.15;

  return (
    <path
      d={`
        m${x},${y + radius}
        a${radius},${radius} 0 0 1 ${radius},${-radius}
        h${width - 2 * radius}
        a${radius},${radius} 0 0 1 ${radius},${radius}
        v${height - radius}
        h-${width}
        z
      `}
      fill={color}
      onMouseEnter={(event) => onMouseEnter(event)}
      onMouseLeave={onMouseLeave}
    />
  );
};
