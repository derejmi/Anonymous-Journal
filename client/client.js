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
        //headers to show usernames
        const header = document.createElement("h3");
        header.textContent = post.name;

        //post content
        const contents = document.createElement("p");
        contents.textContent = post.content;

        //date
        const date = document.createElement("small");
        date.textContent = new Date(post.date);

        //comment button
        // const comment = document.createElement("button");
        // comment.className = "comment";
        // comment.value = "Comment";

        const reactionDiv = document.createElement("div");

        const icons = `<i class="far fa-comment"></i>
        <i class="far fa-thumbs-up"></i>
        <i class="far fa-thumbs-down"></i>
        <i class="far fa-laugh-squint"></i>
        `;

        reactionDiv.className = "icons";

        reactionDiv.innerHTML = icons;

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
