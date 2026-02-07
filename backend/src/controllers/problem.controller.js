import Problem from "../models/problem.model.js";
import UserProblem from '../models/userproblem.model.js'
import { getRevisionLimit,selectProblems } from "../lib/revisionLogic.js";

export const addProblem =  async(req,res)=>{
    try{
       const {title,problemLink,topic,difficulty} = req.body;
       
       if(!title||!problemLink||!topic||!difficulty){
         return res.status(400).json({message:"please provide all the fields"});
       }

       //pehle url verify karo format sahi hai ya nhi
       //phir check kro ki domain shi hai ya nhi
       let url;
       try{
         url = new URL(problemLink);
       }catch(err){
         return res.status(400).json({message:"provide valid problem link"});
       }

       
       const hostname  = url.hostname;
       const pathname = url.pathname;

       const isLeetCode = hostname.includes('leetcode.com') && pathname.startsWith('/problems/');
       const isGFG = hostname.includes('geeksforgeeks.org') && pathname!=='/';
       const isCodeForces = hostname.includes('codeforces.com') && pathname.startsWith('/problem');


       if(!isLeetCode && !isGFG && !isCodeForces){
            return res.status(400).json({message:"problems from leetcode , gfg and codeforces are only allowed"});
       }

       const checkifPresent = await Problem.findOne({problemLink});
       let problemId;

       if(!checkifPresent){
         
         const newProblem = new Problem({
           title,
           problemLink,
           topic,
           difficulty,
          })
         const savedProblem = await newProblem.save();

         problemId = savedProblem._id;

       }else{
         problemId = checkifPresent._id;
       }



       const saved  = await UserProblem.create({
          userId:req.userId,
          problemId,
          solvedDate:new Date(),
          lastRevisedDate:null,
          revisionCount:0,
          notes:null,
       });

      if(saved){
        return res.status(200).json(saved);
      }

      //res.status(200).json(savedProblem);

      

    }catch(error){
       console.log('error in addProblem controller',error.message);
       return res.status(500).json({message:"internal server error"});
   }
}


export const problemlist = async (req, res) => {
  try {
    const userId = req.userId;
    const search = req.query.search;
    const limit = 500;
    const cursor = req.query.cursor;

    // BASE QUERY
    let query = { userId };

    // Pagination ONLY if no search
    if (!search && cursor) {
      query.solvedDate = { $lt: new Date(cursor) };
    }

    let mongoQuery = UserProblem.find(query)
      .sort({ solvedDate: -1 })
      .populate({
        path: "problemId",
        match: search
          ? {
              $or: [
                { title: { $regex: search, $options: "i" } },
                { difficulty: { $regex: search, $options: "i" } },
                { topic: {$regex: search, $options:"i"}}
              ]
            }
          : {}
      });

    // Apply limit ONLY when not searching
    if (!search) {
      mongoQuery = mongoQuery.limit(limit);
    }

    const problems = await mongoQuery;

    const filteredProblems = problems.filter(p => p.problemId !== null);

    const nextCursor =
      !search && problems.length > 0
        ? problems[problems.length - 1].solvedDate
        : null;

    res.status(200).json({
      problem: filteredProblems,
      nextCursor
    });

  } catch (error) {
    console.log("error in problemList controller", error.message);
    res.status(500).json({ message: "internal server error" });
  }
};


export const problemDetail = async(req,res) => {
   try{
      const userId = req.userId;
      const problemId = req.params.id;
      const problem = await UserProblem.findOne({
        userId,
        problemId
      }).populate('problemId');

      if(!problem){
        return res.status(404).json({message:"problem not found"});
      }else{
        return res.status(200).json(problem);
      }
   }catch(error){
    console.log('error in problemDetail controller',error.message);
    return res.status(500).json({message:"internal server error"});
   }
}

export const reviseProblem = async(req,res) => {
//find problem with userid,problemid the increment revision cound and set last revised date
  try {
    const userId = req.userId;
    const problemId = req.params.id;
    const updatedProblem = await UserProblem.findOneAndUpdate(
        {userId,problemId},
 
        {
          $set:{lastRevisedDate:new Date()},
          $inc:{revisionCount:1},
        },
        {new:true},    
    )

    if(!updatedProblem){
       return res.status(404).json({message:"problem not found"});
    }

    return res.status(201).json(updatedProblem);
  } catch (error) {
    console.log('error in revise problem',error.message);
    return res.status(500).json({message:"internal server error"});
  }
}

export const deleteProblem = async(req,res) => {
    try{
        const userId = req.userId;
        const problemId = req.params.id;

        const problem = await UserProblem.findOne(
          {userId,problemId}
        ) ;

        if(!problem){
          return res.status(404).json({message:"problem not found"});
        }

        const deletedProblem = await problem.deleteOne();

        if(!deletedProblem){
          return res.status(404).json('problem not deleted');
        }else{
          return res.status(200).json("problem deleted successfully");
        }
    }catch(error){
        console.log('error in deleteproblem controller',error.message);
        return res.status(500).json({message:"internal server error"});
    }
}

export const addNotes = async(req,res) => {
     try{
       
       const {notes} = req.body;
       const problemId = req.params.id;
       const userId = req.userId;

       const updatedUser = await UserProblem.findOneAndUpdate(
        {userId,problemId},
        {$set:{notes:notes}},
        {new:true}
       );

       if(!updatedUser){
          return res.status(404).json({message:"user not found"});
       }

       return res.status(200).json(updatedUser);

     }catch(error){
       console.log('error in addNotes controller',error.message);
       return res.status(500).json({message:"internal server error"});
     }
}

export const todayRevision = async(req,res) => {
    
    const difficultyWeight = {
      'easy':1,
      'medium':2,
      'hard':3
    }

    const now = Date.now();

    const maxLimit = 10;
    try{
      
      const userId = req.userId;
      const userProblems = await UserProblem.find({userId}).populate('problemId');
      
      if(userProblems.length===0){
         return res.status(200).json({message:"problems not found",problems:[]});
      }

      userProblems.forEach((p)=>{
        const lastDate = p.lastRevisedDate || p.solvedDate;
        const daySince = Math.floor(now-lastDate.getTime())/(24*60*60*1000);
        const difficulty = p.problemId.difficulty;
        const priority = (daySince+1)*(difficultyWeight[difficulty])*(1/(1+p.revisionCount));
        p.priority_count = priority;
      })

      const totalProblems = userProblems.length;
      
      const revisionLim = getRevisionLimit(totalProblems);

      if(revisionLim===0){
        return res.status(200).json({message:"not enough problems for revision"});
      }


      const userLimit = parseInt(req.query.limit,10);
      
      const requestedLimit = Number.isInteger(userLimit) && userLimit>0 
      ? userLimit:null;

      

      const finalLimit = requestedLimit ? 
      Math.min(maxLimit,requestedLimit):revisionLim;


      userProblems.sort((a,b)=>{
           if(a.priority_count === b.priority_count){
             return a.revisionCount - b.revisionCount;
           }

           return b.priority_count-a.priority_count;
      })


      const result = selectProblems(userProblems,finalLimit);

      return res.status(200).json({
        totalProblems:totalProblems,
        revisionLimit:finalLimit,
        problems:result
      });

    }catch(error){
        console.log('error in today revision controller',error.message);
        return res.status(500).json({message:'internal server error'});
    }
}

