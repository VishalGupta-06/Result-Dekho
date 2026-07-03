import React from "react";
import TopperCard from "./TopperCard.jsx";

function TopperList({data , title = "CGPA"}) {

  // console.log(data)
  return (
    <div className="w-full rounded-lg flex flex-col gap-4">
      <div><TopperCard branch="CIVIL ENGINEERING" data={data[1]} bg="bg-slate-100" title={title} /></div>
      <div className="pb-2"><TopperCard branch="COMPUTER SCIENCE AND ENGINEERING" data={data[2]} title={title}/></div>
      <div className="pb-2"><TopperCard branch="ELECTRONICS AND COMMUNICATION ENGINEERING" data={data[3]} bg="bg-slate-100" title={title}/></div>
       <div className="pb-2"><TopperCard branch="ENGINEERING AND COMPUTATIONAL MECHANICS" data={data[4]} title={title}/></div>
      <div className="pb-2"><TopperCard branch="ELECTRICAL ENGINEERING" data={data[5]} bg="bg-slate-100" title={title}/></div>
      <div className="pb-2"><TopperCard branch="MECHANICAL ENGINEERING" data={data[6]} title={title}/></div>
      <div className="pb-2"><TopperCard branch="METALLURGICAL AND MATERIALS ENGINEERING" data={data[7]} bg="bg-slate-100" title={title}/></div>
      <div className="pb-2"><TopperCard branch="PRODUCTION AND INDUSTRIAL ENGINEERING" data={data[8]} title={title}/></div>
    </div>
  );
}

export default TopperList;
