//test for load
console.log('Hi')

//Set up
const form = document.querySelector(".post-form")
const spinner = document.querySelector(".spinner")

//On-loading hide spinner
spinner.style.display = 'none'


//Form submission logic

form.addEventListener('submit', (event) => {
event.preventDefault();

const name = event.target.name.value
const content = event.target.content.value

const post ={
name,
content
}
//(Hides form)
form.style.display = 'none'
//(shows spinner)
spinner.style.display = ''
const options = {

method: 'POST',
body: JSON.stringify(post),
headers: { 
    'content-type' : 'application/json'
}

fetch('http://localhost:3000/cheeses', 
}).then(r=>r.text())
.then(message=>{console.log(message)})




})
