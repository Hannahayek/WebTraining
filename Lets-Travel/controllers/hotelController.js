exports.homePage =(req,res) =>{
    res.render('index', { title: 'Lets Travel' });

};

exports.listAllHotels=(req,res)=>{
    res.render('all_hotels', { title: 'All Hotels' });

};

//admin controllers

exports.adminPage=(req,res)=>{
res.render('admin',{title:'Admin' });

}


exports.createHotelGet=(req,res)=>{
res.render('add_hotel',{title: 'Add New Hotel'});

}