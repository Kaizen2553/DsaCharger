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


},{timeStamps:true});


problemSchema.index(
  {problemLink:1},
  {unique:true},
)

const Problem = new mongoose.model('Problem',problemSchema);
//export default mongoose.model("Problem",problemSchema);
export default Problem;