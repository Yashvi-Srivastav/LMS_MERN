import React from "react";
import { Toaster } from "sonner";
import MainRoutes from "./Routes/MainRoutes";
import Navbar from "./components/Navbar";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useUserStore } from "@/Store/user.store";



const App = () => {
  const location = useLocation()
  const hiddenRoute = ['/login', '/register', '/dashboard']
  const shouldHideNavbar = hiddenRoute.some((route)=>location.pathname.startsWith(route))
  useEffect(() => {
    window.store = useUserStore; 
  }, []);



  return (
    <div>
       <Toaster />
      {!shouldHideNavbar && <Navbar/>}
      <MainRoutes/>
    </div>
  )
}

export default App