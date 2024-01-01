import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RegistrPage from './pages/RegistrPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Home from './pages/Home.jsx';
import { UserContext, UserProvider } from './context/AuthContext.jsx';
import Dashboard from './pages/Dashboard.jsx';
const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: "404",
      children: [
        {
          path: "/",
          element: <Home />,
          index : true
        },
        {
          path: "/register",
          element: <RegistrPage />,
        },
  
        {
          path: "/login",
          element: <LoginPage />,
        },
     
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
     
      ],
    },
  ]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
    <RouterProvider router={router}></RouterProvider>
    </UserProvider>
  </React.StrictMode>
);
