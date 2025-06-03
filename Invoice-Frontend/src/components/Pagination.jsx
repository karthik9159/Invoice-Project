// import React from 'react';

// const Pagination = ({ paginationData, onPageChange, isLoading }) => {
//   const getPageNumberFromUrl = (url) => {
//     if (!url) return null;
//     try {
//       const urlObj = new URL(url);
//       const pageParam = urlObj.searchParams.get('page');
//       const pageNumber = parseInt(pageParam);
//       return isNaN(pageNumber) ? null : pageNumber;
//     } catch {
//       return null;
//     }
//   };

//   const previousPage = getPageNumberFromUrl(paginationData.previous);
//   const nextPage = getPageNumberFromUrl(paginationData.next);

//   // Calculate total pages
//   const itemsPerPage = paginationData.results?.length || 10;
//   const totalPages = Math.ceil(paginationData.count / Math.max(itemsPerPage, 1));

//   return (
//     <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
//       <div className="flex-1 flex justify-between items-center">
//         <div>
//           {previousPage !== null && (
//             <button
//               onClick={() => onPageChange(previousPage)}
//               disabled={isLoading}
//               className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
//                 isLoading ? 'text-gray-400 bg-gray-100' : 'text-gray-700 bg-white hover:bg-gray-50'
//               }`}
//             >
//               Previous
//             </button>
//           )}
//         </div>
        
//         <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-center">
//           <div>
//             <p className="text-sm text-gray-700">
//               Page <span className="font-medium">{paginationData.currentPage}</span> of{' '}
//               <span className="font-medium">{totalPages}</span>
//             </p>
//           </div>
//         </div>
        
//         <div>
//           {nextPage !== null && (
//             <button
//               onClick={() => onPageChange(nextPage)}
//               disabled={isLoading}
//               className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
//                 isLoading ? 'text-gray-400 bg-gray-100' : 'text-gray-700 bg-white hover:bg-gray-50'
//               }`}
//             >
//               Next
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Pagination;







// import { useEffect, useState, useRef } from "react";
// import { Plus, FileText, Calendar, User, Edit, Trash2, Save, X, Hash, Receipt, Clock, Building, CheckCircle, AlertCircle, XCircle, CreditCard, Printer, Search, ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
// import axios from "../api/axios";
// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";

// // Searchable Dropdown Component
// const SearchableDropdown = ({ clients, selectedClient, onSelect, placeholder = "Select a client" }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredClients, setFilteredClients] = useState(clients);
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     const filtered = clients.filter(client =>
//       client.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       client.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       client.phone?.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredClients(filtered);
//   }, [searchTerm, clients]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const handleSelect = (client) => {
//     onSelect(client);
//     setIsOpen(false);
//     setSearchTerm("");
//   };

//   const selectedClientData = clients.find(c => c.id === selectedClient);

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <div
//         className="w-full px-4 py-3 border border-gray-200 rounded-xl focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all duration-200 cursor-pointer bg-white flex items-center justify-between"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <div className="flex items-center space-x-2 flex-1">
//           <User className="w-4 h-4 text-gray-400" />
//           <span className={selectedClientData ? "text-gray-900" : "text-gray-500"}>
//             {selectedClientData ? selectedClientData.name : placeholder}
//           </span>
//         </div>
//         <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
//       </div>

//       {isOpen && (
//         <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-hidden">
//           <div className="p-3 border-b border-gray-100">
//             <div className="relative">
//               <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
//               <input
//                 type="text"
//                 placeholder="Search clients..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//                 autoFocus
//               />
//             </div>
//           </div>
          
//           <div className="max-h-48 overflow-y-auto">
//             {filteredClients.length > 0 ? (
//               filteredClients.map(client => (
//                 <div
//                   key={client.id}
//                   className="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors border-b border-gray-50 last:border-b-0"
//                   onClick={() => handleSelect(client)}
//                 >
//                   <div className="font-medium text-gray-900">{client.name}</div>
//                   {client.company_name && (
//                     <div className="text-sm text-gray-500">{client.company_name}</div>
//                   )}
//                   {client.email && (
//                     <div className="text-xs text-gray-400">{client.email}</div>
//                   )}
//                 </div>
//               ))
//             ) : (
//               <div className="px-4 py-6 text-center text-gray-500">
//                 <Search className="w-6 h-6 mx-auto mb-2 text-gray-300" />
//                 <p>No clients found</p>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // Pagination Component
// const Pagination = ({ 
//   currentPage, 
//   totalPages, 
//   totalItems, 
//   itemsPerPage, 
//   onPageChange, 
//   isLoading 
// }) => {
//   const getPageNumbers = () => {
//     const pages = [];
//     const showEllipsis = totalPages > 7;
    
//     if (!showEllipsis) {
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(i);
//       }
//     } else {
//       // Always show first page
//       pages.push(1);
      
//       if (currentPage > 4) {
//         pages.push('...');
//       }
      
//       // Show pages around current page
//       const start = Math.max(2, currentPage - 1);
//       const end = Math.min(totalPages - 1, currentPage + 1);
      
//       for (let i = start; i <= end; i++) {
//         if (!pages.includes(i)) {
//           pages.push(i);
//         }
//       }
      
//       if (currentPage < totalPages - 3) {
//         pages.push('...');
//       }
      
//       // Always show last page
//       if (totalPages > 1 && !pages.includes(totalPages)) {
//         pages.push(totalPages);
//       }
//     }
    
//     return pages;
//   };

//   if (totalPages <= 1) return null;

//   const startItem = (currentPage - 1) * itemsPerPage + 1;
//   const endItem = Math.min(currentPage * itemsPerPage, totalItems);

//   return (
//     <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 bg-white px-6 py-4 border-t border-gray-200">
//       <div className="text-sm text-gray-700">
//         Showing <span className="font-medium">{startItem}</span> to{' '}
//         <span className="font-medium">{endItem}</span> of{' '}
//         <span className="font-medium">{totalItems}</span> results
//       </div>
      
//       <div className="flex items-center space-x-2">
//         {/* First Page */}
//         <button
//           onClick={() => onPageChange(1)}
//           disabled={currentPage === 1 || isLoading}
//           className="p-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//           title="First Page"
//         >
//           <ChevronsLeft className="w-4 h-4" />
//         </button>
        
//         {/* Previous Page */}
//         <button
//           onClick={() => onPageChange(currentPage - 1)}
//           disabled={currentPage === 1 || isLoading}
//           className="p-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//           title="Previous Page"
//         >
//           <ChevronLeft className="w-4 h-4" />
//         </button>
        
//         {/* Page Numbers */}
//         <div className="flex items-center space-x-1">
//           {getPageNumbers().map((page, index) => (
//             <button
//               key={index}
//               onClick={() => typeof page === 'number' ? onPageChange(page) : null}
//               disabled={isLoading || page === '...'}
//               className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
//                 page === currentPage
//                   ? 'bg-blue-600 text-white shadow-sm'
//                   : page === '...'
//                   ? 'text-gray-400 cursor-default'
//                   : 'text-gray-700 hover:bg-gray-50 border border-gray-300'
//               } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
//             >
//               {page}
//             </button>
//           ))}
//         </div>
        
//         {/* Next Page */}
//         <button
//           onClick={() => onPageChange(currentPage + 1)}
//           disabled={currentPage === totalPages || isLoading}
//           className="p-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//           title="Next Page"
//         >
//           <ChevronRight className="w-4 h-4" />
//         </button>
        
//         {/* Last Page */}
//         <button
//           onClick={() => onPageChange(totalPages)}
//           disabled={currentPage === totalPages || isLoading}
//           className="p-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//           title="Last Page"
//         >
//           <ChevronsRight className="w-4 h-4" />
//         </button>
//       </div>
//     </div>
//   );
// };

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
//     payment_status: "pending",
//     paid_amount: "0.00",
//     balance: "",
//     line_items: [{ description: "", quantity: "", rate: "", amount: "" }]
//   });
  
//   // Pagination states
//   const [pagination, setPagination] = useState({
//     currentPage: 1,
//     totalPages: 1,
//     totalItems: 0,
//     itemsPerPage: 10,
//     hasNext: false,
//     hasPrevious: false
//   });
  
//   const [isLoading, setIsLoading] = useState(false);
//   const [showForm, setShowForm] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [showPaymentModal, setShowPaymentModal] = useState(false);
//   const [selectedInvoice, setSelectedInvoice] = useState(null);
//   const [paymentForm, setPaymentForm] = useState({
//     amount: "",
//     payment_date: "",
//     payment_method: "bank_transfer",
//     notes: ""
//   });

//   // Enhanced fetchInvoices with pagination
//   const fetchInvoices = async (page = 1) => {
//     setIsLoading(true);
//     try {
//       const res = await axios.get(`api/invoices/?page=${page}&page_size=${pagination.itemsPerPage}`);
//       console.log("Raw API response:", res);
//       console.log("Response data:", res.data);
      
//       // Handle different response structures
//       let invoiceData = [];
//       let paginationData = {
//         currentPage: page,
//         totalPages: 1,
//         totalItems: 0,
//         hasNext: false,
//         hasPrevious: false
//       };

//       if (res.data) {
//         // Check if it's paginated response
//         if (res.data.results) {
//           invoiceData = res.data.results;
//           paginationData = {
//             currentPage: page,
//             totalPages: Math.ceil(res.data.count / pagination.itemsPerPage),
//             totalItems: res.data.count,
//             hasNext: !!res.data.next,
//             hasPrevious: !!res.data.previous,
//             itemsPerPage: pagination.itemsPerPage
//           };
//         } else if (Array.isArray(res.data)) {
//           // Non-paginated response
//           invoiceData = res.data;
//           paginationData = {
//             currentPage: 1,
//             totalPages: 1,
//             totalItems: res.data.length,
//             hasNext: false,
//             hasPrevious: false,
//             itemsPerPage: res.data.length
//           };
//         } else if (res.data.data) {
//           invoiceData = res.data.data;
//         }
//       }
      
//       setInvoices(invoiceData);
//       setPagination(paginationData);
//       console.log("Set invoices state:", invoiceData);
//       console.log("Pagination state:", paginationData);
//     } catch (error) {
//       console.error("Error fetching invoices:", error);
//       console.error("Error response:", error.response);
//       setInvoices([]);
//       setPagination(prev => ({ ...prev, totalItems: 0, totalPages: 1 }));
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchClients = async () => {
//     try {
//       const res = await axios.get("api/clients/");
//       console.log("Fetched clients:", res.data);
      
//       const clientData = Array.isArray(res.data) ? res.data : 
//                         res.data?.results ? res.data.results : 
//                         res.data?.data ? res.data.data : [];
      
//       setClients(clientData);
//     } catch (error) {
//       console.error("Error fetching clients:", error);
//       setClients([]);
//     }
//   };

//   const handlePageChange = async (newPage) => {
//     if (newPage !== pagination.currentPage && newPage >= 1 && newPage <= pagination.totalPages) {
//       await fetchInvoices(newPage);
//     }
//   };

//   const generateInvoiceNumber = () => {
//     const prefix = "INV-";
//     const timestamp = Date.now().toString().slice(-4);
//     const randomNum = Math.floor(1000 + Math.random() * 9000);
//     return prefix + timestamp + randomNum;
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
//       line_items: [...form.line_items, { description: "", quantity: "", rate: "", amount: "" }]
//     });
//   };

//   const removeLineItem = (index) => {
//     if (form.line_items.length > 1) {
//       const lineItems = [...form.line_items];
//       lineItems.splice(index, 1);
//       setForm({ ...form, line_items: lineItems });
//     }
//   };

//   const calculateTotals = () => {
//     const subtotal = form.line_items.reduce((sum, item) => {
//       return sum + (parseFloat(item.amount) || 0);
//     }, 0);
//     const total = subtotal.toFixed(2);
//     const paidAmount = parseFloat(form.paid_amount) || 0;
//     const balance = (subtotal - paidAmount).toFixed(2);
    
//     let paymentStatus = form.payment_status;
//     if (paidAmount === 0) {
//       paymentStatus = "pending";
//     } else if (paidAmount >= subtotal) {
//       paymentStatus = "paid";
//     } else {
//       paymentStatus = "partial";
//     }
    
//     setForm(prev => ({
//       ...prev,
//       subtotal: subtotal.toFixed(2),
//       total: total,
//       balance: balance,
//       payment_status: paymentStatus
//     }));
//   };

//   useEffect(() => {
//     calculateTotals();
//   }, [form.line_items, form.paid_amount]);

//   const handleSubmit = async (e) => {
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
      
//       console.log("Submitting payload:", payload);
      
//       let response;
//       if (editingId) {
//         response = await axios.put(`api/invoices/${editingId}/`, payload);
//       } else {
//         response = await axios.post("api/invoices/", payload);
//       }
      
//       console.log("Submit response:", response.data);
      
//       if (response.data && response.data.invoice_number) {
//         setForm(prev => ({
//           ...prev,
//           invoice_number: response.data.invoice_number,
//         }));
//       }

//       resetForm();
      
//       // Handle pagination after creation/update
//       if (editingId) {
//         // Stay on current page for edits
//         await fetchInvoices(pagination.currentPage);
//       } else {
//         // Go to first page for new invoices
//         await fetchInvoices(1);
//       }
//     } catch (error) {
//       console.error("Error saving invoice:", error);
//       console.error("Error response:", error.response);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const resetForm = () => {
//     setForm({
//       client: "",
//       invoice_number: generateInvoiceNumber(),
//       issue_date: "",
//       due_date: "",
//       subtotal: "",
//       total: "",
//       notes: "",
//       payment_status: "pending",
//       paid_amount: "0.00",
//       balance: "",
//       line_items: [{ description: "", quantity: "", rate: "", amount: "" }]
//     });
//     setShowForm(false);
//     setEditingId(null);
//   };

//   const handleEdit = async (id) => {
//     try {
//       const res = await axios.get(`api/invoices/${id}/`);
//       const invoiceData = res.data;
      
//       console.log("Edit invoice data:", invoiceData);
      
//       setForm({
//         client: invoiceData.client_id || invoiceData.client || "",
//         invoice_number: invoiceData.invoice_number || "",
//         issue_date: invoiceData.issue_date || "",
//         due_date: invoiceData.due_date || "",
//         subtotal: invoiceData.subtotal || "",
//         total: invoiceData.total || "",
//         notes: invoiceData.notes || "",
//         payment_status: invoiceData.payment_status || "pending",
//         paid_amount: invoiceData.paid_amount || "0.00",
//         balance: invoiceData.balance || "",
//         line_items: invoiceData.line_items_data || invoiceData.line_items || 
//                    [{ description: "", quantity: "", rate: "", amount: "" }]
//       });
      
//       setEditingId(id);
//       setShowForm(true);
//     } catch (error) {
//       console.error("Error fetching invoice:", error);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this invoice?")) {
//       try {
//         await axios.delete(`api/invoices/${id}/`);
        
//         // Handle pagination after deletion
//         const remainingItems = pagination.totalItems - 1;
//         const maxPossiblePage = Math.ceil(remainingItems / pagination.itemsPerPage) || 1;
//         const targetPage = pagination.currentPage > maxPossiblePage ? maxPossiblePage : pagination.currentPage;
        
//         await fetchInvoices(targetPage);
//       } catch (error) {
//         console.error("Error deleting invoice:", error);
//       }
//     }
//   };

//   const handleNewInvoice = () => {
//     resetForm();
//     setShowForm(true);
//   };

//   const handleAddPayment = (invoice) => {
//     setSelectedInvoice(invoice);
//     setPaymentForm({
//       amount: "",
//       payment_date: new Date().toISOString().split('T')[0],
//       payment_method: "bank_transfer",
//       notes: ""
//     });
//     setShowPaymentModal(true);
//   };

//   const handlePaymentSubmit = async () => {
//     setIsLoading(true);
//     try {
//       console.log("Submitting payment:", paymentForm);
//       await axios.post(`api/invoices/${selectedInvoice.id}/payments/`, paymentForm);
//       setShowPaymentModal(false);
//       await fetchInvoices(pagination.currentPage);
//     } catch (error) {
//       console.error("Error submitting payment:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handlePrintInvoice = (invoice) => {
//     const client = clients.find(c => c.id === invoice.client_id || c.id === invoice.client);
//     const clientName = client ? client.name || client.company_name || 'Unknown Client' : 'Unknown Client';
//     const clientAddress = client ? (client.address || '') : '';
//     const clientEmail = client ? (client.email || '') : '';
//     const clientPhone = client ? (client.phone || '') : '';

//     const printContent = `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <meta charset="utf-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1">
//         <title>Invoice ${invoice.invoice_number}</title>
//         <style>
//           * {
//             margin: 0;
//             padding: 0;
//             box-sizing: border-box;
//           }
          
//           body {
//             font-family: 'Arial', sans-serif;
//             line-height: 1.6;
//             color: #333;
//             max-width: 800px;
//             margin: 0 auto;
//             padding: 20px;
//             background: white;
//           }
          
//           .invoice-header {
//             display: flex;
//             justify-content: space-between;
//             align-items: flex-start;
//             margin-bottom: 30px;
//             border-bottom: 2px solid #e5e7eb;
//             padding-bottom: 20px;
//           }
          
//           .company-info h1 {
//             font-size: 28px;
//             color: #1f2937;
//             margin-bottom: 5px;
//           }
          
//           .company-info p {
//             color: #6b7280;
//             font-size: 14px;
//           }
          
//           .invoice-title {
//             text-align: right;
//           }
          
//           .invoice-title h2 {
//             font-size: 36px;
//             color: #3b82f6;
//             margin-bottom: 10px;
//           }
          
//           .invoice-number {
//             font-size: 16px;
//             color: #6b7280;
//           }
          
//           .invoice-details {
//             display: flex;
//             justify-content: space-between;
//             margin-bottom: 30px;
//           }
          
//           .bill-to, .invoice-info {
//             width: 48%;
//           }
          
//           .bill-to h3, .invoice-info h3 {
//             color: #1f2937;
//             font-size: 16px;
//             margin-bottom: 10px;
//             text-transform: uppercase;
//             letter-spacing: 0.5px;
//           }
          
//           .client-details, .invoice-meta {
//             background: #f9fafb;
//             padding: 15px;
//             border-radius: 8px;
//             border-left: 4px solid #3b82f6;
//           }
          
//           .client-details p, .invoice-meta p {
//             margin-bottom: 5px;
//             font-size: 14px;
//           }
          
//           .line-items {
//             margin-bottom: 30px;
//           }
          
//           .items-table {
//             width: 100%;
//             border-collapse: collapse;
//             margin-bottom: 20px;
//           }
          
//           .items-table th {
//             background: #3b82f6;
//             color: white;
//             padding: 12px 8px;
//             text-align: left;
//             font-weight: 600;
//             font-size: 14px;
//           }
          
//           .items-table td {
//             padding: 12px 8px;
//             border-bottom: 1px solid #e5e7eb;
//             font-size: 14px;
//           }
          
//           .items-table tr:hover {
//             background: #f9fafb;
//           }
          
//           .text-right {
//             text-align: right;
//           }
          
//           .totals {
//             margin-left: auto;
//             width: 300px;
//           }
          
//           .totals-table {
//             width: 100%;
//             border-collapse: collapse;
           
//           }
          
//           .totals-table td {
//             padding: 8px 12px;
//             border-bottom: 1px solid #e5e7eb;
//           }
          
//           .totals-table .total-row {
//             background: #3b82f6;
//             color: white;
//             font-weight: bold;
//             font-size: 16px;
//           }
          
//           .payment-status {
//             display: inline-block;
//             padding: 4px 12px;
//             border-radius: 20px;
//             font-size: 12px;
//             font-weight: 600;
//             text-transform: uppercase;
//             letter-spacing: 0.5px;
//           }
          
//           .status-paid {
//             background: #d1fae5;
//             color: #065f46;
//           }
          
//           .status-pending {
//             background: #dbeafe;
//             color: #1e40af;
//           }
          
//           .status-partial {
//             background: #fef3c7;
//             color: #92400e;
//           }
          
//           .status-overdue {
//             background: #fee2e2;
//             color: #991b1b;
//           }
          
//           .notes {
//             margin-top: 30px;
//             padding: 20px;
//             background: #f9fafb;
//             border-radius: 8px;
//             border-left: 4px solid #6b7280;
//           }
          
//           .notes h4 {
//             color: #1f2937;
//             margin-bottom: 10px;
//           }
          
//           .footer {
//             margin-top: 40px;
//             text-align: center;
//             color: #6b7280;
//             font-size: 12px;
//             border-top: 1px solid #e5e7eb;
//             padding-top: 20px;
//           }
          
//           @media print {
//             body {
//               margin: 0;
//               padding: 15px;
//             }
            
//             .invoice-header, .invoice-details {
//               break-inside: avoid;
//             }
            
//             .items-table {
//               break-inside: avoid;
//             }
//           }
//         </style>
//       </head>
//       <body>
//         <div class="invoice-header">
//           <div class="company-info">
//             <h1>MK Technology</h1>
//             <p>Dindigul,</p>
//             <p> ZIP Code: 624001,</p>
//             <p>Phone: 9080706050,</p>
//             <p>Email: mk@gmail.com</p>
//           </div>
//           <div class="invoice-title">
//             <h2>INVOICE</h2>
//             <p class="invoice-number">#${invoice.invoice_number || 'N/A'}</p>
//           </div>
//         </div>

//         <div class="invoice-details">
//           <div class="bill-to">
//             <h3>Bill To:</h3>
//             <div class="client-details">
//               <p><strong>${clientName}</strong></p>
//               ${clientAddress ? `<p>${clientAddress}</p>` : ''}
//               ${clientEmail ? `<p>Email: ${clientEmail}</p>` : ''}
//               ${clientPhone ? `<p>Phone: ${clientPhone}</p>` : ''}
//             </div>
//           </div>
          
//           <div class="invoice-info">
//             <h3>Invoice Details:</h3>
//             <div class="invoice-meta">
//               <p><strong>Issue Date:</strong> ${invoice.issue_date || 'N/A'}</p>
//               <p><strong>Due Date:</strong> ${invoice.due_date || 'N/A'}</p>
//               <p><strong>Status:</strong> 
//                 <span class="payment-status status-${invoice.payment_status || 'pending'}">
//                   ${(invoice.payment_status || 'pending').toUpperCase()}
//                 </span>
//               </p>
//             </div>
//           </div>
//         </div>

//         <div class="line-items">
//           <table class="items-table">
//             <thead>
//               <tr>
//                 <th>Description</th>
//                 <th class="text-left">Quantity</th>
//                 <th class="text-left">Rate</th>
//                 <th class="text-left">Amount</th>
//               </tr>
//             </thead>
//             <tbody>
//               ${(invoice.line_items_data || invoice.line_items || []).map(item => `
//                 <tr>
//                   <td>${item.description || 'N/A'}</td>
//                   <td class="text-left">${item.quantity || '0'}</td>
//                   <td class="text-left">₹${parseFloat(item.rate || 0).toFixed(2)}</td>
//                   <td class="text-left">₹${parseFloat(item.amount || 0).toFixed(2)}</td>
//                 </tr>
//               `).join('')}
//             </tbody>
//           </table>
//         </div>

//         <div class="totals">
//           <table class="totals-table">
//             <tr>
//               <td><strong>Subtotal:</strong></td>
//               <td class="text-right">₹${parseFloat(invoice.subtotal ||0).toFixed(2)}</td>
//             </tr>
//             <tr>
//               <td><strong>Paid Amount:</strong></td>
//               <td class="text-right">₹${parseFloat(invoice.paid_amount || 0).toFixed(2)}</td>
//             </tr>
//             <tr class="total-row">
//               <td><strong>Balance Due:</strong></td>
//               <td class="text-right">₹${parseFloat(invoice.balance || 0).toFixed(2)}</td>
//             </tr>
//           </table>
//         </div>

//         ${invoice.notes ? `
//           <div class="notes">
//             <h4>Notes:</h4>
//             <p>${invoice.notes}</p>
//           </div>
//         ` : ''}

//         <div class="footer">
//           <p>Thank you for your business!</p>
//           <p>This invoice was generated on ${new Date().toLocaleDateString()}</p>
//         </div>
//       </body>
//       </html>
//     `;

//     const printWindow = window.open('', '_blank');
//     printWindow.document.write(printContent);
//     printWindow.document.close();
//     printWindow.focus();
//     setTimeout(() => {
//       printWindow.print();
//       printWindow.close();
//     }, 250);
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case "paid":
//         return <CheckCircle className="w-4 h-4 text-green-500" />;
//       case "partial":
//         return <AlertCircle className="w-4 h-4 text-yellow-500" />;
//       case "overdue":
//         return <XCircle className="w-4 h-4 text-red-500" />;
//       default:
//         return <Clock className="w-4 h-4 text-gray-500" />;
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "paid":
//         return "bg-green-100 text-green-800";
//       case "partial":  
//         return "bg-yellow-100 text-yellow-800";
//       case "overdue":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   const formatCurrency = (amount) => {
//     return `₹${parseFloat(amount || 0).toFixed(2)}`;
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     return new Date(dateString).toLocaleDateString();
//   };

//   useEffect(() => {
//     fetchInvoices(1);
//     fetchClients();
//   }, []);

//   useEffect(() => {
//     if (!form.invoice_number && !editingId) {
//       setForm(prev => ({ ...prev, invoice_number: generateInvoiceNumber() }));
//     }
//   }, [showForm]);

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <Sidebar />
//       <div className="flex-1 flex flex-col">
//         <Navbar />
//         <div className="flex-1 p-6">
//           <div className="max-w-7xl mx-auto">
//             {/* Header */}
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900 flex items-center">
//                   <Receipt className="w-8 h-8 mr-3 text-blue-600" />
//                   Invoices
//                 </h1>
//                 <p className="text-gray-600 mt-1">Manage your client invoices and payments</p>
//               </div>
//               <button
//                 onClick={handleNewInvoice}
//                 className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
//               >
//                 <Plus className="w-4 h-4 mr-2" />
//                 New Invoice
//               </button>
//             </div>

//             {/* Form Modal */}
//             {showForm && (
//               <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//                 <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
//                   <div className="flex items-center justify-between p-6 border-b border-gray-200">
//                     <h2 className="text-xl font-semibold text-gray-900">
//                       {editingId ? "Edit Invoice" : "Create New Invoice"}
//                     </h2>
//                     <button
//                       onClick={resetForm}
//                       className="text-gray-400 hover:text-gray-600 transition-colors"
//                     >
//                       <X className="w-6 h-6" />
//                     </button>
//                   </div>
                  
//                   <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
//                     <form onSubmit={handleSubmit} className="space-y-6">
//                       {/* Basic Info */}
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-2">
//                             Client *
//                           </label>
//                           <SearchableDropdown
//                             clients={clients}
//                             selectedClient={form.client}
//                             onSelect={(client) => setForm({ ...form, client: client.id })}
//                             placeholder="Select a client"
//                           />
//                         </div>
                        
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-2">
//                             Invoice Number
//                           </label>
//                           <div className="relative">
//                             <Hash className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
//                             <input
//                               type="text"
//                               value={form.invoice_number}
//                               onChange={(e) => setForm({ ...form, invoice_number: e.target.value })}
//                               className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                               placeholder="INV-001"
//                               required
//                             />
//                           </div>
//                         </div>
//                       </div>

//                       {/* Dates */}
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-2">
//                             Issue Date *
//                           </label>
//                           <div className="relative">
//                             <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
//                             <input
//                               type="date"
//                               value={form.issue_date}
//                               onChange={(e) => setForm({ ...form, issue_date: e.target.value })}
//                               className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                               required
//                             />
//                           </div>
//                         </div>
                        
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-2">
//                             Due Date *
//                           </label>
//                           <div className="relative">
//                             <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
//                             <input
//                               type="date"
//                               value={form.due_date}
//                               onChange={(e) => setForm({ ...form, due_date: e.target.value })}
//                               className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                               required
//                             />
//                           </div>
//                         </div>
//                       </div>

//                       {/* Line Items */}
//                       <div>
//                         <div className="flex items-center justify-between mb-4">
//                           <h3 className="text-lg font-medium text-gray-900">Line Items</h3>
//                           <button
//                             type="button"
//                             onClick={addLineItem}
//                             className="inline-flex items-center px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
//                           >
//                             <Plus className="w-4 h-4 mr-1" />
//                             Add Item
//                           </button>
//                         </div>
                        
//                         <div className="space-y-4">
//                           {form.line_items.map((item, index) => (
//                             <div key={index} className="p-4 border border-gray-200 rounded-xl bg-gray-50">
//                               <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
//                                 <div className="md:col-span-5">
//                                   <label className="block text-xs font-medium text-gray-700 mb-1">
//                                     Description
//                                   </label>
//                                   <input
//                                     type="text"
//                                     name="description"
//                                     value={item.description}
//                                     onChange={(e) => handleLineItemChange(index, e)}
//                                     className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm"
//                                     placeholder="Item description"
//                                     required
//                                   />
//                                 </div>
                                
//                                 <div className="md:col-span-2">
//                                   <label className="block text-xs font-medium text-gray-700 mb-1">
//                                     Quantity
//                                   </label>
//                                   <input
//                                     type="number"
//                                     name="quantity"
//                                     value={item.quantity}
//                                     onChange={(e) => handleLineItemChange(index, e)}
//                                     className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm"
//                                     placeholder="1"
//                                     min="0"
//                                     step="0.01"
//                                     required
//                                   />
//                                 </div>
                                
//                                 <div className="md:col-span-2">
//                                   <label className="block text-xs font-medium text-gray-700 mb-1">
//                                     Rate (₹)
//                                   </label>
//                                   <input
//                                     type="number"
//                                     name="rate"
//                                     value={item.rate}
//                                     onChange={(e) => handleLineItemChange(index, e)}
//                                     className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm"
//                                     placeholder="0.00"
//                                     min="0"
//                                     step="0.01"
//                                     required
//                                   />
//                                 </div>
                                
//                                 <div className="md:col-span-2">
//                                   <label className="block text-xs font-medium text-gray-700 mb-1">
//                                     Amount (₹)
//                                   </label>
//                                   <input
//                                     type="text"
//                                     value={item.amount}
//                                     readOnly
//                                     className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-100 text-sm"
//                                   />
//                                 </div>
                                
//                                 <div className="md:col-span-1 flex justify-end">
//                                   {form.line_items.length > 1 && (
//                                     <button
//                                       type="button"
//                                       onClick={() => removeLineItem(index)}
//                                       className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-6"
//                                     >
//                                       <Trash2 className="w-4 h-4" />
//                                     </button>
//                                   )}
//                                 </div>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>

//                       {/* Payment Information */}
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-2">
//                             Payment Status
//                           </label>
//                           <select
//                             value={form.payment_status}
//                             onChange={(e) => setForm({ ...form, payment_status: e.target.value })}
//                             className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                           >
//                             <option value="pending">Pending</option>
//                             <option value="partial">Partially Paid</option>
//                             <option value="paid">Paid</option>
//                             <option value="overdue">Overdue</option>
//                           </select>
//                         </div>
                        
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-2">
//                             Paid Amount (₹)
//                           </label>
//                           <input
//                             type="number"
//                             value={form.paid_amount}
//                             onChange={(e) => setForm({ ...form, paid_amount: e.target.value })}
//                             className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                             placeholder="0.00"
//                             min="0"
//                             step="0.01"
//                           />
//                         </div>
//                       </div>

//                       {/* Summary */}
//                       <div className="bg-blue-50 rounded-xl p-6">
//                         <h3 className="text-lg font-medium text-gray-900 mb-4">Invoice Summary</h3>
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
//                           <div className="flex justify-between">
//                             <span className="text-gray-600">Subtotal:</span>
//                             <span className="font-medium">{formatCurrency(form.subtotal)}</span>
//                           </div>
//                           <div className="flex justify-between">
//                             <span className="text-gray-600">Paid Amount:</span>
//                             <span className="font-medium">{formatCurrency(form.paid_amount)}</span>
//                           </div>
//                           <div className="flex justify-between">
//                             <span className="text-gray-600">Balance:</span>
//                             <span className="font-medium text-blue-600">{formatCurrency(form.balance)}</span>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Notes */}
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Notes
//                         </label>
//                         <textarea
//                           value={form.notes}
//                           onChange={(e) => setForm({ ...form, notes: e.target.value })}
//                           className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                           rows="3"
//                           placeholder="Additional notes or payment terms..."
//                         />
//                       </div>

//                       {/* Form Actions */}
//                       <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
//                         <button
//                           type="button"
//                           onClick={resetForm}
//                           className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
//                         >
//                           Cancel
//                         </button>
//                         <button
//                           type="submit"
//                           disabled={isLoading}
//                           className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
//                         >
//                           {isLoading ? (
//                             <>
//                               <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                               Saving...
//                             </>
//                           ) : (
//                             <>
//                               <Save className="w-4 h-4 mr-2" />
//                               {editingId ? "Update Invoice" : "Create Invoice"}
//                             </>
//                           )}
//                         </button>
//                       </div>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Payment Modal */}
//             {showPaymentModal && selectedInvoice && (
//               <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//                 <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
//                   <div className="flex items-center justify-between p-6 border-b border-gray-200">
//                     <h2 className="text-xl font-semibold text-gray-900">Add Payment</h2>
//                     <button
//                       onClick={() => setShowPaymentModal(false)}
//                       className="text-gray-400 hover:text-gray-600 transition-colors"
//                     >
//                       <X className="w-6 h-6" />
//                     </button>
//                   </div>
                  
//                   <div className="p-6">
//                     <div className="mb-4">
//                       <p className="text-sm text-gray-600">
//                         Invoice: <span className="font-medium">{selectedInvoice.invoice_number}</span>
//                       </p>
//                       <p className="text-sm text-gray-600">
//                         Balance Due: <span className="font-medium text-red-600">{formatCurrency(selectedInvoice.balance)}</span>
//                       </p>
//                     </div>
                    
//                     <div className="space-y-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Payment Amount (₹) *
//                         </label>
//                         <input
//                           type="number"
//                           value={paymentForm.amount}
//                           onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })}
//                           className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                           placeholder="0.00"
//                           min="0"
//                           step="0.01"
//                           required
//                         />
//                       </div>
                      
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Payment Date *
//                         </label>
//                         <input
//                           type="date"
//                           value={paymentForm.payment_date}
//                           onChange={(e) => setPaymentForm({ ...paymentForm, payment_date: e.target.value })}
//                           className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                           required
//                         />
//                       </div>
                      
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Payment Method
//                         </label>
//                         <select
//                           value={paymentForm.payment_method}
//                           onChange={(e) => setPaymentForm({ ...paymentForm, payment_method: e.target.value })}
//                           className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                         >
//                           <option value="bank_transfer">Bank Transfer</option>
//                           <option value="cash">Cash</option>
//                           <option value="credit_card">Credit Card</option>
//                           <option value="debit_card">Debit Card</option>
//                           <option value="upi">UPI</option>
//                           <option value="cheque">Cheque</option>
//                         </select>
//                       </div>
                      
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Notes
//                         </label>
//                         <textarea
//                           value={paymentForm.notes}
//                           onChange={(e) => setPaymentForm({ ...paymentForm, notes: e.target.value })}
//                           className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                           rows="3"
//                           placeholder="Payment notes..."
//                         />
//                       </div>
//                     </div>
                    
//                     <div className="flex justify-end space-x-4 mt-6">
//                       <button
//                         onClick={() => setShowPaymentModal(false)}
//                         className="px-4 py-2 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
//                       >
//                         Cancel
//                       </button>
//                       <button
//                         onClick={handlePaymentSubmit}
//                         disabled={isLoading || !paymentForm.amount}
//                         className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
//                       >
//                         {isLoading ? (
//                           <>
//                             <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                             Processing...
//                           </>
//                         ) : (
//                           <>
//                             <CreditCard className="w-4 h-4 mr-2" />
//                             Add Payment
//                           </>
//                         )}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Invoices List */}
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
//               {/* Loading State */}
//               {isLoading && invoices.length === 0 ? (
//                 <div className="flex items-center justify-center py-12">
//                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//                   <span className="ml-3 text-gray-600">Loading invoices...</span>
//                 </div>
//               ) : invoices.length === 0 ? (
//                 <div className="text-center py-12">
//                   <Receipt className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                   <h3 className="text-lg font-medium text-gray-900 mb-2">No invoices found</h3>
//                   <p className="text-gray-600 mb-4">Get started by creating your first invoice.</p>
//                   <button
//                     onClick={handleNewInvoice}
//                     className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
//                   >
//                     <Plus className="w-4 h-4 mr-2" />
//                     Create Invoice
//                   </button>
//                 </div>
//               ) : (
//                 <>
//                   {/* Table Header */}
//                   <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
//                     <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700">
//                       <div className="col-span-2">Invoice #</div>
//                       <div className="col-span-2">Client</div>
//                       <div className="col-span-2">Issue Date</div>
//                       <div className="col-span-1">Amount</div>
//                       <div className="col-span-1">Paid</div>
//                       <div className="col-span-1">Balance</div>
//                       <div className="col-span-2">Status</div>
//                       <div className="col-span-1">Actions</div>
//                     </div>
//                   </div>

//                   {/* Table Body */}
//                   <div className="divide-y divide-gray-200">
//                     {invoices.map((invoice) => {
//                       const client = clients.find(c => c.id === invoice.client_id || c.id === invoice.client);
//                       const clientName = client ? client.name || client.company_name || 'Unknown Client' : 'Unknown Client';
                      
//                       return (
//                         <div key={invoice.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
//                           <div className="grid grid-cols-12 gap-4 items-center">
//                             <div className="col-span-2">
//                               <div className="flex items-center">
//                                 <FileText className="w-4 h-4 text-gray-400 mr-2" />
//                                 <span className="font-medium text-gray-900">
//                                   {invoice.invoice_number || 'N/A'}
//                                 </span>
//                               </div>
//                             </div>
                            
//                             <div className="col-span-2">
//                               <div className="flex items-center">
//                                 <Building className="w-4 h-4 text-gray-400 mr-2" />
//                                 <span className="text-gray-900">{clientName}</span>
//                               </div>
//                             </div>
                            
//                             <div className="col-span-2">
//                               <div className="flex items-center">
//                                 <Calendar className="w-4 h-4 text-gray-400 mr-2" />
//                                 <span className="text-gray-600">{formatDate(invoice.issue_date)}</span>
//                               </div>
//                             </div>
                            
//                             <div className="col-span-1">
//                               <span className="font-medium text-gray-900">
//                                 {formatCurrency(invoice.total)}
//                               </span>
//                             </div>
                            
//                             <div className="col-span-1">
//                               <span className="text-green-600 font-medium">
//                                 {formatCurrency(invoice.paid_amount)}
//                               </span>
//                             </div>
                            
//                             <div className="col-span-1">
//                               <span className={`font-medium ${
//                                 parseFloat(invoice.balance || 0) > 0 ? 'text-red-600' : 'text-gray-600'
//                               }`}>
//                                 {formatCurrency(invoice.balance)}
//                               </span>
//                             </div>
                            
//                             <div className="col-span-2">
//                               <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(invoice.payment_status)}`}>
//                                 {getStatusIcon(invoice.payment_status)}
//                                 <span className="ml-1 capitalize">
//                                   {invoice.payment_status || 'pending'}
//                                 </span>
//                               </span>
//                             </div>
                            
//                             <div className="col-span-1">
//                               <div className="flex items-center space-x-2">
//                                 <button
//                                   onClick={() => handleEdit(invoice.id)}
//                                   className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
//                                   title="Edit Invoice"
//                                 >
//                                   <Edit className="w-4 h-4" />
//                                 </button>
                                
//                                 <button
//                                   onClick={() => handlePrintInvoice(invoice)}
//                                   className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
//                                   title="Print Invoice"
//                                 >
//                                   <Printer className="w-4 h-4" />
//                                 </button>
                                
//                                 {parseFloat(invoice.balance || 0) > 0 && (
//                                   <button
//                                     onClick={() => handleAddPayment(invoice)}
//                                     className="p-1 text-purple-600 hover:bg-purple-50 rounded transition-colors"
//                                     title="Add Payment"
//                                   >
//                                     <CreditCard className="w-4 h-4" />
//                                   </button>
//                                 )}
                                
//                                 <button
//                                   onClick={() => handleDelete(invoice.id)}
//                                   className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
//                                   title="Delete Invoice"
//                                 >
//                                   <Trash2 className="w-4 h-4" />
//                                 </button>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>

//                   {/* Pagination */}
//                   <Pagination
//                     currentPage={pagination.currentPage}
//                     totalPages={pagination.totalPages}
//                     totalItems={pagination.totalItems}
//                     itemsPerPage={pagination.itemsPerPage}
//                     onPageChange={handlePageChange}
//                     isLoading={isLoading}
//                   />
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }












// import { useEffect, useState } from "react";
// import { Plus, FileText, Calendar, User, Edit, Trash2, Save, X, Hash, Receipt, Clock, Building, CheckCircle, AlertCircle, XCircle, CreditCard, Printer, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Search } from "lucide-react";
// import axios from "../api/axios";
// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";

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
//     payment_status: "pending",
//     paid_amount: "0.00",
//     balance: "",
//     line_items: [{ description: "", quantity: "", rate: "", amount: "" }]
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [showForm, setShowForm] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [showPaymentModal, setShowPaymentModal] = useState(false);
//   const [selectedInvoice, setSelectedInvoice] = useState(null);
//   const [paymentForm, setPaymentForm] = useState({
//     amount: "",
//     payment_date: new Date().toISOString().split('T')[0],
//     payment_method: "bank_transfer",
//     notes: ""
//   });
  
//   // Pagination state
//   const [pagination, setPagination] = useState({
//     currentPage: 1,
//     pageSize: 5, // Should match your backend PAGE_SIZE
//     totalCount: 0,
//     totalPages: 1
//   });
  
//   // Client search state
//   const [clientSearch, setClientSearch] = useState("");
//   const [filteredClients, setFilteredClients] = useState([]);
//   const [showClientDropdown, setShowClientDropdown] = useState(false);
//   const [isClientLoading, setIsClientLoading] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");

//   const fetchInvoices = async (page = 1) => {
//     setIsLoading(true);
//     try {
//       let url = `api/invoices/?page=${page}`;
//       if (searchQuery) {
//         url += `&search=${searchQuery}`;
//       }
      
//       const res = await axios.get(url);
//       const data = res.data;
      
//       // Handle DRF paginated response
//       setInvoices(data.results || []);
      
//       setPagination({
//         currentPage: page,
//         pageSize: pagination.pageSize,
//         totalCount: data.count || 0,
//         totalPages: Math.ceil((data.count || 0) / pagination.pageSize)
//       });
      
//       // Auto-adjust current page if we're on an empty page
//       if (data.results?.length === 0 && page > 1) {
//         fetchInvoices(page - 1);
//       }
//     } catch (error) {
//       console.error("Error fetching invoices:", error);
//       setInvoices([]);
//       setPagination(prev => ({
//         ...prev,
//         currentPage: 1,
//         totalCount: 0,
//         totalPages: 1
//       }));
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchClients = async (search = "") => {
//     setIsClientLoading(true);
//     try {
//       const res = await axios.get(`api/clients/?search=${search}`);
      
//       const clientData = res.data?.results || res.data || [];
//       setClients(clientData);
//       setFilteredClients(clientData);
//     } catch (error) {
//       console.error("Error fetching clients:", error);
//       setClients([]);
//       setFilteredClients([]);
//     } finally {
//       setIsClientLoading(false);
//     }
//   };

//   const generateInvoiceNumber = () => {
//     const prefix = "INV-";
//     const timestamp = Date.now().toString().slice(-4);
//     const randomNum = Math.floor(1000 + Math.random() * 9000);
//     return prefix + timestamp + randomNum;
//   };

//   const handleClientSearch = (e) => {
//     const value = e.target.value;
//     setClientSearch(value);
    
//     if (value.trim() === "") {
//       setFilteredClients(clients);
//     } else {
//       const filtered = clients.filter(client =>
//         client.name?.toLowerCase().includes(value.toLowerCase()) ||
//         client.email?.toLowerCase().includes(value.toLowerCase()) ||
//         client.company_name?.toLowerCase().includes(value.toLowerCase())
//       );
//       setFilteredClients(filtered);
//     }
//   };

//   const handleClientInputFocus = () => {
//     setShowClientDropdown(true);
//     if (clients.length === 0) {
//       fetchClients();
//     }
//   };

//   const selectClient = (client) => {
//     setForm({ ...form, client: client.id });
//     setClientSearch(client.name || client.company_name || '');
//     setShowClientDropdown(false);
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
//       line_items: [...form.line_items, { description: "", quantity: "", rate: "", amount: "" }]
//     });
//   };

//   const removeLineItem = (index) => {
//     if (form.line_items.length > 1) {
//       const lineItems = [...form.line_items];
//       lineItems.splice(index, 1);
//       setForm({ ...form, line_items: lineItems });
//     }
//   };

//   const calculateTotals = () => {
//     const subtotal = form.line_items.reduce((sum, item) => {
//       return sum + (parseFloat(item.amount) || 0);
//     }, 0);
//     const total = subtotal.toFixed(2);
//     const paidAmount = parseFloat(form.paid_amount) || 0;
//     const balance = (subtotal - paidAmount).toFixed(2);
    
//     let paymentStatus = form.payment_status;
//     if (paidAmount === 0) {
//       paymentStatus = "pending";
//     } else if (paidAmount >= subtotal) {
//       paymentStatus = "paid";
//     } else {
//       paymentStatus = "partial";
//     }
    
//     setForm(prev => ({
//       ...prev,
//       subtotal: subtotal.toFixed(2),
//       total: total,
//       balance: balance,
//       payment_status: paymentStatus
//     }));
//   };

//   useEffect(() => {
//     calculateTotals();
//   }, [form.line_items, form.paid_amount]);

//   const handleSubmit = async (e) => {
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
      
//       let response;
//       if (editingId) {
//         response = await axios.put(`api/invoices/${editingId}/`, payload);
//       } else {
//         response = await axios.post("api/invoices/", payload);
//       }
      
//       resetForm();
//       await fetchInvoices(pagination.currentPage);
//     } catch (error) {
//       console.error("Error saving invoice:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const resetForm = () => {
//     setForm({
//       client: "",
//       invoice_number: generateInvoiceNumber(),
//       issue_date: "",
//       due_date: "",
//       subtotal: "",
//       total: "",
//       notes: "",
//       payment_status: "pending",
//       paid_amount: "0.00",
//       balance: "",
//       line_items: [{ description: "", quantity: "", rate: "", amount: "" }]
//     });
//     setClientSearch("");
//     setShowForm(false);
//     setEditingId(null);
//   };

//   const handleEdit = async (id) => {
//     try {
//       const res = await axios.get(`api/invoices/${id}/`);
//       const invoiceData = res.data;
//       const client = clients.find(c => c.id === invoiceData.client_id || c.id === invoiceData.client);
      
//       setForm({
//         client: invoiceData.client_id || invoiceData.client || "",
//         invoice_number: invoiceData.invoice_number || "",
//         issue_date: invoiceData.issue_date || "",
//         due_date: invoiceData.due_date || "",
//         subtotal: invoiceData.subtotal || "",
//         total: invoiceData.total || "",
//         notes: invoiceData.notes || "",
//         payment_status: invoiceData.payment_status || "pending",
//         paid_amount: invoiceData.paid_amount || "0.00",
//         balance: invoiceData.balance || "",
//         line_items: invoiceData.line_items_data || invoiceData.line_items || 
//                    [{ description: "", quantity: "", rate: "", amount: "" }]
//       });
      
//       setClientSearch(client ? client.name || client.company_name || '' : '');
//       setEditingId(id);
//       setShowForm(true);
//     } catch (error) {
//       console.error("Error fetching invoice:", error);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this invoice?")) {
//       try {
//         await axios.delete(`api/invoices/${id}/`);
        
//         // Check if we're on the last page with only one item
//         if (invoices.length === 1 && pagination.currentPage > 1) {
//           await fetchInvoices(pagination.currentPage - 1);
//         } else {
//           await fetchInvoices(pagination.currentPage);
//         }
//       } catch (error) {
//         console.error("Error deleting invoice:", error);
//       }
//     }
//   };

//   const handleNewInvoice = () => {
//     resetForm();
//     setForm(prev => ({
//       ...prev,
//       invoice_number: generateInvoiceNumber()
//     }));
//     setShowForm(true);
//   };

//   const handleAddPayment = (invoice) => {
//     setSelectedInvoice(invoice);
//     setPaymentForm({
//       amount: "",
//       payment_date: new Date().toISOString().split('T')[0],
//       payment_method: "bank_transfer",
//       notes: ""
//     });
//     setShowPaymentModal(true);
//   };

//   const handlePaymentSubmit = async () => {
//     setIsLoading(true);
//     try {
//       await axios.post(`api/invoices/${selectedInvoice.id}/payments/`, paymentForm);
//       setShowPaymentModal(false);
//       await fetchInvoices(pagination.currentPage);
//     } catch (error) {
//       console.error("Error submitting payment:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handlePrintInvoice = (invoice) => {
//     const client = clients.find(c => c.id === invoice.client_id || c.id === invoice.client);
//     const clientName = client ? client.name || client.company_name || 'Unknown Client' : 'Unknown Client';
//     const clientAddress = client ? (client.address || '') : '';
//     const clientEmail = client ? (client.email || '') : '';
//     const clientPhone = client ? (client.phone || '') : '';

//     const printContent = `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <meta charset="utf-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1">
//         <title>Invoice ${invoice.invoice_number}</title>
//         <style>
//           * {
//             margin: 0;
//             padding: 0;
//             box-sizing: border-box;
//             font-family: 'Arial', sans-serif;
//           }
          
//           body {
//             line-height: 1.6;
//             color: #333;
//             max-width: 800px;
//             margin: 0 auto;
//             padding: 20px;
//           }
          
//           .invoice-container {
//             border: 1px solid #e5e7eb;
//             border-radius: 8px;
//             padding: 30px;
//             background: white;
//           }
          
//           .invoice-header {
//             display: flex;
//             justify-content: space-between;
//             align-items: flex-start;
//             margin-bottom: 30px;
//             padding-bottom: 20px;
//             border-bottom: 1px solid #e5e7eb;
//           }
          
//           .company-info h1 {
//             font-size: 24px;
//             color: #1f2937;
//             margin-bottom: 5px;
//           }
          
//           .company-info p {
//             color: #6b7280;
//             font-size: 14px;
//             margin: 3px 0;
//           }
          
//           .invoice-title {
//             text-align: right;
//           }
          
//           .invoice-title h2 {
//             font-size: 28px;
//             color: #3b82f6;
//             margin-bottom: 5px;
//           }
          
//           .invoice-number {
//             font-size: 14px;
//             color: #6b7280;
//           }
          
//           .invoice-details {
//             display: flex;
//             justify-content: space-between;
//             margin-bottom: 30px;
//             flex-wrap: wrap;
//           }
          
//           .bill-to, .invoice-info {
//             width: 48%;
//             min-width: 300px;
//             margin-bottom: 15px;
//           }
          
//           .bill-to h3, .invoice-info h3 {
//             color: #1f2937;
//             font-size: 16px;
//             margin-bottom: 10px;
//             text-transform: uppercase;
//             letter-spacing: 0.5px;
//           }
          
//           .client-details, .invoice-meta {
//             background: #f9fafb;
//             padding: 15px;
//             border-radius: 6px;
//             border-left: 4px solid #3b82f6;
//           }
          
//           .client-details p, .invoice-meta p {
//             margin-bottom: 5px;
//             font-size: 14px;
//           }
          
//           .client-details p strong {
//             display: inline-block;
//             min-width: 100px;
//           }
          
//           .line-items {
//             margin-bottom: 30px;
//             width: 100%;
//             overflow-x: auto;
//           }
          
//           .items-table {
//             width: 100%;
//             border-collapse: collapse;
//             margin-bottom: 20px;
//             table-layout: fixed;
//           }
          
//           .items-table th {
//             background: #3b82f6;
//             color: white;
//             padding: 10px;
//             text-align: left;
//             font-weight: 600;
//             font-size: 14px;
//           }
          
//           .items-table td {
//             padding: 10px;
//             border-bottom: 1px solid #e5e7eb;
//             font-size: 14px;
//             word-wrap: break-word;
//           }
          
//           .items-table tr:hover {
//             background: #f9fafb;
//           }
          
//           .text-right {
//             text-align: right;
//           }
          
//           .text-left {
//             text-align: left;
//           }
          
//           .totals {
//             margin-left: auto;
//             width: 300px;
//           }
          
//           .totals-table {
//             width: 100%;
//             border-collapse: collapse;
//           }
          
//           .totals-table td {
//             padding: 8px 12px;
//             border-bottom: 1px solid #e5e7eb;
//           }
          
//           .totals-table .total-row {
//             background: #3b82f6;
//             color: white;
//             font-weight: bold;
//             font-size: 16px;
//           }
          
//           .payment-status {
//             display: inline-block;
//             padding: 4px 12px;
//             border-radius: 20px;
//             font-size: 12px;
//             font-weight: 600;
//             text-transform: uppercase;
//             letter-spacing: 0.5px;
//           }
          
//           .status-paid {
//             background: #d1fae5;
//             color: #065f46;
//           }
          
//           .status-pending {
//             background: #dbeafe;
//             color: #1e40af;
//           }
          
//           .status-partial {
//             background: #fef3c7;
//             color: #92400e;
//           }
          
//           .status-overdue {
//             background: #fee2e2;
//             color: #991b1b;
//           }
          
//           .notes {
//             margin-top: 30px;
//             padding: 15px;
//             background: #f9fafb;
//             border-radius: 6px;
//             border-left: 4px solid #6b7280;
//           }
          
//           .notes h4 {
//             color: #1f2937;
//             margin-bottom: 10px;
//             font-size: 16px;
//           }
          
//           .footer {
//             margin-top: 40px;
//             text-align: center;
//             color: #6b7280;
//             font-size: 12px;
//             border-top: 1px solid #e5e7eb;
//             padding-top: 20px;
//           }
          
//           @media print {
//             body {
//               margin: 0;
//               padding: 0;
//               font-size: 12px;
//             }
            
//             .invoice-container {
//               border: none;
//               padding: 10px;
//             }
            
//             .invoice-header, .invoice-details {
//               page-break-inside: avoid;
//             }
            
//             .items-table {
//               font-size: 12px;
//             }
            
//             .items-table th, .items-table td {
//               padding: 6px 8px;
//             }
            
//             .no-print {
//               display: none !important;
//             }
//           }
//         </style>
//       </head>
//       <body>
//         <div class="invoice-container">
//           <div class="invoice-header">
//             <div class="company-info">
//               <h1>MK Technology</h1>
//               <p>Dindigul, ZIP Code: 624001</p>
//               <p>Phone: 9080706050</p>
//               <p>Email: mk@gmail.com</p>
//             </div>
//             <div class="invoice-title">
//               <h2>INVOICE</h2>
//               <p class="invoice-number">#${invoice.invoice_number || 'N/A'}</p>
//             </div>
//           </div>

//           <div class="invoice-details">
//             <div class="bill-to">
//               <h3>Bill To:</h3>
//               <div class="client-details">
//                 <p><strong>${clientName}</strong></p>
//                 ${clientAddress ? `<p><strong>Address:</strong> ${clientAddress}</p>` : ''}
//                 ${clientEmail ? `<p><strong>Email:</strong> ${clientEmail}</p>` : ''}
//                 ${clientPhone ? `<p><strong>Phone:</strong> ${clientPhone}</p>` : ''}
//               </div>
//             </div>
            
//             <div class="invoice-info">
//               <h3>Invoice Details:</h3>
//               <div class="invoice-meta">
//                 <p><strong>Issue Date:</strong> ${invoice.issue_date || 'N/A'}</p>
//                 <p><strong>Due Date:</strong> ${invoice.due_date || 'N/A'}</p>
//                 <p><strong>Status:</strong> 
//                   <span class="payment-status status-${invoice.payment_status || 'pending'}">
//                     ${(invoice.payment_status || 'pending').toUpperCase()}
//                   </span>
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div class="line-items">
//             <table class="items-table">
//               <thead>
//                 <tr>
//                   <th style="width: 40%;">Description</th>
//                   <th style="width: 15%;" class="text-left">Qty</th>
//                   <th style="width: 20%;" class="text-left">Rate</th>
//                   <th style="width: 25%;" class="text-left">Amount</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 ${(invoice.line_items_data || invoice.line_items || []).map(item => `
//                   <tr>
//                     <td>${item.description || 'N/A'}</td>
//                     <td class="text-left">${item.quantity || '0'}</td>
//                     <td class="text-left">₹${parseFloat(item.rate || 0).toFixed(2)}</td>
//                     <td class="text-left">₹${parseFloat(item.amount || 0).toFixed(2)}</td>
//                   </tr>
//                 `).join('')}
//               </tbody>
//             </table>
//           </div>

//           <div class="totals">
//             <table class="totals-table">
//               <tr>
//                 <td><strong>Subtotal:</strong></td>
//                 <td class="text-right">₹${parseFloat(invoice.subtotal || 0).toFixed(2)}</td>
//               </tr>
//               <tr>
//                 <td><strong>Amount Paid:</strong></td>
//                 <td class="text-right">₹${parseFloat(invoice.paid_amount || 0).toFixed(2)}</td>
//               </tr>
//               <tr class="total-row">
//                 <td><strong>Balance Due:</strong></td>
//                 <td class="text-right">₹${parseFloat(invoice.balance || invoice.total || 0).toFixed(2)}</td>
//               </tr>
//             </table>
//           </div>

//           ${invoice.notes ? `
//             <div class="notes">
//               <h4>Notes:</h4>
//               <p>${invoice.notes}</p>
//             </div>
//           ` : ''}

//           <div class="footer">
//             <p>Thank you for your business!</p>
//             <p>Generated on ${new Date().toLocaleDateString()}</p>
//           </div>
//         </div>
//         <script>
//           window.onload = function() {
//             setTimeout(function() {
//               window.print();
//               setTimeout(function() {
//                 window.close();
//               }, 100);
//             }, 200);
//           };
//         </script>
//       </body>
//       </html>
//     `;

//     const printWindow = window.open('', '_blank', 'width=900,height=650');
//     if (printWindow) {
//       printWindow.document.write(printContent);
//       printWindow.document.close();
//     } else {
//       alert('Please allow popups to print the invoice.');
//     }
//   };

//   const getStatusBadge = (status, balance) => {
//     const statusMap = {
//       paid: {
//         text: "Paid",
//         icon: <CheckCircle className="w-4 h-4" />,
//         color: "bg-green-100 text-green-800"
//       },
//       partial: {
//         text: "Partial",
//         icon: <AlertCircle className="w-4 h-4" />,
//         color: "bg-yellow-100 text-yellow-800"
//       },
//       pending: {
//         text: "Pending",
//         icon: <Clock className="w-4 h-4" />,
//         color: "bg-blue-100 text-blue-800"
//       },
//       overdue: {
//         text: "Overdue",
//         icon: <XCircle className="w-4 h-4" />,
//         color: "bg-red-100 text-red-800"
//       }
//     };
    
//     const numericBalance = parseFloat(balance) || 0;
//     const effectiveStatus = numericBalance <= 0 ? 'paid' : (status || 'pending');
    
//     const badge = statusMap[effectiveStatus] || statusMap.pending;
    
//     return (
//       <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${badge.color}`}>
//         {badge.icon}
//         <span className="ml-1">{badge.text}</span>
//       </span>
//     );
//   };

//   // Pagination controls
//   const goToPage = (page) => {
//     if (page >= 1 && page <= pagination.totalPages) {
//       fetchInvoices(page);
//     }
//   };

//   const renderPagination = () => {
//     const { currentPage, totalPages } = pagination;
//     const pages = [];
//     const maxVisiblePages = 5;

//     // Always show first page button
//     pages.push(
//       <button
//         key="first"
//         onClick={() => goToPage(1)}
//         disabled={currentPage === 1}
//         className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'hover:bg-gray-100'}`}
//       >
//         <ChevronsLeft className="w-4 h-4" />
//       </button>
//     );

//     // Previous page button
//     pages.push(
//       <button
//         key="prev"
//         onClick={() => goToPage(currentPage - 1)}
//         disabled={currentPage === 1}
//         className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'hover:bg-gray-100'}`}
//       >
//         <ChevronLeft className="w-4 h-4" />
//       </button>
//     );

//     // Calculate range of pages to show
//     let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
//     let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

//     // Adjust if we're at the end
//     if (endPage - startPage + 1 < maxVisiblePages) {
//       startPage = Math.max(1, endPage - maxVisiblePages + 1);
//     }

//     // Show first page with ellipsis if needed
//     if (startPage > 1) {
//       pages.push(
//         <button
//           key={1}
//           onClick={() => goToPage(1)}
//           className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}
//         >
//           1
//         </button>
//       );
//       if (startPage > 2) {
//         pages.push(<span key="ellipsis-start" className="px-2">...</span>);
//       }
//     }

//     // Show page numbers in range
//     for (let i = startPage; i <= endPage; i++) {
//       pages.push(
//         <button
//           key={i}
//           onClick={() => goToPage(i)}
//           className={`px-3 py-1 rounded-md ${currentPage === i ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}
//         >
//           {i}
//         </button>
//       );
//     }

//     // Show last page with ellipsis if needed
//     if (endPage < totalPages) {
//       if (endPage < totalPages - 1) {
//         pages.push(<span key="ellipsis-end" className="px-2">...</span>);
//       }
//       pages.push(
//         <button
//           key={totalPages}
//           onClick={() => goToPage(totalPages)}
//           className={`px-3 py-1 rounded-md ${currentPage === totalPages ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}
//         >
//           {totalPages}
//         </button>
//       );
//     }

//     // Next page button
//     pages.push(
//       <button
//         key="next"
//         onClick={() => goToPage(currentPage + 1)}
//         disabled={currentPage === totalPages}
//         className={`px-3 py-1 rounded-md ${currentPage === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'hover:bg-gray-100'}`}
//       >
//         <ChevronRight className="w-4 h-4" />
//       </button>
//     );

//     // Last page button
//     pages.push(
//       <button
//         key="last"
//         onClick={() => goToPage(totalPages)}
//         disabled={currentPage === totalPages}
//         className={`px-3 py-1 rounded-md ${currentPage === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'hover:bg-gray-100'}`}
//       >
//         <ChevronsRight className="w-4 h-4" />
//       </button>
//     );

//     return pages;
//   };

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     fetchInvoices(1); // Reset to first page when searching
//   };

//   useEffect(() => {
//     fetchInvoices();
//     fetchClients();
//   }, []);

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
//       <Sidebar />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Navbar />
//         <main className="flex-1 overflow-y-auto p-6 space-y-6">
//           {/* Header Section */}
//           <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
//             <div className="flex justify-between items-center">
//               <div className="flex items-center space-x-4">
//                 <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl">
//                   <Receipt className="w-8 h-8 text-white" />
//                 </div>
        
//                 <div>
//                   <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
//                     Invoice Management
//                   </h1>
//                   <p className="text-gray-600 mt-1">Create and manage professional invoices</p>
//                 </div>
//               </div>
           
//               <button
//                 onClick={handleNewInvoice}
//                 className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
//               >
//                 <div className="flex items-center space-x-2">
//                   <Plus className="w-5 h-5" />
//                   <span className="font-semibold">New Invoice</span>
//                 </div>
//                 <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               </button>
//             </div>
//           </div>
       
//           {/* Invoice Form */}
//           {showForm && (
//             <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
//               <div className="flex justify-between items-center mb-8">
//                 <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
//                   <FileText className="w-6 h-6 text-blue-600" />
//                   <span>{editingId ? 'Edit Invoice' : 'Create New Invoice'}</span>
//                 </h2>
//                 <button
//                   onClick={resetForm}
//                   className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
//                 >
//                   <X className="w-5 h-5" />
//                 </button>
//               </div>

//               <form onSubmit={handleSubmit} className="space-y-8">
//                 {/* Basic Information */}
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                   <div className="space-y-2">
//                     <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
//                       <User className="w-4 h-4" />
//                       <span>Client *</span>
//                     </label>
//                     <div className="relative">
//                       <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
//                         <input
//                           type="text"
//                           value={clientSearch}
//                           onChange={handleClientSearch}
//                           onFocus={handleClientInputFocus}
//                           placeholder="Search client..."
//                           className="w-full px-4 py-3 outline-none"
//                           required
//                         />
//                         <button
//                           type="button"
//                           onClick={() => {
//                             fetchClients(clientSearch);
//                             setShowClientDropdown(true);
//                           }}
//                           className="p-2 text-gray-500 hover:text-blue-600"
//                         >
//                           <Search className="w-5 h-5" />
//                         </button>
//                       </div>
//                       {showClientDropdown && (
//                         <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-auto">
//                           {isClientLoading ? (
//                             <div className="p-4 text-center text-gray-500">Loading clients...</div>
//                           ) : filteredClients.length === 0 ? (
//                             <div className="p-4 text-center text-gray-500">No clients found</div>
//                           ) : (
//                             filteredClients.map(client => (
//                               <div
//                                 key={client.id}
//                                 onClick={() => selectClient(client)}
//                                 className="p-3 hover:bg-blue-50 cursor-pointer flex items-center space-x-3"
//                               >
//                                 <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
//                                   <User className="w-4 h-4" />
//                                 </div>
//                                 <div>
//                                   <p className="font-medium">{client.name || client.company_name || 'Unnamed Client'}</p>
//                                   <p className="text-xs text-gray-500">{client.email || 'No email'}</p>
//                                 </div>
//                               </div>
//                             ))
//                           )}
//                         </div>
//                       )}
//                     </div>
//                   </div>
                  
//                   <div className="space-y-2">
//                     <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
//                       <Hash className="w-4 h-4" />
//                       <span>Invoice Number</span>
//                     </label>
//                     <div className="relative">
//                       <input
//                         type="text"
//                         value={form.invoice_number}
//                         readOnly
//                         className="w-full px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl font-mono text-sm"
//                       />
//                       <div className="absolute right-3 top-3 p-1 bg-green-100 rounded-full">
//                         <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
//                       <Calendar className="w-4 h-4" />
//                       <span>Issue Date *</span>
//                     </label>
//                     <input
//                       type="date"
//                       value={form.issue_date}
//                       onChange={(e) => setForm({ ...form, issue_date: e.target.value })}
//                       className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                       required
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
//                       <Clock className="w-4 h-4" />
//                       <span>Due Date *</span>
//                     </label>
//                     <input
//                       type="date"
//                       value={form.due_date}
//                       onChange={(e) => setForm({ ...form, due_date: e.target.value })}
//                       className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                       required
//                     />
//                   </div>
//                 </div>

//                 {/* Line Items */}
//                 <div className="space-y-4">
//                   <label className="text-lg font-semibold text-gray-900">Line Items</label>
//                   <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
//                     {form.line_items.map((item, index) => (
//                       <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
//                         <div className="md:col-span-5">
//                           <input
//                             type="text"
//                             name="description"
//                             placeholder="Item description"
//                             value={item.description}
//                             onChange={(e) => handleLineItemChange(index, e)}
//                             className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                           />
//                         </div>
//                         <div className="md:col-span-2">
// <input
// type="number"
// name="quantity"
// placeholder="Qty"
// value={item.quantity}
// onChange={(e) => handleLineItemChange(index, e)}
// min="0"
// step="1"
// className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// />
// </div>
// <div className="md:col-span-2">
// <input
// type="number"
// name="rate"
// placeholder="Rate"
// value={item.rate}
// onChange={(e) => handleLineItemChange(index, e)}
// min="0"
// step="0.01"
// className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// />
// </div>
// <div className="md:col-span-2">
// <input type="text" name="amount" placeholder="Amount" value={item.amount} readOnly className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl font-mono" />
// </div>
// <div className="md:col-span-1 flex justify-end">
// {form.line_items.length > 1 && (
// <button
// type="button"
// onClick={() => removeLineItem(index)}
// className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
// >
// <Trash2 className="w-5 h-5" />
// </button>
// )}
// </div>
// </div>
// ))}
// <button type="button" onClick={addLineItem} className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 mt-4" >
// <Plus className="w-4 h-4" />
// <span>Add Line Item</span>
// </button>
// </div>
// </div>

//             {/* Totals */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="space-y-2">
//                 <label className="text-sm font-semibold text-gray-700">Notes</label>
//                 <textarea
//                   value={form.notes}
//                   onChange={(e) => setForm({ ...form, notes: e.target.value })}
//                   placeholder="Additional notes or terms..."
//                   rows="3"
//                   className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 ></textarea>
//               </div>
//               <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Subtotal:</span>
//                   <span className="font-medium">₹{form.subtotal || '0.00'}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Paid Amount:</span>
//                   <input
//                     type="number"
//                     value={form.paid_amount}
//                     onChange={(e) => setForm({ ...form, paid_amount: e.target.value })}
//                     min="0"
//                     step="0.01"
//                     className="w-32 px-3 py-2 border border-gray-200 rounded-lg text-right"
//                   />
//                 </div>
//                 <div className="flex justify-between border-t border-gray-200 pt-4">
//                   <span className="text-gray-900 font-semibold">Balance Due:</span>
//                   <span className="text-xl font-bold text-blue-600">₹{form.balance || '0.00'}</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-600">Status:</span>
//                   <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
//                     {form.payment_status?.charAt(0).toUpperCase() + form.payment_status?.slice(1) || 'Pending'}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Form Actions */}
//             <div className="flex justify-end space-x-4 pt-6">
//               <button
//                 type="button"
//                 onClick={resetForm}
//                 className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center space-x-2"
//               >
//                 {isLoading ? (
//                   <>
//                     <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     <span>Processing...</span>
//                   </>
//                 ) : (
//                   <>
//                     <Save className="w-4 h-4" />
//                     <span>{editingId ? 'Update Invoice' : 'Save Invoice'}</span>
//                   </>
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {/* Invoice List */}
//       <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
//           <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
//             <FileText className="w-6 h-6 text-blue-600" />
//             <span>Recent Invoices</span>
//           </h2>
          
//           <form onSubmit={handleSearchSubmit} className="mt-4 md:mt-0">
//             <div className="relative">
//               <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={handleSearch}
//                   placeholder="Search invoices..."
//                   className="w-full px-4 py-3 outline-none"
//                 />
//                 <button
//                   type="submit"
//                   className="p-2 text-gray-500 hover:text-blue-600"
//                 >
//                   <Search className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>

//         {isLoading ? (
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//           </div>
//         ) : invoices.length === 0 ? (
//           <div className="text-center py-12">
//             <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
//               <FileText className="w-10 h-10 text-gray-400" />
//             </div>
//             <h3 className="text-lg font-medium text-gray-900">No invoices found</h3>
//             <p className="mt-1 text-gray-500">Get started by creating a new invoice</p>
//             <button
//               onClick={handleNewInvoice}
//               className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//             >
//               <Plus className="-ml-1 mr-2 h-5 w-5" />
//               New Invoice
//             </button>
//           </div>
//         ) : (
//           <>
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Invoice #
//                     </th>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Client
//                     </th>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Issue Date
//                     </th>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Due Date
//                     </th>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Total
//                     </th>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Status
//                     </th>
//                     <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {invoices.map((invoice) => {
//                     const client = clients.find(c => c.id === invoice.client_id || c.id === invoice.client);
//                     return (
//                       <tr key={invoice.id} className="hover:bg-gray-50">
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="flex items-center">
//                             <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
//                               <FileText className="h-5 w-5 text-blue-600" />
//                             </div>
//                             <div className="ml-4">
//                               <div className="text-sm font-medium text-gray-900">{invoice.invoice_number}</div>
//                               <div className="text-sm text-gray-500">
//                                 {new Date(invoice.issue_date).toLocaleDateString()}
//                               </div>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm font-medium text-gray-900">
//                             {client ? client.name || client.company_name || 'Unknown Client' : 'Unknown Client'}
//                           </div>
//                           <div className="text-sm text-gray-500">
//                             {client ? client.email || 'No email' : ''}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                           {new Date(invoice.issue_date).toLocaleDateString()}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                           {new Date(invoice.due_date).toLocaleDateString()}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                           ₹{parseFloat(invoice.total).toFixed(2)}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           {getStatusBadge(invoice.payment_status, invoice.balance)}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                           <div className="flex items-center justify-end space-x-2">
//                             <button
//                               onClick={() => handlePrintInvoice(invoice)}
//                               className="text-gray-400 hover:text-gray-600 p-1"
//                               title="Print"
//                             >
//                               <Printer className="w-4 h-4" />
//                             </button>
//                             {parseFloat(invoice.balance) > 0 && (
//                               <button
//                                 onClick={() => handleAddPayment(invoice)}
//                                 className="text-green-400 hover:text-green-600 p-1"
//                                 title="Add Payment"
//                               >
//                                 <CreditCard className="w-4 h-4" />
//                               </button>
//                             )}
//                             <button
//                               onClick={() => handleEdit(invoice.id)}
//                               className="text-blue-400 hover:text-blue-600 p-1"
//                               title="Edit"
//                             >
//                               <Edit className="w-4 h-4" />
//                             </button>
//                             <button
//                               onClick={() => handleDelete(invoice.id)}
//                               className="text-red-400 hover:text-red-600 p-1"
//                               title="Delete"
//                             >
//                               <Trash2 className="w-4 h-4" />
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>

//             {/* Pagination */}
//             {pagination.totalPages > 1 && (
//               <div className="flex items-center justify-between mt-6">
//                 <div className="text-sm text-gray-700">
//                   Showing <span className="font-medium">{(pagination.currentPage - 1) * pagination.pageSize + 1}</span> to{' '}
//                   <span className="font-medium">
//                     {Math.min(pagination.currentPage * pagination.pageSize, pagination.totalCount)}
//                   </span>{' '}
//                   of <span className="font-medium">{pagination.totalCount}</span> invoices
//                 </div>
//                 <div className="flex space-x-1">
//                   {renderPagination()}
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </main>
//   </div>

//   {/* Payment Modal */}
//   {showPaymentModal && selectedInvoice && (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
//         <div className="p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-lg font-semibold text-gray-900">Add Payment</h3>
//             <button
//               onClick={() => setShowPaymentModal(false)}
//               className="text-gray-400 hover:text-gray-500"
//             >
//               <X className="w-5 h-5" />
//             </button>
//           </div>
          
//           <div className="space-y-4">
//             <div className="bg-blue-50 p-4 rounded-xl mb-4">
//               <div className="flex justify-between">
//                 <span className="text-sm font-medium text-gray-700">Invoice #:</span>
//                 <span className="text-sm font-semibold">{selectedInvoice.invoice_number}</span>
//               </div>
//               <div className="flex justify-between mt-1">
//                 <span className="text-sm font-medium text-gray-700">Balance Due:</span>
//                 <span className="text-sm font-semibold">₹{parseFloat(selectedInvoice.balance).toFixed(2)}</span>
//               </div>
//             </div>
            
//             <div className="space-y-3">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Amount *</label>
//                 <input
//                   type="number"
//                   value={paymentForm.amount}
//                   onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })}
//                   min="0"
//                   max={selectedInvoice.balance}
//                   step="0.01"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                   required
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Payment Date *</label>
//                 <input
//                   type="date"
//                   value={paymentForm.payment_date}
//                   onChange={(e) => setPaymentForm({ ...paymentForm, payment_date: e.target.value })}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                   required
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method *</label>
//                 <select
//                   value={paymentForm.payment_method}
//                   onChange={(e) => setPaymentForm({ ...paymentForm, payment_method: e.target.value })}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                   required
//                 >
//                   <option value="bank_transfer">Bank Transfer</option>
//                   <option value="credit_card">Credit Card</option>
//                   <option value="cash">Cash</option>
//                   <option value="check">Check</option>
//                   <option value="paypal">PayPal</option>
//                   <option value="other">Other</option>
//                 </select>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
//                 <textarea
//                   value={paymentForm.notes}
//                   onChange={(e) => setPaymentForm({ ...paymentForm, notes: e.target.value })}
//                   rows="2"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                 ></textarea>
//               </div>
//             </div>
            
//             <div className="flex justify-end space-x-3 pt-4">
//               <button
//                 type="button"
//                 onClick={() => setShowPaymentModal(false)}
//                 className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 onClick={handlePaymentSubmit}
//                 disabled={isLoading}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed"
//               >
//                 {isLoading ? 'Processing...' : 'Record Payment'}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )}
// </div>
// );
// }