const socket = io() 

let chatBox = document.getElementById('chatBox')

let foods;

fetch('/food').then(result=>result.json()).then(json=>{
    console.log(json)
    foods = json.payload
    console.log(foods)
    let container = document.getElementById('foods-container')
    foods.forEach(food=>{
        let card = document.createElement('div')
        card.setAttribute('class', 'food-card')

        let name = document.createElement('p')
        name.setAttribute('class', 'food-text')
        name.innerHTML = food.name

        let descrription = document.createElement('p')
        descrription.setAttribute('class', 'descrription-text')
        descrription.innnerHTML = food.descrription

        let price = document.createElement('p')
        price.setAttribute('class','price-text')
        price.innerHTML = food.price

        let img = document.createElement('img')
        img.src = food.thumbnail

        card.append(name)
        card.append(descrription)
        card.append(price)
        card.append(img)
        container.append(card)
    })
})



// const handleSubmit=(evt, form, route)=>{
//     evt.preventDefault()
//     let formData = new FormData(form)

//     fetch(route,{
//         method:"POST",
//         body:formData,
//         "Accept": "application/json"
//     }).then(res=>res.json()).then(json=>console.log(json))
//     form.reset()
// }

// form.addEventListener('submit',(e)=>handleSubmit(e, e.target, '/food'))



form.addEventListener('submit',(evt)=>{
    evt.preventDefault()
    let inputData=chatBox.value
    socket.emit('message', inputData)
    chatBox.value=''
})




//SOCKET
socket.on('history', data=>{
    let historyHTML = document.getElementById('historyHTML')
    let messages=''
    data.forEach(message=>{
        messages = messages + `<br>${message}</br>`
    })
    historyHTML.innerHTML = messages
})











// chatBox.addEventListener('keyup', (evt)=>{
//     let chatInput= chatBox.value

//     if(evt.key === 'Enter'){
//         socket.emit('message', chatInput)
//     }
// })
