const mongoose=require('mongoose')


const hotelSchema=new mongoose.Schema({
hotel_name: {
type:String,
required:'Hotel Name is required',
max:32,
trim:true
},
hotel_description:{
    type:String,
    required:"Hotel description is required",
    trim:true
},
image:String,

star_rating:{
type:Number,
required:"Hotel Ratings is required",
max:5,
},
country:{
    type:String,
    required:true,
    trim:true
},

cost_per_night:{
    type:Number,
    required:'Cost per night is required'
},
available:{
    type:Boolean,
    required:'Availablety is required'
}

});



//export model

module.exports=mongoose.model('Hotel',hotelSchema);