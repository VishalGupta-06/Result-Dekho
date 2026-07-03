import { useContext } from "react";
import UserContext from "../../utilities/ContextApi.jsx";
import DashboardSkeleton from "./Dashboardcopy.jsx";
import React, { useEffect, useState } from "react";
import DropDown from "./DropDown.jsx";
import TopperandLower from "./TopperandLower.jsx";
import AvgandTotal from "./AvgandTotal.jsx";
import AvgCard from "./AvgCard.jsx";
import CgpaDistribution from "./CgpaDistribution.jsx";

const branchOption = [
  "ALL",
  "CE",
  "CSE",
  "ECE",
  "ECM",
  "EE",
  "ME",
  "MM",
  "PIE",
];

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

const branchMap = new Map();

branchMap.set("CE", "CE");
branchMap.set("EE", "EE");
branchMap.set("ECE", "EC");
branchMap.set("ECM", "CM");
branchMap.set("CSE", "CS");
branchMap.set("ME", "ME");
branchMap.set("MM", "MM");
branchMap.set("PIE", "PI");

function Dashboard() {
  const [branch, setBranch] = useState(branchOption[0]);
  const [course, setCourse] = useState(courseOption[0]);
  const [sem, setSem] = useState(semOption[0]);
  const [year, setYear] = useState(yearOption[0]);
  const [dashboardData, setDashboardData] = useState([]);
  const [avgCgpa, setAvgCgpa] = useState(0);
  const [rank, setRank] = useState([]);
  const [noOfFailedStudent, setNoOfFailedStudent] = useState(0);
  const [CgpaDistributionData, setCgpaDistributionData] = useState([]);
  const [avgCgpaGraph, setAvgCgpaGraph] = useState([]);
  const { student, loading } = useContext(UserContext);

  useEffect(() => {
    if (!Array.isArray(student)) {
      setDashboardData([]);
      return;
    }

    const result = student.filter(
      (student) =>
        (year === "ALL" || student?.batch === Number(year)) &&
        (branch === "ALL" || student?.branch === branchMap.get(branch)),
    );

    setDashboardData(result);
  }, [student, branch, year]);

  //For Graph
  useEffect(() => {
    const graphAvgCgpa = new Array(6).fill(0);
    const graphTotalStudent = new Array(6).fill(0);
    const graphData = new Array(6).fill(0);

    for (let i = 0; i < 6; i++) {
      let total_Avg = 0;
      for (let j = 0; j < dashboardData.length; j++) {
        if (i < dashboardData[j].marks.length) {
          total_Avg += dashboardData[j].marks[i][courseMap.get(course)];
          if (dashboardData[j].marks[i][courseMap.get(course)] !== 0)
            graphTotalStudent[i]++;
        }
      }
      graphAvgCgpa[i] = total_Avg;
    }

    for (let i = 0; i < 6; i++) {
      if (graphTotalStudent[i] !== 0) {
        graphData[i] = (graphAvgCgpa[i] / graphTotalStudent[i]).toFixed(2);
      }
    }

    // console.log(graphData)

    setAvgCgpaGraph(graphData);
  }, [dashboardData, course]);

  //  console.log(course)

  //Avg cgpa
  useEffect(() => {
    const validStudents = dashboardData.filter(
      (student) => student.marks && student.marks.length > 0,
    );

    let totalCgpa = 0;
    let totalNoOfStudent = 0;

    validStudents.forEach((student) => {
      const index =
        sem === "ALL" ? student.marks.length - 1 : semMap.get(sem) - 1;

      if (student.marks[index]) {
        if (student.marks[index][courseMap.get(course)] !== 0)
          totalNoOfStudent += 1;
        totalCgpa += student.marks[index][courseMap.get(course)];
      }
    });
    setAvgCgpa(validStudents.length > 0 ? totalCgpa / totalNoOfStudent : 0);
    if (totalCgpa === 0) setAvgCgpa(0);
    setNoOfFailedStudent(validStudents.length - totalNoOfStudent);
    if (totalNoOfStudent === 0) setNoOfFailedStudent(0);
  }, [sem, course, dashboardData]);

  //sort

  useEffect(() => {
    const semesterWiseData = [...dashboardData].filter((items) => {
      if (sem === "ALL") return items;
      return items.marks.length >= semMap.get(sem);
    });

    const cgpaDis = new Array(6).fill(0);

    semesterWiseData.map((items) => {
      let index = sem === "ALL" ? items.marks.length - 1 : semMap.get(sem) - 1;
      if (items.marks[index][courseMap.get(course)] < 6) cgpaDis[0]++;
      else if (items.marks[index][courseMap.get(course)] < 7) cgpaDis[1]++;
      else if (items.marks[index][courseMap.get(course)] < 8) cgpaDis[2]++;
      else if (items.marks[index][courseMap.get(course)] < 9) cgpaDis[3]++;
      else if (items.marks[index][courseMap.get(course)] <= 10) cgpaDis[4]++;

      cgpaDis[5]++;
    });

    setCgpaDistributionData(cgpaDis);

    const sorted = semesterWiseData.sort((a, b) => {
      let aindex = sem === "ALL" ? a.marks.length - 1 : semMap.get(sem) - 1;
      let bindex = sem === "ALL" ? b.marks.length - 1 : semMap.get(sem) - 1;

      const aCgpa = a.marks[aindex][courseMap.get(course)];
      const bCgpa = b.marks[bindex][courseMap.get(course)];

      // console.log(aCgpa);

      return bCgpa - aCgpa;
    });

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

    const arr = [first, second, third];

    // console.log(arr);

    setRank(arr);
  }, [sem, course, dashboardData]);

  if (loading) return <DashboardSkeleton />;

  return (
    <>
      <div
        className={`min-h-screen w-full flex flex-col gap-5 bg-slate-50 p-3 sm:p-5 lg:p-6  ${loading ? "cursor-wait" : "cursor-default"} `}
      >
        <section className="overflow-hidden rounded-lg border border-blue-100 bg-white shadow-sm shadow-slate-200/70">
          <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[1.4fr_0.6fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-[#015cee]">
                National Institute of Technology Jamshedpur
              </p>
              <h1 className="mt-2 text-3xl font-bold text-slate-950 sm:text-4xl">
                CGPA Analyzer for NIT Jamshedpur
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
                Explore semester trends, department performance, toppers,
                backlogs, and student rankings in one simple academic dashboard.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#015cee]">
                  CGPA and SGPA
                </span>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                  Department analytics
                </span>
                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
                  Rank insights
                </span>
              </div>
            </div>

            <div className="rounded-lg bg-[#015cee] p-5 text-white shadow-lg shadow-blue-500/20">
              <p className="text-sm font-semibold text-blue-100">
                Current View
              </p>
              <p className="mt-2 text-3xl font-bold">{course}</p>
              <p className="mt-1 text-sm text-blue-100">
                {branch} branch, {sem}, {year}
              </p>
            </div>
          </div>
        </section>

        <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-sm shadow-slate-200/70">
          <div className="flex flex-col items-center justify-center">
            <p className="w-full text-slate-500 font-medium flex justify-center">
              CGPA/SGPA
            </p>

            <DropDown
              options={courseOption}
              onChange={(e) => setCourse(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="w-full text-slate-500 font-medium flex justify-center">
              Branch
            </p>
            <DropDown
              options={branchOption}
              onChange={(e) => setBranch(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="w-full text-slate-500 font-medium flex justify-center">
              Semester
            </p>

            <DropDown
              options={semOption}
              onChange={(e) => setSem(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="w-full text-slate-500 font-medium flex justify-center">
              Year
            </p>
            <DropDown
              options={yearOption}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
        </div>

        <div className="w-full">
          <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-4">
            <TopperandLower
              photoSrc="./need/first.png"
              name={rank[0]?.Name}
              rollNo={rank[0]?.rollNo}
              cgpa={rank[0]?.cgpa}
              title={course}
            />
            <TopperandLower
              photoSrc="./need/second.png"
              name={rank[1]?.Name}
              rollNo={rank[1]?.rollNo}
              cgpa={rank[1]?.cgpa}
              title={course}
            />
            <TopperandLower
              photoSrc="./need/third.png"
              name={rank[2]?.Name}
              rollNo={rank[2]?.rollNo}
              cgpa={rank[2]?.cgpa}
              title={course}
            />
            {/* <TopperandLower title={titleDiv} /> */}
            <AvgandTotal
              photo="2"
              title="Backlog"
              data={noOfFailedStudent}
              base="Students"
            />

            <AvgandTotal
              photo="growth"
              title={`AVERAGE ${course}`}
              data={avgCgpa.toFixed(2)}
              base="Overall Average"
            />
            <AvgandTotal
              photo="people"
              title="TOTAL STUDENTS"
              data={dashboardData.length}
              base="Total students"
            />
          </div>
        </div>

        <div className="w-full">
          <div className="w-full">
            <CgpaDistribution data={CgpaDistributionData} title={course} />
          </div>
        </div>

        <div className="w-full flex justify-center items-center">
          <div className="w-full">
            <AvgCard data={avgCgpaGraph} title={course} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
