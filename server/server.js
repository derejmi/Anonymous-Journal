//creating server
const express = require ('express')
const server = express();
const cors = require ('cors');
server.use(cors());
const bodyParser = require('body-parser');
server.use(bodyParser.json())

//running server
server.listen(3000, () => console.log("Server being departed!"))

//checking if server works with dummy results
const cheese = ['brie', 'mozzarela', 'cheddar']
server.get('/cheeses', (req, res) => {
  res.send(cheese)
     });

     server.post('/cheeses', (req,res) => {
     const cheeseData = req.body;
     const newCheese = {id: cheese.length +1, ...cheeseData}
     cheese.push(newCheese);
     res.send("cheese");
     });


module.exports = server;