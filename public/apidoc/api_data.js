define({ "api": [
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
            "field": "name",
            "description": "<p>User name</p>"
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
          "content": "{\n  \"name\": \"John Connor\",\n  \"email\": \"john@connor.net\",\n  \"password\": \"123456\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": 1,\n  \"name\": \"John Connor\",\n  \"email\": \"john@connor.net\",\n  \"password\": \"$2a$10$SK1B1\",\n  \"updated_at\": \"2016-02-10T15:20:11.700Z\",\n  \"created_at\": \"2016-02-10T15:29:11.700Z\"\n}",
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
