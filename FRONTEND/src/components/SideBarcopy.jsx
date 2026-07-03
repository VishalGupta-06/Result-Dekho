import React from "react";

function SideBarSkeleton() {
  return (
    <div className="h-auto md:h-full w-full md:w-[15vw] bg-[#015cee] top-13 border-b md:border-b-0 md:border-r border-blue-700/40 shadow-lg shadow-blue-950/10">

      {/* Toggle */}
      <div className="hidden md:flex h-16 items-center px-4">
        <div className="h-10 w-10 rounded-lg bg-white/20 animate-pulse"></div>
      </div>

      {/* Navigation */}
      <div className="w-full h-auto md:h-[80%] flex md:block overflow-x-auto md:overflow-visible">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-16 md:h-[10%] flex flex-1 md:flex-none flex-col md:flex-row items-center justify-center md:justify-start px-3"
          >
            {/* Icon */}
            <div className="h-11 w-11 rounded-xl bg-white/20 animate-pulse shrink-0"></div>

            {/* Mobile Label */}
            <div className="md:hidden mt-2 h-2 w-12 rounded bg-white/20 animate-pulse"></div>

            {/* Desktop Label */}
            <div className="hidden md:flex ml-4">
              <div className="h-4 w-24 rounded bg-white/20 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Logout */}
      <div className="hidden md:flex w-full h-[20%] items-start pt-3 px-3">
        <div className="flex items-center w-full">
          <div className="h-11 w-11 rounded-xl bg-white/20 animate-pulse"></div>

          <div className="ml-4 h-4 w-24 rounded bg-white/20 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

export default SideBarSkeleton;
