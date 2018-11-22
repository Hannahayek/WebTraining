const mongoose=require('mongoose');
//npm i passport passport-local passport-local-mongoose
const passportLocalMongoose=require('passport-local-mongoose');

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
//we add usernameField because by default it will look for username in our scheme
userSchema.plugin(passportLocalMongoose,{usernameField:'email'});

module.exports=mongoose.model('User',userSchema);