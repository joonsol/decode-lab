import { useState } from 'react';
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom"
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import Home from './Pages/Home/Home'
import Service from './Pages/Service/Service'
import Notice from './Pages/Notice/Notice'
import Works from './Pages/Works/Works'
import WorkItem from './Pages/Works/WorkItem'
import Contact from './Pages/Contact/Contact'
import './App.scss'
import { ThemeProvider } from './context/ThemeContext';

function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/service',
        element: <Service />
      },
      {
        path: '/notice',
        element: <Notice />
      },
      {
        path: '/works',
        element: <Works />
      },
      {
        path: '/works/:id',
        element: <WorkItem />
      },
      {
        path: '/contact',
        element: <Contact />
      },
    ]
  }
])

function App() {

  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
