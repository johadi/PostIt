# PostIt
[![Build Status](https://travis-ci.org/johadi10/PostIt.svg?branch=develop)](https://travis-ci.org/johadi10/PostIt)

This an Andela Bootcamp project which allows firends and colleagues send notification to one another via a group they belong to.
# What Users can do with this project
1. User can sign up for the system
2. User can register to be a member of the system
3. Users can login to access all operations available to them.
4. Users can create groups and add other registered users to them.
5. Users can read messages sent to groups they belong to
6. Users can logout of the system whenever they want to.
7. Users can receieve notification via SMS, EMAIL or both depending on the message level.

# How to install this project

1. create .env file
2. inside the .env file,copy the code snippet below, fill it details with your values. don't change the keys 

```DEV_DB_PASSWORD=yourpassword
DEV_DB_NAME=yourdbname
DEV_HOST=localhost
NODE_ENV=development
JWT_SECRET=yoursecret
```
4. run `npm install`
5. run `npm start`
