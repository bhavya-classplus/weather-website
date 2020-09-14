const request=require('request')

const forecast=(longitude,latitude,callback)=>{ //earlier I called in the order (latitude,longitude), threw error.
    const url='http://api.weatherstack.com/current?access_key=29c645089cf39cc191599681fce08449&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'&units=m'

    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to the weather service!',undefined)
        } else if(body.error) {
            callback('Unable to find location. Try another search.',undefined)
        } else{
            callback(undefined,body.current.weather_descriptions[0]+". It is: "+body.current.temperature+" deg C, feels like: "+body.current.feelslike+" deg C")
        }
    })

}

module.exports= forecast


//WITHOUT DESTRUCTURING OR SHORTHAND OBJECT PROPERTY.
// const forecast=(longitude,latitude,callback)=>{ //earlier I called in the order (latitude,longitude), threw error.
//     const url='http://api.weatherstack.com/current?access_key=29c645089cf39cc191599681fce08449&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'&units=m'

//     request({url:url,json:true},(error,response)=>{
//         if(error){
//             callback('Unable to connect to the weather service!',undefined)
//         } else if(response.body.error) {
//             callback('Unable to find location. Try another search.',undefined)
//         } else{
//             callback(undefined,response.body.current.weather_descriptions[0]+". \nIt is: "+response.body.current.temperature+" deg C, feels like: "+response.body.current.feelslike+" deg C")
//         }
//     })

// }