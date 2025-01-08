# Expense Tracker API

A simple RESTful API for managing personal expenses. This project allows users to add, update, delete, and fetch expenses. It includes user authentication, filtering options, and data validation.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)
- [Contributors](#contributors)
- [License](#license)

## Introduction

The Expense Tracker API allows users to manage their personal expenses by providing endpoints to create, update, fetch, and delete expenses. It also includes filtering options to fetch expenses by custom date ranges and categories, ensuring a user-friendly and efficient way to track expenses.

## Features

- User authentication with JWT.
- CRUD operations for expenses (Create, Read, Update, Delete).
- Filter expenses by time period (last week, last month, etc.).
- Validation for expense details, such as date format and required fields.
- Rate limiting to prevent abuse of the API.

## Technologies Used

- **Node.js**
- **Express.js**
- **MongoDB** for the database
- **Mongoose** for data modeling
- **JWT** for user authentication
- **bcrypt** for password hashing
- **dotenv** for environment variable management

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/expense-tracker-api.git
    ```

2. Navigate to the project directory:

    ```bash
    cd expense-tracker-api
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Set up the environment variables by creating a `.env` file in the root directory and adding the following:

    ```env
    PORT=7000
    MONGODB_URL=your-mongodb-url
    SECRET_KEY=your-secret-key
    ```

## Configuration

- **MongoDB**: Use a local or cloud-based MongoDB instance. Set the MongoDB connection URL in the `MONGODB_URL` field in the `.env` file.
- **JWT Secret Key**: Set the `SECRET_KEY` for signing JWT tokens in the `.env` file.
- **Port**: Specify the port in the `.env` file or the server defaults to port 7000.

## Usage

1. Start the server:

    ```bash
    npm start
    ```

2. The API will run at `http://localhost:7000` (or the configured port).

## API Endpoints

### User Authentication

- **POST /users/signup**: Sign up a new user.
  - **Request Body**:
    ```json
    {
      "name": "John Doe",
      "email": "john@example.com",
      "password": "yourpassword"
    }
    ```
  - **Response**:
    ```json
    {
      "user": { ... },
      "token": "jwt-token"
    }
    ```

- **POST /users/signin**: Log in an existing user.
  - **Request Body**:
    ```json
    {
      "email": "john@example.com",
      "password": "yourpassword"
    }
    ```
  - **Response**:
    ```json
    {
      "user": { ... },
      "token": "jwt-token"
    }
    ```

### Expense Management

- **POST /expenses/addExpense**: Add a new expense (requires authentication).
  - **Request Body**:
    ```json
    {
      "title": "Grocery shopping",
      "amount": 50,
      "category": "Groceries",
      "date": "2023-01-01",
      "description": "Bought fruits and vegetables"
    }
    ```

- **PUT /expenses/updateExpense/:id**: Update an existing expense by ID (requires authentication).
  - **Request Body**:
    ```json
    {
      "title": "Updated title",
      "amount": 75,
      "category": "Groceries",
      "date": "2023-01-02",
      "description": "Updated description"
    }
    ```

- **GET /expenses/getAllExpenses**: Fetch all expenses for the authenticated user.

- **GET /expenses/getExpense/:id**: Get a single expense by its ID.

- **DELETE /expenses/deleteExpense/:id**: Delete an expense by its ID.

### Filtering Expenses

- **GET /expenses/getFilteredExpenses?filter=type&start_date=&end_date=**: Fetch expenses by filter options.
  - **Filter Options**:
    - `past-week`: Fetch expenses from the last 7 days.
    - `last-month`: Fetch expenses from the last month.
    - `last-3-months`: Fetch expenses from the last 3 months.
    - `custom`: Fetch expenses between `start_date` and `end_date` (both in `YYYY-MM-DD` format).

## Examples

- **Add a new expense**:

    ```bash
    curl -X POST http://localhost:7000/expenses/addExpense \
    -H "Authorization: Bearer your-jwt-token" \
    -d '{
      "title": "Grocery shopping",
      "amount": 50,
      "category": "Groceries",
      "date": "2023-01-01",
      "description": "Bought fruits and vegetables"
    }'
    ```

- **Fetch all expenses**:

    ```bash
    curl -X GET http://localhost:7000/expenses/getAllExpenses \
    -H "Authorization: Bearer your-jwt-token"
    ```

- **Filter expenses from the last month**:

    ```bash
    curl -X GET "http://localhost:7000/expenses/getFilteredExpenses?filter=last-month" \
    -H "Authorization: Bearer your-jwt-token"
    ```

## Troubleshooting

### Common Issues and Solutions

1. **MongoDB not connected**:
   - Ensure the MongoDB URL in the `.env` file is correct.
   - Verify MongoDB is running on your system.

2. **JWT token missing or invalid**:
   - Ensure the correct JWT token is included in the `Authorization` header for protected routes.
   - Tokens should be in the format `Bearer <token>`.

3. **Error during user authentication**:
   - Verify that the `SECRET_KEY` in the `.env` file is correctly set.

4. **Expense not found**:
   - Ensure the expense ID exists and belongs to the authenticated user when updating or deleting.

## Contributors

- [Rahul Rasal](https://github.com/Rahul-Rasal)

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

---

Happy coding! 🎉
