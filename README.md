# Anonymous Journal

An anonymous blogging site built in JavaScript, HTML, and CSS

![](AnonJournalUX.gif)

## Installation & Usage

### Installation

- Clone or download the repo

### Usage

- Open your terminal/CLI and navigate to the `Anonymous-Journal` folder
- Run `npm install` to install dependencies
- Run `npm start` to launch server.
- Enjoy posting anonymised entries!

## Technologies

- App: JavaScript, CSS (including the Skeleton CSS Framework) and HTML
- Testing: Mocha, Chai and Puppeteer

## Process

- Started with how we envisioned the user interface to look like
- Researched popular social media sites to see what works in terms of UI and UX
- Mapped out initial ideas on Figma
- Started first by using test-driven development (TDD) to builiding the API and the backend. We made sure to adopt the mindeset of seperating concerns.
- We then started building out functionality for our MVP by prioritising the most important features first such as being able to post and fetching all the posts upon loading the page.
- After using this iterative approach to build out the app, we then turned our attention to styling and further testing(incl. UI testing with Puppeteer).


## Wins & Challenges

### Wins
- Successful incorporation of the Giphy API meanng users can post GIFs along with their messages
- Users can see all the posts on loading the page as well as when they were posted.
- The most recent posts are shown first, which is what a user would desire when wanting to view posts.
- MAde emoji and comment icons affordable so users get feedback that they are able to click on them
- Users are able to add comments (anonymously) to other posts - due to nifty DOM manipulation and application of event bubbling/propogation principles
- Similarly users are able to react with three emojis as well as see a count of how many reactions (by emoji) and comments a post has recieved
- Validation on both the front-end and back-end.
- Front-end: Character limit of 200 which alerts the user and disables the form. The user is also shown a warning message if the post does not contain a title or content.
- Back-end : Requests are only processed by the API if there is a title and content. Inputs are also transformed into strings to prevent injections.

### Challenges

- Responsive design 
- Unit testing complicated functions

## Bugs

- The App is not completely responsive
- Users can react to a post as many times as they like and with as many emojis as they like - this could be solved with authentication but still allowing users to keep their anonymity.

## Future Features

- Search Feature
- A scalable database layer - we used a JSON file as storage
- Authentication
- Pagination of posts 

## Licence

- ISC


