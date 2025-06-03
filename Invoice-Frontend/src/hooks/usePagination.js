// import { useEffect, useState } from "react";
// import axios from "../axios"; // your configured axios instance

// const usePagination = (url, query = "") => {
//   const [data, setData] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(true);

//   const fetchData = async (pageNum) => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`${url}?page=${pageNum}${query}`);
//       setData(response.data.results);
//       setTotalPages(Math.ceil(response.data.count / 10)); // assuming page size = 10
//       setPage(pageNum);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData(page);
//   }, [url]);

//   const onPageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= totalPages) {
//       fetchData(newPage);
//     }
//   };

//   return { data, loading, page, totalPages, onPageChange };
// };

// export default usePagination;
