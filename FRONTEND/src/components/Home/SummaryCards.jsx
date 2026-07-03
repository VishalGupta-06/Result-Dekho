import React from "react";
import { FaAward, FaBookOpen, FaChartLine, FaCheckCircle } from "react-icons/fa";

function SummaryCards({ data }) {
  const summaryCards = [
    {
      icon: FaChartLine,
      label: "HIGEST CGPA",
      value: data.cgpa,
      detail: data.cgpaSem + "th Semester",
    },
    {
      icon: FaAward,
      label: "HIGEST SGPA",
      value: data.sgpa,
      detail: data.sgpaSem+ "th Semester",
    },
    {
      icon: FaBookOpen,
      label: "No. of Subjects",
      value: data.sub,
      detail: "Completed",
    },
    {
      icon: FaCheckCircle,
      label: "Result Status",
      value: data.result,
      detail: data.failSem = -1 ? "Good Job" : data.failSem+"th Semester",
    },
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {summaryCards.map(({ icon, label, value, detail }) => (
        <div
          key={label}
          className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/70"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-slate-500">
                {label}
              </p>
              <p className="mt-2 text-3xl font-bold text-slate-950">{value}</p>
            </div>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#015cee]">
              {React.createElement(icon)}
            </div>
          </div>
          <p className="mt-3 text-sm text-slate-600">{detail}</p>
        </div>
      ))}
    </section>
  );
}

export default SummaryCards;
