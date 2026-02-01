import {Outlet} from 'react-router-dom';

function Layout() {
    return (
        <div className='min-h-screen bg-slate-950 w-full flex flex-col'>
               <div className='p-5 flex items-center justify-start'>
                   <h1 className='font-bold text-purple-500 text-3xl hover:text-purple-700'>DsaCharger</h1>
               </div>

               <main className='flex-1 flex justify-center items-center'>
                  <Outlet/>
               </main>
        </div>
    )
}

export default Layout;