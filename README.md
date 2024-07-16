# NestJS MongoDB CRUD API

A simple CRUD API built with NestJS, MongoDB, and Mongoose, demonstrating basic Create, Read, Update, and Delete operations.

## Features

- Create a new user with name, email, and age.
- Retrieve all users or a specific user by ID.
- Update existing user details.
- Delete a user by ID.

## Prerequisites

Before running the project, ensure you have the following installed:

- Node.js (v14 or above)
- npm or yarn
- MongoDB (running locally or accessible via URL)

## Installation

Clone the repository and install dependencies:

````bash
git clone https://github.com/ashutoshdeshmukh22/user-management-crud-mongodb.git
cd user-management-crud-mongodb

## Installation

```bash
$ npm install
````

## Configuration

Create a `.env` file in the root directory and add following variables -

```
# App
APP_PORT=
# Database
DB_URL=
DB_NAME=

```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## API Documentation

API documentation is generated using Swagger. Access the Swagger UI at http://localhost:3000/api.

Swagger API Specification can be found [Here](http://localhost:3000/api).
