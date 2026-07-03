import React from "react";
import { Tooltip } from "recharts";

// const departmentData = [
//   { dep: "CE", avgCgpa: 2.7 },
//   { dep: "CSE", avgCgpa: 8.7 },
//   { dep: "ECE", avgCgpa: 6.7 },
//   { dep: "ECM", avgCgpa: 7.7 },
//   { dep: "EE", avgCgpa: 9 },
//   { dep: "ME", avgCgpa: 7 },
//   { dep: "MM", avgCgpa: 8 },
//   { dep: "PIE", avgCgpa: 8.9 },
// ];

function AvgCgpa({data , title="CPGA"}) {

  // console.log(data)

  const departmentData = [
  { dep: "CE", avgCgpa: data[0] || 0},
  { dep: "CSE", avgCgpa: data[1] || 0 },
  { dep: "ECE", avgCgpa: data[2] || 0},
  { dep: "ECM", avgCgpa: data[3] || 0},
  { dep: "EE", avgCgpa: data[4] || 0},
  { dep: "ME", avgCgpa: data[5] || 0},
  { dep: "MM", avgCgpa: data[6]  || 0},
  { dep: "PIE", avgCgpa: data[7] || 0},
];
  return (
    <>
      <div className="w-full flex justify-center items-center">
        <div className="w-full border border-slate-200 bg-white flex flex-col rounded-lg p-4 shadow-sm shadow-slate-200/70">
          <div className="w-full min-h-10 text-center text-xl sm:text-2xl font-bold text-slate-950">
            
            {`Avg ${title} by Department`}
          </div>
          <div className="flex-1 w-full flex flex-col gap-3 mt-3">
            {departmentData.map((data, i) => {
              return (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-12 sm:w-14 font-bold text-sm text-slate-700 flex justify-center">
                    {data.dep}
                  </div>

                  <div className="flex-1 flex items-center">
                    <div className="bg-blue-100 w-full h-7 rounded-full overflow-hidden">
                      <div
                        className="bg-[#015cee] h-full rounded-full flex justify-end pr-3 min-w-8"
                        style={{ width: `${data.avgCgpa * 10}%` }}
                      >
                        <p className="text-white flex text-xs sm:text-sm font-semibold items-center">
                          {data.avgCgpa}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="w-full flex-1 flex mt-2">
            <div className="h-full w-12 sm:w-14"></div>
            <div className="h-full flex-1 flex flex-col">
              <div className="w-full flex justify-between text-xs sm:text-sm text-slate-500">
                <span>0</span>
                <span>2</span>
                <span>4</span>
                <span>6</span>
                <span>8</span>
                <span>10</span>
              </div>
              <div className="h-2 w-full"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AvgCgpa;
