//Set up
const form = document.querySelector(".post-form");
const spinner = document.querySelector(".spinner");
const postElement = document.querySelector(".posts");

//On-loading hide spinner
spinner.style.display = "none";

loadPosts();
//On load - load all the posts

function loadPosts() {
  fetch("http://localhost:3000/cheeses")
    .then((r) => r.json())
    .then((posts) => {
      posts.reverse();
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
        date.textContent = new Date(post.created);

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

  fetch("http://localhost:3000/cheeses", options)
    .then((r) => r.text())
    .then((message) => {
      console.log(message);
    });
});
