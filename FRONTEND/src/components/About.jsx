import React from "react";
import {
  FaChartLine,
  FaGraduationCap,
  FaShieldAlt,
  FaUsers,
} from "react-icons/fa";

const highlights = [
  {
    icon: FaChartLine,
    title: "Academic Insights",
    text: "Track CGPA, SGPA, department averages, rank movement, and result distribution from one place.",
  },
  {
    icon: FaUsers,
    title: "Student Friendly",
    text: "Built around simple filters so students can quickly compare branches, semesters, and performance trends.",
  },
  {
    icon: FaShieldAlt,
    title: "Controlled Access",
    text: "Public pages remain open while account-based features can be protected when required.",
  },
];

const stats = [
  { value: "8", label: "Departments" },
  { value: "8", label: "Semesters" },
  { value: "2023-2025", label: "Result Years" },
  { value: "24/7", label: "Dashboard Access" },
];

function About() {
  return (
    <div className="min-h-screen w-full bg-slate-50 p-3 sm:p-5 lg:p-6">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5">
        <section className="overflow-hidden rounded-lg border border-blue-100 bg-white shadow-sm shadow-slate-200/70">
          <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-[#015cee]">
                About The Project
              </p>
              <h1 className="mt-2 text-3xl font-bold text-slate-950 sm:text-4xl">
                NIT Jamshedpur CGPA Analyzer
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
                A student-focused dashboard for exploring academic performance,
                rankings, department trends, and semester-wise result data. 
              </p>
            </div>

            <div className="rounded-lg bg-[#015cee] p-5 text-white shadow-lg shadow-blue-500/20">
              <FaGraduationCap className="text-4xl text-blue-100" />
              <p className="mt-4 text-3xl font-bold">Built for Students</p>
              <p className="mt-2 text-sm leading-6 text-blue-100">
                Clean academic data views for faster result analysis.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ value, label }) => (
            <div
              key={label}
              className="rounded-lg border border-slate-200 bg-white p-4 text-center shadow-sm shadow-slate-200/70"
            >
              <p className="text-3xl font-bold text-[#015cee]">{value}</p>
              <p className="mt-1 text-sm font-semibold text-slate-600">
                {label}
              </p>
            </div>
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          {highlights.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-[#015cee]">
                <Icon />
              </div>
              <h2 className="mt-4 text-xl font-bold text-slate-950">
                {title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-5 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70">
            <p className="text-sm font-bold uppercase tracking-wide text-[#015cee]">
              Our Goal
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-950">
              Make result analysis easier
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              The analyzer helps students and administrators understand result
              patterns without manually checking large spreadsheets.
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70">
            <p className="text-sm font-bold uppercase tracking-wide text-[#015cee]">
              Project Team
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-950">
              Team Members
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-slate-50 p-4">
                <p className="font-bold text-slate-950">Vishal Kumar</p>
                <p className="mt-1 text-sm text-slate-600">Admin</p>
              </div>
              
              <div className="rounded-lg bg-slate-50 p-4">
                <p className="font-bold text-slate-950">Akriti Burnwal</p>
                <p className="mt-1 text-sm text-slate-600">Data Manage</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-4">
                <p className="font-bold text-slate-950">Goldy</p>
                <p className="mt-1 text-sm text-slate-600">Problem Creater</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;
