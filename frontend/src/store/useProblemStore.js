import {create} from 'zustand';
import {axiosInstance} from '../libs/axiosSetup'
import toast from 'react-hot-toast';

export const useProblemStore = create((set)=>({

    problemlist:[],
    isLoadingProblems:false,
    isAddingProblems:false,

    getProblems: async(search="") => {
        set({isLoadingProblems:true})
        try{
            const problems = await axiosInstance.get(`/problem/list${search?`?search=${search}`:""}`);
            set({problemlist:problems.data.problem});
            console.log(problems.data);
        }catch(error){
            console.log('error in getProblems',error.message);
            toast.error(error.response.data.message);
        }finally{
            set({isLoadingProblems:false});
        }
    }

}))

