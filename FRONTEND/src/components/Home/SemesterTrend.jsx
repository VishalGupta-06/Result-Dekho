import React from "react";

function SemesterTrend({ marks }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-[#015cee]">
            Semester Trend
          </p>
          <h2 className="mt-1 text-2xl font-bold text-slate-950">
            CGPA and SGPA progress
          </h2>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-700">
          All Pass
        </span>
      </div>

      <div className="mt-5 space-y-4">
        {marks.map((semester) => (
          <div key={semester.semester}>
            <div className="mb-2 flex items-center justify-between text-sm">
              <p className="font-bold text-slate-700">
                Semester {semester.semester}
              </p>
              <p className="font-bold text-slate-950">
                CGPA {semester.cgpa.toFixed(2)} / SGPA{" "}
                {semester.sgpa.toFixed(2)}
              </p>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-[#015cee]"
                style={{ width: `${semester.cgpa * 10}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SemesterTrend;
