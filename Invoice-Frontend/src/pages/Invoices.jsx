
// import { useEffect, useState } from "react";
// import axios from "../api/axios";
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";


// export default function Invoices() {
//   const [invoices, setInvoices] = useState([]);
//   const [clients, setClients] = useState([]);
//   const [form, setForm] = useState({
//     client: "",
//     invoice_number: "",
//     issue_date: "",
//     due_date: "",
//     subtotal: "",
//     total: "",
//     notes: "",
//     description:"",
//     quantity: "",
//     rate: "",
    
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [filter, setFilter] = useState("all");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showForm, setShowForm] = useState(false);

//   const fetchInvoices = async () => {
//     setIsLoading(true);
//     try {
//       const res = await axios.get("api/invoices/");
//       setInvoices(res.data);
//     } catch (error) {
//       console.error("Error fetching invoices:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchClients = async () => {
//     try {
//       const res = await axios.get("api/clients/");
//       setClients(res.data);
//     } catch (error) {
//       console.error("Error fetching clients:", error);
//     }
//   };

//   // Function to generate the next invoice number
//  const generateInvoiceNumber = () => {
//     if (invoices.length === 0) return "INV-001";
    
//     // Extract all invoice numbers
//     const invoiceNumbers = invoices.map(inv => inv.invoice_number);
    
//     // Find the highest number
//     let maxNumber = 0;
//     invoiceNumbers.forEach(num => {
//       if (num) {
//         const numberPart = parseInt(num.split('-')[1]);
//         if (!isNaN(numberPart) && numberPart > maxNumber) {
//           maxNumber = numberPart;
//         }
//       }
//     });
    
//     // Generate next number with leading zeros
//     const nextNumber = (maxNumber + 1).toString().padStart(3, '0');
//     return `INV-${nextNumber}`;
//   };

//   const handleCreate = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       await axios.post("api/invoices/", form);
//       setForm({
//         client: "",
//         invoice_number: "",
//         issue_date: "",
//         due_date: "",
//         subtotal: "",
//         total: "",
//         notes: "",
//         description:"",
//         quantity: "",
//         rate: "",
//       });
//       setShowForm(false);
//       fetchInvoices();
//     } catch (error) {
//       console.error("Error creating invoice:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   const handleEdit=async(id)=>{
//     if(window.confirm("Are you sure you want to edit this invoice?")) {
//       try {
//         const res = await axios.get(`api/invoices/${id}/`);
//         setForm(res.data);
//         setShowForm(true);
//       } catch (error) {
//         console.error("Error fetching invoice:", error);
//       }
//     }
//   }

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this invoice?")) {
//       try {
//         await axios.delete(`api/invoices/${id}/`);
//         fetchInvoices();
//       } catch (error) {
//         console.error("Error deleting invoice:", error);
//       }
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case "paid":
//         return "bg-green-100 text-green-800 border-green-200";
//       case "partial":
//         return "bg-yellow-100 text-yellow-800 border-yellow-200";
//       case "unpaid":
//         return "bg-red-100 text-red-800 border-red-200";
//       case "draft":
//         return "bg-gray-100 text-gray-800 border-gray-200";
//       default:
//         return "bg-blue-100 text-blue-800 border-blue-200";
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status?.toLowerCase()) {
//       case "paid":
//         return "✓";
//       case "partial":
//         return "◐";
//       case "unpaid":
//         return "○";
//       default:
//         return "●";
//     }
//   };

//   const filteredInvoices = invoices.filter((invoice) => {
//     const matchesSearch = 
//       invoice.invoice_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       invoice.client_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       invoice.notes?.toLowerCase().includes(searchTerm.toLowerCase());
    
//     const matchesFilter = filter === "all" || invoice.payment_status?.toLowerCase() === filter;
    
//     return matchesSearch && matchesFilter;
//   });

//   const getInvoiceStats = () => {
//     const total = invoices.reduce((sum, inv) => sum + parseFloat(inv.total || 0), 0);
//     const paid = invoices.reduce((sum, inv) => sum + parseFloat(inv.amount_paid || 0), 0);
//     const pending = total - paid;
//     return { total, paid, pending, count: invoices.length };
//   };

//   const stats = getInvoiceStats();

//   useEffect(() => {
//     fetchInvoices();
//     fetchClients();
//   }, []);

//   // When showing the form, generate the invoice number
//   useEffect(() => {
//     if (showForm) {
//       const generatedNumber = generateInvoiceNumber();
//       setForm(prev => ({
//         ...prev,
//         invoice_number: generatedNumber
//       }));
//     }
//   }, [showForm, invoices]);

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <Sidebar />
//       <div className="flex-1 flex flex-col">
//         <Navbar />
        
//         {/* Main Content */}
//         <main className="flex-1 p-8">
//           {/* Header */}
//           <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-4">
//                 <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center">
//                   <span className="text-white text-2xl">📄</span>
//                 </div>
//                 <div>
//                   <h1 className="text-3xl font-bold text-gray-900">Invoice Management</h1>
//                   <p className="text-gray-600 mt-1">Create, track, and manage your invoices</p>
//                 </div>
//               </div>
//               <button
//                 onClick={() => setShowForm(!showForm)}
//                 className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-medium hover:from-green-600 hover:to-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 flex items-center space-x-2"
//               >
//                 <span className="text-lg">+</span>
//                 <span>New Invoice</span>
//               </button>
//             </div>
//             <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-600 rounded-full mt-4"></div>
//           </div>

//           {/* Stats Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//             <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300">
//               <div className="flex items-center space-x-4">
//                 <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
//                   <span className="text-white text-xl">💰</span>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Total Revenue</p>
//                   <p className="text-2xl font-bold text-gray-900">${stats.total.toFixed(2)}</p>
//                 </div>
//               </div>
//             </div>
            
//             <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300">
//               <div className="flex items-center space-x-4">
//                 <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
//                   <span className="text-white text-xl">✅</span>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Amount Paid</p>
//                   <p className="text-2xl font-bold text-gray-900">${stats.paid.toFixed(2)}</p>
//                 </div>
//               </div>
//             </div>
            
//             <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300">
//               <div className="flex items-center space-x-4">
//                 <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
//                   <span className="text-white text-xl">⏰</span>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Outstanding</p>
//                   <p className="text-2xl font-bold text-gray-900">${stats.pending.toFixed(2)}</p>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300">
//               <div className="flex items-center space-x-4">
//                 <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
//                   <span className="text-white text-xl">📊</span>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Total Invoices</p>
//                   <p className="text-2xl font-bold text-gray-900">{stats.count}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Create Invoice Form */}
//           {showForm && (
//             <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
//               <div className="flex items-center justify-between mb-6">
//                 <h3 className="text-xl font-bold text-gray-900">Create New Invoice</h3>
//                 <button
//                   onClick={() => setShowForm(false)}
//                   className="text-gray-400 hover:text-gray-600 text-2xl"
//                 >
//                   ×
//                 </button>
//               </div>
              
//               <form onSubmit={handleCreate} className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   <div className="space-y-2">
//                     <label className="text-sm font-semibold text-gray-700">Client *</label>
//                     <select
//                       value={form.client}
//                       onChange={(e) => setForm({ ...form, client: e.target.value })}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white"
//                       required
//                     >
//                       <option value="">Select Client</option>
//                       {clients.map((client) => (
//                         <option key={client.id} value={client.id}>
//                           {client.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div className="space-y-2">
//                     <label className="text-sm font-semibold text-gray-700">Invoice Number *</label>
//                     <input
//                       type="text"
//                       placeholder="INV-001"
//                       value={form.invoice_number}
//                       onChange={(e) => setForm({ ...form, invoice_number: e.target.value })}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-gray-100"
//                       required
//                       readOnly
//                     />
//                     <p className="text-xs text-gray-500">Invoice number is auto-generated</p>
//                   </div>
                  
//                   <div className="space-y-2">
//                     <label className="text-sm font-semibold text-gray-700">Issue Date *</label>
//                     <input
//                       type="date"
//                       value={form.issue_date}
//                       onChange={(e) => setForm({ ...form, issue_date: e.target.value })}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
//                       required
//                     />
//                   </div>
                  
//                   <div className="space-y-2">
//                     <label className="text-sm font-semibold text-gray-700">Due Date *</label>
//                     <input
//                       type="date"
//                       value={form.due_date}
//                       onChange={(e) => setForm({ ...form, due_date: e.target.value })}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
//                       required
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <label className="text-sm font-semibold text-gray-700">Subtotal *</label>
//                     <input
//                       type="number"
//                       step="0.01"
//                       placeholder="0.00"
//                       value={form.subtotal}
//                       onChange={(e) => setForm({ ...form, subtotal: e.target.value })}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
//                       required
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <label className="text-sm font-semibold text-gray-700">Total Amount *</label>
//                     <input
//                       type="number"
//                       step="0.01"
//                       placeholder="0.00"
//                       value={form.total}
//                       onChange={(e) => setForm({ ...form, total: e.target.value })}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <label className="text-sm font-semibold text-gray-700">Notes</label>
//                   <textarea
//                     placeholder="Add invoice notes or description..."
//                     value={form.notes}
//                     onChange={(e) => setForm({ ...form, notes: e.target.value })}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 resize-none"
//                     rows="3"
//                   />
//                 </div>

                

//                 <div className="flex justify-end space-x-4 pt-4">
//                   <button
//                     type="button"
//                     onClick={() => setShowForm(false)}
//                     className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     disabled={isLoading}
//                     className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-xl font-medium hover:from-green-600 hover:to-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
//                   >
//                     <span>Create Invoice</span>
//                     {isLoading && (
//                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                     )}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           )}

//           {/* Search and Filters */}
//           <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
//             <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
//               <div className="flex-1 max-w-md">
//                 <div className="relative">
//                   <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
//                     🔍
//                   </span>
//                   <input
//                     type="text"
//                     placeholder="Search invoices..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
//                   />
//                 </div>
//               </div>
              
//               <div className="flex flex-wrap gap-3">
//                 {["all", "paid", "partial", "unpaid", "draft"].map((status) => (
//                   <button
//                     key={status}
//                     onClick={() => setFilter(status)}
//                     className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
//                       filter === status
//                         ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg"
//                         : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                     }`}
//                   >
//                     {status.charAt(0).toUpperCase() + status.slice(1)}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Invoice Table */}
//           <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
//             <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
//               <div className="flex justify-between items-center">
//                 <h3 className="text-xl font-bold text-gray-900">
//                   All Invoices ({filteredInvoices.length})
//                 </h3>
//                 <div className="text-sm text-gray-600">
//                   Total Value: <span className="font-semibold">${filteredInvoices.reduce((sum, inv) => sum + parseFloat(inv.total || 0), 0).toFixed(2)}</span>
//                 </div>
//               </div>
//             </div>
            
//             {isLoading ? (
//               <div className="flex justify-center items-center py-16">
//                 <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
//               </div>
//             ) : (
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-gray-50 border-b border-gray-200">
//                     <tr>
//                       <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
//                         Invoice Details
//                       </th>
//                       <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
//                         Client
//                       </th>
//                       <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
//                         Dates
//                       </th>
//                       <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 uppercase tracking-wider">
//                         Amounts
//                       </th>
//                       <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">
//                         Status
//                       </th>
//                       <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">
//                         Actions
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-200">
//                     {filteredInvoices.map((invoice, index) => (
//                       <tr 
//                         key={invoice.id} 
//                         className={`hover:bg-blue-50 transition-all duration-200 ${
//                           index % 2 === 0 ? 'bg-white' : 'bg-gray-25'
//                         }`}
//                       >
//                         <td className="px-8 py-6">
//                           <div className="flex items-center space-x-4">
//                             <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
//                               <span className="text-white font-bold text-sm">
//                                 #{invoice.invoice_number?.slice(-3) || "000"}
//                               </span>
//                             </div>
//                             <div>
//                               <div className="text-sm font-bold text-gray-900">
//                                 {invoice.invoice_number || "N/A"}
//                               </div>
//                               {invoice.notes && (
//                                 <div className="text-xs text-gray-500 mt-1 max-w-xs truncate">
//                                   {invoice.notes}
//                                 </div>
//                               )}
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-6 py-6">
//                           <div className="text-sm font-semibold text-gray-900">
//                             {invoice.client_name || "N/A"}
//                           </div>
//                         </td>
//                         <td className="px-6 py-6">
//                           <div className="text-sm text-gray-900">
//                             <div>Issued: {new Date(invoice.issue_date).toLocaleDateString()}</div>
//                             <div className="text-gray-500">Due: {new Date(invoice.due_date).toLocaleDateString()}</div>
//                           </div>
//                         </td>
//                         <td className="px-6 py-6 text-right">
//                           <div className="space-y-1">
//                             <div className="text-sm">
//                               <span className="text-gray-500">Subtotal:</span> 
//                               <span className="font-semibold ml-1">${parseFloat(invoice.subtotal || 0).toFixed(2)}</span>
//                             </div>
//                             <div className="text-sm font-bold text-gray-900">
//                               Total: ${parseFloat(invoice.total || 0).toFixed(2)}
//                             </div>
//                             <div className="text-sm">
//                               <span className="text-green-600 font-medium">Paid: ${parseFloat(invoice.amount_paid || 0).toFixed(2)}</span>
//                             </div>
//                             <div className="text-sm">
//                               <span className={`font-medium ${parseFloat(invoice.balance || 0) > 0 ? "text-red-600" : "text-green-600"}`}>
//                                 Balance: ${parseFloat(invoice.balance || 0).toFixed(2)}
//                               </span>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-6 py-6 text-center">
//                           <span className={`inline-flex items-center px-3 py-2 rounded-full text-xs font-bold border shadow-sm ${getStatusColor(invoice.payment_status)}`}>
//                             <span className="mr-1">{getStatusIcon(invoice.payment_status)}</span>
//                             {invoice.payment_status?.charAt(0).toUpperCase() + invoice.payment_status?.slice(1) || "Draft"}
//                           </span>
//                         </td>
//                         <td className="px-6 py-6 text-center">
//                           <div className="flex items-center justify-center space-x-2">
//                             <button
//                               className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors duration-200 flex items-center justify-center"
//                               title="View Invoice"
//                             >
//                               👁️
//                             </button>
//                             <button
//                               onclick={()=> handleEdit(invoice.id)}
//                               className="w-8 h-8 bg-yellow-100 text-yellow-600 rounded-lg hover:bg-yellow-200 transition-colors duration-200 flex items-center justify-center"
//                               title="Edit Invoice"
//                             >
//                               ✏️
//                             </button>
//                             <button
//                               onClick={() => handleDelete(invoice.id)}
//                               className="w-8 h-8 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors duration-200 flex items-center justify-center"
//                               title="Delete Invoice"
//                             >
//                               🗑️
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
                
//                 {filteredInvoices.length === 0 && !isLoading && (
//                   <div className="text-center py-16">
//                     <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
//                       <span className="text-4xl text-gray-400">📄</span>
//                     </div>
//                     <h3 className="text-xl font-bold text-gray-900 mb-2">
//                       {filter === "all" ? "No invoices found" : `No ${filter} invoices`}
//                     </h3>
//                     <p className="text-gray-500 mb-6">
//                       {filter === "all" && !searchTerm
//                         ? "Get started by creating your first invoice." 
//                         : searchTerm
//                         ? "Try adjusting your search terms."
//                         : `Try changing the filter to see other invoices.`
//                       }
//                     </p>
//                     {filter === "all" && !searchTerm && (
//                       <button
//                         onClick={() => setShowForm(true)}
//                         className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200"
//                       >
//                         Create Your First Invoice
//                       </button>
//                     )}
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


//<<<-------------------------------------------------------------->>>

// Working code-------------------------------------------->>>>

import { useEffect, useState } from "react";
import { Plus, FileText, Calendar, DollarSign, User, Edit, Trash2, Save, X, Hash, Receipt, Clock, Building, CheckCircle, AlertCircle, XCircle, CreditCard, Eye } from "lucide-react";
import axios from "../api/axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({
    client: "",
    invoice_number: "",
    issue_date: "",
    due_date: "",
    subtotal: "",
    total: "",
    notes: "",
    payment_status: "pending",
    paid_amount: "0.00",
    balance: "",
    line_items: [{ description: "", quantity: "", rate: "", amount: "" }]
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [paymentForm, setPaymentForm] = useState({
    amount: "",
    payment_date: "",
    payment_method: "bank_transfer",
    notes: ""
  });

  const fetchInvoices = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("api/invoices/");
      setInvoices(res.data);
      console.log("Fetched invoices:", res.data);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchClients = async () => {
    try {
      const res = await axios.get("api/clients/");
      setClients(res.data);
      console.log("Fetched clients:", res.data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const generateInvoiceNumber = () => {
    const currentYear = new Date().getFullYear();
    const currentMonth = String(new Date().getMonth() + 1).padStart(2, '0');
    
    // Filter invoices from current year and month
    const currentMonthInvoices = invoices.filter(invoice => {
      if (!invoice.invoice_number) return false;
      return invoice.invoice_number.includes(`${currentYear}-${currentMonth}`);
    });
    
    // Get the highest invoice number for this month
    let maxNumber = 0;
    currentMonthInvoices.forEach(invoice => {
      const parts = invoice.invoice_number?.split('-') || [];
      if (parts.length === 4) {
        const num = parseInt(parts[3]);
        if (!isNaN(num) && num > maxNumber) {
          maxNumber = num;
        }
      }
    });
    
    const nextNumber = String(maxNumber + 1).padStart(3, '0');
    return `INV-${currentYear}-${currentMonth}-${nextNumber}`;
  };

  const handleLineItemChange = (index, e) => {
    const { name, value } = e.target;
    const lineItems = [...form.line_items];
    lineItems[index][name] = value;

    if (name === "quantity" || name === "rate") {
      const quantity = parseFloat(lineItems[index].quantity) || 0;
      const rate = parseFloat(lineItems[index].rate) || 0;
      lineItems[index].amount = (quantity * rate).toFixed(2);
    }

    setForm({ ...form, line_items: lineItems });
  };

  const addLineItem = () => {
    setForm({
      ...form,
      line_items: [...form.line_items, { description: "", quantity: "", rate: "", amount: "" }]
    });
  };

  const removeLineItem = (index) => {
    if (form.line_items.length > 1) {
      const lineItems = [...form.line_items];
      lineItems.splice(index, 1);
      setForm({ ...form, line_items: lineItems });
    }
  };

  const calculateTotals = () => {
    const subtotal = form.line_items.reduce((sum, item) => {
      return sum + (parseFloat(item.amount) || 0);
    }, 0);
    const total = subtotal.toFixed(2);
    const paidAmount = parseFloat(form.paid_amount) || 0;
    const balance = (subtotal - paidAmount).toFixed(2);
    
    let paymentStatus = form.payment_status;
    if (paidAmount === 0) {
      paymentStatus = "pending";
    } else if (paidAmount >= subtotal) {
      paymentStatus = "paid";
    } else {
      paymentStatus = "partial";
    }
    
    setForm(prev => ({
      ...prev,
      subtotal: subtotal.toFixed(2),
      total: total,
      balance: balance,
      payment_status: paymentStatus
    }));
  };

  useEffect(() => {
    calculateTotals();
  }, [form.line_items, form.paid_amount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const payload = {
        ...form,
        client_id: form.client,
        line_items_data: form.line_items.map(item => ({
          description: item.description,
          quantity: item.quantity,
          rate: item.rate,
          amount: item.amount
        }))
      };
      
      if (editingId) {
        await axios.put(`api/invoices/${editingId}/`, payload);
      } else {
        await axios.post("api/invoices/", payload);
      }
      
      resetForm();
      fetchInvoices();
    } catch (error) {
      console.error("Error saving invoice:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      client: "",
      invoice_number: "",
      issue_date: "",
      due_date: "",
      subtotal: "",
      total: "",
      notes: "",
      payment_status: "pending",
      paid_amount: "0.00",
      balance: "",
      line_items: [{ description: "", quantity: "", rate: "", amount: "" }]
    });
    setShowForm(false);
    setEditingId(null);
  };

  const handleEdit = async (id) => {
    try {
      const res = await axios.get(`api/invoices/${id}/`);
      const invoiceData = res.data;
      
      setForm({
        client: invoiceData.client_id || invoiceData.client,
        invoice_number: invoiceData.invoice_number,
        issue_date: invoiceData.issue_date,
        due_date: invoiceData.due_date,
        subtotal: invoiceData.subtotal,
        total: invoiceData.total,
        notes: invoiceData.notes,
        payment_status: invoiceData.payment_status,
        paid_amount: invoiceData.paid_amount,
        balance: invoiceData.balance,
        line_items: invoiceData.line_items_data || invoiceData.line_items || 
                   [{ description: "", quantity: "", rate: "", amount: "" }]
      });
      
      setEditingId(id);
      setShowForm(true);
    } catch (error) {
      console.error("Error fetching invoice:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      try {
        await axios.delete(`api/invoices/${id}/`);
        fetchInvoices();
      } catch (error) {
        console.error("Error deleting invoice:", error);
      }
    }
  };

  const handleNewInvoice = () => {
    resetForm();
    const newInvoiceNumber = generateInvoiceNumber();
    setForm(prev => ({
      ...prev,
      invoice_number: newInvoiceNumber
    }));
    setShowForm(true);
  };

  const handleAddPayment = (invoice) => {
    setSelectedInvoice(invoice);
    setPaymentForm({
      amount: "",
      payment_date: new Date().toISOString().split('T')[0],
      payment_method: "bank_transfer",
      notes: ""
    });
    setShowPaymentModal(true);
  };

  const handlePaymentSubmit = async () => {
    setIsLoading(true);
    try {
      // Implement your payment submission logic here
      console.log("Submitting payment:", paymentForm);
      // After successful payment submission
      setShowPaymentModal(false);
      fetchInvoices();
    } catch (error) {
      console.error("Error submitting payment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status, balance) => {
    const statusMap = {
      paid: {
        text: "Paid",
        icon: <CheckCircle className="w-4 h-4" />,
        color: "bg-green-100 text-green-800"
      },
      partial: {
        text: "Partial",
        icon: <AlertCircle className="w-4 h-4" />,
        color: "bg-yellow-100 text-yellow-800"
      },
      pending: {
        text: "Pending",
        icon: <Clock className="w-4 h-4" />,
        color: "bg-blue-100 text-blue-800"
      },
      overdue: {
        text: "Overdue",
        icon: <XCircle className="w-4 h-4" />,
        color: "bg-red-100 text-red-800"
      }
    };
    
    // Determine status based on balance if status is not explicitly set
    const effectiveStatus = parseFloat(balance) <= 0 ? 'paid' : status;
    
    const badge = statusMap[effectiveStatus] || statusMap.pending;
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${badge.color}`}>
        {badge.icon}
        <span className="ml-1">{badge.text}</span>
      </span>
    );
  };

  useEffect(() => {
    fetchInvoices();
    fetchClients();
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-6 space-y-6">
          {/* Header Section */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl">
                  <Receipt className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    Invoice Management
                  </h1>
                  <p className="text-gray-600 mt-1">Create and manage professional invoices</p>
                </div>
              </div>
              <button
                onClick={handleNewInvoice}
                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <div className="flex items-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span className="font-semibold">New Invoice</span>
                </div>
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>

          {/* Invoice Form */}
          {showForm && (
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
                  <FileText className="w-6 h-6 text-blue-600" />
                  <span>{editingId ? 'Edit Invoice' : 'Create New Invoice'}</span>
                </h2>
                <button
                  onClick={resetForm}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-8">
                {/* Basic Information */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                      <User className="w-4 h-4" />
                      <span>Client *</span>
                    </label>
                    <select
                      name="client"
                      value={form.client}
                      onChange={(e) => setForm({ ...form, client: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    >
                      <option value="">Select a client</option>
                      {clients.map(client => (
                        <option key={client.id} value={client.id}>
                          {client.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                      <Hash className="w-4 h-4" />
                      <span>Invoice Number</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={form.invoice_number}
                        readOnly
                        className="w-full px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl font-mono text-sm"
                      />
                      <div className="absolute right-3 top-3 p-1 bg-green-100 rounded-full">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                      <Calendar className="w-4 h-4" />
                      <span>Issue Date *</span>
                    </label>
                    <input
                      type="date"
                      value={form.issue_date}
                      onChange={(e) => setForm({ ...form, issue_date: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                      <Clock className="w-4 h-4" />
                      <span>Due Date *</span>
                    </label>
                    <input
                      type="date"
                      value={form.due_date}
                      onChange={(e) => setForm({ ...form, due_date: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                {/* Line Items */}
                <div className="space-y-4">
                  <label className="text-lg font-semibold text-gray-900">Line Items</label>
                  <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                    {form.line_items.map((item, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                        <div className="md:col-span-5">
                          <input
                            type="text"
                            name="description"
                            placeholder="Item description"
                            value={item.description}
                            onChange={(e) => handleLineItemChange(index, e)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <input
                            type="number"
                            name="quantity"
                            placeholder="Qty"
                            value={item.quantity}
                            onChange={(e) => handleLineItemChange(index, e)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <input
                            type="number"
                            step="0.01"
                            name="rate"
                            placeholder="Rate"
                            value={item.rate}
                            onChange={(e) => handleLineItemChange(index, e)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <input
                            type="text"
                            value={`₹${item.amount}`}
                            readOnly
                            className="w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-xl font-semibold text-blue-800"
                          />
                        </div>
                        <div className="md:col-span-1">
                          <button
                            type="button"
                            onClick={() => removeLineItem(index)}
                            className="w-full p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                            disabled={form.line_items.length === 1}
                          >
                            <Trash2 className="w-4 h-4 mx-auto" />
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    <button
                      type="button"
                      onClick={addLineItem}
                      className="w-full py-3 border-2 border-dashed border-gray-300 hover:border-blue-400 text-gray-600 hover:text-blue-600 rounded-xl transition-colors flex items-center justify-center space-x-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Line Item</span>
                    </button>
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Notes</label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-24"
                    placeholder="Additional notes or terms..."
                  />
                </div>

                {/* Totals */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                      <div className="text-sm text-gray-600 font-medium">Subtotal</div>
                      <div className="text-xl font-bold text-blue-600">₹{form.subtotal}</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                      <div className="text-sm text-gray-600 font-medium">Paid Amount</div>
                      <div className="text-xl font-bold text-green-600">₹{form.paid_amount}</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                      <div className="text-sm text-gray-600 font-medium">Balance Due</div>
                      <div className={`text-xl font-bold ${parseFloat(form.balance) > 0 ? 'text-red-600' : 'text-green-600'}`}>
                        ₹{form.balance}
                      </div>
                    </div>
                  </div>
                  <hr className="border-gray-300" />
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-700">Total Amount</div>
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      ₹{form.total}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>{isLoading ? "Saving..." : editingId ? "Update Invoice" : "Create Invoice"}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Invoice List */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
              <Building className="w-6 h-6 text-blue-600" />
              <span>Invoice List</span>
            </h2>
            
            {isLoading && invoices.length === 0 ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                <p className="text-gray-500 mt-4">Loading invoices...</p>
              </div>
            ) : invoices.length === 0 ? (
              <div className="text-center py-12">
                <Receipt className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No invoices found</p>
                <p className="text-gray-400">Create your first invoice to get started</p>
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl border border-gray-200">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-blue-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Invoice #</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Client</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Issue Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Total</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Balance</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {invoices.map(invoice => (
                      <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-mono text-sm text-blue-600">{invoice.invoice_number}</td>
                        <td className="px-6 py-4 text-gray-900">
                          {invoice.client?.name || invoice.client_name || `Client ${invoice.client_id}`}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {new Date(invoice.issue_date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900">₹{invoice.total}</td>
                        <td className="px-6 py-4">
                          {getStatusBadge(invoice.payment_status, invoice.balance)}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`font-semibold ${
                            parseFloat(invoice.balance) > 0 ? 'text-red-600' : 'text-green-600'
                          }`}>
                            ₹{invoice.balance || invoice.total}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEdit(invoice.id)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            {parseFloat(invoice.balance || invoice.total) > 0 && (
                              <button
                                onClick={() => handleAddPayment(invoice)}
                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                title="Add Payment"
                              >
                                <CreditCard className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(invoice.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Payment Modal */}
          {showPaymentModal && selectedInvoice && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                    <CreditCard className="w-6 h-6 text-green-600" />
                    <span>Add Payment</span>
                  </h3>
                  <button
                    onClick={() => setShowPaymentModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="text-sm text-gray-600">Invoice: {selectedInvoice.invoice_number}</div>
                    <div className="text-lg font-semibold">Balance Due: ₹{selectedInvoice.balance || selectedInvoice.total}</div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Payment Amount *</label>
                    <input
                      type="number"
                      step="0.01"
                      value={paymentForm.amount}
                      onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="0.00"
                      max={selectedInvoice.balance || selectedInvoice.total}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Payment Date *</label>
                    <input
                      type="date"
                      value={paymentForm.payment_date}
                      onChange={(e) => setPaymentForm({ ...paymentForm, payment_date: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Payment Method</label>
                    <select
                      value={paymentForm.payment_method}
                      onChange={(e) => setPaymentForm({ ...paymentForm, payment_method: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="bank_transfer">Bank Transfer</option>
                      <option value="cash">Cash</option>
                      <option value="check">Check</option>
                      <option value="credit_card">Credit Card</option>
                      <option value="online">Online Payment</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Notes</label>
                    <textarea
                      value={paymentForm.notes}
                      onChange={(e) => setPaymentForm({ ...paymentForm, notes: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none h-20"
                      placeholder="Payment notes..."
                    />
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowPaymentModal(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePaymentSubmit}
                    disabled={isLoading || !paymentForm.amount}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Processing..." : "Add Payment"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}


//<<<<-------------------------------------------------------------------->>>>
//<<<<-------------------------------------------------------------------->>>>

// import { useEffect, useState } from "react";
// import axios from "../api/axios";
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";

// export default function Invoices() {
//   const [invoices, setInvoices] = useState([]);
//   const [clients, setClients] = useState([]);
//   const [form, setForm] = useState({
//     client: "",
//     invoice_number: "",
//     issue_date: "",
//     due_date: "",
//     subtotal: "0.00",
//     total: "0.00",
//     notes: "",
//     line_items: [{ description: "", quantity: "", rate: "", amount: "0.00" }]
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [showForm, setShowForm] = useState(false);
//   const [isGeneratingNumber, setIsGeneratingNumber] = useState(false);

//   const fetchInvoices = async () => {
//     setIsLoading(true);
//     try {
//       const res = await axios.get("api/invoices/");
//       setInvoices(res.data);
//     } catch (error) {
//       console.error("Error fetching invoices:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchClients = async () => {
//     try {
//       const res = await axios.get("api/clients/");
//       setClients(res.data);
//     } catch (error) {
//       console.error("Error fetching clients:", error);
//     }
//   };

//   const generateInvoiceNumber = () => {
//     try {
//       // If no invoices exist yet
//       if (!invoices || invoices.length === 0) {
//         return "INV-001";
//       }

//       // Extract and parse all invoice numbers
//       const numbers = invoices
//         .map(inv => inv.invoice_number)
//         .filter(num => num && typeof num === 'string')
//         .map(num => {
//           // Handle both "INV-001" and "INV001" formats
//           const match = num.match(/INV-?(\d+)/i);
//           return match ? parseInt(match[1], 10) : 0;
//         });

//       const maxNumber = numbers.length > 0 ? Math.max(...numbers) : 0;
//       return `INV-${(maxNumber + 1).toString().padStart(3, '0')}`;
//     } catch (error) {
//       console.error("Error generating invoice number:", error);
//       return "INV-001"; // Fallback
//     }
//   };

//   const handleLineItemChange = (index, e) => {
//     const { name, value } = e.target;
//     const lineItems = [...form.line_items];
//     lineItems[index][name] = value;

//     if (name === "quantity" || name === "rate") {
//       const quantity = parseFloat(lineItems[index].quantity) || 0;
//       const rate = parseFloat(lineItems[index].rate) || 0;
//       lineItems[index].amount = (quantity * rate).toFixed(2);
//     }

//     setForm({ ...form, line_items: lineItems });
//   };

//   const addLineItem = () => {
//     setForm({
//       ...form,
//       line_items: [...form.line_items, { description: "", quantity: "", rate: "", amount: "0.00" }]
//     });
//   };

//   const removeLineItem = (index) => {
//     const lineItems = [...form.line_items];
//     lineItems.splice(index, 1);
//     setForm({ ...form, line_items: lineItems });
//   };

//   const calculateTotals = () => {
//     const subtotal = form.line_items.reduce((sum, item) => {
//       return sum + (parseFloat(item.amount) || 0);
//     }, 0);
//     setForm(prev => ({
//       ...prev,
//       subtotal: subtotal.toFixed(2),
//       total: subtotal.toFixed(2)
//     }));
//   };

//   const resetForm = () => {
//     setForm({
//       client: "",
//       invoice_number: "",
//       issue_date: "",
//       due_date: "",
//       subtotal: "0.00",
//       total: "0.00",
//       notes: "",
//       line_items: [{ description: "", quantity: "", rate: "", amount: "0.00" }]
//     });
//   };

//   const handleCreate = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       const payload = {
//         ...form,
//         client_id: form.client,
//         line_items_data: form.line_items.map(item => ({
//           description: item.description,
//           quantity: parseFloat(item.quantity) || 0,
//           rate: parseFloat(item.rate) || 0,
//           amount: parseFloat(item.amount) || 0
//         }))
//       };
//       await axios.post("api/invoices/", payload);
//       resetForm();
//       setShowForm(false);
//       fetchInvoices();
//     } catch (error) {
//       console.error("Error creating invoice:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleEdit = async (id) => {
//     if (window.confirm("Edit this invoice?")) {
//       setIsLoading(true);
//       try {
//         const res = await axios.get(`api/invoices/${id}/`);
//         const invoiceData = res.data;
//         const lineItems = invoiceData.line_items_data.map(item => ({
//           description: item.description,
//           quantity: item.quantity.toString(),
//           rate: item.rate.toString(),
//           amount: item.amount.toFixed(2)
//         }));
//         setForm({
//           ...invoiceData,
//           client: invoiceData.client_id,
//           line_items: lineItems.length ? lineItems : [{ description: "", quantity: "", rate: "", amount: "0.00" }],
//           subtotal: invoiceData.subtotal.toFixed(2),
//           total: invoiceData.total.toFixed(2)
//         });
//         setShowForm(true);
//       } catch (error) {
//         console.error("Error fetching invoice:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Delete this invoice?")) {
//       try {
//         await axios.delete(`api/invoices/${id}/`);
//         fetchInvoices();
//       } catch (error) {
//         console.error("Error deleting invoice:", error);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchInvoices();
//     fetchClients();
//   }, []);

//   useEffect(() => {
//     calculateTotals();
//   }, [form.line_items]);

//   useEffect(() => {
//     if (showForm) {
//       setIsGeneratingNumber(true);
//       const generatedNumber = generateInvoiceNumber();
//       setForm(prev => ({
//         ...prev,
//         invoice_number: generatedNumber,
//         issue_date: new Date().toISOString().split('T')[0] // Set default issue date to today
//       }));
//       setIsGeneratingNumber(false);
//     }
//   }, [showForm, invoices]);

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <Sidebar />
//       <div className="flex-1 flex flex-col">
//         <Navbar />
//         <main className="flex-1 p-8">
//           <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
//             <div className="flex justify-between items-center">
//               <h1 className="text-3xl font-bold text-gray-900">Invoices</h1>
//               <button
//                 onClick={() => {
//                   resetForm();
//                   setShowForm(!showForm);
//                 }}
//                 className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl disabled:opacity-50"
//                 disabled={isLoading}
//               >
//                 {isLoading ? "Loading..." : "+ New Invoice"}
//               </button>
//             </div>
//           </div>

//           {showForm && (
//             <form onSubmit={handleCreate} className="bg-white border p-6 rounded-xl mb-8">
//               {isGeneratingNumber ? (
//                 <div className="text-center py-4">Preparing invoice form...</div>
//               ) : (
//                 <>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
//                       <select
//                         name="client"
//                         value={form.client}
//                         onChange={(e) => setForm({ ...form, client: e.target.value })}
//                         className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                         required
//                         disabled={isLoading}
//                       >
//                         <option value="">Select a client</option>
//                         {clients.map(client => (
//                           <option key={client.id} value={client.id}>
//                             {client.name}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Number</label>
//                       <input
//                         type="text"
//                         value={form.invoice_number}
//                         readOnly
//                         className="w-full border px-4 py-2 rounded bg-gray-50"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Issue Date</label>
//                       <input
//                         type="date"
//                         value={form.issue_date}
//                         onChange={(e) => setForm({ ...form, issue_date: e.target.value })}
//                         className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                         required
//                         disabled={isLoading}
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
//                       <input
//                         type="date"
//                         value={form.due_date}
//                         onChange={(e) => setForm({ ...form, due_date: e.target.value })}
//                         className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                         required
//                         disabled={isLoading}
//                       />
//                     </div>
//                   </div>

//                   <div className="mb-4">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Line Items</label>
//                     {form.line_items.map((item, index) => (
//                       <div key={index} className="grid grid-cols-12 gap-2 mb-3 items-center">
//                         <div className="col-span-5">
//                           <input
//                             type="text"
//                             name="description"
//                             placeholder="Description"
//                             value={item.description}
//                             onChange={(e) => handleLineItemChange(index, e)}
//                             className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                             disabled={isLoading}
//                           />
//                         </div>
//                         <div className="col-span-2">
//                           <input
//                             type="number"
//                             name="quantity"
//                             placeholder="Qty"
//                             value={item.quantity}
//                             onChange={(e) => handleLineItemChange(index, e)}
//                             min="0"
//                             step="1"
//                             className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                             disabled={isLoading}
//                           />
//                         </div>
//                         <div className="col-span-2">
//                           <input
//                             type="number"
//                             name="rate"
//                             placeholder="Rate"
//                             value={item.rate}
//                             onChange={(e) => handleLineItemChange(index, e)}
//                             min="0"
//                             step="0.01"
//                             className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                             disabled={isLoading}
//                           />
//                         </div>
//                         <div className="col-span-2">
//                           <input
//                             type="text"
//                             value={item.amount}
//                             readOnly
//                             className="w-full border px-3 py-2 rounded bg-gray-50"
//                           />
//                         </div>
//                         <div className="col-span-1">
//                           {index > 0 && (
//                             <button
//                               type="button"
//                               onClick={() => removeLineItem(index)}
//                               className="text-red-500 hover:text-red-700 disabled:opacity-50"
//                               disabled={isLoading}
//                             >
//                               ×
//                             </button>
//                           )}
//                         </div>
//                       </div>
//                     ))}
//                     <button
//                       type="button"
//                       onClick={addLineItem}
//                       className="mt-2 text-sm text-blue-600 hover:underline disabled:opacity-50"
//                       disabled={isLoading}
//                     >
//                       + Add Item
//                     </button>
//                   </div>

//                   <div className="mb-4">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
//                     <textarea
//                       value={form.notes}
//                       onChange={(e) => setForm({ ...form, notes: e.target.value })}
//                       className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                       rows="3"
//                       disabled={isLoading}
//                     />
//                   </div>

//                   <div className="flex justify-between mb-4 p-3 bg-gray-50 rounded">
//                     <div className="font-medium">Subtotal: ₹{form.subtotal}</div>
//                     <div className="font-bold">Total: ₹{form.total}</div>
//                   </div>

//                   <div className="flex justify-end space-x-3">
//                     <button
//                       type="button"
//                       onClick={() => setShowForm(false)}
//                       className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
//                       disabled={isLoading}
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       type="submit"
//                       className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50"
//                       disabled={isLoading}
//                     >
//                       {isLoading ? "Saving..." : "Save Invoice"}
//                     </button>
//                   </div>
//                 </>
//               )}
//             </form>
//           )}

//           {/* Invoice list */}
//           <div className="bg-white p-6 rounded-xl shadow">
//             <h2 className="text-xl font-bold mb-4">Invoice List</h2>
//             {isLoading && invoices.length === 0 ? (
//               <div className="text-center py-8">Loading invoices...</div>
//             ) : invoices.length === 0 ? (
//               <p className="text-gray-500">No invoices found.</p>
//             ) : (
//               <div className="overflow-x-auto">
//                 <table className="w-full table-auto border">
//                   <thead>
//                     <tr className="bg-gray-100 text-left">
//                       <th className="p-3 border">Invoice #</th>
//                       <th className="p-3 border">Client</th>
//                       <th className="p-3 border">Issue Date</th>
//                       <th className="p-3 border">Due Date</th>
//                       <th className="p-3 border text-right">Total</th>
//                       <th className="p-3 border">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {invoices.map(inv => (
//                       <tr key={inv.id} className="border-t hover:bg-gray-50">
//                         <td className="p-3 border font-medium">{inv.invoice_number}</td>
//                         <td className="p-3 border">{inv.client_name || inv.client}</td>
//                         <td className="p-3 border">{new Date(inv.issue_date).toLocaleDateString()}</td>
//                         <td className="p-3 border">{new Date(inv.due_date).toLocaleDateString()}</td>
//                         <td className="p-3 border text-right">₹{parseFloat(inv.total).toFixed(2)}</td>
//                         <td className="p-3 border">
//                           <div className="flex space-x-2">
//                             <button 
//                               onClick={() => handleEdit(inv.id)} 
//                               className="text-blue-600 hover:text-blue-800 disabled:opacity-50"
//                               disabled={isLoading}
//                             >
//                               Edit
//                             </button>
//                             <button 
//                               onClick={() => handleDelete(inv.id)} 
//                               className="text-red-600 hover:text-red-800 disabled:opacity-50"
//                               disabled={isLoading}
//                             >
//                               Delete
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }