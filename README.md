# PostIt [![Coverage Status](https://coveralls.io/repos/github/johadi10/PostIt/badge.svg?branch=develop)](https://coveralls.io/github/johadi10/PostIt?branch=develop) [![Build Status](https://travis-ci.org/johadi10/PostIt.svg?branch=develop)](https://travis-ci.org/johadi10/PostIt) [![Code Climate](https://codeclimate.com/github/johadi10/PostIt/badges/gpa.svg)](https://codeclimate.com/github/johadi10/PostIt)

**Postit** is an Andela Application where registered users send notifications to one another via groups they belong to. It involves In-App, Email and SMS notification methods. It also includes API with well-structured documentation that can be reused by anyone. Everything about this application is detailed below:
  
## Application Features
#### User Authentication
Users are authenticated and validated using JWT tokens.

#### What Users can do with the Application
* Sign up for the system
* Login with your credentials
* Create group
* Search and add other registered users to groups he joined
* Send notification to groups he joined
* Read notifications sent by other users from his notification board
* Receive Email notifications if urgent messages are sent to groups he joined
* Receive SMS and Email notifications if critical messages are sent to groups he joined
* Read all notifications available in the groups he joined
* View list of all groups he joined
* View list of members in a particular group he joined
* Logout of the application
* Reset password if forgotten

## Technologies and Services

#### Written in Javascript es6 syntax and nodejs on the backend, with the following:

- [Node js](https://nodejs.org/en/) is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Bootstrap](https://getbootstrap.com/) makes styling responsive web pages faster and easier.
- [Mocha](https://mochajs.org/)is a feature-rich JavaScript test framework running on Node.js and in the browser used for asynchronous testing.
- [Chai](https://chaijs.com/) is a BDD / TDD assertion library for node and the browser that can be paired with any javascript testing framework.
- [Eslint](http://eslint.org/) provides a pluggable linting utility for JavaScript.
- [Hound CI](https://houndci.com/) comments on style violations in GitHub pull requests.
- [Travis CI](https://travis-ci.org/) a hosted continuous integration and delivery service for GitHub projects.
- [Express js](http://expressjs.com/) handles backend routing.
- [Nodemon](https://nodemon.io/)monitors any changes in source codes and restarts the server.
- [Coveralls](https://coveralls.io/) shows the parts of your code that are not covered by your test suites.
- [Sequelize](http://docs.sequelizejs.com/) Sequelize is a promise-based ORM for Node.js and io.js. It supports the dialects PostgreSQL, MySQL, MariaDB, SQLite and MSSQL and features solid transaction support, relations and many more.
- [PostgreSQL](https://www.postgresql.org/) A powerful, open source object-relational database system.
- [React](https://facebook.github.io/react/) A Javascript library for building user interfaces.
- [Redux](http://redux.js.org/) A predictable state container for JavaScript apps.

## Installation

-   Install [Node js](https://nodejs.org/en/) and [Postgres](https://www.postgresql.org/) on your machine
-   Clone the repository `git clone https://github.com/johadi10/postit.git`
-   Change into the directory `cd /postit`
-   Install all required dependencies with `npm install`
-   For easier accessibility, Install sequelize-cli globally for database migrations `npm install -g sequelize-cli`
-   Create a `.env` file in your root directory and follow the pattern in the .env.sample file to create environmental variables
-   Migrate your database by running this command `sequelize db:migrate`
-   You can undo your migrations by running this command `sequelize db:migrate:undo:all`.
-   Run `npm start` to start the application

## Testing
-   Use separate DB's for testing and development as shown in the .env.sample file
-   Run Test `npm test`

## Limitations of the project
  * User's logged in session expires when the browser is closed.
  * Users cannot create account with same username or email if already used.
  * Users cannot add themselves to other groups they don't belong. They can only be added by other registered users that are already member of the group.
  
## API Documentation Links
- Access the API Documentation at [https://jimoh-postit.herokuapp.com/apidoc/](https://jimoh-postit.herokuapp.com/apidoc/)
- Access API at [https://jimoh-postit.herokuapp.com/api/](https://jimoh-postit.herokuapp.com/api)

## Want to Contribute ?
  * Fork the repository
  * Make your contributions
  * Make sure you test your work
  * Create Pull request.
 
## Troubleshooting and FAQ

[https://github.com/johadi10/postit/issues](https://github.com/johadi10/postit/issues)
