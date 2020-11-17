//Set up
const form = document.querySelector(".post-form");
const spinner = document.querySelector(".spinner");
const postElement = document.querySelector(".posts");
const content = document.querySelector("#content")
const counterEle = document.createElement("p");


loadPosts();
//On load - load all the posts

//counting the characters
content.addEventListener("input", e => {
  e.preventDefault();
  const target = e.target
   const currentLength = target.value.length;
   form.append(counterEle)
   counterEle.textContent = `${currentLength}/200`
   
   function checkingForLength (currentLength) {
   if (currentLength > 199) {
    alert ("Too many characters, you only can write 199 characters") 
    return content.disabled = true;
  }
}
checkingForLength(currentLength);
});

//disabelling the submit button if characters over 200


//On-loading hide spinner
spinner.style.display = "none";


function loadPosts() {
  //blank out everything there before and then add to the page
  postElement.innerHTML = "";
  fetch("http://localhost:3000/posts")
    .then((r) => r.json())
    .then((posts) => {
      posts.reverse();//we reverse it to see the most recent post at the top
      posts.forEach((post) => {
        const div = document.createElement("div");
        div.className = "allposts";
        div.id = `$Post ${post.id}`;
        //headers to show usernames
        const header = document.createElement("h3");
        header.textContent = post.name;

        //post content
        const contents = document.createElement("p");
        contents.textContent = post.content;

        //date
        const date = document.createElement("small");
        date.textContent = new Date(post.date);

        const reactionDiv = document.createElement("div");

        // const icons = `<i class="far fa-comment"></i>
        // <i class="far fa-thumbs-up emojis ${post.id}"> </i>
        // <i class="far fa-thumbs-down emojis ${post.id}"></i>
        // <i class="far fa-laugh-squint emojis ${post.id}"></i>
        // `;

        const commentIcon = `<i class="far fa-comment"></i>`;
        const likeIcon = `<div><i class="far fa-thumbs-up emojis ${post.id}"></i><span>${post.likes}</span></div>`;
        const dislikeIcon = `<div><i class="far fa-thumbs-down emojis ${post.id}"></i><span>${post.dislikes}</span></div>`;
        const laughIcon = `<div><i class="far fa-laugh-squint emojis ${post.id}"></i><span>${post.laughs}</span></div>`;

        reactionDiv.className = `icons`;

        // likeIcon.textContent = post["likes"].toString();
        // dislikeIcon.textContent = post["dislikes"].toString();

        reactionDiv.innerHTML =
          commentIcon + likeIcon + dislikeIcon + laughIcon;

        div.appendChild(header);
        div.appendChild(contents);
        div.appendChild(date);
        div.appendChild(reactionDiv);
        // div.appendChild(comment);

        postElement.append(div);
      });
    });
}

//Form submission logic

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = event.target.name.value;
  const content = event.target.content.value;

  const post = {
    name,
    content,
  };

  //(Hides form)
  form.style.display = "none";
  //(shows spinner)
  spinner.style.display = "";

  const options = {
    method: "POST",
    body: JSON.stringify(post),
    headers: {
      "content-type": "application/json",
    },
  };

  fetch("http://localhost:3000/posts", options)
    .then((r) => r.text())
    .then((message) => {
      console.log(message);
      form.reset();
      form.style.display = "";
      spinner.style.display = "none";
      loadPosts();
    });
});

addCustomEventListener(".emojis", "click", emojiHandler);

//Generic function to handle event listeners of future elements

function addCustomEventListener(selector, event, handler) {
  let rootElement = document.querySelector(".posts");
  //since the root element is set to be body for our current dealings
  rootElement.addEventListener(
    event,
    function (evt) {
      let targetElement = evt.target;
      while (targetElement != null) {
        if (targetElement.matches(selector)) {
          handler(evt, targetElement);
          return;
        }
        targetElement = targetElement.parentElement;
      }
    },
    true
  );
}

function emojiHandler(evt, targetElement) {
  // console.log(targetElement);
  const targetClass = targetElement.className.baseVal;
  const classArray = targetClass.split(" ");
  const post = {
    emoji: classArray[1],
    id: classArray[4],
  };

  const options = {
    method: "POST",
    body: JSON.stringify(post),
    headers: {
      "content-type": "application/json",
    },
  };

  fetch("http://localhost:3000/emojis", options)
    .then((r) => r.text())
    .then((message) => {
      console.log(message);
      loadPosts();
    });
}

//emojiCounter logic

// const emojisCollection = document.querySelectorAll(".emojis");

// emojisCollection.forEach((element) => {
//   element.addEventListener("click", (event) => {
//     const classArray = event.target.className.split(" ");
//     const post = {
//       emoji: classArray[2],
//       id: classArray[3],
//     };

//     console.log(post);

//     const options = {
//       method: "POST",
//       body: JSON.stringify(post),
//       headers: {
//         "content-type": "application/json",
//       },
//     };

//     fetch("http://localhost:3000/emojis", options)
//       .then((r) => r.text())
//       .then((message) => {
//         console.log(message);
//         loadPosts();
//       });
//   });
// });

//EVENT BUBBLING SOLUTION TO EMOJI COUNTER

// let rootElement = document.querySelector(".posts");

// rootElement.addEventListener(
//   "click",
//   (event) => {
//     let targetElement = event.target
//     let selector = ".emojis";
//     while(targetElement != null){
//     if (targetElement.matches(selector)){

//logic for handling the click event of .emoji class
//       console.log(targetElement);
//       const targetClass = targetElement.className.baseVal;
//       const classArray = targetClass.split(" ");
//       const post = {
//         emoji: classArray[1],
//         id: classArray[4],
//       }

//       const options = {
//         method: "POST",
//         body: JSON.stringify(post),
//         headers: {
//           "content-type": "application/json",
//         },
//       };

//       fetch("http://localhost:3000/emojis", options)
//       .then((r) => r.text())
//       .then((message) => {
//       console.log(message);
//       loadPosts();
//       return;
//     }
//     targetElement = targetElement.parentElement;
//   }
//   }

//   },
//   true
// );

// emojis.addEventListener("click", (event) => {
//   const postId = event.target.parentNode.id.slice(7);
//   const post = {
//     emoji: event.target.className.slice(0, -7),
//     id: postId,
//   };

//   console.log(post);

//   const options = {
//     method: "POST",
//     body: JSON.stringify(post),
//     headers: {
//       "content-type": "application/json",
//     },
//   };

//   fetch("http://localhost:3000/emojis", options)
//     .then((r) => r.text())
//     .then((message) => {
//       console.log(message);
//       loadPosts();
//     });
// });
