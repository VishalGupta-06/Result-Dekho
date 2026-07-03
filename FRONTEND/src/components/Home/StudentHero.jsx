import React from "react";
import { FaGraduationCap } from "react-icons/fa";

const profileItems = [
  { label: "Registration No.", key: "reg" },
  { label: "Branch", key: "branch" },
  { label: "Batch", key: "batch" },
  { label: "Course", key: "course" },
];

function StudentHero({ student }) {
  return (
    <section className="overflow-hidden rounded-lg border border-blue-100 bg-white shadow-sm shadow-slate-200/70">
      <div className="grid gap-5 p-5 sm:p-6 xl:grid-cols-[1.35fr_0.65fr] xl:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-[#015cee]">
            Student Home
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-950 sm:text-4xl">
            {student.name}
          </h1>
          {/* <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
            View academic progress, semester performance, credits, and latest
            subject grades for {student.branchFullName}.
          </p> */}

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {profileItems.map(({ label, key }) => (
              <div key={label} className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  {label}
                </p>
                <p className="mt-1 font-bold text-slate-950">
                  {student[key]}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg bg-[#015cee] p-5 text-white shadow-lg shadow-blue-500/20">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/15">
              <FaGraduationCap className="text-2xl" />
            </div>
            <div>
              <p className="text-sm font-semibold text-blue-100">
                Latest Semester
              </p>
              <p className="text-3xl font-bold">
                Semester {student.sem}
              </p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-white/10 p-4">
              <p className="text-xs font-semibold uppercase text-blue-100">
                CGPA
              </p>
              <p className="mt-1 text-3xl font-bold">
                {student.cgpa}
              </p>
            </div>
            <div className="rounded-lg bg-white/10 p-4">
              <p className="text-xs font-semibold uppercase text-blue-100">
                SGPA
              </p>
              <p className="mt-1 text-3xl font-bold">
                {student.sgpa}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StudentHero;
