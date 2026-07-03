import React from "react";
import TopperandLower from "../Dashboard/TopperandLower.jsx";

function TopperCard( {branch = "PRODUCTION AND INDUSTRIAL ENGINEERING" , data = [{} , {} , {}] ,bg ="bg-white" , title = "CGPA"}) {
 
  // console.log(data)
  return (
    <>
      <div className={`w-full flex flex-col border border-slate-200 rounded-lg p-3 shadow-sm shadow-slate-200/70 ${bg}`}>
        <div className="w-full min-h-10 flex justify-center items-center text-center text-sm sm:text-base font-bold text-slate-900">
         {branch}
        </div>
        <div className="w-full flex-1 grid grid-cols-2 gap-2 sm:gap-3 px-0 sm:px-2">
          <TopperandLower  photoSrc = "./need/first.png" name={data[0].Name}rollNo={data[0].rollNo} cgpa={data[0].cgpa}  title={title} />
          <TopperandLower  photoSrc = "./need/second.png" name={data[1].Name} rollNo={data[1].rollNo} cgpa={data[1].cgpa} title={title} />

          <div className="col-span-2 flex justify-center ">
            <div className="w-1/2 min-w-0 grid grid-cols-1 ">
              <TopperandLower photoSrc = "./need/third.png" name={data[2].Name} rollNo={data[2].rollNo} cgpa={data[2].cgpa}  title={title} />
            </div>
          </div>

         
        </div>
      </div>
    </>
  );
}

export default TopperCard;
