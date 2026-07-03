import React from 'react'


function TopperandLower({title = "CGPA" , height="min-h-30" , photoSrc = "./need/profile1.png" , name = "" , rollNo = "" , cgpa = ""}) {
  return (
    <div className={`rounded-lg border border-slate-200 bg-white/95 shadow-sm shadow-slate-200/70 flex flex-col sm:flex-row overflow-hidden `}>
        <div className='w-full sm:w-[30%] min-h-24 sm:h-full flex justify-center items-center bg-slate-50 p-3'>
            <div className='h-20 w-20 sm:h-24 sm:w-24 flex justify-center items-center pt-3 rounded-full bg-white ring-4 ring-blue-100 shadow-sm'>
                <img className="object-contain h-[90%] w-[90%]" src={photoSrc}/>
            </div>
        </div>
        <div className='w-full sm:w-[40%] min-h-24 sm:h-full flex flex-col items-center px-3'>
            <div className='h-full w-full flex flex-col justify-center items-center py-3'>
                <p className='text-lg sm:text-xl font-bold text-slate-900 text-center max-w-[250px] font-[Inter]'>{name}</p>
                <p className='text-sm text-slate-500 text-center break-all'>{rollNo}</p>
            </div>
             
        </div >
        <div className='w-full sm:w-[30%] min-h-20 sm:h-full flex flex-col justify-center items-center bg-blue-50 px-3 py-4'>
            <p className='text-3xl sm:text-4xl lg:text-5xl font-bold text-[#015cee]'>{cgpa}</p>
            <p className="text-xs font-semibold uppercase text-slate-500">{title}</p>
        </div>
        
    </div>
  )
}

export default TopperandLower
