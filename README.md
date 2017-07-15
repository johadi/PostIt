# PostIt [![Coverage Status](https://coveralls.io/repos/github/johadi10/PostIt/badge.svg?branch=master)](https://coveralls.io/github/johadi10/PostIt?branch=master) [![Build Status](https://travis-ci.org/johadi10/PostIt.svg?branch=master)](https://travis-ci.org/johadi10/PostIt) [![Code Climate](https://codeclimate.com/github/johadi10/PostIt/badges/gpa.svg)](https://codeclimate.com/github/johadi10/PostIt)


**Postit** is an Andela Bootcamp project where friends and colleagues send notifications to one another via groups they belong to.

## What Users can do with this project

* User can sign up for the system
* Users can login to access all operations available to them.
* Users can create groups and add other registered users to them.
* Users can read messages sent to groups they belong to
* Users can logout of the system whenever they want to.
* Users can read messages they have created in a particular group.

## Technology Stack
* Nodejs
* Sequelize ORM
* Postgres
* Bootstrap

## How to install this project

-   Install NodeJs and Postgres on your machine
-   Clone the repository `$ git clone https://github.com/johadi10/PostIt.git`
-   Change into the directory `$ cd /PostIt`
-   Install all required dependencies with `$ npm install`
-   Create a `.env` file in your root directory and follow the pattern in the .env.sample file below to create environmental variables
-   Migrate your database by running this command `sequelize db:migrate`
-   You can undo your migrations by running this command `sequelize db:migrate:undo`.
-   Run `npm start` to start the application

>   .env file sample
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
  * Users can login and obtain a token which is verified on every request, but users cannot logout (nullify the token), however tokens
  become invalid when it expires.
  * On successful logged in, Users can add other registered users to group.
  * On successful logged in, Users can create message in a group they belong to
  * On successful logged in, Users can create a group and add other users to it
  * Users cannot add themselves to a group they already belong
  * Users cannot access protected routes until they return a token given to them when they signed in
  * Invalid group Id in any route ,like `api/group/y/user` will be rejected
  * Invalid routes are rejected
  
  # API Documentation
  * You can find the API Documentation at [https://jimoh-postit.herokuapp.com/apidoc/](https://jimoh-postit.herokuapp.com/apidoc/)
  * Access API at [https://jimoh-postit.herokuapp.com/apidoc/](https://jimoh-postit.herokuapp.com)
  
  # Want to Contribute ?
  * Fork the repository
  * Make your contributions
  * Make sure you test your work
  * Create Pull request 
