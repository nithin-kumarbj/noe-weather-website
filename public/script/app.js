console.log('Server from js')



const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const Location=search.value

    messageOne.textContent='Loading...'
    messageTwo.textContent=''


    fetch('/weather?address='+Location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent=data.error
        }
        else{
            console.log(data.location)
            messageOne.textContent=data.location
            messageTwo.textContent=data.forcast
        }
        
    })
})

})