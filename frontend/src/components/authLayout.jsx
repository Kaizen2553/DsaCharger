import {Outlet} from 'react-router-dom';
import Navbar from './Navbar';

function AuthLayout() {
    return (
        <div className='min-h-screen bg-slate-950 w-full flex flex-col'>
               <div className='bg-slate-900 h-16 w-full flex items-center p-6'>
                      <h1 className='text-purple-500 font-bold text-2xl'>DsaCharger</h1>
               </div>

               <main className='flex-1 flex justify-center items-center'>
                  <Outlet/>
               </main>
               
        </div>
    )
}

export default AuthLayout;