import React from "react";

const firstTwoLetter = (name) => {
  if (!name.length) return "XX";
  const word = name.trim().split(/\s+/);

  if (word.length === 1) {
    let pic = word[0][0];
    return pic;
  }

  let pic = word[0][0] + word[1][0];
  return pic;
};

function InfoCard({ studentData }) {
  return (
    <>
      {Object.keys(studentData).length === 0 && (
        <div className="w-full min-h-70 border border-dashed border-gray-300 sm:w-[50%] flex flex-col items-center justify-center p-4 text-center">
          <div className="h-15 w-15 bg-gray-200 rounded-sm flex justify-center items-center text-2xl font-bold">
            ??
          </div>
          <span className="font-medium mt-4">Select a Student</span>
          <span className="text-gray-500">
            Student details will appear here.
          </span>
        </div>
      )}

      {Object.keys(studentData).length !== 0 && (
        <div className="w-full min-h-70 border border-gray-300 sm:w-[50%] p-3 flex flex-col">
          <div className="w-full flex flex-col gap-3 sm:h-[40%] sm:flex-row">
            <div className=" bg-[#015cee]  w-18 h-18 sm:mt-2 sm:ml-2 rounded flex shrink-0 justify-center items-center text-white font-bold text-2xl">
              {firstTwoLetter(studentData?.name)}
            </div>
            <div className="min-w-0 flex-1 sm:pl-5 sm:pt-2">
              <p className="break-words font-bold text-lg sm:text-xl">{studentData?.name}</p>
              <p className=" font-medium text-gray-500">{studentData?.studentID}</p>
              <p className="text-gray-700 mt-3 font-medium">
                {studentData?.branchFullName}
              </p>
            </div>
          </div>
          <div className="mt-4 flex-1 sm:mt-0">
            <div className="w-full h-full grid grid-cols-2 gap-4">
              <div className="bg-gray-200 rounded-xl p-3">
                <p className="font-medium text-gray-700">CGPA</p>
                <p className="font-bold">
                  {studentData?.marks[studentData?.marks.length-1].cgpa}
                </p>
              </div>
              <div className="bg-gray-200 rounded-xl p-2">
                <p className="font-medium text-gray-700">LATEST SGPA</p>
                <p className="font-bold">
                  {studentData?.marks[studentData?.marks.length-1].sgpa}
                </p>
              </div>
              <div className=" bg-gray-200 rounded-xl p-2">
                <p className="font-medium text-gray-700">SEMESTER</p>
                <p className="font-bold">{studentData?.marks.length}</p>
              </div>
              <div className="bg-gray-200 rounded-xl p-2">
                <p className="font-medium text-gray-700">ROLL NO</p>
                <p className="font-bold">{studentData?.rollNo}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default InfoCard;
