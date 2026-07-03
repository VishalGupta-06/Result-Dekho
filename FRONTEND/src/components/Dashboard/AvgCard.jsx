import React from "react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

import Card from "../../utilities/Card";

// const SEM_TREND_DATA1 = [
//   { sem: "Sem1", avg: 7.2 },
//   { sem: "Sem2", avg: 7.5 },
//   { sem: "Sem3", avg: 7.8 },
//   { sem: "Sem4", avg: 8.0 },
//   { sem: "Sem5", avg: 8.2 },
//   { sem: "Sem6", avg: 5.4 },
//   { sem: "Sem7", avg: 0},
//   { sem: "Sem8", avg: 0 },
// ];

const TOOLTIP_STYLE = {
  borderRadius: "10px",
  border: "1px solid #ddd",
};

const BW = {
  muted: "#666"
};

function AvgCard( {data , title} ) {

  const SEM_TREND_DATA = [
  { sem: "Sem1", avg: data[0] },
  { sem: "Sem2", avg: data[1] },
  { sem: "Sem3", avg: data[2] },
  { sem: "Sem4", avg: data[3] },
  { sem: "Sem5", avg: data[4] },
  { sem: "Sem6", avg: data[5] },
].filter(item => item.avg > 0);

  return (

    <div className="h-full w-full">

      <Card>

        <div className="
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
        ">

         
          {` Semester-wise Avg ${title}`}
        </div>

        <ResponsiveContainer
        width="100%"
        height={220}
        >

          <AreaChart

          data={SEM_TREND_DATA}
          // data={SEM_TREND_DATA1}

          margin={{
            top:20,
            right:35,   // pushes Sem8 inward
            left:1,    // pushes Sem1 away from Y axis
            bottom:10
          }}

          >

            <defs>

              <linearGradient
              id="bwGrad"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
              >

                <stop
                offset="5%"
                stopColor="#000"
                stopOpacity={0.12}
                />

                <stop
                offset="95%"
                stopColor="#000"
                stopOpacity={0}
                />

              </linearGradient>

            </defs>

            <CartesianGrid
            strokeDasharray="3 3"
            stroke="#918E8E"
            vertical={false}
            />

            <XAxis

            dataKey="sem"

            padding={{
              left:20,
              right:10
            }}

            tick={{
              fill: BW.muted,
              fontSize: 11
            }}

            axisLine={false}
            tickLine={false}

            />

            <YAxis

            domain={[4,10]}

            tick={{
              fill: BW.muted,
              fontSize: 11
            }}

            axisLine={false}
            tickLine={false}

            />

            <Tooltip
            contentStyle={TOOLTIP_STYLE}
            />

            <Area

            type="monotone"

            dataKey="avg"

            stroke="#000"

            strokeWidth={2.5}

            fill="url(#bwGrad)"

            dot={{
              r:4,
              fill:"#000",
              stroke:"#fff",
              strokeWidth:2
            }}

            />

          </AreaChart>

        </ResponsiveContainer>

      </Card>

    </div>

  );
}

export default AvgCard;
