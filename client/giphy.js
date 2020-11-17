
function sendApiRequest(){
    
    let userInput = document.getElementById("input").value
    
    console.log(userInput)

    let giphyApiKey = "G3tvMSg4zeTMogTZEfjD6PpPDFsmKcsH"
    let giphyApiURL = `https://api.giphy.com/v1/gifs/search?q=${userInput}&rating=g&api_key=${giphyApiKey}`

    fetch(giphyApiURL).then(function(data){
        return data.json()
    
    })
.then(function(json){
    console.log(json.data[2].images.fixed_height.url)
    let imgPath = json.data[0].images.fixed_height.url
    let img = document.createElement('img')
    img.setAttribute("src", imgPath)
    document.body.appendChild(img)
})


}