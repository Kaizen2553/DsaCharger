import React from 'react'
import {useNavigate} from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore';
import {LoaderIcon} from 'lucide-react';
import {useState} from 'react'

function Login() {
  
  const [formData,setFormData] = useState({
    email:"",
    password:"",
  })

  const {isLoggingIn,login} = useAuthStore();

  const handleSubmit = (e)=>{
    e.preventDefault();
    login(formData);
  }

  const navigate = useNavigate();
  
  return (
      <div className='flex flex-col items-center justify-center'>
        <div className='w-full max-w-sm bg-slate-900 rounded-xl p-6 shadow-lg flex flex-col text-center'>

              <h2 className='text-2xl text-white font-bold m-8'>Login</h2>

              <form onSubmit={handleSubmit} className='space-y-6'>
 
                   <input type="text" 
                   value={formData.email}
                   onChange={(e)=>{
                    setFormData({...formData,email:e.target.value})
                   }}
                   placeholder='email@abs.com'
                   className='bg-slate-950 text-white rounded-md py-2 px-4 w-full 
                   focus:outline-none focus:ring-2 focus:ring-purple-300'/>

                   <input type="password" 
                   value={formData.password}
                   onChange={(e)=>{
                    setFormData({...formData,password:e.target.value})
                   }}
                   placeholder='password'
                   className='bg-slate-950 text-white rounded-md
                   px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-300' />


                   <button type="submit" className='bg-purple-500 px-2 py-2 rounded-md w-1/2 
                   hover:bg-purple-700 transition'>
                    {
                      isLoggingIn?
                      (<LoaderIcon className='w-5 h-5 animate-spin flex mx-auto'/>):
                      (<p className='font-bold'>Login</p>)
                    }
                   </button>
              </form>

            
              <p className='text-sm text-slate-400 mt-4'>Don't have an account yet?{" "}
                <span className='text-purple-400 cursor-pointer hover:underline'
                onClick={()=>navigate('/')}>
                    Register
                </span>
              </p>

        </div>
    </div>
  )
}

export default Login