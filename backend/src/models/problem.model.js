import mongoose from 'mongoose';

const problemSchema = new mongoose.Schema({
   title:{
     type:String,
     required:true,
   },

  problemLink:{
    type:String,
    required:true,
  },

  topic:{
    type:String,
    required:true,
  },

  difficulty:{
    type:String,
    enum:["easy","medium","hard"],
    required:true,
  },

  createdBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
  }

},{timeStamps:true});


const Problem = new mongoose.model('Problem',problemSchema);
//export default mongoose.model("Problem",problemSchema);
export default Problem;