const mongooge=require('mongoose');


const userSchema=new mongoose.Schema({
first_name:{
    type:String,
    required:'First name is required',
    trim:true,
    max:30
},
surname:{
    type:String,
    required:'Surname is required',
    trim:true,
    max:30
},
email:{
    type:String,
    required:'Email is required ',
    trim:true,
    unique:true,
    lowercase:true

},
password:{
    type:String,
    required:'Password is required'

},
isAdmin:{
  type:Boolean,
  default:false
}



});

module.exports=mongooge.model('User',userSchema);