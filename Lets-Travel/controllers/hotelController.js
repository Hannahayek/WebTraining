const Hotel=require("../models/hotels")
exports.homePage =(req,res) =>{''
    res.render('index', { title: 'Lets Travel' });

};

exports.listAllHotels= async (req,res,next)=>{
    try {
        const allHotels=await Hotel.find({available: {$eq: true}});
         res.render('all_hotels', { title: 'All Hotels',allHotels });
        // res.json(allHotels);
    } catch (error) {
     next(error)   
    }

};

//admin controllers

exports.adminPage=(req,res)=>{
res.render('admin',{title:'Admin' });

}


exports.createHotelGet=(req,res)=>{
res.render('add_hotel',{title: 'Add New Hotel'});

}

exports.createHotelPost= async(req,res,next)=>{

    try{
        const hotel=new Hotel(req.body);
        await hotel.save();
        res.redirect('/all/'+hotel._id);
    }catch(error){
       next(error);
    }
   
    }