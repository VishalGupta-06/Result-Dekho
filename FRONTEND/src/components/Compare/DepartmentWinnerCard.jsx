import React from "react";

const formatScore = (score) => {
  if (!Number.isFinite(score)) return "0.00";

  return score.toFixed(2);
};

const getLeader = (data1, data2) => {
  if (!data1?.hasData || !data2?.hasData) return "Waiting for data";
  if (data1.avgCgpa === data2.avgCgpa) return "Tie";

  return data1.avgCgpa > data2.avgCgpa ? data1.name : data2.name;
};

function DepartmentWinnerCard({ data1, data2 }) {
  const cgpaGap =
    data1?.hasData && data2?.hasData
      ? Math.abs(data1.avgCgpa - data2.avgCgpa)
      : 0;

  return (
    <section className="overflow-hidden rounded-lg border border-blue-100 bg-[#015cee] p-4 text-center text-white shadow-sm shadow-blue-500/20">
      <p className="text-sm font-bold uppercase tracking-wide text-blue-100">
        Current Leader
      </p>
      <p className="mt-2 text-2xl font-bold">{getLeader(data1, data2)}</p>
      <p className="mt-2 text-sm font-semibold text-blue-100">
        {formatScore(cgpaGap)} average CGPA difference
      </p>
    </section>
  );
}

export default DepartmentWinnerCard;
