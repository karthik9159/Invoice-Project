
import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import { Plus, Edit2, Trash2, CreditCard, Calendar, User, FileText, DollarSign, X } from "lucide-react";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ id: null, invoice: "", amount_paid: "" });
  const [showForm, setShowForm] = useState(false);

  const fetchPayments = async () => {
    try {
      const response = await axios.get("/api/payments/");
      console.log("Payments API response:", response.data);
      setPayments(response.data.results);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  const fetchInvoices = async () => {
    try {
      const response = await axios.get("/api/invoices/");
      setInvoices(response.data.results);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  useEffect(() => {
    fetchInvoices();
    fetchPayments();
    setLoading(false);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.id) {
        await axios.put(`/api/payments/${form.id}/`, form);
      } else {
        await axios.post("/api/payments/", form);
      }
      fetchPayments();
      setForm({ id: null, invoice: "", amount_paid: "" });
      setShowForm(false);
    } catch (error) {
      console.error("Error saving payment:", error);
    }
  };

  const handleEdit = (payment) => {
    setForm({ id: payment.id, invoice: payment.invoice, amount_paid: payment.amount_paid });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this payment?")) {
      await axios.delete(`/api/payments/${id}/`);
      fetchPayments();
    }
  };

  const handleAddPayment = (e) => {
    e.preventDefault();
    setForm({ id: null, invoice: "", amount_paid: "" });
    setShowForm(true);
  };

  const handleCancel = () => {
    setForm({ id: null, invoice: "", amount_paid: "" });
    setShowForm(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <CreditCard className="text-blue-600" size={32} />
                  Payments
                </h1>
                <p className="text-gray-600 mt-2">Manage payment records and transactions</p>
              </div>
              <button 
                onClick={handleAddPayment} 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-200 flex items-center gap-2 font-medium"
              >
                <Plus size={20} />
                Add Payment
              </button>
            </div>
          </div>

          {/* Add/Edit Payment Form */}
          {showForm && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <CreditCard className="text-blue-600" size={24} />
                    {form.id ? "Edit Payment" : "Add Payment"}
                  </h2>
                  <button
                    onClick={handleCancel}
                    className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Invoice Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FileText size={16} className="inline mr-2" />
                      Invoice
                    </label>
                    <select 
                      name="invoice" 
                      value={form.invoice} 
                      onChange={handleChange} 
                      className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      required
                    >
                      <option value="">-- Select Invoice --</option>
                      {invoices.map((inv) => (
                        <option key={inv.id} value={inv.id}>
                          {inv.invoice_number} - {inv.client.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Amount Paid Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <DollarSign size={16} className="inline mr-2" />
                      Amount Paid
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      name="amount_paid"
                      value={form.amount_paid}
                      onChange={handleChange}
                      className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter amount"
                      required
                    />
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
                  <button 
                    type="button" 
                    onClick={handleCancel} 
                    className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-150 font-medium"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-150 font-medium"
                  >
                    {form.id ? "Update" : "Add"} Payment
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Payments Table */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <FileText size={16} />
                          Invoice
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <User size={16} />
                          Client
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <DollarSign size={16} />
                          Amount Paid
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          Date
                        </div>
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {payments.map((payment) => (
                      <tr key={payment.id} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {payment.invoice_number}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 font-medium">
                            {payment.client_name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-green-600">
                            ₹{payment.amount_paid.toLocaleString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">
                            {new Date(payment.payment_date).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="flex justify-center space-x-2">
                            <button 
                              onClick={() => handleEdit(payment)} 
                              className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-colors duration-150"
                              title="Edit Payment"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button 
                              onClick={() => handleDelete(payment.id)} 
                              className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors duration-150"
                              title="Delete Payment"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {payments.length === 0 && (
                  <div className="text-center py-12">
                    <CreditCard className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No payments found</h3>
                    <p className="text-gray-500">Get started by adding your first payment record.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payments;









// import React, { useEffect, useState } from "react";
// import axios from "../api/axios";
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
// import { Plus, Edit2, Trash2, CreditCard, Calendar, User, FileText, DollarSign, X, ChevronLeft, ChevronRight, Search } from "lucide-react";

// const Payments = () => {
//   const [payments, setPayments] = useState([]);
//   const [invoices, setInvoices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [form, setForm] = useState({ id: null, invoice: "", amount_paid: "" });
//   const [showForm, setShowForm] = useState(false);
  
//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredInvoices, setFilteredInvoices] = useState([]);

//   const fetchPayments = async (page = 1) => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`/api/payments/?page=${page}`);
//       if (response.data && Array.isArray(response.data.results)) {
//         setPayments(response.data.results);
//         setTotalPages(Math.ceil(response.data.count / 5)); // PAGE_SIZE is 5
//       } else {
//         setError("Invalid data format received from server");
//         setPayments([]);
//       }
//     } catch (error) {
//       console.error("Error fetching payments:", error);
//       setError("Failed to load payments");
//       setPayments([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchInvoices = async () => {
//     try {
//       const response = await axios.get("/api/invoices/");
//       const invoicesData = Array.isArray(response?.data) ? response.data : [];
//       setInvoices(invoicesData);
//       setFilteredInvoices(invoicesData);
//     } catch (error) {
//       console.error("Error fetching invoices:", error);
//       setInvoices([]);
//       setFilteredInvoices([]);
//     }
//   };

//   useEffect(() => {
//     fetchInvoices();
//     fetchPayments(currentPage);
//   }, [currentPage]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (form.id) {
//         await axios.put(`/api/payments/${form.id}/`, form);
//       } else {
//         await axios.post("/api/payments/", form);
//       }
//       fetchPayments(currentPage);
//       setForm({ id: null, invoice: "", amount_paid: "" });
//       setShowForm(false);
//     } catch (error) {
//       console.error("Error saving payment:", error);
//     }
//   };

//   const handleEdit = (payment) => {
//     setForm({
//       id: payment.id,
//       invoice: payment.invoice,
//       amount_paid: payment.amount_paid
//     });
//     setShowForm(true);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this payment?")) {
//       try {
//         await axios.delete(`/api/payments/${id}/`);
//         fetchPayments(currentPage);
//       } catch (error) {
//         console.error("Error deleting payment:", error);
//       }
//     }
//   };

//   const handleSearchInvoices = (e) => {
//     const term = e.target.value.toLowerCase();
//     setSearchTerm(term);
    
//     const filtered = invoices.filter(inv => {
//       const invoiceNumber = inv.invoice_number?.toLowerCase() || '';
//       const clientName = inv.client?.name?.toLowerCase() || '';
//       return invoiceNumber.includes(term) || clientName.includes(term);
//     });
    
//     setFilteredInvoices(filtered);
//   };

//   const handlePageChange = (newPage) => {
//     if (newPage > 0 && newPage <= totalPages) {
//       setCurrentPage(newPage);
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <Sidebar />
//       <div className="flex-1">
//         <Navbar />
//         <div className="p-8">
//           {/* Header Section */}
//           <div className="mb-8">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
//                   <CreditCard className="text-blue-600" size={32} />
//                   Payments
//                 </h1>
//                 <p className="text-gray-600 mt-2">Manage payment records and transactions</p>
//               </div>
//               <button 
//                 onClick={() => {
//                   setForm({ id: null, invoice: "", amount_paid: "" });
//                   setShowForm(true);
//                 }} 
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-200 flex items-center gap-2 font-medium"
//               >
//                 <Plus size={20} />
//                 Add Payment
//               </button>
//             </div>
//           </div>

//           {/* Add/Edit Payment Form */}
//           {showForm && (
//             <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8 overflow-hidden">
//               <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
//                 <div className="flex items-center justify-between">
//                   <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
//                     <CreditCard className="text-blue-600" size={24} />
//                     {form.id ? "Edit Payment" : "Add Payment"}
//                   </h2>
//                   <button
//                     onClick={() => setShowForm(false)}
//                     className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-200 transition-colors"
//                   >
//                     <X size={20} />
//                   </button>
//                 </div>
//               </div>
              
//               <form onSubmit={handleSubmit} className="p-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {/* Invoice Field with Search */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       <FileText size={16} className="inline mr-2" />
//                       Invoice
//                     </label>
//                     <div className="relative">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <Search size={16} className="text-gray-400" />
//                       </div>
//                       <input
//                         type="text"
//                         placeholder="Search invoices..."
//                         value={searchTerm}
//                         onChange={handleSearchInvoices}
//                         className="w-full border border-gray-300 pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors mb-2"
//                       />
//                     </div>
//                     <select 
//                       name="invoice" 
//                       value={form.invoice} 
//                       onChange={handleChange} 
//                       className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                       required
//                     >
//                       <option value="">-- Select Invoice --</option>
//                       {Array.isArray(filteredInvoices) && filteredInvoices.map((inv) => (
//                         <option key={inv.id} value={inv.id}>
//                           {inv.invoice_number} - {inv.client?.name} (₹{inv.total_amount})
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   {/* Amount Paid Field */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       <DollarSign size={16} className="inline mr-2" />
//                       Amount Paid
//                     </label>
//                     <input
//                       type="number"
//                       step="0.01"
//                       name="amount_paid"
//                       value={form.amount_paid}
//                       onChange={handleChange}
//                       className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                       placeholder="Enter amount"
//                       required
//                     />
//                   </div>
//                 </div>

//                 {/* Form Actions */}
//                 <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
//                   <button 
//                     type="button" 
//                     onClick={() => setShowForm(false)} 
//                     className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-150 font-medium"
//                   >
//                     Cancel
//                   </button>
//                   <button 
//                     type="submit" 
//                     className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-150 font-medium"
//                   >
//                     {form.id ? "Update" : "Add"} Payment
//                   </button>
//                 </div>
//               </form>
//             </div>
//           )}

//           {/* Payments Table */}
//           {loading ? (
//             <div className="flex justify-center items-center h-64">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//             </div>
//           ) : error ? (
//             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
//               <CreditCard className="mx-auto h-12 w-12 text-red-500 mb-4" />
//               <h3 className="text-lg font-medium text-gray-900 mb-2">Error loading payments</h3>
//               <p className="text-gray-500 mb-4">{error}</p>
//               <button 
//                 onClick={() => fetchPayments(currentPage)}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//               >
//                 Retry
//               </button>
//             </div>
//           ) : (
//             <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         <div className="flex items-center gap-2">
//                           <FileText size={16} />
//                           Invoice
//                         </div>
//                       </th>
//                       <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         <div className="flex items-center gap-2">
//                           <User size={16} />
//                           Client
//                         </div>
//                       </th>
//                       <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         <div className="flex items-center gap-2">
//                           <DollarSign size={16} />
//                           Amount Paid
//                         </div>
//                       </th>
//                       <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         <div className="flex items-center gap-2">
//                           <Calendar size={16} />
//                           Date
//                         </div>
//                       </th>
//                       <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Actions
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {Array.isArray(payments) && payments.length > 0 ? (
//                       payments.map((payment) => (
//                         <tr key={payment.id} className="hover:bg-gray-50 transition-colors duration-150">
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div className="text-sm font-medium text-gray-900">
//                               {payment.invoice_number}
//                             </div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div className="text-sm text-gray-900 font-medium">
//                               {payment.client_name}
//                             </div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div className="text-sm font-semibold text-green-600">
//                               ₹{payment.amount_paid?.toLocaleString()}
//                             </div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div className="text-sm text-gray-600">
//                               {payment.payment_date && new Date(payment.payment_date).toLocaleDateString()}
//                             </div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-center">
//                             <div className="flex justify-center space-x-2">
//                               <button 
//                                 onClick={() => handleEdit(payment)} 
//                                 className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-colors duration-150"
//                                 title="Edit Payment"
//                               >
//                                 <Edit2 size={16} />
//                               </button>
//                               <button 
//                                 onClick={() => handleDelete(payment.id)} 
//                                 className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors duration-150"
//                                 title="Delete Payment"
//                               >
//                                 <Trash2 size={16} />
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="5" className="px-6 py-4 text-center">
//                           <div className="text-center py-12">
//                             <CreditCard className="mx-auto h-12 w-12 text-gray-400 mb-4" />
//                             <h3 className="text-lg font-medium text-gray-900 mb-2">No payments found</h3>
//                             <p className="text-gray-500">Get started by adding your first payment record.</p>
//                           </div>
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>

//               {/* Pagination Controls */}
//               {totalPages > 1 && (
//                 <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
//                   <div className="text-sm text-gray-700">
//                     Page {currentPage} of {totalPages}
//                   </div>
//                   <div className="flex space-x-2">
//                     <button
//                       onClick={() => handlePageChange(currentPage - 1)}
//                       disabled={currentPage === 1}
//                       className={`px-3 py-1 rounded-lg border ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
//                     >
//                       <ChevronLeft size={16} />
//                     </button>
                    
//                     {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
//                       <button
//                         key={page}
//                         onClick={() => handlePageChange(page)}
//                         className={`px-3 py-1 rounded-lg ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
//                       >
//                         {page}
//                       </button>
//                     ))}
                    
//                     <button
//                       onClick={() => handlePageChange(currentPage + 1)}
//                       disabled={currentPage === totalPages}
//                       className={`px-3 py-1 rounded-lg border ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
//                     >
//                       <ChevronRight size={16} />
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Payments;






// import React, { useEffect, useState } from "react";
// import axios from "../api/axios"; // your axios instance
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
// import {
//   Plus,
//   Edit2,
//   Trash2,
//   CreditCard,
//   Calendar,
//   User,
//   FileText,
//   DollarSign,
//   X,
//   ChevronLeft,
//   ChevronRight,
//   Search,
// } from "lucide-react";

// const Payments = () => {
//   const [payments, setPayments] = useState([]);
//   const [invoices, setInvoices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [form, setForm] = useState({ id: null, invoice: "", amount_paid: "" });
//   const [showForm, setShowForm] = useState(false);

//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredInvoices, setFilteredInvoices] = useState([]);

//   // Fetch payments with pagination
//   const fetchPayments = async (page = 1) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await axios.get(`/api/payments/?page=${page}`);
//       if (response.data && Array.isArray(response.data.results)) {
//         setPayments(response.data.results);
//         setTotalPages(Math.ceil(response.data.count / 5)); // PAGE_SIZE = 5
//       } else {
//         setError("Invalid data format received from server");
//         setPayments([]);
//       }
//     } catch (err) {
//       setError("Failed to load payments");
//       setPayments([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch invoices for dropdown and filtering
//   const fetchInvoices = async () => {
//     try {
//       const response = await axios.get("/api/invoices/");
//       const invoicesData = Array.isArray(response.data) ? response.data : [];
//       setInvoices(invoicesData);
//       setFilteredInvoices(invoicesData);
//     } catch (err) {
//       setInvoices([]);
//       setFilteredInvoices([]);
//     }
//   };

//   useEffect(() => {
//     fetchInvoices();
//     fetchPayments(currentPage);
//   }, [currentPage]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (form.id) {
//         await axios.put(`/api/payments/${form.id}/`, form);
//       } else {
//         await axios.post("/api/payments/", form);
//       }
//       fetchPayments(currentPage);
//       setForm({ id: null, invoice: "", amount_paid: "" });
//       setShowForm(false);
//       setSearchTerm("");
//       setFilteredInvoices(invoices);
//     } catch (err) {
//       alert("Failed to save payment.");
//     }
//   };

//   const handleEdit = (payment) => {
//     setForm({
//       id: payment.id,
//       invoice: payment.invoice,
//       amount_paid: payment.amount_paid,
//     });
//     setShowForm(true);
//     setSearchTerm("");
//     setFilteredInvoices(invoices);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this payment?")) {
//       try {
//         await axios.delete(`/api/payments/${id}/`);
//         fetchPayments(currentPage);
//       } catch (err) {
//         alert("Failed to delete payment.");
//       }
//     }
//   };

//   const handleSearchInvoices = (e) => {
//     const term = e.target.value.toLowerCase();
//     setSearchTerm(term);
//     const filtered = invoices.filter((inv) => {
//       const invoiceNumber = inv.invoice_number?.toLowerCase() || "";
//       const clientName = inv.client?.name?.toLowerCase() || "";
//       return invoiceNumber.includes(term) || clientName.includes(term);
//     });
//     setFilteredInvoices(filtered);
//   };

//   const handlePageChange = (newPage) => {
//     if (newPage > 0 && newPage <= totalPages) {
//       setCurrentPage(newPage);
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <Sidebar />
//       <div className="flex-1">
//         <Navbar />
//         <div className="p-8">
//           {/* Header */}
//           <div className="mb-8 flex items-center justify-between">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
//                 <CreditCard className="text-blue-600" size={32} />
//                 Payments
//               </h1>
//               <p className="text-gray-600 mt-2">Manage payment records and transactions</p>
//             </div>
//             <button
//               onClick={() => {
//                 setForm({ id: null, invoice: "", amount_paid: "" });
//                 setShowForm(true);
//                 setSearchTerm("");
//                 setFilteredInvoices(invoices);
//               }}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-200 flex items-center gap-2 font-medium"
//             >
//               <Plus size={20} />
//               Add Payment
//             </button>
//           </div>

//           {/* Add/Edit Payment Form */}
//           {showForm && (
//             <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8 overflow-hidden">
//               <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
//                 <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
//                   <CreditCard className="text-blue-600" size={24} />
//                   {form.id ? "Edit Payment" : "Add Payment"}
//                 </h2>
//                 <button
//                   onClick={() => setShowForm(false)}
//                   className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-200 transition-colors"
//                 >
//                   <X size={20} />
//                 </button>
//               </div>

//               <form onSubmit={handleSubmit} className="p-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {/* Invoice Search & Select */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       <FileText size={16} className="inline mr-2" />
//                       Invoice
//                     </label>
//                     <div className="relative">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <Search size={16} className="text-gray-400" />
//                       </div>
//                       <input
//                         type="text"
//                         placeholder="Search invoices..."
//                         value={searchTerm}
//                         onChange={handleSearchInvoices}
//                         className="w-full border border-gray-300 pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors mb-2"
//                       />
//                     </div>
//                     <select
//                       name="invoice"
//                       value={form.invoice}
//                       onChange={handleChange}
//                       className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                       required
//                     >
//                       <option value="">-- Select Invoice --</option>
//                       {filteredInvoices.map((inv) => (
//                         <option key={inv.id} value={inv.id}>
//                           {inv.invoice_number} - {inv.client?.name} (₹{inv.total_amount})
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   {/* Amount Paid */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       <DollarSign size={16} className="inline mr-2" />
//                       Amount Paid
//                     </label>
//                     <input
//                       type="number"
//                       step="0.01"
//                       name="amount_paid"
//                       value={form.amount_paid}
//                       onChange={handleChange}
//                       className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                       placeholder="Enter amount"
//                       required
//                     />
//                   </div>
//                 </div>

//                 {/* Form buttons */}
//                 <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
//                   <button
//                     type="button"
//                     onClick={() => setShowForm(false)}
//                     className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-150 font-medium"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-150 font-medium"
//                   >
//                     {form.id ? "Update" : "Add"}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           )}

//           {/* Payment Table */}
//           <div className="overflow-x-auto rounded-xl shadow-sm border border-gray-200 bg-white">
//             <table className="min-w-full border-collapse border border-gray-300">
//               <thead className="bg-blue-50">
//                 <tr>
//                   <th className="p-3 text-left font-semibold text-gray-900 border-b border-gray-300">ID</th>
//                   <th className="p-3 text-left font-semibold text-gray-900 border-b border-gray-300">Invoice</th>
//                   <th className="p-3 text-left font-semibold text-gray-900 border-b border-gray-300">Client</th>
//                   <th className="p-3 text-left font-semibold text-gray-900 border-b border-gray-300">Amount Paid (₹)</th>
//                   <th className="p-3 text-left font-semibold text-gray-900 border-b border-gray-300">Date</th>
//                   <th className="p-3 text-left font-semibold text-gray-900 border-b border-gray-300 w-28">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {loading ? (
//                   <tr>
//                     <td colSpan={6} className="p-6 text-center text-gray-500">
//                       Loading...
//                     </td>
//                   </tr>
//                 ) : error ? (
//                   <tr>
//                     <td colSpan={6} className="p-6 text-center text-red-500">
//                       {error}
//                     </td>
//                   </tr>
//                 ) : payments.length === 0 ? (
//                   <tr>
//                     <td colSpan={6} className="p-6 text-center text-gray-400">
//                       No payments found.
//                     </td>
//                   </tr>
//                 ) : (
//                   payments.map((payment) => (
//                     <tr
//                       key={payment.id}
//                       className="even:bg-gray-50 hover:bg-gray-100 transition-colors duration-150"
//                     >
//                       <td className="p-3 border-b border-gray-200">{payment.id}</td>
//                       <td className="p-3 border-b border-gray-200">{payment.invoice_number || payment.invoice}</td>
//                       <td className="p-3 border-b border-gray-200">{payment.client_name || payment.client?.name}</td>
//                       <td className="p-3 border-b border-gray-200">₹{payment.amount_paid}</td>
//                       <td className="p-3 border-b border-gray-200">
//                         {payment.created_at ? new Date(payment.created_at).toLocaleDateString() : "-"}
//                       </td>
//                       <td className="p-3 border-b border-gray-200 flex items-center gap-3">
//                         <button
//                           onClick={() => handleEdit(payment)}
//                           title="Edit"
//                           className="text-blue-600 hover:text-blue-800"
//                         >
//                           <Edit2 size={18} />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(payment.id)}
//                           title="Delete"
//                           className="text-red-600 hover:text-red-800"
//                         >
//                           <Trash2 size={18} />
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination Controls */}
//           <div className="mt-6 flex justify-center items-center gap-6">
//             <button
//               onClick={() => handlePageChange(currentPage - 1)}
//               disabled={currentPage === 1}
//               className="rounded-lg p-2 border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//             >
//               <ChevronLeft size={24} />
//             </button>
//             <span className="text-gray-700 font-semibold">
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage === totalPages}
//               className="rounded-lg p-2 border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//             >
//               <ChevronRight size={24} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Payments;







