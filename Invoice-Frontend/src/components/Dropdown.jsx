// // src/components/ClientDropdown.jsx
// import React, { useState, useEffect } from 'react';
// import Select from 'react-select';
// import axios from '../api/axios'; // your Axios instance

// const ClientDropdown = ({ onSelect }) => {
//   const [options, setOptions] = useState([]);

//   const fetchClients = async (inputValue) => {
//     try {
//       const response = await axios.get(`/client-dropdown/?search=${inputValue}`);
//       const clientOptions = response.data.results.map(client => ({
//         value: client.id,
//         label: client.name,
//       }));
//       setOptions(clientOptions);
//     } catch (err) {
//       console.error('Failed to load clients', err);
//     }
//   };

//   return (
//     <Select
//       placeholder="Select a client..."
//       onInputChange={fetchClients}
//       options={options}
//       onChange={onSelect}
//       isClearable
//     />
//   );
// };

// export default ClientDropdown;
