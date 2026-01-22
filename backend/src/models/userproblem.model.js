import mongoose from 'mongoose';

const userProblemSchema = new mongoose.Schema({

   userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
   },

   problemId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Problem",
    required:true,
   },


   solvedDate:{
        type:Date,
        default:Date.now,
   },

   lastRevisedDate:{
    type:Date,
    default:null
   },

   revisionCount:{
    type:Number,
    default:0,
   },

   notes:{
    type:String,
    default:null,
   }



},{timestamps:true});


userProblemSchema.index(
    {userId:1,problemId:1},
    {unique:true},
);


userProblemSchema.index({
    userId:1,
    lastRevisedDate:1,
})