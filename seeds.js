const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Quote = require("./models/Quote.js");
const User = require("./models/User.js"); // Import the User model
require('dotenv').config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
  })
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

// seeds
// Function to preprocess the JSON data
const preprocessData = (data) => {
  return data.map((item) => {
    if (item._id && item._id.$oid) {
      item._id = item._id.$oid;
    }
    if (item.createdAt && item.createdAt.$date) {
      item.createdAt = new Date(item.createdAt.$date);
    }
    if (item.updatedAt && item.updatedAt.$date) {
      item.updatedAt = new Date(item.updatedAt.$date);
    }
    return item;
  });
};

// Read and preprocess the products data from the JSON file
const productFilePath = path.join(__dirname, "qod.quotes.json");
const rawProductData = fs.readFileSync(productFilePath, "utf-8");
const productsData = preprocessData(JSON.parse(rawProductData));

// Read and preprocess the users data from the JSON file
const userFilePath = path.join(__dirname, "qod.users.json"); // Assuming users JSON is in this file
const rawUserData = fs.readFileSync(userFilePath, "utf-8");
const usersData = preprocessData(JSON.parse(rawUserData));

// Seed the database
const seedDatabase = async () => {
  try {
    // Seed products
    await Quote.deleteMany({}); // Remove existing documents
    await Quote.insertMany(productsData); // Insert new documents
    console.log("Product database seeding successful");

    // Seed users
    await User.deleteMany({}); // Remove existing documents
    await User.insertMany(usersData); // Insert new documents
    console.log("User database seeding successful");

    mongoose.connection.close();
  } catch (err) {
    console.error("Database seeding error:", err);
    mongoose.connection.close();
  }
};

seedDatabase();