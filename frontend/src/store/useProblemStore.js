import {create} from 'zustand';
import {axiosInstance} from '../libs/axiosSetup'
import toast from 'react-hot-toast';

export const useProblemStore = create((set,get)=>({

    problemlist:[],
    isLoadingProblems:false,
    isAddingProblems:false,
    loadingRevisionProblems:false,
    revisionProblems:[],
    

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
    },


    add : async(query) => {
        set({isAddingProblems:true})
        try{
            const addedProblem = await axiosInstance.post('/problem/add',query);
            await get().getProblems();
            toast.success('problem added sucessfully');
        }catch(error){
            console.log('error in add in useProblemStore');
            toast.error(error?.response?.data?.message);
        }finally{
            set({isAddingProblems:false});
        }

    },

    getRevisionProblem : async(query) => {
        set({loadingRevisionProblems:true});
        try{
            const revisionProblem = await axiosInstance.get(`/problem/revision${query?`?query=${query}`:""}`);
            set({revisionProblems:revisionProblem.data.problems||[]});
        }catch(error){
            console.log('error in getRevisionProblem',error.message);
            toast.error(error.response.data.message);
        }finally{
            set({loadingRevisionProblems:false});
        }
    }

}))

