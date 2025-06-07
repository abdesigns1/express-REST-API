const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory data store
let items = [
  { id: 1, name: "Laptop", description: "High-performance laptop for work" },
  {
    id: 2,
    name: "Phone",
    description: "Latest smartphone with advanced features",
  },
  {
    id: 3,
    name: "Headphones",
    description: "Noise-cancelling wireless headphones",
  },
];

let nextId = 4;

// Helper function to validate item data
const validateItem = (item) => {
  const errors = [];

  if (
    !item.name ||
    typeof item.name !== "string" ||
    item.name.trim().length === 0
  ) {
    errors.push("Name is required and must be a non-empty string");
  }

  if (
    !item.description ||
    typeof item.description !== "string" ||
    item.description.trim().length === 0
  ) {
    errors.push("Description is required and must be a non-empty string");
  }

  return errors;
};

// Helper function to find item by ID
const findItemById = (id) => {
  const itemId = parseInt(id);
  if (isNaN(itemId)) {
    return null;
  }
  return items.find((item) => item.id === itemId);
};

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Hello, World!",
    version: "1.0.0",
    endpoints: {
      "GET /": "Welcome message",
      "GET /items": "Get all items",
      "GET /items/:id": "Get item by ID",
      "POST /items": "Create new item",
      "PUT /items/:id": "Update item by ID",
      "DELETE /items/:id": "Delete item by ID",
    },
  });
});

// GET /items - Retrieve all items
app.get("/items", (req, res) => {
  res.json({
    success: true,
    count: items.length,
    data: items,
  });
});

// GET /items/:id - Retrieve a single item by ID
app.get("/items/:id", (req, res) => {
  const item = findItemById(req.params.id);

  if (!item) {
    return res.status(404).json({
      success: false,
      error: "Item not found",
    });
  }

  res.json({
    success: true,
    data: item,
  });
});

// POST /items - Create a new item
app.post("/items", (req, res) => {
  const { name, description } = req.body;

  // Validate input
  const validationErrors = validateItem({ name, description });
  if (validationErrors.length > 0) {
    return res.status(400).json({
      success: false,
      error: "Validation failed",
      details: validationErrors,
    });
  }

  // Create new item
  const newItem = {
    id: nextId++,
    name: name.trim(),
    description: description.trim(),
  };

  items.push(newItem);

  res.status(201).json({
    success: true,
    message: "Item created successfully",
    data: newItem,
  });
});

// PUT /items/:id - Update an item by ID
app.put("/items/:id", (req, res) => {
  const item = findItemById(req.params.id);

  if (!item) {
    return res.status(404).json({
      success: false,
      error: "Item not found",
    });
  }

  const { name, description } = req.body;

  // Validate input
  const validationErrors = validateItem({ name, description });
  if (validationErrors.length > 0) {
    return res.status(400).json({
      success: false,
      error: "Validation failed",
      details: validationErrors,
    });
  }

  // Update item
  item.name = name.trim();
  item.description = description.trim();

  res.json({
    success: true,
    message: "Item updated successfully",
    data: item,
  });
});

// DELETE /items/:id - Delete an item by ID
app.delete("/items/:id", (req, res) => {
  const itemIndex = items.findIndex(
    (item) => item.id === parseInt(req.params.id)
  );

  if (itemIndex === -1) {
    return res.status(404).json({
      success: false,
      error: "Item not found",
    });
  }

  const deletedItem = items.splice(itemIndex, 1)[0];

  res.json({
    success: true,
    message: "Item deleted successfully",
    data: deletedItem,
  });
});

// Error handling middleware for invalid routes
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    error: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: "Internal server error",
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Something went wrong!",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📖 API documentation available at http://localhost:${PORT}`);
});

module.exports = app;
