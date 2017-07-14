define({ "api": [
  {
    "type": "post",
    "url": "/api/user/signin",
    "title": "Login user",
    "group": "Authentication",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of registered user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"username\": \"johadi\",\n  \"password\": \"123456\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token of authenticated user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "  HTTP/1.1 200 OK\n  {\n   \"status\": 200,\n   \"data\": {\n      \"token\": \"xyz.abc.123.hgf\"\n      \"message\": \"Sign in successful\"\n   }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server/routes/auth.js",
    "groupTitle": "Authentication",
    "name": "PostApiUserSignin"
  },
  {
    "type": "post",
    "url": "/api/group",
    "title": "Create a group",
    "group": "Group",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Token",
            "description": "<p>of authenticated user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{\"x-auth\": \"JWT xyz.abc.123.hgf\"}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Group title</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\"name\": \"Andela\"}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": 200,\n  \"data\": {\n    \"id\": 1,\n    \"name\": \"Andela\",\n    \"updated_at\": \"2016-02-10T15:46:51.778Z\",\n    \"created_at\": \"2016-02-10T15:46:51.778Z\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server/routes/group.js",
    "groupTitle": "Group",
    "name": "PostApiGroup"
  },
  {
    "type": "post",
    "url": "/api/group/:groupId/user",
    "title": "Add user to group",
    "group": "Group",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Token",
            "description": "<p>of authenticated user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{\"x-auth\": \"JWT xyz.abc.123.hgf\"}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "Id",
            "description": "<p>of group</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\"name\": \"Ortwel\"}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": 200,\n  \"data\": {\n     \"message\": \"User added successfully\",\n     \"name\": \"Ortwel\",\n     \"groupId\": \"1\",\n     \"addedById\": \"2\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server/routes/group.js",
    "groupTitle": "Group",
    "name": "PostApiGroupGroupidUser"
  },
  {
    "type": "get",
    "url": "/api/group/:groupId/message",
    "title": "Get group messages",
    "group": "Message",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Token",
            "description": "<p>of authenticated user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{\"x-auth\": \"JWT xyz.abc.123.hgf\"}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "Id",
            "description": "<p>of group</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Username",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 200,\n    \"data\": {\n      \"count\": 1,\n    \"rows\" : [{\n    \"id\": 1,\n    \"message\": \"Programming is in the mind\",\n    \"updated_at\": \"2016-02-10T15:46:51.778Z\",\n    \"created_at\": \"2016-02-10T15:46:51.778Z\",\n  }]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server/routes/group.js",
    "groupTitle": "Message",
    "name": "GetApiGroupGroupidMessage"
  },
  {
    "type": "get",
    "url": "/api/group/:groupId/message",
    "title": "Get group messages",
    "group": "Message",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Token",
            "description": "<p>of authenticated user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{\"x-auth\": \"JWT xyz.abc.123.hgf\"}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "Id",
            "description": "<p>of group</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Message",
            "description": "<p>to send to group</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 201 CREATED\n{\n  \"status\": 1,\n   \"message\": \"created successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server/routes/group.js",
    "groupTitle": "Message",
    "name": "GetApiGroupGroupidMessage"
  },
  {
    "type": "post",
    "url": "/api/user/signup",
    "title": "Register a new user",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fullname",
            "description": "<p>Name of user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mobile",
            "description": "<p>Mobile number of user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"fullname\": \"Jimoh Hadi\",\n  \"username\": \"Johadi\",\n  \"mobile\": \"0816304xxxx\",\n  \"email\": \"jimoh@program.com\",\n  \"password\": \"123456\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": 200,\n  \"data\": {\n   \"id\": 1,\n  \"fullname\": \"Jimoh Hadi\",\n  \"email\": \"john@program.com\",\n  \"username\": \"Johdi\",\n  \"mobile\": \"0816304xxxx\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server/routes/auth.js",
    "groupTitle": "User",
    "name": "PostApiUserSignup"
  }
] });
