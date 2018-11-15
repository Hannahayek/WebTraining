var express = require('express');
var router = express.Router();

/* require controller */
const hotelController=require("../controllers/hotelController")
/* GET home page. */
router.get('/', hotelController.homePageFilters);

/* GET all hotels page. */
router.get('/all',hotelController.listAllHotels);
router.get('/all/:hotel',hotelController.hotelDetail);
router.get('/countries',hotelController.listAllCountries);


// /* GET all hotels and pass parameter */
// router.get('/all/:name',function(req,res){
//   const name =req.params.name;
//   res.render('all_hotels', { title: 'All Hotels',name });
// });

/* admin route */
router.get('/admin',hotelController.adminPage);
router.get('/admin/add',hotelController.createHotelGet);
router.post('/admin/add',hotelController.createHotelPost);
router.get('/admin/edit-remove',hotelController.editRemoveGet);
router.post('/admin/edit-remove',hotelController.editRemovePost);
router.get('/admin/:hotelId/update',hotelController.updateHotelGet);
router.post('/admin/:hotelId/update',hotelController.updateHotelPost);
router.get('/admin/:hotelId/delete',hotelController.deleteHotelGet);
router.post('/admin/:hotelId/delete',hotelController.deleteHotelPost);

module.exports = router;
