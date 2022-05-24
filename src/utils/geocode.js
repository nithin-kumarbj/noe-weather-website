const request=require('postman-request')

const geocoding=(address,callback)=>{
    const GeoURL='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoibml0aGluNWt1bWFyIiwiYSI6ImNsMnlmYzgzaTE0dWQzYm9iYzloa3lxdmoifQ.U9aGnMCbkGA29pRTzJ4Qsw&limit=1'

    request({url: GeoURL, json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to geocoding service!')   
        }else if(body.features.length==0){
            callback('No data found')   
        }else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports=geocoding