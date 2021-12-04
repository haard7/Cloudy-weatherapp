const request = require('request')

const foreCast = (longitude, latitude, callback)=>{
   const weatherstackAPI = process.env.WEATHERSTACK_API
    const url2 = `http://api.weatherstack.com/current?access_key=${weatherstackAPI}&query=` + longitude +","+latitude +"&units=m"
            request({url: url2, json: true}, (error, response)=>{
               if(error){
                  // console.log('Problem in fetching API from Weathertack');
                  callback("Problem in fetching API from Weathertack", undefined)
               }
               else{
                // console.log("Temperature: "+ response.body.current.temperature);
                // console.log(response.body.location.country);
                callback(undefined,{forecast: "Current temperature is " + 
                response.body.current.temperature + " But it feels like "
                + response.body.current.feelslike,
                  timing: "Localtime: " + response.body.location.localtime
               }
                   
                  //   place: response.body.location.name,
                  //   country: response.body.location.country

                )
               }
                
            })
}

module.exports = foreCast;