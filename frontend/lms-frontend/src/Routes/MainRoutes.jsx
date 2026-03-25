import React from 'react'
import Register from '../pages/Auth/Register'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Auth/Login'
import Home from '../pages/User/Home'
import ProtectedRoute from './ProtectedRoute'
import SingleCourse from '@/pages/User/SingleCourse'
import YourCourse from '@/pages/User/YourCourse'
import SinglePurchasedCourse from '@/pages/User/SinglePurchasedCourse'
import Dashboard from '@/pages/Admin/Dashboard'
import DashboardAnalytics from '@/pages/Admin/DashboardAnalytics'
import DashboardProducts from '@/pages/Admin/DashboardProducts'
import CreateModule from '@/pages/Admin/CreateModule'
import Quiz from '@/pages/User/Quiz'
import Cancel from "@/pages/Admin/Cancel";
import PaymentSuccess from '@/pages/Admin/PaymentSuccess'



const MainRoutes = () => {
    return (
       <Routes>
         <Route path='/' element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
         }/>

         
         <Route path='/cancel' element={
            <ProtectedRoute>
              <Cancel />
            </ProtectedRoute>
         } />
          

          <Route path='/purchase' element={
            <ProtectedRoute>
              <PaymentSuccess />
            </ProtectedRoute>
         } />


         <Route path='/singleCourse/:id' element={
          <ProtectedRoute>
            <SingleCourse/>
          </ProtectedRoute>
         }/>
         <Route path='/YourCourse' element={
          <ProtectedRoute>
            <YourCourse/>
          </ProtectedRoute>
         }/>
         <Route path='/YourCourse/:id' element={
          <ProtectedRoute>
            <SinglePurchasedCourse/>
          </ProtectedRoute>
         }/>
         <Route path='/quiz/:id' element={
          <ProtectedRoute>
            <Quiz/>
          </ProtectedRoute>
         }/>
        
         <Route path='/dashboard' element={
          <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>
} >              
           <Route index  element={
            <ProtectedRoute>
             <DashboardAnalytics />
            </ProtectedRoute>
            } 
            />
           <Route path='dashboardProduct' element={
            <ProtectedRoute>
              <DashboardProducts />
            </ProtectedRoute>
            } />
              <Route path='CourseModule/:id' element={
                <ProtectedRoute>
                  <CreateModule/>
                </ProtectedRoute>
              }/>
          </Route>

        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
       </Routes>
    )
    
}


export default MainRoutes;