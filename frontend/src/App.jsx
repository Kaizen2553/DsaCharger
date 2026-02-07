import React, { useEffect } from 'react'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import { Navigate, Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Layout from './components/Layout'
import { useAuthStore } from './store/useAuthStore'
import PageLoader from './components/PageLoader'
import Problem from './pages/Problem'
import AuthLayout from './components/authLayout'
import HomePage from './pages/HomePage'




function App() {
   const {isCheckingAuth,checkAuth,authUser} = useAuthStore();
   
   useEffect(()=>{
      checkAuth();
   },[]);
   
 if(isCheckingAuth)return <PageLoader/>
 return(
    <Routes>
       <Route element={<Layout/>}>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/register' element={!authUser?<SignUp/>:<Navigate to="/problems"/>}/>
          <Route path='/problems' element={authUser?<Problem/>:<Navigate to="/login"/>}/>
          
       </Route>
       <Route element={<AuthLayout/>}>
         <Route path='/login' element={authUser?<Navigate to='/problems'/>:<Login/>}></Route>
       </Route>
    </Routes>
 )
}

export default App