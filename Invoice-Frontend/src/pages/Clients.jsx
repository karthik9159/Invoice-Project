
// import { useEffect, useState } from "react";
// import axios from "../api/axios";
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";





// export default function Clients() {
//   const [clients, setClients] = useState([]);
//   const [form, setForm] = useState({ name: "", email: "", phone_number: "" ,company_name: "", address: ""});

//   const [editingId, setEditingId] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

  


//   const fetchClients = async () => {
//     setIsLoading(true);
//     try {
//       const res = await axios.get("api/clients/");
//       setClients(res.data);
//     } catch (error) {
//       console.error("Error fetching clients:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleCreate = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       if (editingId) {
//         await axios.put(`api/clients/${editingId}/`, form);
//         setEditingId(null);
//       } else {
//         await axios.post("api/clients/", form);
//       }
//       setForm({ name: "", email: "", phone_number: "", company_name: "", address: "" }); 
//       fetchClients();
//     } catch (error) {
//       console.error("Error saving client:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleEdit = (client) => {
//     setForm({
//       name: client.name,
//       email: client.email,
//       phone_number: client.phone_number,
//       company_name: client.company_name,
//       address: client.address,
//     });
//     setEditingId(client.id);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this client?")) {
//       setIsLoading(true);
//       try {
//         await axios.delete(`api/clients/${id}/`);
//         fetchClients();
//       } catch (error) {
//         console.error("Error deleting client:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   const handleCancel = () => {
//     setEditingId(null);
//     setForm({ name: "", email: "", phone_number: "" , company_name: "", address: "" });  
//   };

//   useEffect(() => {
//     fetchClients();
//   }, []);

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <Sidebar />
//       <div className="flex-1 flex flex-col">
//         <Navbar />
        
//         {/* Main Content */}
//         <main className="flex-1 p-8">
//           {/* Header */}
//           <div className="mb-8">
//             <div className="flex items-center space-x-3 mb-2">
//               <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
//                 <span className="text-white text-lg">👥</span>
//               </div>
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
//                 <p className="text-gray-600">Manage your client database</p>
//               </div>
//             </div>
//             <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
//           </div>

//           {/* Add/Edit Form */}
//           <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">
//               {editingId ? "Edit Client" : "Add New Client"}
//             </h3>
            
//             <form onSubmit={handleCreate} className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-gray-700">Name</label>
//                   <input
//                     type="text"
//                     placeholder="Enter full name"
//                     value={form.name}
//                     onChange={(e) => setForm({ ...form, name: e.target.value })}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                     required
//                   />
//                 </div>
                
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-gray-700">Email</label>
//                   <input
//                     type="email"
//                     placeholder="Enter email address"
//                     value={form.email}
//                     onChange={(e) => setForm({ ...form, email: e.target.value })}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                     required
//                   />
//                 </div>
                
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-gray-700">Phone</label>
//                   <input
//                     type="text"
//                     placeholder="Enter phone number"
//                     value={form.phone_number}
//                     onChange={(e) => setForm({ ...form, phone_number: e.target.value })}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                     required 
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-gray-700">company_name</label>
//                   <input
//                     type="text"
//                     placeholder="Enter Company Name"
//                     value={form.company_name}
//                     onChange={(e) => setForm({ ...form, company_name: e.target.value })}
                    
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                     required
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-gray-700">address</label>
//                   <input
//                     type="text"
//                     placeholder="Enter address"
//                     value={form.address}
//                     onChange={(e) => setForm({ ...form, address: e.target.value })}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                     required
//                   />
//                 </div>
//               </div>
              
//               <div className="flex space-x-3 pt-2">
//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
//                 >
//                   <span>{editingId ? "Update Client" : "Add Client"}</span>
//                   {isLoading && (
//                     <div className="w-2 h-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                   )}
//                 </button>
                
//                 {editingId && (
//                   <button
//                     type="button"
//                     onClick={handleCancel}
//                     className="bg-gray-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
//                   >
//                     Cancel
//                   </button>
//                 )}
//               </div>
//             </form>
//           </div>

//           {/* Clients Table */}
//           <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
//             <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
//               <h3 className="text-lg font-semibold text-gray-800">
//                 All Clients ({clients.length})
//               </h3>
//             </div>
            
//             {isLoading ? (
//               <div className="flex justify-center items-center py-12">
//                 <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//               </div>
//             ) : (
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-gray-50 border-b border-gray-200">
//                     <tr>
//                       <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
//                         Name
//                       </th>
//                       <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
//                         Email
//                       </th>
//                       <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
//                         Phone
//                       </th>
//                       <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
//                        Company_name
//                       </th>
//                       <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
//                        Address
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-200">
//                     {clients.map((client, index) => (
//                       <tr 
//                         key={client.id} 
//                         className={`hover:bg-gray-50 transition-colors duration-150 ${
//                           index % 2 === 0 ? 'bg-white' : 'bg-gray-25'
//                         }`}
//                       >
//                         <td className="px-6 py-4">
//                           <div className="flex items-center space-x-3">
//                             <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
//                               <span className="text-white font-semibold text-sm">
//                                 {client.name.charAt(0).toUpperCase()}
//                               </span>
//                             </div>
//                             <div>
//                               <div className="text-sm font-medium text-gray-900">{client.name}</div>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 text-sm text-gray-600">{client.email}</td>
//                         <td className="px-6 py-4 text-sm text-gray-600">{client.phone_number}</td>
//                         <td className="px-6 py-4 text-sm text-gray-600">{client.company_name}</td>
//                         <td className="px-6 py-4 text-sm text-gray-600">{client.address}</td>
//                         <td className="px-6 py-4">
//                           <div className="flex justify-center space-x-2">
//                             <button
//                               onClick={() => handleEdit(client)}
//                               className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-600 hover:to-blue-700 focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 transition-all duration-200"
//                             >
//                               Edit
//                             </button>
//                             <button
//                               onClick={() => handleDelete(client.id)}
//                               className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-red-600 hover:to-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200"
//                             >
//                               Delete
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
               
//                 {clients.length === 0 && !isLoading && (
//                   <div className="text-center py-12">
//                     <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                       <span className="text-4xl text-gray-400">👥</span>
//                     </div>
//                     <h3 className="text-lg font-medium text-gray-900 mb-2">No clients found</h3>
//                     <p className="text-gray-500">Get started by adding your first client above.</p>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }





/////////////////////// working code /////////////////////////



// import { useEffect, useState } from "react";
// import axios from "../api/axios";
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";

// export default function Clients() {
//   const [pagination, setPagination] = useState({
//     count: 0,
//     next: null,
//     previous: null,
//     results: [],
//   });

//   const clients = pagination.results;

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone_number: "",
//     company_name: "",
//     address: "",
//   });
//   const [editingId, setEditingId] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [page, setPage] = useState(1);

//   const fetchClients = async (pageNumber = 1) => {
//     setIsLoading(true);
//     try {
//       const res = await axios.get(`api/clients/?page=${pageNumber}`);
//       setPagination(res.data);
//       setPage(pageNumber);
//     } catch (error) {
//       console.error("Error fetching clients:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleCreate = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       if (editingId) {
//         await axios.put(`api/clients/${editingId}/`, form);
//         setEditingId(null);
//       } else {
//         await axios.post("api/clients/", form);
//       }
//       setForm({ name: "", email: "", phone_number: "", company_name: "", address: "" });
//       fetchClients(page);
//     } catch (error) {
//       console.error("Error saving client:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleEdit = (client) => {
//     setForm({
//       name: client.name,
//       email: client.email,
//       phone_number: client.phone_number,
//       company_name: client.company_name,
//       address: client.address,
//     });
//     setEditingId(client.id);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this client?")) {
//       setIsLoading(true);
//       try {
//         await axios.delete(`api/clients/${id}/`);
//         fetchClients(page);
//       } catch (error) {
//         console.error("Error deleting client:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   const handleCancel = () => {
//     setEditingId(null);
//     setForm({ name: "", email: "", phone_number: "", company_name: "", address: "" });
//   };

//   useEffect(() => {
//     fetchClients();
//   }, []);

//   const goToNextPage = () => {
//     if (pagination.next) fetchClients(page + 1);
//   };

//   const goToPreviousPage = () => {
//     if (pagination.previous) fetchClients(page - 1);
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <Sidebar />
//       <div className="flex-1 flex flex-col">
//         <Navbar />
//         <main className="flex-1 p-8">
//           {/* Header */}
//           <div className="mb-8">
//             <div className="flex items-center space-x-3 mb-2">
//               <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
//                 <span className="text-white text-lg">👥</span>
//               </div>
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
//                 <p className="text-gray-600">Manage your client database</p>
//               </div>
//             </div>
//             <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
//           </div>

//           {/* Form */}
//           <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">
//               {editingId ? "Edit Client" : "Add New Client"}
//             </h3>
//             <form onSubmit={handleCreate} className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 {["name", "email", "phone_number", "company_name", "address"].map((field) => (
//                   <div key={field} className="space-y-2">
//                     <label className="text-sm font-medium text-gray-700 capitalize">
//                       {field.replace("_", " ")}
//                     </label>
//                     <input
//                       type={field === "email" ? "email" : "text"}
//                       placeholder={`Enter ${field.replace("_", " ")}`}
//                       value={form[field]}
//                       onChange={(e) => setForm({ ...form, [field]: e.target.value })}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                       required
//                     />
//                   </div>
//                 ))}
//               </div>
//               <div className="flex space-x-3 pt-2">
//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
//                 >
//                   <span>{editingId ? "Update Client" : "Add Client"}</span>
//                   {isLoading && (
//                     <div className="w-2 h-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                   )}
//                 </button>
//                 {editingId && (
//                   <button
//                     type="button"
//                     onClick={handleCancel}
//                     className="bg-gray-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-600 transition-all duration-200"
//                   >
//                     Cancel
//                   </button>
//                 )}
//               </div>
//             </form>
//           </div>

//           {/* Clients Table */}
//           <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
//             <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 font-semibold text-gray-900 text-sm uppercase tracking-wider">
//               Clients List
//             </div>
//             {clients.length === 0 ? (
//               <div className="p-6 text-center text-gray-500">No clients found.</div>
//             ) : (
//               <table className="w-full text-left text-gray-700">
//                 <thead className="bg-gray-100">
//                   <tr>
//                     <th className="py-3 px-6">Name</th>
//                     <th className="py-3 px-6">Email</th>
//                     <th className="py-3 px-6">Phone</th>
//                     <th className="py-3 px-6">Company Name</th>
//                     <th className="py-3 px-6">Address</th>
//                     <th className="py-3 px-6 text-center">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {clients.map((client) => (
//                     <tr key={client.id} className="border-t border-gray-200 hover:bg-gray-50">
//                       <td className="py-4 px-6">{client.name}</td>
//                       <td className="py-4 px-6">{client.email}</td>
//                       <td className="py-4 px-6">{client.phone_number}</td>
//                       <td className="py-4 px-6">{client.company_name}</td>
//                       <td className="py-4 px-6">{client.address}</td>
//                       <td className="py-4 px-6 flex justify-center space-x-4">
//                         <button
//                           onClick={() => handleEdit(client)}
//                           className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => handleDelete(client.id)}
//                           className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-xl font-medium hover:from-red-600 hover:to-red-700 transition-all duration-200"
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}

//             {/* Pagination */}
//             <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-t border-gray-200">
//               <button
//                 onClick={goToPreviousPage}
//                 disabled={!pagination.previous}
//                 className={`px-6 py-2 rounded-xl font-medium transition-all duration-200 ${
//                   pagination.previous
//                     ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"
//                     : "bg-gray-200 text-gray-400 cursor-not-allowed"
//                 }`}
//               >
//                 Previous
//               </button>
//               <div className="text-sm text-gray-700">
//                 Page {page} of {Math.ceil(pagination.count / 10)}
//               </div>
//               <button
//                 onClick={goToNextPage}
//                 disabled={!pagination.next}
//                 className={`px-6 py-2 rounded-xl font-medium transition-all duration-200 ${
//                   pagination.next
//                     ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"
//                     : "bg-gray-200 text-gray-400 cursor-not-allowed"
//                 }`}
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }




////  this code is  using pagination like 1,2,3....////////

import { useEffect, useState } from "react";
import axios from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { ChevronLeft, ChevronRight, ChevronFirst, ChevronLast } from "lucide-react";

export default function Clients() {
  const [pagination, setPagination] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });

  const clients = pagination.results;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone_number: "",
    company_name: "",
    address: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const fetchClients = async (pageNumber = 1) => {
    setIsLoading(true);
    try {
      const res = await axios.get(`api/clients/?page=${pageNumber}`);
      setPagination(res.data);
      setPage(pageNumber);
      
      // Calculate total pages based on actual results length
      const itemsPerPage = res.data.results.length;
      setTotalPages(Math.ceil(res.data.count / Math.max(1, itemsPerPage)));
      
      setError(null);
    } catch (error) {
      console.error("Error fetching clients:", error);
      setError("Failed to fetch clients. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      if (editingId) {
        await axios.put(`api/clients/${editingId}/`, form);
        setSuccess("Client updated successfully!");
      } else {
        await axios.post('api/clients/', form);
        setSuccess("Client created successfully!");
      }
      
      setForm({
        name: "",
        email: "",
        phone_number: "",
        company_name: "",
        address: "",
      });
      setEditingId(null);
      fetchClients(page);
    } catch (error) {
      console.error("Error saving client:", error);
      setError(error.response?.data?.message || "Failed to save client. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (client) => {
    setForm({
      name: client.name,
      email: client.email,
      phone_number: client.phone_number,
      company_name: client.company_name,
      address: client.address,
    });
    setEditingId(client.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this client?")) return;
    
    setIsLoading(true);
    setError(null);
    try {
      await axios.delete(`api/clients/${id}/`);
      setSuccess("Client deleted successfully!");
      
      // Handle page adjustment if last item on page is deleted
      if (clients.length === 1 && page > 1) {
        fetchClients(page - 1);
      } else {
        fetchClients(page);
      }
    } catch (error) {
      console.error("Error deleting client:", error);
      setError("Failed to delete client. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setForm({
      name: "",
      email: "",
      phone_number: "",
      company_name: "",
      address: "",
    });
    setEditingId(null);
    setError(null);
    setSuccess(null);
  };

  const goToPage = (pageNumber) => {
    if (!isLoading && pageNumber >= 1 && pageNumber <= totalPages) {
      fetchClients(pageNumber);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const halfVisible = Math.floor(maxVisiblePages / 2);
      let start = Math.max(page - halfVisible, 1);
      let end = Math.min(start + maxVisiblePages - 1, totalPages);
      
      if (end - start + 1 < maxVisiblePages) {
        start = Math.max(end - maxVisiblePages + 1, 1);
      }
      
      if (start > 1) {
        pages.push(1);
        if (start > 2) {
          pages.push('...');
        }
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (end < totalPages) {
        if (end < totalPages - 1) {
          pages.push('...');
        }
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">👥</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
                <p className="text-gray-600">Manage your client database</p>
              </div>
            </div>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
          </div>

          {/* Status Messages */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              {success}
            </div>
          )}

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {editingId ? "Edit Client" : "Add New Client"}
            </h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {["name", "email", "phone_number", "company_name", "address"].map((field) => (
                  <div key={field} className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 capitalize">
                      {field.replace("_", " ")}
                    </label>
                    <input
                      type={field === "email" ? "email" : "text"}
                      placeholder={`Enter ${field.replace("_", " ")}`}
                      value={form[field]}
                      onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      required={field !== "company_name" && field !== "address"}
                    />
                  </div>
                ))}
              </div>
              <div className="flex space-x-3 pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <span>{editingId ? "Update Client" : "Add Client"}</span>
                  {isLoading && (
                    <div className="w-2 h-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  )}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-gray-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-600 transition-all duration-200"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Clients Table */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 font-semibold text-gray-900 text-sm uppercase tracking-wider">
              Clients List
            </div>
            {isLoading && clients.length === 0 ? (
              <div className="p-6 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
              </div>
            ) : clients.length === 0 ? (
              <div className="p-6 text-center text-gray-500">No clients found.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-gray-700">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-3 px-6">Name</th>
                      <th className="py-3 px-6">Email</th>
                      <th className="py-3 px-6">Phone</th>
                      <th className="py-3 px-6">Company Name</th>
                      <th className="py-3 px-6">Address</th>
                      <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map((client) => (
                      <tr key={client.id} className="border-t border-gray-200 hover:bg-gray-50">
                        <td className="py-4 px-6">{client.name}</td>
                        <td className="py-4 px-6">{client.email}</td>
                        <td className="py-4 px-6">{client.phone_number}</td>
                        <td className="py-4 px-6">{client.company_name}</td>
                        <td className="py-4 px-6">{client.address}</td>
                        <td className="py-4 px-6 flex justify-center space-x-4">
                          <button
                            onClick={() => handleEdit(client)}
                            disabled={isLoading}
                            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(client.id)}
                            disabled={isLoading}
                            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-xl font-medium hover:from-red-600 hover:to-red-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Enhanced Pagination */}
            {clients.length > 0 && (
              <div className="flex flex-col sm:flex-row justify-between items-center px-6 py-4 bg-gray-50 border-t border-gray-200 gap-4">
                <div className="text-sm text-gray-700">
                  Showing {(page - 1) * pagination.results.length + 1} to{' '}
                  {Math.min(page * pagination.results.length, pagination.count)} of{' '}
                  {pagination.count} clients
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => goToPage(1)}
                    disabled={page === 1 || isLoading}
                    className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                  >
                    <ChevronFirst className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => goToPage(page - 1)}
                    disabled={!pagination.previous || isLoading}
                    className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  
                  {getPageNumbers().map((pageNumber, index) => (
                    <button
                      key={index}
                      onClick={() => typeof pageNumber === 'number' ? goToPage(pageNumber) : null}
                      disabled={pageNumber === '...' || isLoading}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                        pageNumber === page 
                          ? 'bg-blue-600 text-white' 
                          : 'border border-gray-300 hover:bg-gray-50'
                      } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {pageNumber}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => goToPage(page + 1)}
                    disabled={!pagination.next || isLoading}
                    className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => goToPage(totalPages)}
                    disabled={page === totalPages || isLoading}
                    className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                  >
                    <ChevronLast className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}






//// this code is reusbale pagination to implement backend to frontend////////


// import { useEffect, useState } from "react";
// import { Search, Plus, Edit2, Trash2, User, Mail, Phone, Building, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
// import axios from "../api/axios";
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";

// export default function Clients() {
//   // State Management
//   const [clients, setClients] = useState([]);
//   const [form, setForm] = useState({ 
//     name: "", 
//     email: "", 
//     phone_number: "", 
//     company_name: "", 
//     address: "" 
//   });
//   const [editingId, setEditingId] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [paginationData, setPaginationData] = useState({
//     count: 0,
//     next: null,
//     previous: null,
//     currentPage: 1,
//     totalPages: 1
//   });

//   // Fetch Clients with Error Handling
//   const fetchClients = async (page = 1) => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const res = await axios.get(`/api/clients/?page=${page}`);
      
//       if (!res.data?.results) {
//         throw new Error("Invalid API response structure");
//       }

//       setClients(res.data.results);
//       setPaginationData({
//         count: res.data.count,
//         next: res.data.next,
//         previous: res.data.previous,
//         currentPage: page,
//         totalPages: Math.ceil(res.data.count / (res.data.results.length || 10))
//       });
//     } catch (err) {
//       console.error("Fetch error:", err);
//       setError(err.response?.data?.message || err.message || "Failed to load clients");
//       setClients([]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // CRUD Operations
//   const handleCreate = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       if (editingId) {
//         await axios.put(`/api/clients/${editingId}/`, form);
//       } else {
//         await axios.post("/api/clients/", form);
//       }
//       setForm({ name: "", email: "", phone_number: "", company_name: "", address: "" });
//       setEditingId(null);
//       fetchClients(paginationData.currentPage);
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to save client");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleEdit = (client) => {
//     setForm({
//       name: client.name,
//       email: client.email,
//       phone_number: client.phone_number,
//       company_name: client.company_name,
//       address: client.address
//     });
//     setEditingId(client.id);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this client?")) return;
//     setIsLoading(true);
//     try {
//       await axios.delete(`/api/clients/${id}/`);
//       if (clients.length === 1 && paginationData.currentPage > 1) {
//         fetchClients(paginationData.currentPage - 1);
//       } else {
//         fetchClients(paginationData.currentPage);
//       }
//     } catch (err) {
//       setError("Failed to delete client");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handlePageChange = (newPage) => {
//     if (newPage < 1 || newPage > paginationData.totalPages) return;
//     fetchClients(newPage);
//   };

//   useEffect(() => {
//     fetchClients();
//   }, []);

//   // Enhanced Pagination Component
//   const PaginationControls = () => {
//     const { currentPage, totalPages, previous, next } = paginationData;
//     const maxVisiblePages = 5;

//     const getPageNumbers = () => {
//       const pages = [];
//       let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
//       let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

//       if (totalPages > maxVisiblePages) {
//         if (endPage === totalPages) {
//           startPage = totalPages - maxVisiblePages + 1;
//         } else if (startPage === 1) {
//           endPage = maxVisiblePages;
//         }
//       }

//       for (let i = startPage; i <= endPage; i++) {
//         pages.push(i);
//       }

//       return pages;
//     };

//     return (
//       <div className="flex items-center justify-between px-6 py-4 bg-white border-t border-gray-200">
//         <div className="text-sm text-gray-600">
//           Showing <span className="font-medium">{(currentPage - 1) * 10 + 1}</span> to <span className="font-medium">{Math.min(currentPage * 10, paginationData.count)}</span> of <span className="font-medium">{paginationData.count}</span> clients
//         </div>
//         <div className="flex items-center space-x-2">
//           <button
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={!previous || isLoading}
//             className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50"
//           >
//             Previous
//           </button>
          
//           <div className="flex space-x-1">
//             {getPageNumbers().map(page => (
//               <button
//                 key={page}
//                 onClick={() => handlePageChange(page)}
//                 disabled={isLoading}
//                 className={`px-3 py-1 text-sm rounded ${
//                   currentPage === page 
//                     ? 'bg-blue-600 text-white' 
//                     : 'border border-gray-300'
//                 }`}
//               >
//                 {page}
//               </button>
//             ))}
//           </div>
          
//           <button
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={!next || isLoading}
//             className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <Sidebar />
//       <div className="flex-1 flex flex-col">
//         <Navbar />
        
//         <main className="flex-1 p-6">
//           <div className="space-y-6">
//             {/* Header Section */}
//             <div className="flex justify-between items-center">
//               <h1 className="text-2xl font-bold text-gray-800">Clients</h1>
//               <p className="text-gray-600">Manage your client database</p>
//             </div>

//             {/* Error Alert */}
//             {error && (
//               <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
//                 <p>{error}</p>
//               </div>
//             )}

//             {/* Client Form */}
//             <div className="bg-white rounded-lg shadow p-6">
//               <h2 className="text-lg font-semibold mb-4">Add New Client</h2>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {/* Name Field */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
//                   <input
//                     type="text"
//                     value={form.name}
//                     onChange={(e) => setForm({...form, name: e.target.value})}
//                     className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
//                     placeholder="Enter name"
//                     required
//                   />
//                 </div>

//                 {/* Company Field */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
//                   <input
//                     type="text"
//                     value={form.company_name}
//                     onChange={(e) => setForm({...form, company_name: e.target.value})}
//                     className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
//                     placeholder="Enter company name"
//                   />
//                 </div>

//                 {/* Email Field */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                   <input
//                     type="email"
//                     value={form.email}
//                     onChange={(e) => setForm({...form, email: e.target.value})}
//                     className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
//                     placeholder="Enter email"
//                     required
//                   />
//                 </div>

//                 {/* Phone Field */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
//                   <input
//                     type="tel"
//                     value={form.phone_number}
//                     onChange={(e) => setForm({...form, phone_number: e.target.value})}
//                     className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
//                     placeholder="Enter phone number"
//                     required
//                   />
//                 </div>

//                 {/* Address Field */}
//                 <div className="md:col-span-2">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
//                   <input
//                     type="text"
//                     value={form.address}
//                     onChange={(e) => setForm({...form, address: e.target.value})}
//                     className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
//                     placeholder="Enter address"
//                   />
//                 </div>
//               </div>

//               <div className="mt-4">
//                 <button
//                   onClick={handleCreate}
//                   disabled={isLoading}
//                   className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
//                 >
//                   {isLoading ? "Processing..." : (editingId ? "Update Client" : "Add Client")}
//                 </button>
                
//                 {editingId && (
//                   <button
//                     onClick={() => {
//                       setEditingId(null);
//                       setForm({ name: "", email: "", phone_number: "", company_name: "", address: "" });
//                     }}
//                     className="ml-2 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
//                   >
//                     Cancel
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* Clients Table */}
//             <div className="bg-white rounded-lg shadow overflow-hidden">
//               <div className="px-6 py-4 border-b border-gray-200">
//                 <h2 className="text-lg font-semibold">Clients List</h2>
//               </div>

//               {isLoading && clients.length === 0 ? (
//                 <div className="p-8 text-center">
//                   <p className="text-gray-600">Loading clients...</p>
//                 </div>
//               ) : clients.length === 0 ? (
//                 <div className="p-8 text-center">
//                   <p className="text-gray-600">No clients found</p>
//                 </div>
//               ) : (
//                 <>
//                   <div className="overflow-x-auto">
//                     <table className="min-w-full divide-y divide-gray-200">
//                       <thead className="bg-gray-50">
//                         <tr>
//                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
//                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
//                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Name</th>
//                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
//                           <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                         </tr>
//                       </thead>
//                       <tbody className="bg-white divide-y divide-gray-200">
//                         {clients.map((client) => (
//                           <tr key={client.id}>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <div className="text-sm font-medium text-gray-900">{client.name}</div>
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <div className="text-sm text-gray-500">{client.email}</div>
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <div className="text-sm text-gray-500">{client.phone_number}</div>
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <div className="text-sm text-gray-500">{client.company_name}</div>
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <div className="text-sm text-gray-500">{client.address}</div>
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                               <button
//                                 onClick={() => handleEdit(client)}
//                                 className="text-blue-600 hover:text-blue-900 mr-3"
//                               >
//                                 Edit
//                               </button>
//                               <button
//                                 onClick={() => handleDelete(client.id)}
//                                 className="text-red-600 hover:text-red-900"
//                               >
//                                 Delete
//                               </button>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                   {paginationData.totalPages > 1 && <PaginationControls />}
//                 </>
//               )}
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }








