const User = require('../models/User'); // Import the User model to interact with the user collection in MongoDB

const bcrypt = require('bcryptjs'); // Import bcryptjs for hashing passwords
const jwt = require('jsonwebtoken'); // Import jsonwebtoken for generating JWT tokens

const jwtSecret = process.env.JWT_SECRET; // Get the JWT secret from environment variables

// Generete user token
const generateToken = (id) => {
    return jwt.sign({id}, jwtSecret, {
        expiresIn: '7d' // Token will expire in 7 days
    }) // Generate a JWT token with the user ID and secret
}

// Register user and sign in
const register = async (req, res) => {
    const {name, email, password} = req.body

    // Check if user exists
    const user = await User.findOne({email})

    if(user) {
        res.status(422).json({errors: ['Por favor, utilize outro e-mail.']})
        return
    }

    // Generate password hash
    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)

    // Create user
    const newUser = await User.create({
        name,
        email,
        password: passwordHash
    })

    // If user creation is successfully, generate a token
    if (!newUser) {
        res.status(422).json({errors: ['Houve um erro, por favor tente mais tarde.']})
        return
    }

    res.status(201).json({
        _id: newUser._id,
        token: generateToken(newUser._id),
    })

} // Placeholder function for user registration, currently just sends a response

module.exports = {
    register,
} // Export the register function to be used in routes or other parts of the application