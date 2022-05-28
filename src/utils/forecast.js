const request=require('postman-request')

const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=5e4bfc8c0a7a18031e807dc82405a52a&query='+ latitude+','+longitude+'&units=m'

    request({url:url, json: true},(error, {body})=>{
        if(error){
            callback('Unable to connect to wetherstack service!',undefined)
        }else if(body.error){
            callback('Error: '+body.error.info,undefined)
        }else{
            const current=body.current;

            // const is_daytime=current.is_day='no'?'night':'day-time'
            // console.log(is_daytime)
            // console.log(current)

            callback(undefined,body.current.weather_descriptions[0]+ '. It like '+ current.temperature+' degrees out, but feels like '+current.feelslike+' degrees. The humidity is '+current.humidity+'%.')
        }
    })

}


module.exports=forecast