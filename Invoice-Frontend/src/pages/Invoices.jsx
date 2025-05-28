


// <<<--------------Working code-------------------------------------------->>>>

// import { useEffect, useState } from "react";
// import { Plus, FileText, Calendar, DollarSign, User, Edit, Trash2, Save, X, Hash, Receipt, Clock, Building, CheckCircle, AlertCircle, XCircle, CreditCard, Eye } from "lucide-react";
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
//     payment_date: "",
//     payment_method: "bank_transfer",
//     notes: ""
//   });

//   const fetchInvoices = async () => {
//     setIsLoading(true);
//     try {
//       const res = await axios.get("api/invoices/");
//       // Add validation and logging
//       console.log("Raw API response:", res);
//       console.log("Response data:", res.data);
      
//       // Ensure we have an array
//       const invoiceData = Array.isArray(res.data) ? res.data : 
//                          res.data?.results ? res.data.results : 
//                          res.data?.data ? res.data.data : [];
      
//       setInvoices(invoiceData);
//       console.log("Set invoices state:", invoiceData);
//     } catch (error) {
//       console.error("Error fetching invoices:", error);
//       console.error("Error response:", error.response);
//       // Set empty array on error to prevent crashes
//       setInvoices([]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchClients = async () => {
//     try {
//       const res = await axios.get("api/clients/");
//       console.log("Fetched clients:", res.data);
      
//       // Ensure we have an array for clients too
//       const clientData = Array.isArray(res.data) ? res.data : 
//                         res.data?.results ? res.data.results : 
//                         res.data?.data ? res.data.data : [];
      
//       setClients(clientData);
//     } catch (error) {
//       console.error("Error fetching clients:", error);
//       setClients([]);
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
      
//       // Update form with returned invoice number if available
//       if (response.data && response.data.invoice_number) {
//         setForm(prev => ({
//           ...prev,
//           invoice_number: response.data.invoice_number,
//         }));
//       }

//       resetForm();
//       await fetchInvoices(); // Wait for fetch to complete
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
//         await fetchInvoices(); // Refresh the list
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
//       // Implement your payment submission logic here
//       console.log("Submitting payment:", paymentForm);
      
//       // Example API call for payment
//       await axios.post(`api/invoices/${selectedInvoice.id}/payments/`, paymentForm);
      
//       setShowPaymentModal(false);
//       await fetchInvoices(); // Refresh invoices after payment
//     } catch (error) {
//       console.error("Error submitting payment:", error);
//     } finally {
//       setIsLoading(false);
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
    
//     // Determine status based on balance if status is not explicitly set
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

//   // Initialize component
//   useEffect(() => {
//     console.log("Component mounting, fetching data...");
//     fetchInvoices();
//     fetchClients();
//   }, []);

//   // Debug log for invoices state changes
//   useEffect(() => {
//     console.log("Invoices state updated:", invoices);
//     console.log("Invoices array length:", invoices.length);
//     console.log("Is loading:", isLoading);
//   }, [invoices, isLoading]);


  

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
//       <Sidebar />
//       <div className="flex-1 flex flex-col">
//         <Navbar />
//        <main className="flex-1 p-6 space-y-6">
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
//                     <select
//                       name="client"
//                       value={form.client}
//                       onChange={(e) => setForm({ ...form, client: e.target.value })}
//                       className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                       required
//                     >
//                       <option value="">Select a client</option>
//                       {clients.map(client => (
//                         <option key={client.id} value={client.id}>
//                           {client.name}
//                         </option>
//                       ))}
//                     </select>
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
//                           <input
//                             type="number"
//                             name="quantity"
//                             placeholder="Qty"
//                             value={item.quantity}
//                             onChange={(e) => handleLineItemChange(index, e)}
//                             className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                           />
//                         </div>
//                         <div className="md:col-span-2">
//                           <input
//                             type="number"
//                             step="0.01"
//                             name="rate"
//                             placeholder="Rate"
//                             value={item.rate}
//                             onChange={(e) => handleLineItemChange(index, e)}
//                             className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                           />
//                         </div>
//                         <div className="md:col-span-2">
//                           <input
//                             type="text"
//                             value={`₹${item.amount}`}
//                             readOnly
//                             className="w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-xl font-semibold text-blue-800"
//                           />
//                         </div>
//                         <div className="md:col-span-1">
//                           <button
//                             type="button"
//                             onClick={() => removeLineItem(index)}
//                             className="w-full p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
//                             disabled={form.line_items.length === 1}
//                           >
//                             <Trash2 className="w-4 h-4 mx-auto" />
//                           </button>
//                         </div>
//                       </div>
//                     ))}
                    
//                     <button
//                       type="button"
//                       onClick={addLineItem}
//                       className="w-full py-3 border-2 border-dashed border-gray-300 hover:border-blue-400 text-gray-600 hover:text-blue-600 rounded-xl transition-colors flex items-center justify-center space-x-2"
//                     >
//                       <Plus className="w-4 h-4" />
//                       <span>Add Line Item</span>
//                     </button>
//                   </div>
//                 </div>

//                 {/* Notes */}
//                 <div className="space-y-2">
//                   <label className="text-sm font-semibold text-gray-700">Notes</label>
//                   <textarea
//                     value={form.notes}
//                     onChange={(e) => setForm({ ...form, notes: e.target.value })}
//                     className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-24"
//                     placeholder="Additional notes or terms..."
//                   />
//                 </div>

//                 {/* Totals */}
//                 <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 space-y-4">
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     <div className="text-center p-4 bg-white rounded-xl shadow-sm">
//                       <div className="text-sm text-gray-600 font-medium">Subtotal</div>
//                       <div className="text-xl font-bold text-blue-600">₹{form.subtotal}</div>
//                     </div>
//                     <div className="text-center p-4 bg-white rounded-xl shadow-sm">
//                       <div className="text-sm text-gray-600 font-medium">Paid Amount</div>
//                       <div className="text-xl font-bold text-green-600">₹{form.paid_amount}</div>
//                     </div>
//                     <div className="text-center p-4 bg-white rounded-xl shadow-sm">
//                       <div className="text-sm text-gray-600 font-medium">Balance Due</div>
//                       <div className={`text-xl font-bold ${parseFloat(form.balance) > 0 ? 'text-red-600' : 'text-green-600'}`}>
//                         ₹{form.balance}
//                       </div>
//                     </div>
//                   </div>
//                   <hr className="border-gray-300" />
//                   <div className="text-center">
//                     <div className="text-lg font-semibold text-gray-700">Total Amount</div>
//                     <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                       ₹{form.total}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Submit Button */}
//                 <div className="flex justify-end space-x-4">
//                   <button
//                     type="button"
//                     onClick={resetForm}
//                     className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     disabled={isLoading}
//                     className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
//                   >
//                     <Save className="w-4 h-4" />
//                     <span>{isLoading ? "Saving..." : editingId ? "Update Invoice" : "Create Invoice"}</span>
//                   </button>
//                 </div>
//               </form>
//             </div>
//           )}

//           {/* Invoice List */}
//           <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
//             <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
//               <Building className="w-6 h-6 text-blue-600" />
//               <span>Invoice List</span>
//             </h2>
            
//             {isLoading ? (
//               <div className="text-center py-12">
//                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
//                 <p className="text-gray-500 mt-4">Loading invoices...</p>
//               </div>
//             ) : !Array.isArray(invoices) || invoices.length === 0 ? (
//               <div className="text-center py-12">
//                 <Receipt className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//                 <p className="text-gray-500 text-lg">No invoices found</p>
//                 <p className="text-gray-400">Create your first invoice to get started</p>
//               </div>
//             ) : (
//               <div className="overflow-hidden rounded-2xl border border-gray-200">
//                 <table className="w-full">
//                   <thead className="bg-gradient-to-r from-gray-50 to-blue-50">
//                     <tr>
//                       <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Invoice Number</th>
//                       <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Client</th>
//                       <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Issue Date</th>
//                       <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Total</th>
//                       <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
//                       <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Balance</th>
//                       <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-200">
//                     {invoices.map(invoice => (
//                       <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
//                         <td className="px-6 py-4 font-mono text-sm text-blue-600">
//                           {invoice.invoice_number || 'N/A'}
//                         </td>
//                         <td className="px-6 py-4 text-gray-900">
//                           {invoice.client?.name || invoice.client_name || `Client ${invoice.client_id}` || 'Unknown Client'}
//                         </td>
//                         <td className="px-6 py-4 text-gray-600">
//                           {invoice.issue_date ? new Date(invoice.issue_date).toLocaleDateString() : 'N/A'}
//                         </td>
//                         <td className="px-6 py-4 font-semibold text-gray-900">₹{invoice.total || '0.00'}</td>
//                         <td className="px-6 py-4">
//                           {getStatusBadge(invoice.payment_status, invoice.balance)}
//                         </td>
//                         <td className="px-6 py-4">
//                           <span className={`font-semibold ${
//                             parseFloat(invoice.balance || invoice.total || 0) > 0 ? 'text-red-600' : 'text-green-600'
//                           }`}>
//                             ₹{invoice.balance || invoice.total || '0.00'}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4">
//                           <div className="flex space-x-2">
//                             <button
//                               onClick={() => handleEdit(invoice.id)}
//                               className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                               title="Edit"
//                             >
//                               <Edit className="w-4 h-4" />
//                             </button>
//                             {parseFloat(invoice.balance || invoice.total || 0) > 0 && (
//                               <button
//                                 onClick={() => handleAddPayment(invoice)}
//                                 className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
//                                 title="Add Payment"
//                               >
//                                 <CreditCard className="w-4 h-4" />
//                               </button>
//                             )}
//                             <button
//                               onClick={() => handleDelete(invoice.id)}
//                               className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                               title="Delete"
//                             >
//                               <Trash2 className="w-4 h-4" />
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

//           {/* Payment Modal */}
//           {showPaymentModal && selectedInvoice && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//               <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8">
//                 <div className="flex justify-between items-center mb-6">
//                   <h3 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
//                     <CreditCard className="w-6 h-6 text-green-600" />
//                     <span>Add Payment</span>
//                   </h3>
//                   <button
//                     onClick={() => setShowPaymentModal(false)}
//                     className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
//                   >
//                     <X className="w-5 h-5" />
//                   </button>
//                 </div>

//                 <div className="space-y-4 mb-6">
//                   <div className="bg-gray-50 rounded-xl p-4">
//                     <div className="text-sm text-gray-600">Invoice: {selectedInvoice.invoice_number}</div>
//                     <div className="text-lg font-semibold">Balance Due: ₹{selectedInvoice.balance || selectedInvoice.total}</div>
//                   </div>

//                   <div className="space-y-2">
//                     <label className="text-sm font-semibold text-gray-700">Payment Amount *</label>
//                     <input
//                       type="number"
//                       step="0.01"
//                       value={paymentForm.amount}
//                       onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })}
//                       className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                       placeholder="0.00"
//                       max={selectedInvoice.balance || selectedInvoice.total}
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <label className="text-sm font-semibold text-gray-700">Payment Date *</label>
//                     <input
//                       type="date"
//                       value={paymentForm.payment_date}
//                       onChange={(e) => setPaymentForm({ ...paymentForm, payment_date: e.target.value })}
//                       className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <label className="text-sm font-semibold text-gray-700">Payment Method</label>
//                     <select
//                       value={paymentForm.payment_method}
//                       onChange={(e) => setPaymentForm({ ...paymentForm, payment_method: e.target.value })}
//                       className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                     >
//                       <option value="bank_transfer">Bank Transfer</option>
//                       <option value="cash">Cash</option>
//                       <option value="check">Check</option>
//                       <option value="credit_card">Credit Card</option>
//                       <option value="online">Online Payment</option>
//                     </select>
//                   </div>

//                   <div className="space-y-2">
//                     <label className="text-sm font-semibold text-gray-700">Notes</label>
//                     <textarea
//                       value={paymentForm.notes}
//                       onChange={(e) => setPaymentForm({ ...paymentForm, notes: e.target.value })}
//                       className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none h-20"
//                       placeholder="Payment notes..."
//                     />
//                   </div>
//                 </div>

//                 <div className="flex space-x-4">
//                   <button
//                     onClick={() => setShowPaymentModal(false)}
//                     className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
//                   >
//                     Cancel
//                   </button>
                  
//                   <button
//                     onClick={handlePaymentSubmit}
//                     disabled={isLoading || !paymentForm.amount}
//                     className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {isLoading ? "Processing..." : "Add Payment"}
//                   </button>
                  
//                 </div>
//               </div>
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }

////////////////////////////////////////////////////////////////////////////////



import { useEffect, useState } from "react";
import { Plus, FileText, Calendar,  User, Edit, Trash2, Save, X, Hash, Receipt, Clock, Building, CheckCircle, AlertCircle, XCircle, CreditCard,  Printer } from "lucide-react";
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
      // Add validation and logging
      console.log("Raw API response:", res);
      console.log("Response data:", res.data);
      
      // Ensure we have an array
      const invoiceData = Array.isArray(res.data) ? res.data : 
                         res.data?.results ? res.data.results : 
                         res.data?.data ? res.data.data : [];
      
      setInvoices(invoiceData);
      console.log("Set invoices state:", invoiceData);
    } catch (error) {
      console.error("Error fetching invoices:", error);
      console.error("Error response:", error.response);
      // Set empty array on error to prevent crashes
      setInvoices([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchClients = async () => {
    try {
      const res = await axios.get("api/clients/");
      console.log("Fetched clients:", res.data);
      
      // Ensure we have an array for clients too
      const clientData = Array.isArray(res.data) ? res.data : 
                        res.data?.results ? res.data.results : 
                        res.data?.data ? res.data.data : [];
      
      setClients(clientData);
    } catch (error) {
      console.error("Error fetching clients:", error);
      setClients([]);
    }
  };

  const generateInvoiceNumber = () => {
    const prefix = "INV-";
    const timestamp = Date.now().toString().slice(-4);
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return prefix + timestamp + randomNum;
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
          quantity: parseFloat(item.quantity) || 0,
          rate: parseFloat(item.rate) || 0,
          amount: parseFloat(item.amount) || 0
        }))
      };
      
      console.log("Submitting payload:", payload);
      
      let response;
      if (editingId) {
        response = await axios.put(`api/invoices/${editingId}/`, payload);
      } else {
        response = await axios.post("api/invoices/", payload);
      }
      
      console.log("Submit response:", response.data);
      
      // Update form with returned invoice number if available
      if (response.data && response.data.invoice_number) {
        setForm(prev => ({
          ...prev,
          invoice_number: response.data.invoice_number,
        }));
      }

      resetForm();
      await fetchInvoices(); // Wait for fetch to complete
    } catch (error) {
      console.error("Error saving invoice:", error);
      console.error("Error response:", error.response);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      client: "",
      invoice_number: generateInvoiceNumber(),
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
      
      console.log("Edit invoice data:", invoiceData);
      
      setForm({
        client: invoiceData.client_id || invoiceData.client || "",
        invoice_number: invoiceData.invoice_number || "",
        issue_date: invoiceData.issue_date || "",
        due_date: invoiceData.due_date || "",
        subtotal: invoiceData.subtotal || "",
        total: invoiceData.total || "",
        notes: invoiceData.notes || "",
        payment_status: invoiceData.payment_status || "pending",
        paid_amount: invoiceData.paid_amount || "0.00",
        balance: invoiceData.balance || "",
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
        await fetchInvoices(); // Refresh the list
      } catch (error) {
        console.error("Error deleting invoice:", error);
      }
    }
  };

  const handleNewInvoice = () => {
    resetForm();
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
      
      // Example API call for payment
      await axios.post(`api/invoices/${selectedInvoice.id}/payments/`, paymentForm);
      
      setShowPaymentModal(false);
      await fetchInvoices(); // Refresh invoices after payment
    } catch (error) {
      console.error("Error submitting payment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Print Invoice Function
  const handlePrintInvoice = (invoice) => {
    // Find client details
    const client = clients.find(c => c.id === invoice.client_id || c.id === invoice.client);
    const clientName = client ? client.name || client.company_name || 'Unknown Client' : 'Unknown Client';
    const clientAddress = client ? (client.address || '') : '';
    const clientEmail = client ? (client.email || '') : '';
    const clientPhone = client ? (client.phone || '') : '';

    // Create print window content
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Invoice ${invoice.invoice_number}</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: white;
          }
          
          .invoice-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 30px;
            border-bottom: 2px solid #e5e7eb;
            padding-bottom: 20px;
          }
          
          .company-info h1 {
            font-size: 28px;
            color: #1f2937;
            margin-bottom: 5px;
          }
          
          .company-info p {
            color: #6b7280;
            font-size: 14px;
          }
          
          .invoice-title {
            text-align: right;
          }
          
          .invoice-title h2 {
            font-size: 36px;
            color: #3b82f6;
            margin-bottom: 10px;
          }
          
          .invoice-number {
            font-size: 16px;
            color: #6b7280;
          }
          
          .invoice-details {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
          }
          
          .bill-to, .invoice-info {
            width: 48%;
          }
          
          .bill-to h3, .invoice-info h3 {
            color: #1f2937;
            font-size: 16px;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          
          .client-details, .invoice-meta {
            background: #f9fafb;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #3b82f6;
          }
          
          .client-details p, .invoice-meta p {
            margin-bottom: 5px;
            font-size: 14px;
          }
          
          .line-items {
            margin-bottom: 30px;
          }
          
          .items-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          
          .items-table th {
            background: #3b82f6;
            color: white;
            padding: 12px 8px;
            text-align: left;
            font-weight: 600;
            font-size: 14px;
          }
          
          .items-table td {
            padding: 12px 8px;
            border-bottom: 1px solid #e5e7eb;
            font-size: 14px;
          }
          
          .items-table tr:hover {
            background: #f9fafb;
          }
          
          .text-right {
            text-align: right;
          }
          
          .totals {
            margin-left: auto;
            width: 300px;
          }
          
          .totals-table {
            width: 100%;
            border-collapse: collapse;
           
          }
          
          .totals-table td {
            padding: 8px 12px;
            border-bottom: 1px solid #e5e7eb;
          }
          
          .totals-table .total-row {
            background: #3b82f6;
            color: white;
            font-weight: bold;
            font-size: 16px;
          }
          
          .payment-status {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          
          .status-paid {
            background: #d1fae5;
            color: #065f46;
          }
          
          .status-pending {
            background: #dbeafe;
            color: #1e40af;
          }
          
          .status-partial {
            background: #fef3c7;
            color: #92400e;
          }
          
          .status-overdue {
            background: #fee2e2;
            color: #991b1b;
          }
          
          .notes {
            margin-top: 30px;
            padding: 20px;
            background: #f9fafb;
            border-radius: 8px;
            border-left: 4px solid #6b7280;
          }
          
          .notes h4 {
            color: #1f2937;
            margin-bottom: 10px;
          }
          
          .footer {
            margin-top: 40px;
            text-align: center;
            color: #6b7280;
            font-size: 12px;
            border-top: 1px solid #e5e7eb;
            padding-top: 20px;
          }
          
          @media print {
            body {
              margin: 0;
              padding: 15px;
            }
            
            .invoice-header, .invoice-details {
              break-inside: avoid;
            }
            
            .items-table {
              break-inside: avoid;
            }
          }
        </style>
      </head>
      <body>
        <div class="invoice-header">
          <div class="company-info">
            <h1>MK Technology</h1>
            <p>Dindigul,</p>
            <p> ZIP Code: 624001,</p>
            <p>Phone: 9080706050,</p>
            <p>Email: mk@gmail.com</p>
          </div>
          <div class="invoice-title">
            <h2>INVOICE</h2>
            <p class="invoice-number">#${invoice.invoice_number || 'N/A'}</p>
          </div>
        </div>

        <div class="invoice-details">
          <div class="bill-to">
            <h3>Bill To:</h3>
            <div class="client-details">
              <p><strong>${clientName}</strong></p>
              ${clientAddress ? `<p>${clientAddress}</p>` : ''}
              ${clientEmail ? `<p>Email: ${clientEmail}</p>` : ''}
              ${clientPhone ? `<p>Phone: ${clientPhone}</p>` : ''}
            </div>
          </div>
          
          <div class="invoice-info">
            <h3>Invoice Details:</h3>
            <div class="invoice-meta">
              <p><strong>Issue Date:</strong> ${invoice.issue_date || 'N/A'}</p>
              <p><strong>Due Date:</strong> ${invoice.due_date || 'N/A'}</p>
              <p><strong>Status:</strong> 
                <span class="payment-status status-${invoice.payment_status || 'pending'}">
                  ${(invoice.payment_status || 'pending').toUpperCase()}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div class="line-items">
          <table class="items-table">
            <thead>
              <tr>
                <th>Description</th>
                <th class="text-left">Quantity</th>
                <th class="text-left">Rate</th>
                <th class="text-left">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${(invoice.line_items_data || invoice.line_items || []).map(item => `
                <tr>
                  <td>${item.description || 'N/A'}</td>
                  <td class="text-left">${item.quantity || '0'}</td>
                  <td class="text-left">₹${parseFloat(item.rate || 0).toFixed(2)}</td>
                  <td class="text-left">₹${parseFloat(item.amount || 0).toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div class="totals">
          <table class="totals-table">
            <tr>
              <td><strong>Subtotal:</strong></td>
              <td class="text-right">₹${parseFloat(invoice.subtotal || 0).toFixed(2)}</td>
            </tr>
            <tr>
              <td><strong>Amount Paid:</strong></td>
              <td class="text-right">₹${parseFloat(invoice.amount_paid || 0).toFixed(2)}</td>
            </tr>
            <tr class="total-row">
              <td><strong>Balance Due:</strong></td>
              <td class="text-right">₹${parseFloat(invoice.balance || invoice.total || 0).toFixed(2)}</td>
            </tr>
          </table>
        </div>

        ${invoice.notes ? `
          <div class="notes">
            <h4>Notes:</h4>
            <p>${invoice.notes}</p>
          </div>
        ` : ''}

        <div class="footer">
          <p>Thank you for your business!</p>
          <p>Generated on ${new Date().toLocaleDateString()}</p>
        </div>
      </body>
      </html>
    `;

    // Open print dialog
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      
      
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
          // Optional: Close window after printing
          // printWindow.close();
        }, 250);
      };
    } else {
      alert('Please allow  to print the invoice.');
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
    
    
    const numericBalance = parseFloat(balance) || 0;
    const effectiveStatus = numericBalance <= 0 ? 'paid' : (status || 'pending');
    
    const badge = statusMap[effectiveStatus] || statusMap.pending;
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${badge.color}`}>
        {badge.icon}
        <span className="ml-1">{badge.text}</span>
      </span>
    );
  };


  useEffect(() => {
    console.log("Component mounting, fetching data...");
    fetchInvoices();
    fetchClients();
  }, []);

  
  useEffect(() => {
    console.log("Invoices state updated:", invoices);
    console.log("Invoices array length:", invoices.length);
    console.log("Is loading:", isLoading);
  }, [invoices, isLoading]);

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

              <form onSubmit={handleSubmit} className="space-y-8">
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
                    type="submit"
                    disabled={isLoading}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>{isLoading ? "Saving..." : editingId ? "Update Invoice" : "Create Invoice"}</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Invoice List */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
              <Building className="w-6 h-6 text-blue-600" />
              <span>Invoice List</span>
            </h2>
            
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                <p className="text-gray-500 mt-4">Loading invoices...</p>
              </div>
            ) : !Array.isArray(invoices) || invoices.length === 0 ? (
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
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Invoice Number</th>
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
                        <td className="px-6 py-4 font-mono text-sm text-blue-600">
                          {invoice.invoice_number || 'N/A'}
                        </td>
                        <td className="px-6 py-4 text-gray-900">
                          {invoice.client?.name || invoice.client_name || `Client ${invoice.client_id}` || 'Unknown Client'}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {invoice.issue_date ? new Date(invoice.issue_date).toLocaleDateString() : 'N/A'}
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900">₹{invoice.total || '0.00'}</td>
                        <td className="px-6 py-4">
                          {getStatusBadge(invoice.payment_status, invoice.balance)}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`font-semibold ${
                            parseFloat(invoice.balance || invoice.total || 0) > 0 ? 'text-red-600' : 'text-green-600'
                          }`}>
                            ₹{invoice.balance || invoice.total || '0.00'}
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
                            <button
                              onClick={() => handlePrintInvoice(invoice)}
                              className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                              title="Print Invoice"
                            >
                              <Printer className="w-4 h-4" />
                            </button>
                            {parseFloat(invoice.balance || invoice.total || 0) > 0 && (
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