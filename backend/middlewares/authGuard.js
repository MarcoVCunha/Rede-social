const User = require("../models/User"); // Import the User model to interact with the user collection in MongoDB
const jwt = require("jsonwebtoken") // Import the User model to interact with the user collection in MongoDB
const jwtSecret = process.env.JWT_SECRET // Get the JWT secret from environment variables

const authGuard = async (req, res, next) => {

    const authHeader = req.headers["authorization"] // Get the Authorization header from the request headers
    const token = authHeader && authHeader.split(" ")[1]; // Extract the token from the Authorization header

    // Check if header has token
    if (!token) {
        return res.status(401).json({ errors: ["Acesso negado."] }); 
    } // If no token is provided, return a 401 Unauthorized response

    // Check if token is valid
    try {

        const verified = jwt.verify(token, jwtSecret); // Verify the token using the secret key

        req.user = await User.findById(verified.id).select("-password") // Verify the token using the secret and get the user ID from it

        next();
    } catch (error) {
        res.status(401).json({ errors: ["Token inválido."]});
    } // If the token is invalid, return a 401 Unauthorized response
}

module.exports = authGuard;
