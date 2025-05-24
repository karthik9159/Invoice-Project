// import React, { useState, useEffect } from "react";
// import axios from "../api/axios";
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
// import { Building2, MapPin, FileText, DollarSign, Upload, Image, Save, CheckCircle, AlertCircle, User } from "lucide-react";

// export default function Profile() {
//   const [profile, setProfile] = useState({
//     business_name: "",
//     address: "",
//     tax_id: "",
//     currency: "USD",
//     logo: null,
//     user: "",
//   });
//   const [preview, setPreview] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     // Fetch the business profile on component mount
//     axios
//       .get("api/business-profiles/")
//       .then((res) => {
//         setProfile({
//           business_name: res.data.business_name || "",
//           address: res.data.address || "",
//           tax_id: res.data.tax_id || "",
//           currency: res.data.currency || "USD",
//           logo: null,
//           user: res.data.user || "",
//         });
//         setPreview(res.data.logo || null);
//       })
//       .catch(() => setMessage("Failed to load profile."))
//       .finally(() => setLoading(false));
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "logo" && files.length > 0) {
//       const file = files[0];
//       setProfile((prev) => ({ ...prev, logo: file }));
//       setPreview(URL.createObjectURL(file));
//     } else {
//       setProfile((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const formData = new FormData();
//     formData.append("business_name", profile.business_name);
//     formData.append("address", profile.address);
//     formData.append("tax_id", profile.tax_id);
//     formData.append("currency", profile.currency);
//     formData.append("user", profile.user);
//     if (profile.logo) {
//       formData.append("logo", profile.logo);
//     }

//     try {
//       await axios.put("api/business-profiles/", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setMessage("Profile updated successfully!");
//     } catch (error) {
//       setMessage("Error updating profile.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex min-h-screen bg-gray-50">
//         <Sidebar />
//         <div className="flex-1">
//           <Navbar />
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <Sidebar />
//       <div className="flex-1">
//         <Navbar />
//         <main className="p-8">
//           <div className="max-w-4xl mx-auto">
//             {/* Header Section */}
//             <div className="mb-8">
//               <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
//                 <Building2 className="text-blue-600" size={32} />
//                 Business Profile
//               </h2>
//               <p className="text-gray-600 mt-2">Manage your business information and settings</p>
//             </div>

//             {/* Message Alert */}
//             {message && (
//               <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
//                 message.includes("successfully") 
//                   ? "bg-green-50 text-green-800 border border-green-200" 
//                   : "bg-red-50 text-red-800 border border-red-200"
//               }`}>
//                 {message.includes("successfully") ? (
//                   <CheckCircle size={20} />
//                 ) : (
//                   <AlertCircle size={20} />
//                 )}
//                 {message}
//               </div>
//             )}

//             {/* Profile Form Card */}
//             <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//               <div onSubmit={handleSubmit}>
//                 <div className="p-8">
//                   <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                     {/* Logo Section */}
//                     <div className="lg:col-span-1">
//                       <div className="sticky top-8">
//                         <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                           <Image size={20} />
//                           Business Logo
//                         </h3>
                        
//                         <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
//                           {preview ? (
//                             <div className="space-y-4">
//                               <img
//                                 src={preview}
//                                 alt="Logo Preview"
//                                 className="h-32 w-32 mx-auto object-contain rounded-lg border bg-gray-50"
//                               />
//                               <p className="text-sm text-gray-600">Current logo</p>
//                             </div>
//                           ) : (
//                             <div className="space-y-4">
//                               <div className="h-32 w-32 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
//                                 <Image className="text-gray-400" size={40} />
//                               </div>
//                               <p className="text-sm text-gray-600">No logo uploaded</p>
//                             </div>
//                           )}
                          
//                           <div className="mt-4">
//                             <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
//                               <Upload size={16} />
//                               Choose File
//                               <input
//                                 type="file"
//                                 name="logo"
//                                 accept="image/*"
//                                 onChange={handleChange}
//                                 className="hidden"
//                               />
//                             </label>
//                             <p className="text-xs text-gray-500 mt-2">PNG, JPG up to 10MB</p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Form Fields */}
//                     <div className="lg:col-span-2 space-y-6">
//                       {/* Business Name */}
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           <Building2 size={16} className="inline mr-2" />
//                           Business Name
//                         </label>
//                         <input
//                           type="text"
//                           name="business_name"
//                           value={profile.business_name}
//                           onChange={handleChange}
//                           className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                           placeholder="Enter your business name"
//                           required
//                         />
//                       </div>

//                       {/* User */}
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           <User size={16} className="inline mr-2" />
//                           User
//                         </label>
//                         <input
//                           type="text"
//                           name="user"
//                           value={profile.user}
//                           onChange={handleChange}
//                           className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                           placeholder="Enter user name"
//                         />
//                       </div>

//                       {/* Address */}
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           <MapPin size={16} className="inline mr-2" />
//                           Business Address
//                         </label>
//                         <textarea
//                           name="address"
//                           value={profile.address}
//                           onChange={handleChange}
//                           className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
//                           rows={4}
//                           placeholder="Enter your complete business address"
//                           required
//                         />
//                       </div>

//                       {/* Tax ID and Currency Row */}
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         {/* Tax ID */}
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-2">
//                             <FileText size={16} className="inline mr-2" />
//                             Tax ID
//                           </label>
//                           <input
//                             type="text"
//                             name="tax_id"
//                             value={profile.tax_id}
//                             onChange={handleChange}
//                             className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                             placeholder="Enter tax identification number"
//                           />
//                         </div>

//                         {/* Currency */}
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-2">
//                             <DollarSign size={16} className="inline mr-2" />
//                             Currency
//                           </label>
//                           <input
//                             type="text"
//                             name="currency"
//                             value={profile.currency}
//                             onChange={handleChange}
//                             className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                             placeholder="e.g. USD, EUR, INR"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Footer with Save Button */}
//                 <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
//                   <div className="flex justify-end">
//                     <button
//                       type="submit"
//                       onClick={handleSubmit}
//                       disabled={isSubmitting}
//                       className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors duration-150 font-medium flex items-center gap-2 shadow-sm"
//                     >
//                       {isSubmitting ? (
//                         <>
//                           <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                           Saving...
//                         </>
//                       ) : (
//                         <>
//                           <Save size={16} />
//                           Save Profile
//                         </>
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from 'react';
import axios from '../api/axios'; 
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';



const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    business_name: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    tax_id: '',
    currency: ''
  });

  useEffect(() => {
    axios.get('/api/business-profiles/')
      .then(res => {
        if (res.data.length > 0) {
          setProfile(res.data[0]);
          setFormData(res.data[0]);
        }
      })
      .catch(err => console.error('Error fetching profile:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSubmit = {
      ...formData,
      website: formData.website && !formData.website.startsWith('http')
        ? 'https://' + formData.website
        : formData.website
    };

    if (profile) {
      axios.post(`/api/business-profiles/${profile.id}/update-profile/`, dataToSubmit)
        .then(() => alert('Profile updated!'))
        .catch(err => console.error('Update failed:', err.response?.data || err.message));
    } else {
      axios.post('/api/business-profiles/', dataToSubmit)
        .then(res => {
          setProfile(res.data);
          alert('Profile created!');
        })
        .catch(err => console.error('Creation failed:', err.response?.data || err.message));
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="max-w-2xl mx-auto p-6">
          <h1 className="text-2xl font-bold mb-4">{profile ? 'Edit Profile' : 'Create Profile'}</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {['business_name', 'address', 'phone', 'email', 'website', 'tax_id', 'currency'].map(field => (
              <div key={field}>
                <label className="block text-sm font-medium capitalize">{field.replace('_', ' ')}</label>
                <input
                  type="text"
                  name={field}
                  value={formData[field] || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
            ))}
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {profile ? 'Update Profile' : 'Create Profile'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
