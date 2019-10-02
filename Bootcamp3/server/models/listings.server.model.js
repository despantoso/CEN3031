//Importing mongoose and defining any variables needed to create the schema
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

//Creating Schema
var listingSchema = new Schema({
  
  code: {
    type: String, required: true
  },
  name: {
    type: String, required: true
  },
  coordinates: {
    latitude: Number,
    longitude: Number
  },
  address: String
  
});

//'pre' function that adds the updated_at and created_at if not already there property
listingSchema.pre('save', function(next) {
  var currentDate = new Date();
  this.updated_at = currentDate;

  if(!this.created_at){
    this.created_at = currentDate;
  }
  next();
});

//Instantiating a Mongoose model
var Listing = mongoose.model('Listing', listingSchema);

//Exporting the model to make it avaliable to other parts of node application
module.exports = Listing;
