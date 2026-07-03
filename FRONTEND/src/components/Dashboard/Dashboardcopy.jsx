
import React from "react";

const Bar = ({ className = "" }) => (
  <div className={`animate-pulse rounded bg-slate-200 ${className}`} />
);

function Card() {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-4">
        <Bar className="h-12 w-12 rounded-full" />
        <div className="flex-1">
          <Bar className="h-4 w-2/3 mb-2" />
          <Bar className="h-7 w-1/3" />
        </div>
      </div>
    </div>
  );
}

function TopperCard() {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex gap-4 items-center">
        <Bar className="h-20 w-20 rounded-full" />
        <div className="flex-1">
          <Bar className="h-5 w-2/3 mb-3" />
          <Bar className="h-4 w-1/2 mb-2" />
          <Bar className="h-6 w-20" />
        </div>
      </div>
    </div>
  );
}

export default function DashboardSkeleton() {
  return (
    <div className="min-h-screen w-full flex flex-col gap-5 bg-slate-50 p-3 sm:p-5 lg:p-6">

      <section className="overflow-hidden rounded-lg border border-blue-100 bg-white shadow-sm">
        <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[1.4fr_0.6fr]">
          <div>
            <Bar className="h-4 w-48 mb-4" />
            <Bar className="h-10 w-3/4 mb-4" />
            <Bar className="h-4 w-full mb-2" />
            <Bar className="h-4 w-5/6 mb-6" />

            <div className="flex flex-wrap gap-3">
              <Bar className="h-8 w-28 rounded-full" />
              <Bar className="h-8 w-36 rounded-full" />
              <Bar className="h-8 w-28 rounded-full" />
            </div>
          </div>

          <div className="rounded-lg bg-slate-200 p-5 animate-pulse">
            <Bar className="h-4 w-28 mb-4 bg-slate-300" />
            <Bar className="h-9 w-40 mb-4 bg-slate-300" />
            <Bar className="h-4 w-48 bg-slate-300" />
          </div>
        </div>
      </section>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
        {[1,2,3,4].map(i=>(
          <div key={i} className="flex flex-col gap-3">
            <Bar className="h-4 w-20 mx-auto" />
            <Bar className="h-10 w-full rounded-md" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <TopperCard />
        <TopperCard />
        <TopperCard />
        <Card />
        <Card />
        <Card />
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <Bar className="h-6 w-56 mb-6" />
        <div className="flex items-end justify-between h-72 gap-3 animate-pulse">
          {[30,55,90,120,170,140].map((h,i)=>(
            <div key={i} className="flex-1 rounded-t bg-slate-200" style={{height:h}} />
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <Bar className="h-6 w-48 mb-6" />
        <div className="h-72 w-full rounded-lg bg-slate-200 animate-pulse relative overflow-hidden">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
            <polyline
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="2"
              points="0,30 15,28 30,20 45,24 60,14 75,16 90,8 100,12"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
