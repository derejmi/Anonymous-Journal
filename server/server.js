//creating server
const express = require("express");
const server = express();
const cors = require("cors");
server.use(cors());
const bodyParser = require("body-parser");
server.use(bodyParser.json());

//To read data from the post database file asynchronously
const fs = require("fs");
fs.readFile("./database.json", "utf8", (err, data) => {
  if (err) {
    console.log(`Error reading file from disk: ${err}`);
  } else {
    const databases = JSON.parse(data);
    databases.push({
      name: "cheese4",
      type: "halumi",
    });

    fs.writeFile(
      "./database.json",
      JSON.stringify(databases, null, 4),
      (err) => {
        if (err) {
          console.log(`Error writing file: ${err}`);
        }
      }
    );
  }
});

//const postData =fs.readFile('./database.json', 'utf8', (err, data) => {
//if (err) {
// console.log(`Error reading file from disk: ${err}`);
//const database = JSON.parse(data) // parse JSON string into JSON object
// database.push ({
//name: 'cheese4',
////type: 'halumi'
// });

//running server
server.listen(3000, () => console.log("Server being departed!"));

//checking if server works with dummy results
const cheese = ["brie", "mozzarela", "cheddar"];
server.get("/cheeses", (req, res) => {
  res.send(cheese);
});

server.post("/cheeses", (req, res) => {
  const cheeseData = req.body;
  const newCheese = { id: cheese.length + 1, ...cheeseData };
  cheese.push(newCheese);
  res.send("cheese");
});

module.exports = server;
