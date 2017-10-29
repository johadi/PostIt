# PostIt [![Coverage Status](https://coveralls.io/repos/github/johadi10/PostIt/badge.svg?branch=develop)](https://coveralls.io/github/johadi10/PostIt?branch=develop) [![Build Status](https://travis-ci.org/johadi10/PostIt.svg?branch=develop)](https://travis-ci.org/johadi10/PostIt) [![Code Climate](https://codeclimate.com/github/johadi10/PostIt/badges/gpa.svg)](https://codeclimate.com/github/johadi10/PostIt)

**Postit** is an Andela Application where registered users send notifications to one another via groups they belong to. It involves In-App, Email and SMS notification methods. It also includes API with well-structured documentation that can be reused by anyone. Everything about this application is detailed below:
  
## Application Features

* Sign up for the system
* Login with your credentials
* Create group
* Search and add other registered users to groups you joined
* Send notification to groups you joined
* Read notifications sent by other users from your notification board
* Receive Email notifications if urgent messages are sent to groups you joined
* Receive SMS and Email notifications if critical messages are sent to groups you joined
* Read all notifications available in the groups you joined
* View list of all groups you joined
* View list of members in a particular group you joined
* Logout of the application any time you wish
* Reset password if forgotten

## Technology Stacks

- [Node js](https://nodejs.org/en/) is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Bootstrap](https://getbootstrap.com/) makes styling responsive web pages faster and easier.
- [Express js](http://expressjs.com/) handles backend routing.
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
-   Run Test with `npm test`

## Limitations of the project
  * User's logged in session expires when the browser is closed.
  * Users cannot create account with same username or email if already used.
  * Users cannot add themselves to other groups they don't belong. They can only be added by other registered users that are already member of the group.
  
## API Documentation Links
- Access the API Documentation at [https://jimoh-postit.herokuapp.com/api-docs/](https://jimoh-postit.herokuapp.com/apidoc/)

## Want to Contribute ?
  * Fork the repository
  * Make your contributions
  * Make sure your work is well tested
  * Create Pull request.

## FAQ

* What language is used to build this application ?
  - The application (both front-end and back-end) is entirely built with javascript
* Is this an open-source project ?
  - Yes, Is an open-source project. You can contribute by following the contribution guide outlined above
* Who can contribute ?
  - Anyone can contribute as long as you would follow the contribution guides outlined above
* Is the application hosted online ?
  - Yes, the application is hosted on heroku platform. You can always visit it via this link [https://jimoh-postit.herokuapp.com](https://jimoh-postit.herokuapp.com)
* Does the application have an API ?
  - Yes, The application has a well documented API that can be viewed via a link in the API documentation section above
* Is the appliation licensed ? 
  - Yes, the application and its contents is under MIT license which  you can viewed in the license section below
  
## License
[MIT](https://github.com/johadi10/PostIt/blob/develop/LICENSE)
