
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  
  const menuItems = [
    { 
      path: "/clients", 
      label: "Clients", 
      icon: "👥" 
    },
    { 
      path: "/invoices", 
      label: "Invoices", 
      icon: "📄" 
    },
    
    { 
      path: "/payments", 
      label: "Payments", 
      icon: "💳" 
    },
    { 
      path: "/profile", 
      label: "Profile", 
      icon: "👤" 
    }
  ];

  return (
    <aside className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 shadow-2xl min-h-screen">
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <h2 className="text-xl font-bold text-white tracking-wide">
          Dashboard
        </h2>
        <div className="w-12 h-1 bg-blue-500 rounded-full mt-2"></div>
      </div>

      {/* Navigation */}
      <nav className="mt-8 px-4">
        <ul className="space-y-3">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`
                    flex items-center px-4 py-3 rounded-xl transition-all duration-300 group
                    ${isActive 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 transform scale-105' 
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white hover:transform hover:translate-x-1'
                    }
                  `}
                >
                  <span className="text-lg mr-3 transition-transform duration-300 group-hover:scale-110">
                    {item.icon}
                  </span>
                  <span className="font-medium tracking-wide">
                    {item.label}
                  </span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      
    </aside>
  );
}



// import { Link, useLocation } from "react-router-dom";
// import { useProfile } from "../context/ProfileContext";

// export default function Sidebar() {
//   const location = useLocation();
//   const { profile } = useProfile();

//   const menuItems = [
//     { path: "/clients", label: "Clients", icon: "👥" },
//     { path: "/invoices", label: "Invoices", icon: "📄" },
//     { path: "/payments", label: "Payments", icon: "💳" },
//     { path: "/profile", label: "Profile", icon: "👤" },
//   ];

//   return (
//     <aside className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 shadow-2xl min-h-screen flex flex-col justify-between">
//       <div>
//         {/* Header */}
//         <div className="p-6 border-b border-slate-700">
//           <h2 className="text-xl font-bold text-white tracking-wide">
//             Dashboard
//           </h2>
//           <div className="w-12 h-1 bg-blue-500 rounded-full mt-2"></div>
//         </div>

//         {/* Profile Info */}
//         {profile && (
//           <div className="px-6 py-4 border-b border-slate-700 text-white text-sm">
//             <p className="font-semibold text-base">{profile.business_name}</p>
//             <p className="text-slate-400">{profile.email}</p>
//             <p className="text-slate-400">{profile.phone}</p>
//           </div>
//         )}

//         {/* Navigation */}
//         <nav className="mt-6 px-4">
//           <ul className="space-y-3">
//             {menuItems.map((item) => {
//               const isActive = location.pathname === item.path;
//               return (
//                 <li key={item.path}>
//                   <Link
//                     to={item.path}
//                     className={`flex items-center px-4 py-3 rounded-xl transition-all duration-300 group
//                       ${isActive
//                         ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25 transform scale-105"
//                         : "text-slate-300 hover:bg-slate-700 hover:text-white hover:transform hover:translate-x-1"
//                       }`}
//                   >
//                     <span className="text-lg mr-3 transition-transform duration-300 group-hover:scale-110">
//                       {item.icon}
//                     </span>
//                     <span className="font-medium tracking-wide">
//                       {item.label}
//                     </span>
//                     {isActive && (
//                       <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
//                     )}
//                   </Link>
//                 </li>
//               );
//             })}
//           </ul>
//         </nav>
//       </div>
//     </aside>
//   );
// }
