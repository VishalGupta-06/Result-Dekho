import React, { useState, useEffect } from "react";
import AvgCgpa from "./AvgCgpa";
import TopperList from "./TopperList";
import DropDown from "../Dashboard/DropDown.jsx";
import axios from "axios";
import { useContext } from "react";
import UserContext from "../../utilities/ContextApi.jsx";

const courseOption = ["CGPA", "SGPA"];
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
const yearOption = ["ALL", "2023", "2024", "2025"];

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

const courseMap = new Map();

courseMap.set("CGPA", "cgpa");
courseMap.set("SGPA", "sgpa");

function Department() {

  const [branch, setBranch] = useState("ALL");
  const [course, setCourse] = useState(courseOption[0]);
  const [sem, setSem] = useState(semOption[0]);
  const [year, setYear] = useState(yearOption[0]);
  const [deparmentData, setDepartmentData] = useState([]);
  const [avgCgpaData, setAvgCgpaData] = useState([]);
  const [topperListData, setTopperListData] = useState([[]]);
  const { student, loading } = useContext(UserContext);

   useEffect(() => {
      if (student?.length >= 0) {
        const result = student.filter(
          (student) =>
            (year === "ALL" || student?.batch === Number(year)) &&
            (branch === "ALL" || student?.branch === branchMap.get(branch)),
        );
  
        setDepartmentData(result);
      }
    }, [student, branch, year]);

  useEffect(() => {
    const ce = [...deparmentData].filter((items) => items.branch === "CE");
    const cs = [...deparmentData].filter((items) => items.branch === "CS");
    const ec = [...deparmentData].filter((items) => items.branch === "EC");
    const cm = [...deparmentData].filter((items) => items.branch === "CM");
    const ee = [...deparmentData].filter((items) => items.branch === "EE");
    const me = [...deparmentData].filter((items) => items.branch === "ME");
    const mm = [...deparmentData].filter((items) => items.branch === "MM");
    const pi = [...deparmentData].filter((items) => items.branch === "PI");

    const arr = [ce, cs, ec, cm, ee, me, mm, pi];

    const avg = [];
    const topper = [[]];

    arr.forEach((items) => {
      const semesterWiseData = items.filter((items) => {
        if (sem === "ALL") return items;
        return items.marks.length >= semMap.get(sem);
      });

      const sorted = semesterWiseData.sort((a, b) => {
        let aindex = sem === "ALL" ? a.marks.length - 1 : semMap.get(sem) - 1;
        let bindex = sem === "ALL" ? b.marks.length - 1 : semMap.get(sem) - 1;

        const aCgpa = a.marks[aindex][courseMap.get(course)];
        const bCgpa = b.marks[bindex][courseMap.get(course)];

        return bCgpa - aCgpa;
      });

      let avg_cgpa = 0;
      let total_st = 0;

      // console.log(sorted)

      sorted.map((items) => {
        let index =
          sem === "ALL" ? items.marks.length - 1 : semMap.get(sem) - 1;
        avg_cgpa += items.marks[index][courseMap.get(course)];
        if (items.marks[index][courseMap.get(course)] !== 0) total_st++;
      });

      // console.log(avg_cgpa)

      avg.push((avg_cgpa / total_st).toFixed(2));

      const first = {
        Name: sorted[0]?.name || "--",
        rollNo: sorted[0]?.studentID,
        cgpa: sorted[0]?.marks[
          sem === "ALL" ? sorted[0].marks.length - 1 : semMap.get(sem) - 1
        ][courseMap.get(course)],
      };
      // console.log(first)

      const second = {
        Name: sorted[1]?.name || "--",
        rollNo: sorted[1]?.studentID,
        cgpa: sorted[1]?.marks[
          sem === "ALL" ? sorted[1].marks.length - 1 : semMap.get(sem) - 1
        ][courseMap.get(course)],
      };

      // console.log(second)

      const third = {
        Name: sorted[2]?.name || "--",
        rollNo: sorted[2]?.studentID,
        cgpa: sorted[2]?.marks[
          sem === "ALL" ? sorted[2].marks.length - 1 : semMap.get(sem) - 1
        ][courseMap.get(course)],
      };

      const obj = [first, second, third];

      topper.push(obj);
    });

    setAvgCgpaData(avg);
    setTopperListData(topper);
  }, [deparmentData, course, sem]);

  return (
    <>
      <div
        className={`w-full min-h-screen bg-slate-50 p-3 sm:p-5 lg:p-6 ${loading ? "cursor-wait" : "cursor-default"} `}
      >
        <section className="mb-5 rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70">
          <p className="text-sm font-bold uppercase tracking-wide text-[#015cee]">
            NIT Jamshedpur CGPA Analyzer
          </p>
          <h1 className="mt-2 text-2xl font-bold text-slate-950 sm:text-3xl">
            Department Performance
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Compare average CGPA and department toppers across NIT Jamshedpur
            branches by semester, course type, and academic year.
          </p>
        </section>

        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-sm shadow-slate-200/70">
          <div className="flex w-full flex-col items-center justify-center ">
            <p className="w-full text-slate-500 font-medium flex justify-center">
              CGPA/SGPA
            </p>
            <div className="w-full sm:w-auto">
              <DropDown
                options={courseOption}
                onChange={(e) => setCourse(e.target.value)}
              />
            </div>
          </div>

          <div className="flex w-full flex-col items-center justify-center">
            <p className="w-full text-slate-500 font-medium flex justify-center">
              Semester
            </p>
            <div className="w-full sm:w-auto">
              <DropDown
                options={semOption}
                onChange={(e) => setSem(e.target.value)}
              />
            </div>
          </div>

          <div className="flex w-full flex-col items-center justify-center">
            <p className="w-full text-slate-500 font-medium flex justify-center">
              Year
            </p>
            <div className="w-full sm:w-auto">
              <DropDown
                options={yearOption}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center items-center mt-5">
          <AvgCgpa data={avgCgpaData} title={course} />
        </div>

        <div className="w-full flex flex-col justify-center items-center mt-5">
          <TopperList data={topperListData} title={course} />
        </div>
      </div>
    </>
  );
}

export default Department;
