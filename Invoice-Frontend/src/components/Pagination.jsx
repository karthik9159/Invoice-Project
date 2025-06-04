










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