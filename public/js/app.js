console.log('This is Server side JS');



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')
const message3 = document.querySelector('#message3')
weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const location = search.value
    message1.textContent = 'Loading..'
    message2.textContent = ''
    message2.textContent = ''
    // console.log('testing JS client side');

    fetch('http://localhost:3000/weather?city='+ location).then((response) => {
    response.json().then((data) => { //remember that it is response not req.   WHY ??
        if (data.error) {
            // console.log(data.error);
            message1.textContent = data.error
        } else {
            message1.textContent = data.forecast1
            message2.textContent = data.location1
            message3.textContent = data.localtime1
            // console.log(data.forecast1);
            // console.log(data.location1);
        }
    })
})
})