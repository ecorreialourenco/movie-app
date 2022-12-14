import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import { Bar } from "./components/Bar";
import "./BarChart.scss";

interface IGroupedData {
  label: string;
  value: number;
}

interface Props {
  data: IGroupedData[];
}

interface Tooltip {
  x: number;
  y: number;
  index: number;
}

export function BarChart({ data }: Props) {
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);
  const axisBottomRef = useRef<SVGGElement>(null);
  const axisLeftRef = useRef<SVGGElement>(null);

  const margin = { top: 10, right: 50, bottom: 20, left: 50 };
  const width = window.innerWidth - margin.left - margin.right;
  const height = 250 - margin.top - margin.bottom;

  const labels = data.map(({ label }) => label);
  const sublabels = Object.keys(data[0].value);
  const value = data.map(({ value }) => value).flat();

  const scaleX = d3.scaleBand().domain(labels).range([0, width]).padding(0.2);
  const scaleY = d3
    .scaleLinear()
    .domain([0, Math.max(...value)])
    .range([height, 0]);
  const subscaleX = d3
    .scaleBand()
    .domain(sublabels)
    .range([0, scaleX.bandwidth()])
    .padding(0.05);

  useEffect(() => {
    if (axisBottomRef.current) {
      d3.select(axisBottomRef.current).call(d3.axisBottom(scaleX));
    }

    if (axisLeftRef.current) {
      d3.select(axisLeftRef.current).call(d3.axisLeft(scaleY));
    }
  }, [scaleX, scaleY]);

  return (
    <>
      <svg
        width={width + margin.left + margin.right}
        height={height + margin.top + margin.bottom}
      >
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <g
            ref={axisBottomRef}
            transform={`translate(0, ${height})`}
            className="bar-chart-g"
          />
          <g ref={axisLeftRef} fontSize="6" />
          {data.map(({ label, value }, groupIndex) => (
            <g
              key={`rect-group-${groupIndex}`}
              transform={`translate(${scaleX(label)}, 0)`}
              fontSize="6"
            >
              <Bar
                x={0}
                y={scaleY(value)}
                width={subscaleX.bandwidth()}
                height={height - scaleY(value)}
                color="teal"
                onMouseEnter={(event) => {
                  setTooltip({
                    x: event.clientX,
                    y: event.clientY,
                    index: groupIndex,
                  });
                }}
                onMouseLeave={() => setTooltip(null)}
              />
            </g>
          ))}
        </g>
      </svg>
      <div className="bar-chart-info">
        {tooltip !== null ? (
          <>
            <span className="tooltip__title">{labels[tooltip.index]}</span>
            <span className="">{value[tooltip.index]}</span>
          </>
        ) : null}
      </div>
    </>
  );
}
