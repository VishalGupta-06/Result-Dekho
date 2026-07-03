import React from "react";

const winner = (name1, name2) => {
  if (!Object.keys(name1).length || !Object.keys(name2).length) return "";

   return name1.marks[name1?.marks.length-1].cgpa > name2.marks[name2?.marks.length-1].cgpa ? name1.name : name2.name ;
};

function WinnerCard({ data1, data2 }) {
  return (
    <>
      <div className="w-full h-full bg-[#015cee]  ">
        <div className="flex justify-center items-center h-8 font-bold text-md ">
          Current Leader
        </div>
        <div className="flex justify-center items-center font-bold text-2xl text-white">
          {winner(data1 , data2)}
        </div>
        <p className="flex justify-center font-medium gap-2 ">
          
          {Math.abs(((data1?.marks[data1?.marks.length-1].cgpa) - (data2?.marks[data2?.marks.length-1].cgpa)).toFixed(2))}
          <span>CGPA difference</span>
        </p>
      </div>
    </>
  );
}

export default WinnerCard;
