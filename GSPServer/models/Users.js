var mongoose = require('mongoose');

var Userschema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    email : String,
    password : String,
    address : String,
    about : String,
    country : String,
    city:String,
    postCode:String,
});

module.exports = mongoose.model('Users',Userschema);