
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
      setPayments(response.data);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  const fetchInvoices = async () => {
    try {
      const response = await axios.get("/api/invoices/");
      setInvoices(response.data);
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