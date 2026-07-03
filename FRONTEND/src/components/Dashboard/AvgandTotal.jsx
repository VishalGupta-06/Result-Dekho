import React from "react";

function AvgandTotal( {photo = "profile1" , title = "" , data = "" , base = ""}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 min-h-30 flex items-center shadow-sm shadow-slate-200/70">
      <div className="w-[32%] h-full flex justify-center items-center">
        <div className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 rounded-full bg-blue-50 p-2 ring-4 ring-blue-100">
          <img
            className="object-contain h-full w-full"
            src={`./need/${photo}.png`}
          />
        </div>
        
      </div>
      <div className="h-full flex-1 flex flex-col justify-center">
        <div className="w-full text-xs sm:text-sm font-bold text-[#015cee] flex justify-center items-center text-center">{`${title}`}</div>
        <div className="w-full font-bold text-slate-950 text-3xl sm:text-4xl lg:text-5xl flex justify-center items-center">{`${data}`}</div>
        <div className="w-full text-xs sm:text-sm text-slate-500 flex justify-center items-center text-center">{`${base}`}</div>
      </div>
    </div>
  );
}

export default AvgandTotal;
