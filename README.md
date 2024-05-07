# Restaurant Backend System

This project was created as a part of my learning journey with Node.js. It is a backend system for a restaurant, implemented using Node.js, Express.js, and MongoDB.

### Clone the Project

```bash
  https://github.com/jhantu626/Hotel-Node.js.git
```
2. #### Install Node dependencies
   ```
    npm install -D
   ```
3. #### Instruction to Setup .env File
  ```
    1.First Add your own mongodb uri, in my case i had used both local and atlas.
    2.Define Port Number
    3.and give JWT secret key
  ```
4. #### Follow the names for .env Variables
  ```
    1.PORT= Give your own port number
    2.MONGO_URI= give your own
    3.JWT_SECRET=your secret
  ```

## Database Schemas

The project utilizes two MongoDB schemas:

1. **MenuItem**: Represents the items available in the restaurant.
2. **Person**: Represents the users of the system.

All possible operations have been implemented for these two schemas, and REST APIs have been created for the same.

## Authentication

Authentication has been implemented to ensure that unauthorized users cannot perform operations on `MenuItem` and `Person` details. There are only two endpoints where authentication is not applied: `login` and `signup`.

## Password Security

Passwords are secured using the bcrypt password encoder.

## JWT Authentication

All authentication is handled using JWT (JSON Web Tokens).

## Additional Authentication

An additional authentication file has been provided where `passport` and `passport-local` have been implemented for authentication using email and password.
