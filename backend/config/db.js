const mongoose = require("mongoose"); // Import mongoose to interact with MongoDB

const conn = async () => {
  try {
    const dbConn = await mongoose.connect(
        process.env.DB_URI
    ); // Connect to MongoDB using the connection string with user and password

    console.log(`MongoDB connected: ${dbConn.connection.host}`); // Log the host of the connected MongoDB instance

    return dbConn;
  } catch (error) {
    console.log(error);
  } // Catch any errors that occur during the connection attempt
};

conn(); // Immediately invoke the connection function to establish the connection when this module is loaded

module.exports = conn; // Export the connection function to be used in other parts of the application
