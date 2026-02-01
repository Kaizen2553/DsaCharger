import React, { useEffect } from 'react'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import { Navigate, Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Layout from './components/Layout'
import { useAuthStore } from './store/useAuthStore'
import PageLoader from './components/PageLoader'
import Problem from './pages/Problem'




function App() {
   const {isCheckingAuth,checkAuth,authUser} = useAuthStore();
   
   useEffect(()=>{
      checkAuth();
   },[]);
   
 if(isCheckingAuth)return <PageLoader/>
 return(
    <Routes>
       <Route element={<Layout/>}>
          <Route path='/' element={!authUser?<SignUp/>:<Navigate to="/problems"/>}/>
          <Route path='/login' element={!authUser?<Login/>:<Navigate to="/problems"/>}/>
          <Route path='/problems' element={authUser?<Problem/>:<Navigate to="/login"/>}/>
       </Route>
    </Routes>
 )
}

export default App