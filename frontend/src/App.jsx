import { useState, useEffect } from 'react';
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet
} from "react-router-dom"
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Home from './Pages/Home/Home';
import Service from './Pages/Service/Service';
import Notice from './Pages/Notice/Notice';
import Works from './Pages/Works/Works';
import WorkItem from './Pages/Works/WorkItem';
import NoticeBoardItem from './Pages/Notice/NoticeBoardItem';
import Contact from './Pages/Contact/Contact';
import './App.scss';
import axios from 'axios';

// admin
import AdminNavbar from './Components/Admin/AdminNavbar'
import AdminLogin from './Pages/Admin/AdminLogin';
import AdminPosts from './Pages/Admin/AdminPosts';
import AdminContact from './Pages/Admin/AdminContact'

import AdminNotice from './Pages/Admin/AdminNotice'
import AdminNoticeCreate from './Pages/Admin/AdminNoticeCreate'
import AdminNoticeEdit from './Pages/Admin/AdminNoticeEdit'

import AdminWork from './Pages/Admin/AdminWork'
import AdminWorkItem from './Pages/Admin/AdminWorkItem';
import AdminWorkCreate from './Pages/Admin/AdminWorkCreate'
import AdminWorkEdit from './Pages/Admin/AdminWorkEdit'

import { ThemeProvider } from './context/ThemeContext';

// admin
function AuthRedirectRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(null)

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.post(
         `${import.meta.env.VITE_API_URL}/api/auth/verify-token`,
          {},
          { withCredentials: true }
        )
        setIsAuthenticated(true);
      } catch (error) {
        console.log("토큰 인증 실패: ", error)
        setIsAuthenticated(false)
      }
    }
    verifyToken()
  }, [])

  if (isAuthenticated == null) {
    return null;
  }
  return isAuthenticated ? <Navigate to="/admin/posts" replace /> : <Outlet />

}
function ProtectedRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const [user, setUser] = useState(null)


  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.post(
         `${import.meta.env.VITE_API_URL}/api/auth/verify-token`,
          {},
          { withCredentials: true }
        )
        setIsAuthenticated(response.data.isValid);
        setUser(response.data.uer)
      } catch (error) {
        console.log("토큰 인증 실패: ", error)
        setIsAuthenticated(false)
        setUser(null)
      }
    }
    verifyToken()
  }, [])

  if (isAuthenticated == null) {
    return null;
  }
  return isAuthenticated ?
    <Outlet context={{ user }} /> :
    <Navigate to="/admin" replace />

}

function AdminLayout() {
  return (
    <>
      <AdminNavbar />
      <Outlet />
    </>
  )
}
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
        path: '/notice/:id',
        element: <NoticeBoardItem />
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
  }, {
    path: "/admin",
    element: <AuthRedirectRoute />,
    children: [{
      index: true,
      element: <AdminLogin />
    }]
  },
    {
    path: "/admin",
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            path: 'posts',
            element: <AdminPosts />
          },
          {
            path: 'notice',
            element: <AdminNotice />
          },
          {
            path: 'notice-create',
            element: <AdminNoticeCreate />
          },
          {
            path: 'notice-edit/:id',
            element: <AdminNoticeEdit />
          },
          {
            path: 'works',
            element: <AdminWork />
          },
          {
            path: 'works/:id',
            element: <AdminWorkItem />
          },
          {
            path: 'contact',
            element: <AdminContact />
          },
        ]
      }
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
