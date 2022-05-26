const path=require('path')
const express=require('express')
const hbs=require('hbs')
const { notEqual } = require('assert')
//import utils module
const geocode=require('./utils/geocode')
const forcast=require('./utils/forecast')

const { error } = require('console')

const app=express()
const port=process.env.PORT || 3000

//Define paths for express config
const publicDirectoryPath= path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialspath=path.join(__dirname,'../templates/partials')


//Setup handlebars engine and view location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialspath)

//Setup static directory to server
app.use(express.static(publicDirectoryPath))




app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name: 'Nithin'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Nithin'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Nithin'
    })
})

// app.get('',(req,res)=>{
//     res.send('<h1>Hello Express!!</h1>')
// })

// app.get('/help',(req,res)=>{
//     res.send([{
//         name: 'Nithin'
//     },{
//         name:'Vin'
//     }])
// })

// app.get('/about',(req,res)=>{
//     res.send('<h1>About page</h1>')
// })

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Please add address in search'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error
            })
        }

        forcast(latitude,longitude,(error,forecastdata)=>{
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                forcast:forecastdata, 
                location,
                address:req.query.address
            })
        })
    })


    // res.send({
    //     Location: 'Bangaluru',
    //     forcast: 'Cloudy',
    //     address:req.query.address
    // })
})

app.get('/product',(req,res)=>{
    if(!req.query.search){
        return res.send({
            message: 'Please not, search cannot be empty'
        })
    }
    console.log(req.query.search)
    res.send({
        product:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'OOPS!!!',
        message:'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'OOPS!!!',
        message:'Page not found'
    })
})

app.listen(port,()=>{
    console.log('Server is up on port '+ port)
})