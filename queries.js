/* Connecting my database using mongoose*/
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config');

mongoose.connect(config.db.uri, {useNewUrlParser: true})

//Check out - https://mongoosejs.com/docs/queries.html

var findLibraryWest = function() {
  /* 
    Finds the document that contains data corresponding to Library West,
    then logs it to the console. 
   */
  Listing.findOne({name: 'Library West'},function(err,data){
    if(err) throw err
    
    console.log(data)
  })
};
var removeCable = function() {
  /*
    Finds the document with the code 'CABL'. This cooresponds with courses that can only be viewed 
    on cable TV. Since we live in the 21st century and most courses are now web based, removes it
    from my database and logs the document to the console. 
   */
  Listing.findOneAndRemove({code: 'CABL'},function(err, data){
    if(err) throw err
    
    console.log(data)
  })
};
var updatePhelpsLab = function() {
  /*
    Find the listings, updates it, and then 
    logs the updated document to the console. 

   */
  
  Listing.findOneAndUpdate({name : 'Phelps Laboratory'}, { address: '1953 Museum Rd, Gainesville, FL 32603'}, function(err, data){
    if (err) throw err

    console.log(data)
  })
};
var retrieveAllListings = function() {
  /* 
    Retrieves all listings in the database, and logs them to the console. 
   */
  Listing.find({},function(err,data){
    if (err) throw err
    
    console.log(data)
  })
};

findLibraryWest();
removeCable();
updatePhelpsLab();
retrieveAllListings();
