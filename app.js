const { response } = require('express')
const request = require('request')
const hbs = require('hbs')
const path = require('path')
const chalk = require('chalk')
const geoCode = require('./src/utils/geoCode');
const foreCast = require('./src/utils/foreCast');
require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const viewsPath = path.join(__dirname, '/templates/views')
const partialPath = path.join(__dirname,'/templates/partials')


//create engines
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// console.log(__dirname);
const staticPath = path.join(__dirname, '/public')
app.use(express.static(staticPath))



app.get('/about', (req,res)=>{
    res.render('about')
})


app.get('',(req,res)=>{
    res.render('weather.hbs')  //here rather then res if i use app then also
                        //its work why ???/
})
// app.get('/testing',(req,res)=>{
// res.render('testing')
// })
app.get('/weather', (req,res)=>{
    //console.log(req.query.city);
    if(!req.query.city){
        res.send({
            error: "No query endpoint given!!"
        })
    }
    else{
        geoCode(req.query.city, (error,data)=>{
            if(error){
                res.send({error})
            }
            console.log(data.output);
            foreCast(data.longitude, data.latitude, (error, forecastData)=>{
                    if(error){
                        res.send({error})
                    }
                    else{
                        res.send({
                            forecast1: forecastData.forecast,
                            location1: data.location,
                            localtime1: forecastData.timing
                                           
                        })               
                    }
            })
        })
        
    }

})
app.listen(port, ()=>{
    console.log(chalk.green("Made by: 19DCE099"));
    console.log("listening at port 3000");
})


// const city = process.argv[2];

// geoCode(city, (error, data)=>{
//       if(error){
//           console.log('Problem in fetching GeoCode Info');
//       }else{
//           console.log(data.latitude +"  "+ data.longitude);
//           foreCast(data.longitude, data.latitude, (error,forecastData)=>{
//                 if(error){
//                     console.log('Problem in fetching Forecast Info');
//                 }else{
//                     console.log("Temperature: "+ forecastData.temperature +"But feelsLike: "
//                      + forecastData.feelsLike);
//                     console.log("Place: " + forecastData.place +" , "+ forecastData.country);
//                 }
//           })
//       }
// })








//GeoCode
// const city = process.argv[2];

// const url1 = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ city  +".json?access_token=pk.eyJ1IjoiaGFhcmQ3IiwiYSI6ImNrcWx0eXhxbzEycjEycHBxcXF2bmY2b3EifQ.xdhlo3gow86IKUs30dXMYw&limit=1"
// request({url: url1, json: true}, (error,response)=>{
//     if(error){
//         console.log("problem in accessing GeoCode");
//     }else{
//         //lat and lon
//         const latitude = response.body.features[0].center[0];
//         const longitude = response.body.features[0].center[1]
        
//         // console.log("latitude:  " + response.body.features[0].center[0]); 
//         // console.log("longitude: " + response.body.features[0].center[1]);
        
//         console.log("latitude:  " + latitude);
//         console.log("longitude: " + longitude);
//         const url2 = "http://api.weatherstack.com/current?access_key=84041021976b34cf5991be009bec11aa&query=" + longitude +","+latitude +"&units=m"
//         request({url: url2, json: true}, (error, response)=>{
//            if(error){
//                console.log('Problem in fetching API from Weathertack');
//            }
//            else{
//             console.log("Temperature: "+ response.body.current.temperature);
//             console.log(response.body.location.country);
//            }
            
//         })
//     }
    
// })




// //Forecast







// //API Key forecast: 84041021976b34cf5991be009bec11aa