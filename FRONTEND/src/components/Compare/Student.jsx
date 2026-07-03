import React, { useState, useEffect } from "react";
import axios from "axios";
import InfoCard from "./InfoCard.jsx";
import WinnerCard from "./WinnerCard.jsx";
import CompareGraph from "./CompareGraph.jsx";
import { useContext } from "react";
import UserContext from "../../utilities/ContextApi.jsx";

function Student1() {
  const [searchData, setSearchData] = useState([]);
  const [dataInSearchBox1, setDataInSearchBox1] = useState("");
  const [dataInSearchBox2, setDataInSearchBox2] = useState("");
  const [showSuggestion1, setShowSuggestion1] = useState(false);
  const [showSuggestion2, setShowSuggestion2] = useState(false);
  const [student1, setStudent1] = useState({});
  const [student2, setStudent2] = useState({});
  const { student, loading } = useContext(UserContext);

  const fetchData = async (value) => {
    try {
      if (student?.length >= 0) {
        const result = student.filter(
          (obj) =>
            obj.name.toLowerCase().startsWith(value.toLowerCase()) ||
            obj.studentID.toLowerCase().startsWith(value.toLowerCase()),
        );

        setSearchData(result);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    {
      dataInSearchBox1 && fetchData(dataInSearchBox1);
    }
  }, [dataInSearchBox1]);

  useEffect(() => {
    {
      dataInSearchBox2 && fetchData(dataInSearchBox2);
    }
  }, [dataInSearchBox2]);

  return (
    <div className="flex flex-col gap-5">
      <section className=" rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className=" grid gap-3 lg:grid-cols-[1fr_auto_1fr] lg:items-end">
          <label className=" relative min-w-0 flex flex-col gap-2 text-sm font-semibold text-slate-700 ">
            <input
              type="text"
              value={dataInSearchBox1}
              placeholder="Student1"
              onFocus={() => setShowSuggestion1(true)}
              onBlur={() => setShowSuggestion1(false)}
              onChange={(e) => setDataInSearchBox1(e.target.value)}
              className="h-12 rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#015cee] focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
            {showSuggestion1 && searchData.length > 0 && (
              <div className="absolute top-full z-50 w-full bg-gray-50 border-2 border-gray-300 rounded-2xl shadow-olive-100 max-h-50 overflow-y-auto ">
                {searchData.map((st) => (
                  <div
                    className="flex  font-medium p-1 px-3 hover:bg-gray-50 cursor-pointer"
                    key={st.studentID}
                    onMouseDown={() => (
                      setDataInSearchBox1(st.studentID),
                      setStudent1(st),
                      setShowSuggestion1(false)
                    )}
                  >
                    <div className="flex w-full flex-col gap-1 bg-gray-100 sm:flex-row sm:justify-between">
                      <div className=" border border-gray-200 bg-gray-50 rounded-sm m-1 p-1">
                        {st.name}
                      </div>
                      <div className=" border border-gray-200 bg-gray-50 rounded-sm m-1 p-1">
                        {st.studentID}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </label>

          <div className="flex h-12 items-center justify-center rounded-lg border border-slate-200 bg-[#015cee] px-5 text-sm font-bold text-white shadow-sm shadow-blue-500/20">
            VS
          </div>

          <label className=" relative min-w-0 flex flex-col gap-2 text-sm font-semibold text-slate-700">
            <input
              type="text"
              value={dataInSearchBox2}
              placeholder="Student2"
              onFocus={() => setShowSuggestion2(true)}
              onBlur={() => setShowSuggestion2(false)}
              onChange={(e) => setDataInSearchBox2(e.target.value)}
              className="h-12 rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#015cee] focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
            {showSuggestion2 && searchData.length > 0 && (
              <div className="absolute top-full z-50 w-full bg-gray-50 border-2 border-gray-300 rounded-2xl shadow-olive-100 max-h-50 overflow-y-auto ">
                {searchData.map((st) => (
                  <div
                    className="flex  font-medium p-1 px-3 hover:bg-gray-100 cursor-pointer"
                    key={st.studentID}
                    onMouseDown={() => (
                      setDataInSearchBox2(st.studentID),
                      setStudent2(st),
                      setShowSuggestion2(false)
                    )}
                  >
                    <div className="flex w-full flex-col gap-1 bg-gray-100 sm:flex-row sm:justify-between">
                      <div className=" border border-gray-200 bg-gray-50 rounded-sm m-1 p-1">
                        {st.name}
                      </div>
                      <div className=" border border-gray-200 bg-gray-50 rounded-sm m-1 p-1">
                        {st.studentID}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </label>
        </div>
      </section>

      <section className=" rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:gap-8">
          <InfoCard studentData={student1} />
          <InfoCard studentData={student2} />
        </div>
      </section>

      {Object.keys(student1).length !== 0 &&
        Object.keys(student2).length !== 0 && (
          <section className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
            <div className="w-full h-25">
              <WinnerCard data1={student1} data2={student2} />
            </div>
          </section>
        )}

      {(Object.keys(student1).length !== 0 ||
        Object.keys(student2).length !== 0) && (
        <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <CompareGraph data1={student1} data2={student2} />
        </section>
      )}
    </div>
  );
}

export default Student1;
