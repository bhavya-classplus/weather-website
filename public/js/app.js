//Add <script> at the end of the body in index.hbs

const weatherForm=document.querySelector('form') //Now what comes back from here is a javascript representation of the element that can be used to manipulate it.
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')

// messageOne.textContent='From Javascript'


weatherForm.addEventListener('submit',(e)=>{ //e is the event object.
    
    e.preventDefault()
    
    const location=search.value //value extracts the input value, which is, whatever is typed in the form on the web page.
    
    //Just before fetch, render loading message and empty p.
    messageOne.textContent='Loading...'
    messageTwo.textContent='' //to empty if something is present in the paragraph.
    fetch('http://localhost:3000/weather/?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            // console.log(data.error)
            messageOne.textContent=data.error
        } else{
            messageOne.textContent=data.location
            messageTwo.textContent=data.forecast
            // console.log(data.location)
            // console.log(data.forecast)
        }
        
    })
})
    // console.log('testing!')
})

//Use input value to get weather.

// 1. Migrate fetch call into submit callback.
// 2. Use the search text as then address query string value.
// 3. Submit the form with a valid and invalid value to test.