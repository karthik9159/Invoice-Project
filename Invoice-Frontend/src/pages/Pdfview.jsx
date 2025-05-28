// import { useState,useEffect } from 'react';
// import '../components/Pdfview.css'; 




// const InvoicePage = () => {
//   const [invoiceData, setInvoiceData] = useState({
    
//     date: new Date().toISOString().split('T')[0],
//     address: '',
//     items: [{ description: '', quantity: 1, price: 0 }],
//   });
 

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

 

//   const generateInvoiceNumber = () => {
//     const prefix = "INV-";
//     const timestamp = Date.now().toString().slice(-4);
//     const randomNum = Math.floor(1000 + Math.random() * 9000);
//     return prefix + timestamp + randomNum;
//   };


//   const handleChange = (index, field, value) => {
//     const updatedItems = [...invoiceData.items];
//     updatedItems[index][field] = field === 'price' || field === 'quantity' ? Number(value) : value;

//     setInvoiceData({ ...invoiceData, items: updatedItems });
//   };

//   const handleAddItem = () => {
//     setInvoiceData({
//       ...invoiceData,
//       items: [...invoiceData.items, { description: '', quantity: 1, price: 0 }],
//     });
//   };

//   const getTotal = () =>
//     invoiceData.items.reduce((sum, item) => sum + item.quantity * item.price, 0).toFixed(2);


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

//   return (
//     <div className="invoice-container">
//       <h1><strong>Invoice</strong></h1>

//       <div className="invoice-header">
//         <div>
//           <label>Invoice Number:</label>
//           <input
//             type="text"
//             value={invoiceData.invoiceNumber}
//             onChange={(e) => setInvoiceData({ ...invoiceData, invoiceNumber: e.target.value })}
//           />
//         </div>
//         <div>
//           <label>Date:</label>
//           <input
//             type="date"
//             value={invoiceData.date}
//             onChange={(e) => setInvoiceData({ ...invoiceData, date: e.target.value })}
//           />
//         </div>
//       </div>

//       <div className="invoice-address">
//         <label>Address:</label>
//         <textarea
//           rows="3"
//           value={invoiceData.address}
//           onChange={(e) => setInvoiceData({ ...invoiceData, address: e.target.value })}
//         ></textarea>
//       </div>

//       <table className="invoice-table">
//         <thead>
//           <tr>
//             <th>Client</th>
//             <th>Description</th>
//             <th>Price</th>
//             <th>Quantity</th>
//             <th>Total</th>
//           </tr>
//         </thead>
//         <tbody>
//           {invoiceData.items.map((item, index) => (
//             <tr key={index}>
//               <td>
//                 <input
//                   type="text"
//                   value={item.client}
//                   onChange={(e) => handleChange(index, 'client', e.target.value)}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   value={item.description}
//                   onChange={(e) => handleChange(index, 'description', e.target.value)}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="number"
//                   value={item.price}
//                   onChange={(e) => handleChange(index, 'price', e.target.value)}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="number"
//                   value={item.quantity}
//                   onChange={(e) => handleChange(index, 'quantity', e.target.value)}
//                 />
//               </td>
//               <td>{(item.price * item.quantity).toFixed(2)}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <button className="add-btn" onClick={handleAddItem}>+ Add Item</button>
//       <button className='print-btn' onClick={() => window.print()}>Print Invoice</button>

//       <div className="invoice-total">
//         <strong>Total: ₹{getTotal()}</strong>
//       </div>
//     </div>
//   );
// };

// export default InvoicePage;



/////////////////////////////////////////////////////////////////////////




// const printContent = `
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
//                   <td class="text-left">$${parseFloat(item.rate || 0).toFixed(2)}</td>
//                   <td class="text-left">$${parseFloat(item.amount || 0).toFixed(2)}</td>
//                 </tr>
//               `).join('')}
//             </tbody>
//           </table>
//         </div>

//         <div class="totals">
//           <table class="totals-table">
//             <tr>
//               <td><strong>Subtotal:</strong></td>
//               <td class="text-right">$${parseFloat(invoice.subtotal || 0).toFixed(2)}</td>
//             </tr>
//             <tr>
//               <td><strong>Amount Paid:</strong></td>
//               <td class="text-right">$${parseFloat(invoice.amount_paid || 0).toFixed(2)}</td>
//             </tr>
//             <tr class="total-row">
//               <td><strong>Balance Due:</strong></td>
//               <td class="text-right">$${parseFloat(invoice.balance || invoice.total || 0).toFixed(2)}</td>
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
//           <p>Generated on ${new Date().toLocaleDateString()}</p>
//         </div>
//       </body>
//       </html>
//     `;

//     // Open print dialog
//     const printWindow = window.open('', '_blank', 'width=800,height=600');
//     if (printWindow) {
//       printWindow.document.write(printContent);
//       printWindow.document.close();
      
      
//       printWindow.onload = () => {
//         setTimeout(() => {
//           printWindow.print();
//           // Optional: Close window after printing
//           // printWindow.close();
//         }, 250);
//       };
//     } 
//     else {
//       alert('Please allow popups to print the invoice.');
//     }
 

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




