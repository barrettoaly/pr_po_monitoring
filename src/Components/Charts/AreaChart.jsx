import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function AreaChartCustom({ data }) {
  return (
    <div style={{ width: "100%", height: 430 }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          {/* <CartesianGrid /> */}
          <XAxis dataKey="name" tick={{ fontSize: 10, fontWeight: 600 }} />
          <YAxis tick={{ fontSize: 10, fontWeight: 600 }} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="amt"
            stroke="#82AAE3"
            fill="#82AAE3"
            fillOpacity={0.3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AreaChartCustom;
