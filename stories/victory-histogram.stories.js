/*eslint-disable no-magic-numbers*/
/*eslint-disable react/no-multi-comp*/
import React from "react";
import { VictoryHistogram } from "../packages/victory-histogram/src";
import { VictoryChart } from "../packages/victory-chart/src";
import { VictoryLine } from "../packages/victory-line/src";
import { VictoryScatter } from "../packages/victory-scatter/src";
import { VictoryTooltip } from "../packages/victory-tooltip/src";
import { VictoryStack } from "../packages/victory-stack/src";
import { VictoryTheme } from "../packages/victory-core/src";
import { getData } from "./data";
import { data, timeData } from "./victory-histogram-data";

import * as d3Array from "d3-array";
import * as d3Scale from "d3-scale";
import * as d3Time from "d3-time";

const containerStyle = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center"
};

const parentStyle = {
  parent: { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" }
};

export default {
  title: "VictoryHistogram",
  component: VictoryHistogram
};

export const DefaultRendering = () => {
  return (
    <div style={containerStyle}>
      <VictoryHistogram style={parentStyle} data={data} />
      <VictoryChart style={parentStyle}>
        <VictoryHistogram data={data} />
      </VictoryChart>
      <VictoryHistogram style={parentStyle} theme={VictoryTheme.material} data={data} />
      <VictoryChart style={parentStyle} theme={VictoryTheme.material}>
        <VictoryHistogram data={data} />
      </VictoryChart>
    </div>
  );
};

export const BinSpacing = () => {
  return (
    <div style={containerStyle}>
      <VictoryChart style={parentStyle}>
        <VictoryHistogram data={data} binSpacing={10} />
      </VictoryChart>
      <VictoryChart style={parentStyle} horizontal>
        <VictoryHistogram data={data} binSpacing={10} />
      </VictoryChart>
      <VictoryChart style={parentStyle}>
        <VictoryHistogram data={data} binSpacing={5} />
      </VictoryChart>
      <VictoryChart style={parentStyle} horizontal>
        <VictoryHistogram data={data} binSpacing={5} />
      </VictoryChart>
    </div>
  );
};

export const Data = () => {
  const oneYear = timeData.map(({ x }) => {
    const newDate = new Date(x);
    newDate.setFullYear(2020);
    return { x: newDate };
  });

  const fourMonths = timeData.map(({ x }, index) => {
    const newDate = new Date(x);
    newDate.setFullYear(2020);
    newDate.setMonth(Math.ceil(index / 200));
    return { x: newDate };
  });

  const oneMonth = timeData.map(({ x }) => {
    const newDate = new Date(x);
    newDate.setMonth(4);
    newDate.setFullYear(2020);
    return { x: newDate };
  });

  return (
    <div style={containerStyle}>
      <VictoryChart style={parentStyle} horizontal>
        <VictoryHistogram data={timeData} />
      </VictoryChart>
      <VictoryChart style={parentStyle}>
        <VictoryHistogram data={oneYear} />
      </VictoryChart>
      <VictoryChart style={parentStyle}>
        <VictoryHistogram data={fourMonths} />
      </VictoryChart>
      <VictoryChart style={parentStyle} horizontal>
        <VictoryHistogram data={oneMonth} />
      </VictoryChart>
      <VictoryChart style={parentStyle}>
        <VictoryHistogram data={data.map(({ x }) => ({ value: x }))} x={({ value }) => value} />
      </VictoryChart>
      <VictoryChart style={parentStyle}>
        <VictoryHistogram
          bins="year"
          data={timeData.map(({ x }) => ({ value: x }))}
          x={({ value }) => value}
        />
      </VictoryChart>
    </div>
  );
};

export const EmptyData = () => {
  return (
    <div style={containerStyle}>
      <VictoryChart style={parentStyle}>
        <VictoryHistogram data={[]} bins={2} />
      </VictoryChart>
      <VictoryChart style={parentStyle}>
        <VictoryHistogram data={[]} bins={[0, 30, 100, 150]} />
      </VictoryChart>
      <VictoryChart style={parentStyle}>
        <VictoryHistogram
          scale={{ x: "time" }}
          data={[]}
          bins={[new Date(2015, 0, 1), new Date(2020, 0, 1), new Date(2025, 0, 1)]}
        />
      </VictoryChart>
      <VictoryChart style={parentStyle} horizontal>
        <VictoryHistogram
          scale={{ x: "time" }}
          data={[]}
          bins={[new Date(2015, 0, 1), new Date(2020, 0, 1), new Date(2025, 0, 1)]}
        />
      </VictoryChart>
    </div>
  );
};

export const DateBins = () => {
  const niceTimeScale = d3Scale
    .scaleTime()
    .domain(d3Array.extent(timeData, ({ x }) => x))
    .nice();

  return (
    <div style={containerStyle}>
      <VictoryChart style={parentStyle}>
        <VictoryHistogram
          data={timeData}
          bins={[new Date(2010, 0, 1), new Date(2020, 5, 1), new Date(2021, 0, 1)]}
        />
      </VictoryChart>
      <VictoryChart style={parentStyle} horizontal>
        <VictoryHistogram
          data={timeData}
          bins={[new Date(2010, 0, 1), new Date(2020, 5, 1), new Date(2021, 0, 1)]}
        />
      </VictoryChart>
      <VictoryChart style={parentStyle}>
        <VictoryHistogram data={timeData} bins={2} />
      </VictoryChart>
      <VictoryChart style={parentStyle} horizontal>
        <VictoryHistogram data={timeData} bins={2} />
      </VictoryChart>
      <VictoryChart style={parentStyle}>
        <VictoryHistogram data={timeData} bins={10} />
      </VictoryChart>
      <VictoryChart style={parentStyle} horizontal>
        <VictoryHistogram data={timeData} bins={10} />
      </VictoryChart>
      <VictoryChart style={parentStyle}>
        <VictoryHistogram data={timeData} bins={niceTimeScale.ticks(d3Time.utcDay)} />
      </VictoryChart>
      <VictoryChart style={parentStyle}>
        <VictoryHistogram data={timeData} bins={niceTimeScale.ticks(d3Time.utcMonth)} />
      </VictoryChart>
      <VictoryChart style={parentStyle}>
        <VictoryHistogram data={timeData} bins={niceTimeScale.ticks(d3Time.utcYear)} />
      </VictoryChart>
    </div>
  );
};

export const NumericBins = () => {
  return (
    <div style={containerStyle}>
      <VictoryChart style={parentStyle}>
        <VictoryHistogram data={data} bins={2} />
      </VictoryChart>
      <VictoryChart style={parentStyle} horizontal>
        <VictoryHistogram data={data} bins={2} />
      </VictoryChart>
      <VictoryChart style={parentStyle}>
        <VictoryHistogram data={data} bins={8} />
      </VictoryChart>
      <VictoryChart style={parentStyle} horizontal>
        <VictoryHistogram data={data} bins={8} />
      </VictoryChart>
      <VictoryChart style={parentStyle}>
        <VictoryHistogram data={data} bins={48} />
      </VictoryChart>
      <VictoryChart style={parentStyle} horizontal>
        <VictoryHistogram data={data} bins={48} />
      </VictoryChart>
      <VictoryChart style={parentStyle}>
        <VictoryHistogram data={data} bins={[0, 30, 50]} />
      </VictoryChart>
      <VictoryChart style={parentStyle} horizontal>
        <VictoryHistogram data={data} bins={[0, 30, 50]} />
      </VictoryChart>
      <VictoryChart style={parentStyle}>
        <VictoryHistogram data={data} bins={[0, 30, 50, 100]} />
      </VictoryChart>
      <VictoryChart style={parentStyle} horizontal>
        <VictoryHistogram data={data} bins={[0, 30, 50, 100]} />
      </VictoryChart>
      <VictoryChart style={parentStyle}>
        <VictoryHistogram data={data} bins={[0, 10, 30, 70, 150]} />
      </VictoryChart>
      <VictoryChart style={parentStyle} horizontal>
        <VictoryHistogram data={data} bins={[0, 10, 30, 70, 150]} />
      </VictoryChart>
    </div>
  );
};

export const Styles = () => {
  return (
    <div style={containerStyle}>
      <VictoryChart style={parentStyle}>
        <VictoryHistogram
          data={data}
          style={{ data: { transform: "translate(0px, -20px) skew(2deg, 2deg)" } }}
        />
      </VictoryChart>
      <VictoryChart style={parentStyle} horizontal>
        <VictoryHistogram
          data={data}
          style={{
            labels: {
              fill: ({ datum }) =>
                datum.binnedData.some(({ x }) => x === 22) ? "palevioletred" : "black"
            },
            data: {
              stroke: ({ datum }) => (datum.y > 3 ? "red" : "transparent"),
              strokeWidth: 3,
              opacity: ({ datum }) => (datum.y > 3 ? 1 : 0.4)
            }
          }}
          labels={["one", "two", "three", "four", "five"]}
        />
      </VictoryChart>
    </div>
  );
};

export const CornerRadius = () => {
  return (
    <div style={containerStyle}>
      <VictoryChart style={parentStyle}>
        <VictoryHistogram data={data} cornerRadius={1} />
      </VictoryChart>
      <VictoryChart style={parentStyle} horizontal>
        <VictoryHistogram data={data} cornerRadius={1} />
      </VictoryChart>
      <VictoryChart style={parentStyle}>
        <VictoryHistogram data={data} cornerRadius={10} />
      </VictoryChart>
      <VictoryChart style={parentStyle} horizontal>
        <VictoryHistogram data={data} cornerRadius={10} />
      </VictoryChart>
      <VictoryChart style={parentStyle}>
        <VictoryHistogram data={data} cornerRadius={{ topLeft: 15, bottomRight: 30 }} />
      </VictoryChart>
      <VictoryChart style={parentStyle} horizontal>
        <VictoryHistogram data={data} cornerRadius={{ topLeft: 15, bottomRight: 22 }} />
      </VictoryChart>
    </div>
  );
};

export const GetPath = () => {
  const verticalPathFn = (props) => {
    // eslint-disable-next-line react/prop-types
    const { x0, x1, y0, y1 } = props;
    return `M ${x0}, ${y0}
      L ${(x1 + x0) / 2}, ${y1}
      L ${x1}, ${y0}
      z`;
  };

  const horizontalPathFn = (props) => {
    // eslint-disable-next-line react/prop-types
    const { x0, x1, y0, y1 } = props;
    return `M ${x0}, ${y1}
      L ${x1}, ${(y0 + y1) / 2}
      L ${x0}, ${y0}
      z`;
  };

  return (
    <div style={containerStyle}>
      <VictoryChart style={parentStyle}>
        <VictoryHistogram data={data} getPath={verticalPathFn} />
      </VictoryChart>
      <VictoryChart style={parentStyle} horizontal>
        <VictoryHistogram data={data} getPath={horizontalPathFn} />
      </VictoryChart>
    </div>
  );
};

export const Labels = () => {
  return (
    <div style={containerStyle}>
      <VictoryChart style={parentStyle}>
        <VictoryHistogram
          data={data}
          bins={5}
          labels={({ datum }) => `${datum.x0} - ${datum.x1}`}
        />
      </VictoryChart>
      <VictoryChart style={parentStyle} horizontal>
        <VictoryHistogram
          data={data}
          bins={5}
          labels={({ datum }) => `${datum.x0} - ${datum.x1}`}
        />
      </VictoryChart>
      <VictoryChart style={parentStyle}>
        <VictoryHistogram data={data} bins={5} labels={["", "", "three", "four", 5, "six"]} />
      </VictoryChart>
      <VictoryChart style={parentStyle} horizontal>
        <VictoryHistogram data={data} bins={5} labels={["", "", "three", "four", 5, "six"]} />
      </VictoryChart>
      <VictoryChart style={parentStyle}>
        <VictoryHistogram
          data={data}
          bins={5}
          labels={({ datum }) => `${datum.x0} - ${datum.x1}`}
          labelComponent={<VictoryTooltip active />}
        />
      </VictoryChart>
      <VictoryChart style={parentStyle} horizontal>
        <VictoryHistogram
          data={data}
          bins={5}
          labels={["one", "two", 3, "wow, four tooltips", "five"]}
          labelComponent={<VictoryTooltip active />}
        />
      </VictoryChart>
    </div>
  );
};

export const Scale = () => {
  return (
    <div style={containerStyle}>
      <VictoryChart style={parentStyle} domainPadding={{ y: 25 }}>
        <VictoryHistogram
          binSpacing={10}
          data={timeData}
          bins="year"
          labels={({ datum }) => `${datum.x0.getFullYear()}\n|\n${datum.x1.getFullYear()}`}
        />
      </VictoryChart>
      <VictoryChart style={parentStyle} horizontal domainPadding={{ y: 35 }}>
        <VictoryHistogram
          binSpacing={10}
          data={timeData}
          bins="year"
          labels={({ datum }) => `${datum.x0.getFullYear()} - ${datum.x1.getFullYear()}`}
        />
      </VictoryChart>
      <VictoryChart style={parentStyle} scale={{ y: "log" }} minDomain={{ y: 1 }}>
        <VictoryHistogram data={data} />
      </VictoryChart>
      <VictoryChart style={parentStyle} scale={{ y: "log" }} minDomain={{ y: 1 }} horizontal>
        <VictoryHistogram data={data} />
      </VictoryChart>
    </div>
  );
};

export const MixedCharts = () => {
  return (
    <div style={containerStyle}>
      <VictoryChart style={parentStyle}>
        <VictoryHistogram data={data} />
        <VictoryLine
          data={[
            { x: 0, y: 5 },
            { x: 10, y: 5 },
            { x: 20, y: 2 },
            { x: 30, y: 9 },
            { x: 50, y: 2 },
            { x: 60, y: 4 },
            { x: 80, y: 12 },
            { x: 120, y: 8 }
          ]}
        />
      </VictoryChart>
      <VictoryChart style={parentStyle} horizontal>
        <VictoryHistogram data={data} />
        <VictoryScatter
          data={[
            { x: 0, y: 5 },
            { x: 10, y: 5 },
            { x: 20, y: 2 },
            { x: 30, y: 9 },
            { x: 50, y: 2 },
            { x: 60, y: 4 },
            { x: 80, y: 12 },
            { x: 120, y: 8 }
          ]}
        />
      </VictoryChart>
    </div>
  );
};

export const Stacked = () => {
  const stackedData = [
    ...[50, 30, 100, 32, 50, 10, 49, 78, 20].map((count) => getData(count, count, 100)),
    [{ x: 1 }, { x: 3 }, { x: 1 }, { x: 2 }]
  ];

  return (
    <div style={containerStyle}>
      <VictoryChart style={parentStyle}>
        <VictoryStack colorScale="qualitative" bins={[0, 20, 65, 90, 100]}>
          {stackedData.map((d, index) => (
            <VictoryHistogram data={d} key={index} />
          ))}
        </VictoryStack>
      </VictoryChart>
      <VictoryChart style={parentStyle} horizontal>
        <VictoryStack colorScale="qualitative" bins={[0, 20, 65, 90, 100]}>
          {stackedData.map((d, index) => (
            <VictoryHistogram data={d} key={index} />
          ))}
        </VictoryStack>
      </VictoryChart>
      <VictoryChart style={parentStyle}>
        <VictoryStack colorScale="qualitative" bins={5}>
          {stackedData.map((d, index) => (
            <VictoryHistogram data={d} key={index} bins={index === 0 ? [0, 20, 100] : undefined} />
          ))}
        </VictoryStack>
      </VictoryChart>
      <VictoryChart style={parentStyle}>
        <VictoryStack colorScale="qualitative" bins={5}>
          {stackedData.map((d, index) => (
            <VictoryHistogram binSpacing={10} data={d} key={index} />
          ))}
        </VictoryStack>
      </VictoryChart>
      <VictoryChart style={parentStyle}>
        <VictoryStack colorScale="qualitative">
          <VictoryHistogram data={data.map(({ x }) => ({ a: { b: { c: x } } }))} x="a.b.c" />
          {stackedData.map((d, index) => (
            <VictoryHistogram data={d} key={index} />
          ))}
        </VictoryStack>
      </VictoryChart>
      <VictoryChart style={parentStyle} horizontal>
        <VictoryStack colorScale="qualitative">
          <VictoryHistogram data={data.map(({ x }) => ({ a: { b: { c: x } } }))} x="a.b.c" />
          {stackedData.map((d, index) => (
            <VictoryHistogram data={d} key={index} />
          ))}
        </VictoryStack>
      </VictoryChart>
    </div>
  );
};

export const Domain = () => {
  return (
    <div style={containerStyle}>
      <VictoryHistogram style={parentStyle} data={data} domain={{ x: [20, 100], y: [3, 10] }} />
      <VictoryChart style={parentStyle} domain={{ x: [20, 100], y: [3, 10] }}>
        <VictoryHistogram data={data} />
      </VictoryChart>
      <VictoryChart style={parentStyle} minDomain={{ x: 40 }}>
        <VictoryHistogram data={data} />
      </VictoryChart>
      <VictoryChart style={parentStyle} maxDomain={{ y: 4 }}>
        <VictoryHistogram data={data} />
      </VictoryChart>
    </div>
  );
};
