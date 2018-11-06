var express = require('express');
var router = express.Router();

/* require controller */
const hotelController=require("../controllers/hotelController")
/* GET home page. */
router.get('/', hotelController.homePage);

/* GET all hotels page. */
router.get('/all',hotelController.listAllHotels);

// /* GET all hotels and pass parameter */
// router.get('/all/:name',function(req,res){
//   const name =req.params.name;
//   res.render('all_hotels', { title: 'All Hotels',name });
// });

/* admin route */
router.get('/admin',hotelController.adminPage);
router.get('/admin/add',hotelController.createHotelGet);

module.exports = router;
