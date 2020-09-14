const express = require('express')
const path= require('path')
const hbs=require('hbs')
const geocode= require('./utils/geocode')
const forecast=require('./utils/forecast.js')

const app=express()
const port= process.env.PORT||3000

//Define paths for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location.
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)
//setup static directory to server.
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{ //req and res are objects
    res.render("index",{ //can access it in the index.hbs file
        title: "Weather App",
        name:"Bhavya Pandey"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About Me",
        name:"Bhavya Pandey"
    })
})

app.get('/help',(req,res)=>{ //we can also send json data to the browser
    res.render('help',{
        name:"Bhavya Pandey",
        title:"Help"
    })
})



app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term.'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address to check the weather.'
        })
    }else{
        geocode(req.query.address, (error, {latitude,longitude,location}={})=>{ //The callback fn has error as a string or we have our data as an object.
        if(error){
            return res.send({error:error})
        }
        forecast(longitude,latitude,(error,forecastData)=>{ //earlier had data.latitude and data.longitude
            if(error){
                return res.send(error)
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
    }
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        error:'Help page not found.',
        name:'Bhavya Pandey'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        error:'My 404 Page.',
        name:'Bhavya Pandey'
    })
})
app.listen(port,()=>{
    console.log('Server is up on port '+port)
})