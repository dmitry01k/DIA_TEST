# DIA

## Introduction

3. Install :

    - Run `npm install` to install all the local dependencies (node version 20.x or current LTS release recommended).

    - Run `npm run start` to trigger installation and compilation across all cartridges.

## Documentation

## Auth Controller

### User Registration
    - To register a new user:
    - Endpoint: POST api/auth/register
    - Request:{
            "email": "user@example.com"
            "password": "secure_password",
            "confirmPassword": "secure_password",
        }
    - Response: {
            "id": "2becb30a-b645-49da-a3a9-9f47f894bd81",
            "email": "user@example.com"
        }

### User Login
    - For user login and authentication, using tokens (e.g., JWT)
    - Endpoint: POST api/auth/login
    - Request: {
            "email": "user@example.com"
            "password": "secure_password",
        }
    - Response: {
            "accessToken": "Bearer <access_token>"
        }

### *User Logout
    - User logout. Deleting the stored refresh token.
    - Endpoint: GET api/auth/logout
    - Headers: Authorization: Bearer <access_token>
    - Response: { Status: 200 OK }

### User ChangePassword
    - Changes the password for the authenticated user.
    - Endpoint: POST api/auth/changePassword
    - Request: {
            "oldPassword": "secure_password",
            "password": "secure_password",
            "confirmPassword": "secure_password",
        }
    - Response: {
            "id": "2becb30a-b645-49da-a3a9-9f47f894bd81",
            "email": "user@example.com",
            "password": "secure_password"
        }

## User Controller

### Get User Information
    - Retrieves information about a user based on their ID or email.
    - Endpoint: GET api/user/:idOrEmail
    - Request: {}
    - Response: {
            "id": "2becb30a-b645-49da-a3a9-9f47f894bd81",
            "email": "user@example.com",
        }

### Delete User Account
    - Deletes a user account based on their ID.
    - Endpoint: DELETE api/user/:id
    - Path Parameters: ID
    - Headers: Authorization: Bearer <access_token>
    - Response: { Status: 200 OK }

### Get Current User
    - Retrieves information about the currently authenticated user.
    - Endpoint: GET api/user
    - Headers: Authorization: Bearer <access_token>
    - Response: {
            "id": "2becb30a-b645-49da-a3a9-9f47f894bd81",
            "email": "user@example.com",
        }

## Image Controller

### Upload Image
    - Uploads an image, resizes it.
    - Endpoint: POST api/image/upload
    - Headers: Content Type: multipart/form-data
    - Response {
            "message": "File uploaded",
            "downloadLink": "https://example.com/api/image/download/filename.jpg"
        }

### Upload Image
    - Uploads an image, resizes it.
    - Endpoint: GET api/image/download/:filename


## Contributors

For information, feed-back or questions, developers who worked on this project are :

* Dmytro Kravets - # - [d.kravets.dev@gmail.com](mailto:d.kravets.dev@gmail.com)


## Contributing

Contributions to this file are welcome from everyone in order to improve its quality.
