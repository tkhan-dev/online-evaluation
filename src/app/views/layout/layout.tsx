// src/app/views/layout/layout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar';
import NavBar from './navbar';
import { SpinnerProvider } from '../../../base-components/SpinnerContext';

// const Layout = () => {
//   return (
//     <div className="flex h-screen bg-gray-50 text-sm text-gray-800">
//       <SpinnerProvider>
//         <Sidebar />
//         <div className="flex flex-col flex-1 transition-all duration-300">
//           <NavBar />
//           <main className="p-6 overflow-y-auto flex-1">
//             <Outlet />
//           </main>
//         </div>
//       </SpinnerProvider>
//     </div>
//   );
// };

const Layout = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-50 text-sm text-gray-800">
      <SpinnerProvider>
        <Sidebar />
        <div className="flex flex-col flex-1 min-w-0 transition-all duration-300">
          <NavBar />
          <main className="p-6 overflow-y-auto flex-1">
            <Outlet />
          </main>
        </div>
      </SpinnerProvider>
    </div>
  );
};

export default Layout;
