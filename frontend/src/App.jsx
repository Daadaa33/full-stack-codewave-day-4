import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import toast, { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Header />
      <Outlet />
    </div>
  );
}

export default App