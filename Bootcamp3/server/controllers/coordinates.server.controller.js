var config = require('../config/config'), 
    request = require('request');



module.exports = function(req, res, next) {
  if(req.body.address) {
      //This code just formats the address so that it doesn't have space and commas using escape characters
      var addressTemp = req.body.address;
      var addressTemp2 = addressTemp.toLowerCase();
      var addressTemp3 = addressTemp2.replace(/\s/g, "%20");
      var addressTemp4 = addressTemp3.replace(/,/g , "%2C");
      
    //Setup your options q and key are provided. Feel free to add others to make the JSON response less verbose and easier to read 
    var options = { 
      q: addressTemp4,
      key: config.openCage.key,  
    }

    //Setup your request using URL and options - see ? for format
    request({
      url: 'https://api.opencagedata.com/geocode/v1/json', 
      qs: options
      }, function(error, response, body) {
        //For ideas about response and error processing see https://opencagedata.com/tutorials/geocode-in-nodejs
        
       
        //JSON.parse to get contents, while using geometry to obtain the coordinates
        
        var parsedObj = JSON.parse(body)
        
        //Check if there was not an error, if no error, take the coordinates and pass it into req.results
        if(parsedObj.status.code === 200){
         var coordinates = parsedObj.results[0].geometry
          req.results = coordinates
        }
        //If there was an error, print it to the console
        else {
          console.log(error)
        }
  

        next();
    });
  } else {
    next();
  }
};  