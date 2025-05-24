// import React from "react";



// export default function InvoiceItemForm({ items, setItems }) {
//   const handleChange = (index, field, value) => {
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
//     setItems([...items, { description: "", quantity: "", rate: "", amount: "0.00" }]);
//   };

//   const removeItem = (index) => {
//     const updated = items.filter((_, i) => i !== index);
//     setItems(updated);
//   };

//   return (
//     <div>
//       <h3 className="text-lg font-semibold mb-2">Invoice Items</h3>
//       {items.map((item, index) => (
//         <div key={index} className="flex gap-2 mb-2">
//           <input
//             type="text"
//             placeholder="Description"
//             value={item.description}
//             onChange={(e) => handleChange(index, "description", e.target.value)}
//             className="border p-1 w-1/4"
//           />
//           <input
//             type="number"
//             placeholder="Qty"
//             value={item.quantity}
//             onChange={(e) => handleChange(index, "quantity", e.target.value)}
//             className="border p-1 w-1/6"
//           />
//           <input
//             type="number"
//             placeholder="Rate"
//             value={item.rate}
//             onChange={(e) => handleChange(index, "rate", e.target.value)}
//             className="border p-1 w-1/6"
//           />
//           <input
//             type="text"
//             value={item.amount}
//             disabled
//             className="border p-1 w-1/6 bg-gray-100"
//           />
//           <button
//             type="button"
//             onClick={() => removeItem(index)}
//             className="text-red-500 px-2"
//           >
//             ✕
//           </button>
//         </div>
//       ))}
//       <button
//         type="button"
//         onClick={addItem}
//         className="mt-2 bg-blue-500 text-white px-4 py-1 rounded"
//       >
//         + Add Item
//       </button>
//     </div>
//   );
// }
