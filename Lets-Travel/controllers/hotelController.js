const Hotel=require("../models/hotels")

// exports.homePage =(req,res) =>{''
//     res.render('index', { title: 'Lets Travel' });

// };

exports.listAllHotels= async (req,res,next)=>{
    try {
        const allHotels=await Hotel.find({available: {$eq: true}});
         res.render('all_hotels', { title: 'All Hotels',allHotels });
        // res.json(allHotels);
    } catch (error) {
     next(error)   
    }

};

exports.listAllCountries= async (req,res,next)=>{
    try {
        const allCountries=await Hotel.distinct('country');
        res.render('all_countries',{title:'Browse by country',allCountries});
    } catch (error) {
     next(error)   
    }

};

exports.homePageFilters=async(req,res,next)=>{
try {
    const hotels=await Hotel.aggregate([   //we made array here , values passed to array
        {$match: {available:true}},
        {$sample:{size:9}}
  
]);
    
const countries = await Hotel.aggregate([
    {$group:{_id:'$country'}},
    {$sample:{size:9}}
]);
res.render('index',{hotels,countries});
} catch (error) {
    next(error)
}


}

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



 exports.editRemoveGet=(req,res)=>{
    res.render('edit_remove',{title: 'search for add or update new hotel'});
 }   

 exports.editRemovePost=async (req,res,next)=>{
   try {
       const hotelId=req.body.hotel_id || null;
       const hotelName=req.body.hotel_name || null;
//save search or in array
       const hotelData=await Hotel.find({$or:[
           {_id:hotelId},
           {hotel_name:hotelName}
           //collation language search found in documents
       ]}).collation({
         locale:'en',
         strength:2
       });

         if(hotelData.length>0){
           res.render('hotel_detail',{title:'Add /Remove Hotel',hotelData})
             return
         }else{
             res.redirect('/admin/edit-remove')
         }

    } catch (error) {
       next(error) 
    }
 }   


 exports.updateHotelGet=async(req,res,next)=>{
try { // _id:req.params.hotelId comes from the name in the route for this functuin in index page
    //_id from database match with hotelId
    const hotel=await Hotel.findOne({_id:req.params.hotelId});
   
     res.render('add_hotel',{title:'Update Hotel',hotel})
    
    
} catch (error) {
    next(error)
}

 }


 exports.updateHotelPost=async(req,res,next)=>{
    try { // _id:req.params.hotelId comes from the name in the route for this functuin in index page
        //new:true it will get back the modified record, if not set, will return the original record
        const hotelId=req.params.hotelId;
       const hotel=await Hotel.findByIdAndUpdate(hotelId,req.body,{new:true});
       //we write below code, so not to hang the browser
       res.redirect('/all/'+hotelId)
       
        
        
    } catch (error) {
        next(error)
    }
    
     }


     exports.deleteHotelGet=async(req,res,next)=>{
        try { 
            const hotelId=req.params.hotelId;
           const hotel=await Hotel.findOne({_id:hotelId});
           res.render('add_hotel',{title:'Delete Hotel',hotel});
        } catch (error) {
            next(error)
        }
        
         }


         exports.deleteHotelPost=async(req,res,next)=>{
            try { 
                const hotelId=req.params.hotelId;
               const hotel=await Hotel.findByIdAndRemove({_id:hotelId});
               res.redirect('/')
            } catch (error) {
                next(error)
            }
            
             }



             exports.hotelDetail=async(req,res,next)=>{
                try { 
                    const hotelParam=req.params.hotel;
                   const hotelData=await Hotel.find({_id:hotelParam});
                   res.render('hotel_detail',{title:"Lets Travel",hotelData});
                } catch (error) {
                    next(error)
                }
                
                 }