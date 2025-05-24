
// // import { useState } from "react";
// // import { Save, FileText, User, Hash, Calendar, DollarSign, Send, Eye, ArrowLeft } from "lucide-react";
// // import { useNavigate } from "react-router-dom";
// // import Navbar from "../components/Navbar";
// // import Sidebar from "../components/Sidebar";
// // import axios from "../api/axios";

// // // Invoice Items Form Component
// // const InvoiceItemsForm = ({ items, setItems }) => {
// //   const handleChange = (index, field, value) => {
// //     const updated = [...items];
// //     updated[index][field] = value;

// //     if (field === "quantity" || field === "rate") {
// //       const qty = parseFloat(updated[index].quantity) || 0;
// //       const rate = parseFloat(updated[index].rate) || 0;
// //       updated[index].amount = (qty * rate).toFixed(2);
// //     }

// //     setItems(updated);
// //   };

// //   const addItem = () => {
// //     setItems([...items, { description: "", quantity: "1", rate: "0.00", amount: "0.00" }]);
// //   };

// //   const removeItem = (index) => {
// //     const updated = items.filter((_, i) => i !== index);
// //     setItems(updated);
// //   };

// //   const subtotal = items.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
// //   const tax = subtotal * 0.1;
// //   const total = subtotal + tax;

// //   return (
// //     <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
// //       <div className="flex items-center gap-3 mb-6">
// //         <div className="bg-blue-100 p-2 rounded-lg">
// //           <DollarSign className="w-5 h-5 text-blue-600" />
// //         </div>
// //         <h3 className="text-lg font-semibold text-gray-800">Invoice Items</h3>
// //       </div>

// //       <div className="space-y-4">
// //         {items.map((item, index) => (
// //           <div key={index} className="grid grid-cols-12 gap-4 p-4 bg-gray-50 rounded-lg">
// //             <div className="col-span-5">
// //               <textarea
// //                 placeholder="Item description..."
// //                 value={item.description}
// //                 onChange={(e) => handleChange(index, "description", e.target.value)}
// //                 className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
// //                 rows="2"
// //               />
// //             </div>
// //             <div className="col-span-2">
// //               <input
// //                 type="number"
// //                 placeholder="Qty"
// //                 value={item.quantity}
// //                 onChange={(e) => handleChange(index, "quantity", e.target.value)}
// //                 className="w-full border border-gray-300 rounded-lg p-3 text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //               />
// //             </div>
// //             <div className="col-span-2">
// //               <input
// //                 type="number"
// //                 placeholder="Rate"
// //                 value={item.rate}
// //                 onChange={(e) => handleChange(index, "rate", e.target.value)}
// //                 className="w-full border border-gray-300 rounded-lg p-3 text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //               />
// //             </div>
// //             <div className="col-span-2">
// //               <input
// //                 type="text"
// //                 value={`$${item.amount}`}
// //                 disabled
// //                 className="w-full border border-gray-300 rounded-lg p-3 text-center bg-gray-100 font-semibold"
// //               />
// //             </div>
// //             <div className="col-span-1 flex justify-center">
// //               <button
// //                 type="button"
// //                 onClick={() => removeItem(index)}
// //                 className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
// //               >
// //                 ×
// //               </button>
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       <button
// //         type="button"
// //         onClick={addItem}
// //         className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
// //       >
// //         + Add Item
// //       </button>

// //       <div className="mt-6 pt-6 border-t border-gray-200">
// //         <div className="flex justify-end">
// //           <div className="w-80 space-y-3">
// //             <div className="flex justify-between">
// //               <span className="text-gray-600">Subtotal:</span>
// //               <span className="font-semibold">${subtotal.toFixed(2)}</span>
// //             </div>
// //             <div className="flex justify-between">
// //               <span className="text-gray-600">Tax (10%):</span>
// //               <span className="font-semibold">${tax.toFixed(2)}</span>
// //             </div>
// //             <div className="flex justify-between text-lg font-bold border-t pt-3">
// //               <span>Total:</span>
// //               <span className="text-green-600">${total.toFixed(2)}</span>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // Main CreateInvoice Component
// // export default function CreateInvoice() {
// //   const [invoiceNumber, setInvoiceNumber] = useState("");
// //   const [client, setClient] = useState("");
// //   const [issueDate, setIssueDate] = useState(new Date().toISOString().split("T")[0]);
// //   const [dueDate, setDueDate] = useState("");
// //   const [items, setItems] = useState([{ description: "", quantity: "1", rate: "0.00", amount: "0.00" }]);
// //   const [isLoading, setIsLoading] = useState(false);

// //   const navigate = useNavigate();

// //   const generateInvoiceNumber = () => {
// //     const timestamp = Date.now().toString().slice(-6);
// //     setInvoiceNumber(`INV-${timestamp}`);
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setIsLoading(true);

// //     try {
// //       // 1. Create Invoice
// //       const invoiceRes = await axios.post("/invoices/", {
// //         invoice_number: invoiceNumber,
// //         client,
// //         issue_date: issueDate,
// //         due_date: dueDate,
// //       });

// //       const invoiceId = invoiceRes.data.id;

// //       // 2. Create Items for Invoice
// //       for (const item of items) {
// //         await axios.post("/invoice-items/", {
// //           invoice: invoiceId,
// //           description: item.description,
// //           quantity: item.quantity,
// //           rate: item.rate,
// //         });
// //       }

// //       alert("Invoice created successfully!");
// //       navigate("/invoices");
// //     } catch (err) {
// //       console.error("Invoice creation failed", err);
// //       alert("Failed to create invoice. Please try again.");
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="flex bg-gray-50 min-h-screen">
// //       <Sidebar />
// //       <div className="flex-1">
// //         <Navbar />
// //         <div className="px-6 pb-6">
// //           <div className="flex items-center justify-between mb-8">
// //             <div className="flex items-center space-x-4">
// //               <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors" onClick={() => navigate(-1)}>
// //                 <ArrowLeft className="w-5 h-5 text-gray-600" />
// //               </button>
// //               <div>
// //                 <h1 className="text-3xl font-bold text-gray-900">Create New Invoice</h1>
// //                 <p className="text-gray-600 mt-1">Generate a professional invoice for your client</p>
// //               </div>
// //             </div>
// //             <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
// //               <Eye className="w-4 h-4" /> Preview
// //             </button>
// //           </div>

// //           <div className="max-w-5xl">
// //             <form onSubmit={handleSubmit}>
// //               {/* Invoice Details Card */}
// //               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
// //                 <div className="flex items-center gap-3 mb-6">
// //                   <div className="bg-green-100 p-2 rounded-lg">
// //                     <FileText className="w-5 h-5 text-green-600" />
// //                   </div>
// //                   <h2 className="text-lg font-semibold text-gray-800">Invoice Details</h2>
// //                 </div>

// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 mb-2">
// //                       <Hash className="w-4 h-4 inline mr-1" />
// //                       Invoice Number
// //                     </label>
// //                     <div className="flex space-x-2">
// //                       <input
// //                         type="text"
// //                         value={invoiceNumber}
// //                         onChange={(e) => setInvoiceNumber(e.target.value)}
// //                         className="flex-1 border border-gray-300 rounded-lg px-4 py-3"
// //                         placeholder="INV-001"
// //                         required
// //                       />
// //                       <button
// //                         type="button"
                        
// //                         className="px-4 py-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
// //                       >
                       
// //                       </button>
// //                     </div>
// //                   </div>

// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 mb-2">
// //                       <User className="w-4 h-4 inline mr-1" />
// //                       Client Name
// //                     </label>
// //                     <input
// //                       type="text"
// //                       value={client}
// //                       onChange={(e) => setClient(e.target.value)}
// //                       className="w-full border border-gray-300 rounded-lg px-4 py-3"
// //                       placeholder="Enter client name"
// //                       required
// //                     />
// //                   </div>

// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 mb-2">
// //                       <Calendar className="w-4 h-4 inline mr-1" />
// //                       Issue Date
// //                     </label>
// //                     <input
// //                       type="date"
// //                       value={issueDate}
// //                       onChange={(e) => setIssueDate(e.target.value)}
// //                       className="w-full border border-gray-300 rounded-lg px-4 py-3"
// //                       required
// //                     />
// //                   </div>

// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 mb-2">
// //                       <Calendar className="w-4 h-4 inline mr-1" />
// //                       Due Date
// //                     </label>
// //                     <input
// //                       type="date"
// //                       value={dueDate}
// //                       onChange={(e) => setDueDate(e.target.value)}
// //                       className="w-full border border-gray-300 rounded-lg px-4 py-3"
// //                       required
// //                     />
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Invoice Items */}
// //               <InvoiceItemsForm items={items} setItems={setItems} />

// //               {/* Submit Button */}
// //               <div className="mt-8 flex justify-end">
// //                 <button
// //                   type="submit"
// //                   className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
// //                   disabled={isLoading}
// //                 >
// //                   <Save className="w-4 h-4" />
// //                   {isLoading ? "Saving..." : "Save Invoice"}
// //                 </button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }






// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
// import axios from "../api/axios";

// export default function CreateInvoice() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [invoiceNumber, setInvoiceNumber] = useState("");
//   const [invoiceOptions, setInvoiceOptions] = useState([]);
//   const [items, setItems] = useState([
//     { description: "", quantity: "1", rate: "0.00", amount: "0.00" },
//   ]);
//   const [isLoading, setIsLoading] = useState(false);

//   // Fetch existing invoice numbers from backend
//   useEffect(() => {
//     const fetchInvoiceNumbers = async () => {
//       try {
//         const response = await axios.get("/invoices/");
//         const invoices = response.data;
//         const numbers = invoices.map(inv => inv.invoice_number);
//         setInvoiceOptions(numbers);
//         // Pre-fill with the passed invoice number (if any)
//         if (location.state?.invoiceNumber) {
//           setInvoiceNumber(location.state.invoiceNumber);
//         } else if (numbers.length > 0) {
//           setInvoiceNumber(numbers[0]); // default to first option
//         }
//       } catch (error) {
//         console.error("Error fetching invoice numbers", error);
//       }
//     };

//     fetchInvoiceNumbers();
//   }, [location.state]);

//   const handleItemChange = (index, field, value) => {
//     const updated = [...items];
//     updated[index][field] = value;

//     if (field === "quantity" || field === "rate") {
//       const qty = parseFloat(updated[index].quantity) || 0;
//       const rate = parseFloat(updated[index].rate) || 0;
//       updated[index].amount = (qty * rate).toFixed(2);
//     }

//     setItems(updated);
//   };

//   const addItem = () => {
//     setItems([...items, { description: "", quantity: "1", rate: "0.00", amount: "0.00" }]);
//   };

//   const removeItem = (index) => {
//     setItems(items.filter((_, i) => i !== index));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     const payload = {
//       invoice_number: invoiceNumber,
//       items: items.map(({ description, quantity, rate }) => ({
//         description,
//         quantity: parseFloat(quantity),
//         rate: parseFloat(rate),
//       })),
//     };

//     try {
//       await axios.post("/invoices/", payload);
//       alert("Invoice created successfully!");
//       navigate("/invoices");
//     } catch (error) {
//       console.error("Failed to create invoice", error);
//       alert("Failed to create invoice");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="flex-1">
//         <Navbar />
//         <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-4">
//           <h1 className="text-2xl font-bold mb-6">Create Invoice</h1>
//           <form onSubmit={handleSubmit}>
//             {/* Invoice Number Dropdown */}
//             <label className="block mb-4 font-semibold">
//               Invoice Number
//               <select
//                 value={invoiceNumber}
//                 onChange={(e) => setInvoiceNumber(e.target.value)}
//                 className="w-full border border-gray-300 rounded px-3 py-2 bg-white"
//                 required
//               >
//                 <option value="" disabled>Select an invoice number</option>
//                 {invoiceOptions.map((num, i) => (
//                   <option key={i} value={num}>{num}</option>
//                 ))}
//               </select>
//             </label>

//             {/* Items Section */}
//             <h2 className="font-semibold mb-2">Items</h2>
//             {items.map((item, index) => (
//               <div key={index} className="grid grid-cols-5 gap-3 mb-2 items-end">
//                 <input
//                   type="text"
//                   placeholder="Description"
//                   value={item.description}
//                   onChange={(e) => handleItemChange(index, "description", e.target.value)}
//                   required
//                   className="col-span-2 border border-gray-300 rounded px-3 py-2"
//                 />
//                 <input
//                   type="number"
//                   min="1"
//                   placeholder="Qty"
//                   value={item.quantity}
//                   onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
//                   required
//                   className="border border-gray-300 rounded px-3 py-2"
//                 />
//                 <input
//                   type="number"
//                   min="0"
//                   step="0.01"
//                   placeholder="Rate"
//                   value={item.rate}
//                   onChange={(e) => handleItemChange(index, "rate", e.target.value)}
//                   required
//                   className="border border-gray-300 rounded px-3 py-2"
//                 />
//                 <input
//                   type="text"
//                   value={item.amount}
//                   readOnly
//                   className="border border-gray-300 rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => removeItem(index)}
//                   className="text-red-500 font-bold"
//                 >
//                   &times;
//                 </button>
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={addItem}
//               className="mt-2 px-4 py-2 bg-green-600 text-white rounded"
//             >
//               Add Item
//             </button>

//             <button
//               type="submit"
//               disabled={isLoading}
//               className={`w-full mt-6 py-3 rounded text-white font-semibold ${
//                 isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
//               }`}
//             >
//               {isLoading ? "Creating..." : "Create Invoice"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

