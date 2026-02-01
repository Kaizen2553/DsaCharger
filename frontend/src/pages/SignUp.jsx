import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore';
import { LoaderIcon } from 'lucide-react';

function SignUp() {
  const [formData,setFormData] = useState(
    {
      fullname:"",
      email:"",      
      password:"",
    }
  )



  const {signup,isSigningUp} = useAuthStore();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };

  const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center justify-center'>
        <div className='w-full max-w-sm bg-slate-900 rounded-xl p-6 shadow-lg flex flex-col text-center'>

              <h2 className='text-2xl text-white font-bold m-8'>Create Account</h2>

              <form onSubmit={handleSubmit} className='space-y-6'>
                  <input type="text" 
                  value={formData.fullname}
                  onChange={(e)=>{
                    setFormData({...formData,fullname:e.target.value});
                  }}
                   placeholder='your name'
                   className='bg-slate-950 text-white rounded-md py-2 px-4 w-full 
                   focus:outline-none focus:ring-2 focus:ring-purple-300'/>
                   
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
                   hover:bg-purple-700 transition' disabled={isSigningUp}>
                   {isSigningUp ?
                   (<LoaderIcon className="w-full h-5 animate-spin text-center"/>):
                   (<p className='text-white font-bold'>Register</p>)}
      
                   </button>
              </form>

            
              <p className='text-sm text-slate-400 mt-4'>Already have a account?{" "}
                <span className='text-purple-400 cursor-pointer hover:underline'
                onClick={()=>navigate('/login')}>
                    Login
                </span>
              </p>

        </div>
    </div>
  )
}

export default SignUp