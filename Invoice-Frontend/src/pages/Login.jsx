
import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";



export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("auth/token/login/", form);
      localStorage.setItem("token", res.data.auth_token);
      navigate("/clients");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl mb-4">Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="mb-2 w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="mb-4 w-full p-2 border rounded"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}

//<<<<------------------------------------------------------>>>


// src/pages/Login.jsx
// import { useState, useEffect } from "react";
// import axios from "../api/axios";
// import { useNavigate, Link } from "react-router-dom";

// export default function Login() {
//   const [form, setForm] = useState({ username: "", password: "" });
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (localStorage.getItem("token")) {
//       navigate("/clients");
//     }
//   }, [navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError("");

//     try {
//       const res = await axios.post("auth/token/login/", form);
//       localStorage.setItem("token", res.data.auth_token);
//       navigate("/clients");
//     } catch (err) {
//       setError(
//         err.response?.data?.non_field_errors?.[0] ||
//         err.response?.data?.detail ||
//         "Login failed. Please check your credentials."
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
//         <div className="bg-indigo-600 py-4">
//           <div className="text-center">
//             <h2 className="text-3xl font-extrabold text-white">Welcome Back</h2>
//             <p className="mt-2 text-sm text-indigo-100">Sign in to access your account</p>
//           </div>
//         </div>

//         <div className="px-8 py-6">
//           {error && (
//             <div
//               className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative"
//               role="alert"
//             >
//               <span className="block sm:inline">{error}</span>
//             </div>
//           )}

//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <div>
//               <label htmlFor="username" className="block text-sm font-medium text-gray-700">
//                 Username
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="username"
//                   name="username"
//                   type="text"
//                   required
//                   value={form.username}
//                   onChange={(e) => setForm({ ...form, username: e.target.value })}
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                   placeholder="Enter your username"
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                 Password
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   required
//                   value={form.password}
//                   onChange={(e) => setForm({ ...form, password: e.target.value })}
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                   placeholder="Enter your password"
//                 />
//               </div>
//             </div>

//             <div className="flex items-center justify-between">
//               <div className="flex items-center">
//                 <input
//                   id="remember-me"
//                   name="remember-me"
//                   type="checkbox"
//                   className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//                 />
//                 <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
//                   Remember me
//                 </label>
//               </div>

//               <div className="text-sm">
//                 <Link to="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
//                   Forgot your password?
//                 </Link>
//               </div>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-75"
//               >
//                 {isLoading ? "Signing in..." : "Sign in"}
//               </button>
//             </div>
//           </form>

//           {/* The social login and sign up links remain the same */}
//           {/* ... */}
//         </div>
//       </div>
//     </div>
//   );
// }
