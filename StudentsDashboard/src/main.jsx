import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter,RouterProvider} from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Lists from './Components/Userslist/Userlist'
import EditUser from './Components/EditUser/EditUser.jsx'
import EventForm from './Components/Uploads/Uploads.jsx'
import Gallery from './Components/Gallery/Gallery.jsx'
import Imagedesc from './Components/image description/Image.jsx'
import SignUp from './Components/signup/Signup.jsx'
import SignIn from './Components/login/Login.jsx'
import EmailVerification from './Components/email/Emailverification.jsx'
import './index.css'
import PasswordReset from './Components/passwordreset/PasswordReset.jsx'
const router=createBrowserRouter(
  [
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/login",
      element: <SignIn />,
    },
    {
      path:'/email',
      element:<EmailVerification/>
    },
    {
      path:'/forgetpassword',
      element:<PasswordReset/>
    },
    {
      path: "/",
      element: <Layout />, 
      children: [
        {
          path: "", 
          element: <Lists />, 
        },
        {
          path: "/gallery", 
          element: <Gallery />,
        },
        {
          path: "/upload",
          element: <EventForm />,
        },
        {
          path:'/edit/:id',
          element:<EditUser/>
        },
        {
          path:'/image/:id',
          element:<Imagedesc/>
        }
      ],
    },
  ]
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
