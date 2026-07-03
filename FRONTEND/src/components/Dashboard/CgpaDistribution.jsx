import React from "react";

function CgpaDistribution({ data , title }) {
  const classBands = [
    { label: "Below-6 CGPA", val: data[0] || 0 },
    { label: "6-7 CGPA", val: data[1] || 0 },
    { label: "7-8 CGPA", val: data[2] || 0 },
    { label: "8-9 CGPA", val: data[3] || 0},
    { label: "9-10 CGPA", val:data[4] || 0 },
  ];

  const n = data[5] || 10;
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/70">
      {/* Title */}

      <div className="text-xl sm:text-2xl font-bold text-slate-950 text-center mb-3">
        {`${title} Distribution`}
      </div>

      {classBands.map((data, i) => {
        const pt = ((data.val / n) * 100).toFixed(0);

        return (
          <div
            key={i}
            className={`flex flex-col justify-center items-center gap-1`}
          >
            {/* Label Row */}

            <div className="flex justify-between w-full text-sm font-medium text-slate-600">
              <span>{data.label}</span>

              <span className="font-semibold text-slate-900">
                {data.val}
                <span> </span>

                <span className="ml-1">({pt}%)</span>
              </span>
            </div>

            {/* Progress Background */}

            <div className="h-2 bg-blue-100 w-full rounded-full overflow-hidden">
              {/* Filled Progress */}

              <div
                className="h-full bg-[#015cee] rounded-full"
                style={{
                  width: `${pt}%`,
                }}
              />
            </div>
            <div className="h-0.5"></div>
          </div>
        );
      })}
    </div>
  );
}

export default CgpaDistribution;
