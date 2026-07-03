import React from "react";

const formatScore = (score) => {
  if (!Number.isFinite(score) || score <= 0) return "--";

  return score.toFixed(2);
};

function DepartmentInfoCard({ department, loading }) {
  if (!department?.hasData) {
    return (
      <div className="flex min-h-72 flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 p-5 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-slate-200 text-xl font-bold text-slate-500">
          {department?.code ?? "DEP"}
        </div>
        <p className="mt-4 font-bold text-slate-900">
          {loading ? "Loading department data" : department?.name}
        </p>
        <p className="mt-1 text-sm font-medium text-slate-500">
          {loading
            ? "Stats will appear here after the data loads."
            : "No students found for this department."}
        </p>
      </div>
    );
  }

  const stats = [
    { label: "Avg CGPA", value: formatScore(department.avgCgpa) },
    { label: "Avg SGPA", value: formatScore(department.avgSgpa) },
    { label: "Students", value: department.students },
    { label: "Backlogs", value: department.backlogs },
  ];

  return (
    <div className="min-h-72 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-[#015cee] text-xl font-bold text-white">
          {department.code}
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xl font-bold text-slate-950">{department.name}</p>
          <p className="mt-1 text-sm font-semibold text-slate-500">
            {department.code} Department
          </p>
          <p className="mt-3 text-sm font-medium text-slate-700">
            Topper: {department.topper?.name ?? "Not available"}
          </p>
          <p className="mt-1 text-xs font-semibold text-slate-500">
            {department.topper?.rollNo ?? "Roll number unavailable"}
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-lg bg-slate-100 p-3">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
              {stat.label}
            </p>
            <p className="mt-1 text-lg font-bold text-slate-950">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DepartmentInfoCard;
