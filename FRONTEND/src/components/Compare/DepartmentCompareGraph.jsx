import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const tooltipStyle = {
  borderRadius: "10px",
  border: "1px solid #ddd",
};

function DepartmentCompareGraph({ data1, data2 }) {
  const maxSemester = Math.max(data1?.trend?.length || 0, data2?.trend?.length || 0);
  const chartData = Array.from({ length: maxSemester }, (_, index) => ({
    sem: `Sem ${index + 1}`,
    department1: (data1?.trend?.[index]?.avgCgpa).toFixed(2) || null,
    department2: (data2?.trend?.[index]?.avgCgpa).toFixed(2) || null,
  }));

  return (
    <div className="h-full w-full">
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-[#015cee]">
            Semester-wise trend
          </p>
          <h2 className="text-xl font-bold text-slate-950">
            Department average CGPA comparison
          </h2>
        </div>
        <p className="text-sm font-medium text-slate-500">Average CGPA</p>
      </div>

      <div className="h-72">
        {chartData.length === 0 ? (
          <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 text-sm font-semibold text-slate-500">
            Select departments with data to view the graph.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 20,
                right: 35,
                left: 1,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis
                dataKey="sem"
                tick={{
                  fill: "#64748b",
                  fontSize: 11,
                }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[0, 10]}
                tick={{
                  fill: "#64748b",
                  fontSize: 11,
                }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend />
              <Line
                type="monotone"
                dataKey="department1"
                name={data1?.code || "Department 1"}
                stroke="#000000"
                strokeWidth={3}
                dot={{
                  r: 5,
                  fill: "#000000",
                }}
                connectNulls
              />
              <Line
                type="monotone"
                dataKey="department2"
                name={data2?.code || "Department 2"}
                stroke="#2563eb"
                strokeWidth={3}
                dot={{
                  r: 5,
                  fill: "#2563eb",
                }}
                connectNulls
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export default DepartmentCompareGraph;
