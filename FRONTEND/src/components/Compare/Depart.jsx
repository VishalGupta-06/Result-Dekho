import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import DepartmentCompareGraph from "./DepartmentCompareGraph.jsx";
import DepartmentInfoCard from "./DepartmentInfoCard.jsx";
import DepartmentWinnerCard from "./DepartmentWinnerCard.jsx";
import { useContext } from "react";
import UserContext from "../../utilities/ContextApi.jsx";

const DEPARTMENTS = [
  { code: "CE", branch: "CE", name: "Civil Engineering" },
  { code: "CSE", branch: "CS", name: "Computer Science and Engineering" },
  {
    code: "ECE",
    branch: "EC",
    name: "Electronics and Communication Engineering",
  },
  {
    code: "ECM",
    branch: "CM",
    name: "Engineering and Computational Mechanics",
  },
  { code: "EE", branch: "EE", name: "Electrical Engineering" },
  { code: "ME", branch: "ME", name: "Mechanical Engineering" },
  { code: "MM", branch: "MM", name: "Metallurgical and Materials Engineering" },
  { code: "PIE", branch: "PI", name: "Production and Industrial Engineering" },
];

const yearOption = ["ALL", "2023", "2024", "2025"];

const getLatestMark = (student) => {
  if (!student?.marks?.length) return null;
  return student.marks[student.marks.length - 1];
};

const getScore = (mark, key) => {
  const score = Number(mark?.[key]);
  return Number.isFinite(score) ? score : 0;
};

const average = (values) => {
  const validValues = values.filter((value) => value > 0);

  if (!validValues.length) return 0;

  return (
    validValues.reduce((total, value) => total + value, 0) / validValues.length
  );
};

const getDepartmentByCode = (code) => {
  return (
    DEPARTMENTS.find((department) => department.code === code) ?? DEPARTMENTS[0]
  );
};

const getDepartmentSummary = (students, departmentCode) => {
  const department = getDepartmentByCode(departmentCode);
  const departmentStudents = students.filter(
    (student) => student.branch === department.branch,
  );
  const latestMarks = departmentStudents.map(getLatestMark);
  const cgpaValues = latestMarks.map((mark) => getScore(mark, "cgpa"));
  const sgpaValues = latestMarks.map((mark) => getScore(mark, "sgpa"));
  const maxSemester = Math.max(
    0,
    ...departmentStudents.map((student) => student?.marks?.length || 0),
  );

  const rankedStudents = departmentStudents
    .map((student) => ({
      name: student.name,
      rollNo: student.studentID,
      cgpa: getScore(getLatestMark(student), "cgpa"),
    }))
    .filter((student) => student.cgpa > 0)
    .sort((first, second) => second.cgpa - first.cgpa);

  const trend = Array.from({ length: maxSemester }, (_, index) => {
    const semesterValues = departmentStudents.map((student) =>
      getScore(student?.marks?.[index], "cgpa"),
    );

    return {
      sem: `Sem ${index + 1}`,
      avgCgpa: average(semesterValues),
    };
  });

  return {
    ...department,
    avgCgpa: average(cgpaValues),
    avgSgpa: average(sgpaValues),
    backlogs: cgpaValues.filter((value) => value === 0).length,
    hasData: departmentStudents.length > 0,
    students: departmentStudents.length,
    topper: rankedStudents[0],
    trend,
  };
};

function DepartmentDropdown({ label, value, onChange }) {
  return (
    <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#015cee] focus:bg-white focus:ring-4 focus:ring-blue-100"
      >
        {DEPARTMENTS.map((department) => (
          <option key={department.code} value={department.code}>
            {department.code} - {department.name}
          </option>
        ))}
      </select>
    </label>
  );
}

function DepartmentCompare() {
  const [departmentData, setDepartmentData] = useState([]);
  const [department1, setDepartment1] = useState("PIE");
  const [department2, setDepartment2] = useState("PIE");
  const [year, setYear] = useState(yearOption[0]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { student } = useContext(UserContext);

  useEffect(() => {
    if (student?.length >= 0) {
      const result = student.filter((obj) =>
        year !== "ALL" ? obj.batch === Number(year) : true,
      );
      setDepartmentData(result);
    }
  }, [year, student]);

  const departmentSummary1 = useMemo(
    () => getDepartmentSummary(departmentData, department1),
    [departmentData, department1],
  );
  const departmentSummary2 = useMemo(
    () => getDepartmentSummary(departmentData, department2),
    [departmentData, department2],
  );

  return (
    <div className="flex flex-col gap-5">
      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-3 xl:grid-cols-[1fr_auto_1fr_auto] xl:items-end">
          <DepartmentDropdown
            label="Compare from"
            value={department1}
            onChange={setDepartment1}
          />

          <div className="flex h-12 items-center justify-center rounded-lg border border-slate-200 bg-[#015cee] px-5 text-sm font-bold text-white shadow-sm shadow-blue-500/20">
            VS
          </div>

          <DepartmentDropdown
            label="Compare with"
            value={department2}
            onChange={setDepartment2}
          />

          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
            Academic year
            <select
              value={year}
              onChange={(event) => setYear(event.target.value)}
              className="h-12 rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#015cee] focus:bg-white focus:ring-4 focus:ring-blue-100"
            >
              {yearOption.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      {errorMessage && (
        <section className="rounded-lg border border-red-100 bg-red-50 p-4 text-sm font-semibold text-red-700 shadow-sm">
          {errorMessage}
        </section>
      )}

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-2">
          <DepartmentInfoCard
            department={departmentSummary1}
            loading={loading}
          />
          <DepartmentInfoCard
            department={departmentSummary2}
            loading={loading}
          />
        </div>
      </section>

      <DepartmentWinnerCard
        data1={departmentSummary1}
        data2={departmentSummary2}
      />

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <DepartmentCompareGraph
          data1={departmentSummary1}
          data2={departmentSummary2}
        />
      </section>
    </div>
  );
}

export default DepartmentCompare;