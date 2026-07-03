import { useState } from "react";

function DropDown({ options ,width = "w-full sm:w-44 lg:w-64" , onChange}) {


  return (

    <div className="w-full">
      
      <select
        onChange={onChange}
        className={`h-11 ${width} rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 shadow-sm outline-none transition focus:border-[#015cee] focus:ring-4 focus:ring-blue-100`}
      >
        
        { options.map((item , index)=>(
          <option key={index} value={item}>{item}</option>
        ))}
      </select>
    </div>

  )

}

export default DropDown
