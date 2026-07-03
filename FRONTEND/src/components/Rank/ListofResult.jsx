import React, { useState } from "react";

function ListofResult({ data = [] , title = "CGPA"}) {
  const rowsPerPage = 50;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPage = Math.max(1, Math.ceil(data.length / rowsPerPage));

  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;

  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const visibleButtons = 5;

  let startPage = currentPage;
  let endPage = startPage + visibleButtons - 1;

  if (endPage > totalPage) {
    endPage = totalPage;
    startPage = Math.max(1, endPage - visibleButtons + 1);
  }

  return (
    <div className="max-w-7xl mx-auto ">
      <div className="bg-white rounded-2xl ">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 my-2 mx-2 sm:mx-4 ">
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              CGPA Leaderboard
            </h1>
            <p className="text-gray-500 mt-1">
              Ranked by cumulative grade point average
            </p>
          </div>

          <div className="bg-indigo-50 px-4 py-2 rounded-lg self-start md:self-auto">
            <span className="text-indigo-700 font-semibold">
              Total Students: {data.length}
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-xl overflow-hidden border border-gray-400 sm:overflow-x-auto">
          <table className="w-full table-fixed bg-white text-[10px] sm:min-w-[720px] sm:table-auto sm:text-sm">
            <thead>
               <tr className="bg-[#015cee] text-white">
                <th className="w-[16%] px-2 py-3 text-left font-semibold sm:w-auto sm:px-6 sm:py-4">RANK</th>
                <th className="w-[28%] px-2 py-3 text-left font-semibold sm:w-auto sm:px-6 sm:py-4">NAME</th>
                <th className="w-[38%] px-2 py-3 text-left font-semibold sm:w-auto sm:px-6 sm:py-4">
                  <span className="hidden sm:inline">REGISTRATION No.</span>
                  <span className="sm:hidden">REG. No.</span>
                </th>
                <th className="w-[18%] px-1 py-3 text-center font-semibold sm:w-auto sm:px-6 sm:py-4">{title}</th>
              </tr>
            </thead>

            <tbody>
              {currentItems.map((value, index) => {
                const rank = indexOfFirstItem + index + 1;

                return (
                  <tr
                    key={value.rollNo}
                    className="
                      border-b border-gray-100
                      even:bg-gray-200
                      hover:bg-indigo-50
                      transition-colors duration-200
                    "
                  >
                    <td className="px-2 py-3 sm:px-6 sm:py-4">
                      {rank === 1 ? (
                        <span className="inline-flex max-w-full items-center rounded-full bg-yellow-100 px-1.5 py-1 text-[10px] font-bold text-yellow-700 sm:px-3 sm:text-sm">
                          🥇 1
                        </span>
                      ) : rank === 2 ? (
                        <span className="inline-flex max-w-full items-center rounded-full bg-gray-100 px-1.5 py-1 text-[10px] font-bold text-gray-700 sm:px-3 sm:text-sm">
                          🥈 2
                        </span>
                      ) : rank === 3 ? (
                        <span className="inline-flex max-w-full items-center rounded-full bg-amber-100 px-1.5 py-1 text-[10px] font-bold text-amber-700 sm:px-3 sm:text-sm">
                          🥉 3
                        </span>
                      ) : (
                        <span className="font-medium text-gray-700">
                          {rank}
                        </span>
                      )}
                    </td>

                    <td className="px-2 py-3 font-medium text-gray-800 sm:px-6 sm:py-4">
                      <span className="block truncate">{value.name}</span>
                    </td>

                    <td className="px-2 py-3 text-gray-600 sm:px-6 sm:py-4">
                      <span className="block truncate">{value.rollNo}</span>
                    </td>

                    <td className="px-1 py-3 text-center font-bold text-indigo-600 sm:px-6 sm:py-4">
                      {value.cgpa}
                    </td>
                  </tr>
                );
              })}

              {/* Empty rows to keep table height fixed */}
              {Array.from({
                length: rowsPerPage - currentItems.length,
              }).map((_, index) => (
                <tr
                  key={`empty-${index}`}
                  className="border-b border-gray-100 even:bg-gray-50"
                >
                  <td className="px-2 py-3 sm:px-6 sm:py-4">&nbsp;</td>
                  <td className="px-2 py-3 sm:px-6 sm:py-4"></td>
                  <td className="px-2 py-3 sm:px-6 sm:py-4"></td>
                  <td className="px-1 py-3 sm:px-6 sm:py-4"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-8 flex overflow-x-auto sm:justify-center">
          <div className="flex min-w-max flex-nowrap items-center gap-1.5 bg-white px-0 py-3 sm:gap-2 sm:px-4 rounded-xl ">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="
                px-4 py-2 rounded-lg border border-gray-300
                bg-white text-gray-700
                hover:bg-gray-100
                disabled:opacity-50
                disabled:cursor-not-allowed
                transition-all
              "
            >
              Prev
            </button>

            {Array.from(
              { length: endPage - startPage + 1 },
              (_, index) => startPage + index,
            ).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`
                  px-4 py-2 rounded-lg border transition-all duration-200
                  ${
                    currentPage === page
                      ? "bg-[#015cee]  text-white border-transparent shadow-lg scale-105"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-indigo-50"
                  }
                `}
              >
                {page}
              </button>
            ))}

            <button
              disabled={currentPage === totalPage}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="
                px-4 py-2 rounded-lg border border-gray-300
                bg-white text-gray-700
                hover:bg-gray-100
                disabled:opacity-50
                disabled:cursor-not-allowed
                transition-all
              "
            >
              Next
            </button>
          </div>
        </div>

        {/* Page Info */}
        <div className="text-center mt-4 text-gray-500 font-medium">
          Page {currentPage} of {totalPage}
        </div>
      </div>
    </div>
  );
}

export default ListofResult;
