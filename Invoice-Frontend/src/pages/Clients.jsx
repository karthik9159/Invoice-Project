// src/pages/Clients.jsx
import { useEffect, useState } from "react";
import axios from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";





export default function Clients() {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", phone_number: "" ,company_name: "", address: ""});

  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchClients = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("api/clients/");
      setClients(res.data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (editingId) {
        await axios.put(`api/clients/${editingId}/`, form);
        setEditingId(null);
      } else {
        await axios.post("api/clients/", form);
      }
      setForm({ name: "", email: "", phone_number: "", company_name: "", address: "" }); 
      fetchClients();
    } catch (error) {
      console.error("Error saving client:", error);
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
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      setIsLoading(true);
      try {
        await axios.delete(`api/clients/${id}/`);
        fetchClients();
      } catch (error) {
        console.error("Error deleting client:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm({ name: "", email: "", phone_number: "" , company_name: "", address: "" });  
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        
        {/* Main Content */}
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

          {/* Add/Edit Form */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {editingId ? "Edit Client" : "Add New Client"}
            </h3>
            
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    placeholder="Enter full name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    placeholder="Enter email address"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="text"
                    placeholder="Enter phone number"
                    value={form.phone_number}
                    onChange={(e) => setForm({ ...form, phone_number: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">company_name</label>
                  <input
                    type="text"
                    placeholder="Enter Company Name"
                    value={form.company_name}
                    onChange={(e) => setForm({ ...form, company_name: e.target.value })}
                    
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">address</label>
                  <input
                    type="text"
                    placeholder="Enter address"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
                  />
                </div>
              </div>
              
              <div className="flex space-x-3 pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
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
                    className="bg-gray-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Clients Table */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-800">
                All Clients ({clients.length})
              </h3>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Phone
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
                       Company_name
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
                       Address
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {clients.map((client, index) => (
                      <tr 
                        key={client.id} 
                        className={`hover:bg-gray-50 transition-colors duration-150 ${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-25'
                        }`}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold text-sm">
                                {client.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{client.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{client.email}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{client.phone_number}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{client.company_name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{client.address}</td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center space-x-2">
                            <button
                              onClick={() => handleEdit(client)}
                              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-600 hover:to-blue-700 focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 transition-all duration-200"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(client.id)}
                              className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-red-600 hover:to-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {clients.length === 0 && !isLoading && (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-4xl text-gray-400">👥</span>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No clients found</h3>
                    <p className="text-gray-500">Get started by adding your first client above.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}