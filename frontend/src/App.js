import { createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import { RouterProvider } from "react-router";
import LoginUser from "./Pages/LoginUser";
import RegisterUser from "./Pages/RegisterUser";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <RouterProvider router={appRouter}/>
      <ToastContainer/>
    </>
  );
}
const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/auth/login',
    element:<LoginUser/>
  },
  {
    path:'/auth/register',
    element:<RegisterUser/>
  }
])

export default App;
