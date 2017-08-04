# PostIt [![Coverage Status](https://coveralls.io/repos/github/johadi10/PostIt/badge.svg?branch=master)](https://coveralls.io/github/johadi10/PostIt?branch=develop) [![Build Status](https://travis-ci.org/johadi10/PostIt.svg?branch=develop)](https://travis-ci.org/johadi10/PostIt) [![Code Climate](https://codeclimate.com/github/johadi10/PostIt/badges/gpa.svg)](https://codeclimate.com/github/johadi10/PostIt)


**Postit** is an Andela Application where friends and colleagues send notifications to one another via groups they belong to. It also includes API with well-structured documentation that can be reused by anyone. Everything about this application is detailed below:

## What Users can do with this project

* User can sign up for the system
* Users can login to access all operations available to them.
* Users can create groups and add other registered users to them.
* Users can read messages sent to groups they belong to
* Users can read messages they have created in a particular group.

## Technology Stack
* NodeJS
* Sequelize ORM
* Postgres relational database
* Bootstrap
* ReactJS
* Redux

## How to install this project

-   Install NodeJs and Postgres on your machine
-   Clone the repository `$ git clone https://github.com/johadi10/PostIt.git`
-   Change into the directory `$ cd /PostIt`
-   Install all required dependencies with `$ npm install`
-   Create a `.env` file in your root directory and follow the pattern in the .env sample file depicted below to create environmental variables
-   Migrate your database by running this command `sequelize db:migrate`
-   You can undo your migrations by running this command `sequelize db:migrate:undo`.
-   Run `npm start` to start the application

>   .env sample file
```DEV_DB_PASSWORD=yourpassword
     DEV_DB_NAME=yourdbname
     TEST_DB_PASSWORD=yourtestdbpassword
     TEST_DB_NAME=yourtestdbname
     DEV_HOST=localhost
     NODE_ENV=development
     JWT_SECRET=yoursecret 
```
   
## Testing
-   Run Test `npm test`

-   `Use separate DB's for testing and development`

##  Project Limitations
  * Users can only create account once with their username, email, full name, password and mobile number.
  * Users can login and obtain a token which is verified on every request
  * Users can sign out of the application whenever they want. However Users will not be automatically logged in whenever they closed the browser. They will have to login again.
  * On successful logged in, Users can add other registered users to group they belong.
  * On successful logged in, Users can create message in a group they belong to
  * On successful logged in, Users can create a group and add other users to it
  * Users cannot add themselves to a group they already belong
  * Users cannot access protected routes until they return a token given to them when they signed in
  * Invalid group Id in any route ,like `api/group/y/user` will be rejected
  * Invalid routes are rejected
  # Web Site
  * You can visit the website at [https://jimoh-postit.herokuapp.com/](https://jimoh-postit.herokuapp.com)
  # API Documentation
  * You can find the API Documentation at [https://jimoh-postit.herokuapp.com/apidoc/](https://jimoh-postit.herokuapp.com/apidoc/)
  * You can Access API at [https://jimoh-postit.herokuapp.com/api/](https://jimoh-postit.herokuapp.com/api)
  
  # Want to Contribute ?
  * Fork the repository
  * Make your contributions
  * Make sure you test your work
  * Create Pull request 
