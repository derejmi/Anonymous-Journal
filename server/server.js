//creating server
const express = require("express");
const server = express();
const cors = require("cors");
server.use(cors());
const bodyParser = require("body-parser");
server.use(bodyParser.json());

//To read data from the post database file asynchronously
const fs = require("fs");
// fs.readFile("./database.json", "utf8", (err, data) => {
//   if (err) {
//     console.log(`Error reading file from disk: ${err}`);
//   } else {
//     const databases = JSON.parse(data);
//     databases.push({
//       name: "cheese4",
//       type: "halumi",
//     });

//     fs.writeFile(
//       "./database.json",
//       JSON.stringify(databases, null, 4),
//       (err) => {
//         if (err) {
//           console.log(`Error writing file: ${err}`);
//         }
//       }
//     );
//   }
// });

const updatedData = require("./database.json");
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
//const cheese = ['brie', 'mozzarela', 'cheddar']
// server.get("/cheeses", (req, res) => {
//   res.json(updatedData);
// });

//GET ROUTE WITH ASYNC FILE READING

server.get("/posts", (req, res) => {
  fs.readFile("./database.json", "utf8", (err, data) => {
    if (err) {
      console.log(`Error reading file from disk: ${err}`);
    } else {
      const posts = JSON.parse(data);
      res.json(posts);
    }
  });
});

function isValidPost(post) {
  return (
    post.name &&
    post.name.toString().trim() != "" &&
    post.content &&
    post.content.toString().trim() != ""
  );
}

//POST ROUTE -- WORKING!

server.post("/posts", (req, res) => {
  const incomingRequest = req.body;
  if (isValidPost(incomingRequest)) {
    const post = {
      name: incomingRequest.name.toString(),
      content: incomingRequest.content.toString(),
      giph: incomingRequest.gif.toString(),
      date: new Date(),
      likes: 0,
      dislikes: 0,
      laughs: 0,
      comments: [],
      //id : database.length
    };

    //read the file
    fs.readFile("./database.json", "utf8", (err, data) => {
      if (err) {
        console.log(`Error reading file from disk: ${err}`);
      } else {
        //parse JSON string to JSON object
        const postsData = JSON.parse(data);
        post.id = postsData.length + 1;
        postsData.push(post);

        fs.writeFile(
          "./database.json",
          JSON.stringify(postsData, null, 4),
          (err) => {
            if (err) {
              console.log(`Error writing file: ${err}`);
            }
          }
        );

        res.send("Hi");
      }
    });
  }
});

// server.post("/cheeses", (req, res) => {
//   //   const cheeseData = req.body;
//   //   const newCheese = { id: cheese.length + 1, ...cheeseData };
//   //   cheese.push(newCheese);
//   res.send("cheese");
// });

//POST ROUTE - EMOJIS

server.post("/emojis", (req, res) => {
  const incomingRequest = req.body;
  const emoji = incomingRequest.emoji;
  const id = incomingRequest.id;

  fs.readFile("./database.json", "utf8", (err, data) => {
    if (err) {
      console.log(`Error reading file from disk: ${err}`);
    } else {
      const postsData = JSON.parse(data);
      if (emoji === "fa-thumbs-up") {
        postsData[id].likes++;
      }
      if (emoji === "fa-thumbs-down") {
        postsData[id].dislikes++;
      }
      if (emoji === "fa-laugh-squint") {
        postsData[id].laughs++;
      }

      fs.writeFile(
        "./database.json",
        JSON.stringify(postsData, null, 4),
        (err) => {
          if (err) {
            console.log(`Error writing file: ${err}`);
          }
        }
      );
    }
    res.send([emoji, id]);
  });
});

server.post("/comments", (req, res) => {
  const incomingRequest = req.body;
  const comment = incomingRequest.comment;
  const id = incomingRequest.id;

  fs.readFile("./database.json", "utf8", (err, data) => {
    if (err) {
      console.log(`Error reading file from disk: ${err}`);
    } else {
      const postsData = JSON.parse(data);
      postsData[id - 1].comments.push(comment);
      fs.writeFile(
        "./database.json",
        JSON.stringify(postsData, null, 4),
        (err) => {
          if (err) {
            console.log(`Error writing file: ${err}`);
          }
        }
      );
    }
    res.send("Hello");
  });
});

module.exports = server;
