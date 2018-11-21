const User=require('../models/user');
//express validator
const  { check, validationResult }=require('express-validator/check');
const { sanitize } =require('express-validator/filter');

exports.signUpGet=(req,res)=>{
    res.render('sign_up',{title:'User sign up'});
}

exports.signUpPost= [
//validate User data
//npm i express-validator to install the validator
check('first_name').isLength({min:1}).withMessage('First name must be specified')
.isAlphanumeric().withMessage('First name must be alphanumeric'),

check('surname').isLength({min:1}).withMessage('Surname must be specified')
.isAlphanumeric().withMessage('Surname must be alphanumeric'),

check('email').isEmail().withMessage('Invalid email address'),

check('confirm_email')
.custom((value,{req})=> value === req.body.email)
.withMessage('Email addresses do not match'),

check('password').isLength({min:6})
.withMessage('Invalid password,password must be a minumum of 6 characters'),

check('confirm_password')
.custom((value,{req})=> value === req.body.password)
.withMessage('Passwords do not match'),

//will clean any code from the data
sanitize('*').trim().escape(),

(req, res,next) => {
const errors=validationResult(req);

if(!errors.isEmpty()){
//there are errors
res.render('sign_up',{title:'Please fix the following errors:',errors:errors.array()})

}else{
    //no errors
}
}


]
   
