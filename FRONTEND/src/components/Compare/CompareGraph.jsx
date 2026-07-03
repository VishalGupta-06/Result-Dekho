import React from "react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import Card from "../../utilities/Card";

const TOOLTIP_STYLE = {
  borderRadius: "10px",
  border: "1px solid #ddd",
};

const BW = {
  muted: "#666",
};

function AvgCard({ data1, data2 }) {
  const maxSems = Math.max(
    data1?.marks?.length || 0,
    data2?.marks?.length || 0,
  );

  const SEM_TREND_DATA = Array.from({ length: maxSems }, (_, i) => ({
    sem: `Sem${i + 1}`,
    student1: data1?.marks?.[i]?.cgpa ?? null,
    student2: data2?.marks?.[i]?.cgpa ?? null,
  }));

  return (
    <div className="h-full w-full">
      <Card>
        <div
          className="
            min-h-10
            w-full
            flex
            justify-center
            items-center
            text-xl
            sm:text-2xl
            font-bold
            text-slate-950
            mb-2
          "
        >
          Semester-wise CGPA Comparison
        </div>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart
            data={SEM_TREND_DATA}
            margin={{
              top: 20,
              right: 35,
              left: 1,
              bottom: 10,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#918E8E"
              vertical={false}
            />

            <XAxis
              dataKey="sem"
              padding={{
                left: 20,
                right: 10,
              }}
              tick={{
                fill: BW.muted,
                fontSize: 11,
              }}
              axisLine={true}
              tickLine={true}
            />

            <YAxis
              domain={[0, 10]}
              tick={{
                fill: BW.muted,
                fontSize: 11,
              }}
              axisLine={true}
              tickLine={true}
            />

            <Tooltip contentStyle={TOOLTIP_STYLE} />

            <Legend />

            <Line
              type="monotone"
              dataKey="student1"
              name={data1?.name || "Stident 1"}
              stroke="#000000"
              strokeWidth={3}
              dot={{
                r: 5,
                fill: "#000000",
              }}
            />

            <Line
              type="monotone"
              dataKey="student2"
              name={data2?.name || "Student 2"}
              stroke="#2563eb"
              strokeWidth={3}
              dot={{
                r: 5,
                fill: "#2563eb",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}

export default AvgCard;
