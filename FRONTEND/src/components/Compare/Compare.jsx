import React from "react";
import { useState } from "react";
// import Student from "./Student12.jsx";
import Student from "./Student.jsx";
import Depart from "./Depart.jsx";

const tabs = [
  { id: "student", label: "Student VS Student" },
  { id: "department", label: "Department VS Department" },
];

function Compare() {
  const [activeTab, setActiveTab] = useState("student");

  return (
    <div className="min-h-full w-full bg-[#f6f8fb] px-3 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <header className="flex flex-col gap-5 rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-[#015cee]">
              NIT Jamshedpur CGPA Analyzer
            </p>
            <h1 className="mt-2 text-2xl font-bold text-slate-950 sm:text-3xl">
              Academic Comparison
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-500">
              Compare NIT Jamshedpur students or departments side by side with
              quick stats, CGPA trends, and head-to-head academic insights.
            </p>
          </div>

          <div className="grid w-full grid-cols-2 gap-1 rounded-lg border border-slate-200 bg-white p-1 shadow-sm lg:w-[460px]">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-md px-2 py-3 text-xs font-semibold transition sm:px-4 sm:text-sm ${
                  activeTab === tab.id
                    ? "bg-[#015cee] text-white shadow-md shadow-blue-500/20"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </header>

        <div className="flex-1">
          { activeTab === "student"? <Student/> : <Depart/>}
        </div>
      </div>
    </div>
  );
}

export default Compare;
