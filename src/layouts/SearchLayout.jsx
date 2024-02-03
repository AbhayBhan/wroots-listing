import React from 'react';
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Header from '../components/Header';
import 'react-toastify/dist/ReactToastify.css';

const SearchLayout = () => {
  return (
    <div className="relative flex h-screen bg-secondary">
      <div className="flex-1 h-screen overflow-y-auto">
        <Header />
        {/* <div className="grid grid-cols-8 gap-4 p-6"> */}
        <main className="p-6 max-w-[1300px] mx-auto">
          <ToastContainer />
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default SearchLayout