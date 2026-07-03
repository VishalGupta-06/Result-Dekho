import React , { useEffect, useState } from "react";
import DropDown from "../Dashboard/DropDown.jsx";

const semOption = [
  "ALL",
  "Sem1",
  "Sem2",
  "Sem3",
  "Sem4",
  "Sem5",
  "Sem6",
  "Sem7",
  "Sem8",
];

const semMap = new Map();

semMap.set("Sem1", 1);
semMap.set("Sem2", 2);
semMap.set("Sem3", 3);
semMap.set("Sem4", 4);
semMap.set("Sem5", 5);
semMap.set("Sem6", 6);
semMap.set("Sem7", 7);
semMap.set("Sem8", 8);
semMap.set("ALL", 0);

const gradeStyles = {
  O: "bg-green-400 text-white",
  B: "bg-green-400 text-white",
  A: "bg-green-400 text-white",
  C: "bg-green-400 text-white",
  D: "bg-green-400 text-white",
  E: "bg-green-400 text-white",
  P: "bg-green-400 text-white",
  F: "bg-red-500 text-white",
};

function LatestSubjects({ marks }) {
    const [sem, setSem] = useState(semOption[0]);
    const [ result , setResult ] = useState({});

    useEffect(()=>{
      const index =sem === "ALL" ? marks.length - 1 : semMap.get(sem) - 1;

      

      if( marks.length >= index ){
        setResult(marks[index]);
        // console.log(marks)
      }
      
    },[marks , sem])
    
    const semNumber = ()=>{
      if(sem === "ALL"){
        const x = "Sem"+marks?.length;
        return x  || "--";
      }
      else{
        return sem || "--"
      }
    }


  
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70">
      <div className="flex flex-wrap items-center justify-between gap-3 ">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-[#015cee]">
           Subjects
          </p>
          <h2 className="mt-1 text-2xl font-bold text-slate-950">
            {semNumber()} grade sheet
          </h2>
        </div>

        <div className="flex items-center justify-center">
            <DropDown
              options={semOption}
              onChange={(e) => setSem(e.target.value)}
            />
          </div>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="min-w-full min-h-50 text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
              <th className="py-3 pl-2 font-bold">S No.</th>
              <th className="py-3 pr-4 font-bold">Subject</th>
              <th className="py-3 pr-4 font-bold">Credit</th>
              <th className="py-3 pr-4 font-bold">Grade</th>
            </tr>
          </thead>
          <tbody>
            {result?.subjects?.map(({ subject, credit, score } , index) => (
              <tr key={subject} className={`border-b border-slate-100 ${ index%2 === 0 ? "bg-gray-100" : ""} `}>
                <td className="py-3 pl-4 font-semibold text-slate-800">
                  {index+1}
                </td>
                <td className="py-3 pr-4 font-semibold text-slate-800">
                  {subject}
                </td>
                <td className="py-3 pr-4 text-slate-600">{credit}</td>
                <td className="py-3 pr-4">
                  <span
                    className={`inline-flex h-8 min-w-8 items-center justify-center rounded-full px-3 text-sm font-bold ${
                      gradeStyles[score] ?? "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {score}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default LatestSubjects;
