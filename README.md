# Express.js REST API

A simple REST API built with Express.js for managing items. This API provides full CRUD (Create, Read, Update, Delete) operations with proper error handling and validation.

## Features

- ✅ Full CRUD operations for items
- ✅ In-memory data storage
- ✅ Input validation
- ✅ Comprehensive error handling
- ✅ RESTful API design
- ✅ JSON response format
- ✅ Proper HTTP status codes

## Prerequisites

- Node.js (version 14.0.0 or higher)
- npm (Node Package Manager)

## Installation

1. Clone or download the project files
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

## Running the Application

### Development Mode (with auto-restart)

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The server will start on port 3000 by default. You can change the port by setting the `PORT` environment variable:

```bash
PORT=8000 npm start
```

## API Documentation

### Base URL

```
http://localhost:3000
```

### Endpoints

#### 1. Welcome Message

- **GET** `/`
- **Description**: Returns a welcome message with API information
- **Response**: 200 OK

```json
{
  "message": "Hello, World!",
  "version": "1.0.0",
  "endpoints": {
    "GET /": "Welcome message",
    "GET /items": "Get all items",
    "GET /items/:id": "Get item by ID",
    "POST /items": "Create new item",
    "PUT /items/:id": "Update item by ID",
    "DELETE /items/:id": "Delete item by ID"
  }
}
```

#### 2. Get All Items

- **GET** `/items`
- **Description**: Retrieve all items
- **Response**: 200 OK

```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": 1,
      "name": "Laptop",
      "description": "High-performance laptop for work"
    },
    {
      "id": 2,
      "name": "Phone",
      "description": "Latest smartphone with advanced features"
    }
  ]
}
```

#### 3. Get Single Item

- **GET** `/items/:id`
- **Description**: Retrieve a specific item by ID
- **Parameters**:
  - `id` (path parameter): Item ID
- **Response**: 200 OK | 404 Not Found

**Success Response:**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Laptop",
    "description": "High-performance laptop for work"
  }
}
```

**Error Response:**

```json
{
  "success": false,
  "error": "Item not found"
}
```

#### 4. Create New Item

- **POST** `/items`
- **Description**: Create a new item
- **Request Body**:

```json
{
  "name": "New Item",
  "description": "Description of the new item"
}
```

- **Response**: 201 Created | 400 Bad Request

**Success Response:**

```json
{
  "success": true,
  "message": "Item created successfully",
  "data": {
    "id": 4,
    "name": "New Item",
    "description": "Description of the new item"
  }
}
```

**Validation Error Response:**

```json
{
  "success": false,
  "error": "Validation failed",
  "details": ["Name is required and must be a non-empty string"]
}
```

#### 5. Update Item

- **PUT** `/items/:id`
- **Description**: Update an existing item
- **Parameters**:
  - `id` (path parameter): Item ID
- **Request Body**:

```json
{
  "name": "Updated Item Name",
  "description": "Updated description"
}
```

- **Response**: 200 OK | 400 Bad Request | 404 Not Found

**Success Response:**

```json
{
  "success": true,
  "message": "Item updated successfully",
  "data": {
    "id": 1,
    "name": "Updated Item Name",
    "description": "Updated description"
  }
}
```

#### 6. Delete Item

- **DELETE** `/items/:id`
- **Description**: Delete an item by ID
- **Parameters**:
  - `id` (path parameter): Item ID
- **Response**: 200 OK | 404 Not Found

**Success Response:**

```json
{
  "success": true,
  "message": "Item deleted successfully",
  "data": {
    "id": 1,
    "name": "Deleted Item",
    "description": "Description of deleted item"
  }
}
```

## Example API Requests

### Using cURL

#### Get all items

```bash
curl -X GET http://localhost:3000/items
```

#### Get single item

```bash
curl -X GET http://localhost:3000/items/1
```

#### Create new item

```bash
curl -X POST http://localhost:3000/items \
  -H "Content-Type: application/json" \
  -d '{"name": "Tablet", "description": "10-inch tablet for reading"}'
```

#### Update item

```bash
curl -X PUT http://localhost:3000/items/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Gaming Laptop", "description": "High-end gaming laptop"}'
```

#### Delete item

```bash
curl -X DELETE http://localhost:3000/items/1
```

### Using Postman

1. **Import Collection**: Create a new collection in Postman
2. **Set Base URL**: Use `http://localhost:3000` as the base URL
3. **Add Requests**: Create requests for each endpoint using the examples above

#### Postman Request Examples:

**GET All Items**

- Method: GET
- URL: `{{baseUrl}}/items`

**POST Create Item**

- Method: POST
- URL: `{{baseUrl}}/items`
- Headers: `Content-Type: application/json`
- Body (raw JSON):

```json
{
  "name": "Wireless Mouse",
  "description": "Ergonomic wireless mouse with RGB lighting"
}
```

**PUT Update Item**

- Method: PUT
- URL: `{{baseUrl}}/items/1`
- Headers: `Content-Type: application/json`
- Body (raw JSON):

```json
{
  "name": "Updated Item Name",
  "description": "Updated item description"
}
```

## Error Handling

The API includes comprehensive error handling:

- **400 Bad Request**: Invalid input data or validation errors
- **404 Not Found**: Resource not found or invalid routes
- **500 Internal Server Error**: Server-side errors

All error responses follow this format:

```json
{
  "success": false,
  "error": "Error message",
  "details": ["Additional error details if applicable"]
}
```

## Validation Rules

- **name**: Required, must be a non-empty string
- **description**: Required, must be a non-empty string
- **id**: Must be a valid integer (for path parameters)

## Data Structure

Each item in the system has the following structure:

```json
{
  "id": "number (auto-generated)",
  "name": "string (required)",
  "description": "string (required)"
}
```

## Project Structure

```
├── app.js          # Main application file
├── package.json    # Project dependencies and scripts
└── README.md       # This file
```

## Development Notes

- Data is stored in memory and will be reset when the server restarts
- The API uses auto-incrementing IDs starting from 1
- Input validation is performed on all POST and PUT requests
- All responses are in JSON format
- The API follows RESTful conventions

## Future Enhancements

- Add database integration (MongoDB, PostgreSQL, etc.)
- Implement authentication and authorization
- Add pagination for large datasets
- Include more advanced validation
- Add comprehensive test suite
- Implement logging
- Add API versioning
