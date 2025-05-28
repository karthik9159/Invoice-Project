// import React from "react";

// const getPageNumbers = (current, total) => {
//   const delta = 2;
//   const range = [];
//   const rangeWithDots = [];
//   let l;

//   for (let i = 1; i <= total; i++) {
//     if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
//       range.push(i);
//     }
//   }

//   for (let i of range) {
//     if (l) {
//       if (i - l === 2) {
//         rangeWithDots.push(l + 1);
//       } else if (i - l !== 1) {
//         rangeWithDots.push("...");
//       }
//     }
//     rangeWithDots.push(i);
//     l = i;
//   }

//   return rangeWithDots;
// };

// const Pagination = ({ currentPage, totalPages, onPageChange }) => {
//   const pageNumbers = getPageNumbers(currentPage, totalPages);

//   return (
//     <div className="flex justify-center items-center mt-4 space-x-1 flex-wrap">
//       <button
//         className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
//         onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
//         disabled={currentPage === 1}
//       >
//         Prev
//       </button>

//       {pageNumbers.map((num, index) => (
//         <button
//           key={index}
//           onClick={() => typeof num === "number" && onPageChange(num)}
//           disabled={num === "..."}
//           className={`px-3 py-1 rounded ${
//             currentPage === num
//               ? "bg-blue-500 text-white"
//               : num === "..."
//               ? "cursor-default bg-white text-gray-400"
//               : "bg-gray-100"
//           }`}
//         >
//           {num}
//         </button>
//       ))}

//       <button
//         className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
//         onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
//         disabled={currentPage === totalPages}
//       >
//         Next
//       </button>
//     </div>
//   );
// };

// export default Pagination;
