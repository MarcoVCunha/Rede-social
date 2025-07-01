const User = require("../models/User"); // Import the User model to interact with the user collection in MongoDB

const bcrypt = require("bcryptjs"); // Import bcryptjs for hashing passwords
const jwt = require("jsonwebtoken"); // Import jsonwebtoken for generating JWT tokens

const mongoose = require("mongoose")

const jwtSecret = process.env.JWT_SECRET; // Get the JWT secret from environment variables

// Generete user token
const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: "7d", // Token will expire in 7 days
  }); // Generate a JWT token with the user ID and secret
};

// Register user and sign in
const register = async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });

  if (user) {
    res.status(422).json({ errors: ["Por favor, utilize outro e-mail."] });
    return;
  }

  // Generate password hash
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  // Create user
  const newUser = await User.create({
    name,
    email,
    password: passwordHash,
  });

  // If user creation is successfully, generate a token
  if (!newUser) {
    res
      .status(422)
      .json({ errors: ["Houve um erro, por favor tente mais tarde."] });
    return;
  }

  res.status(201).json({
    _id: newUser._id,
    token: generateToken(newUser._id),
  });
}; // Placeholder function for user registration, currently just sends a response

// Sign user in
const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // Check if user exists
  if (!user) {
    res.status(404).json({ errors: ["Usuário não encontrado."] });
    return;
  }

  // Check if password matches'
  if (!(await bcrypt.compare(password, user.password))) {
    res.status(422).json({ errors: ["Senha inválida."] });
    return;
  }

  // Return user data and token
  res.status(201).json({
    _id: user._id,
    profileImage: user.profileImage,
    token: generateToken(user._id),
  });
};

// Get current logged in user
const getCurrentUser = async (req, res) => {
  const user = req.user;

  res.status(200).json(user);
}; // Get the current user from the request object, which is populated by authentication middleware

// update an user
const update = async (req, res) => {
  
  const { name, password, bio } = req.body

  let profileImage = null

  if(req.file){
    profileImage = req.file.filename
  }

  const user = await User.findById(req.user._id).select("-password");

  if(name){
    user.name = name
  }

  if(password){
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    user.password = passwordHash
  }

  if(profileImage) {
    user.profileImage = profileImage
  }

  if(bio) {
    user.bio = bio
  }

  await user.save()

  res.status(200).json(user)
};

// Get user by id
const getUserById = async(req, res) => {

  const {id} = req.params

  try {
    
    const user = await User.findById(id).select("-password");

    //check if user exists
    if(!user) {
      res.status(404).json({errors: ["Usuário não encontrado 2."]})
      return;
    }

    res.status(200).json(user);

    } catch (error) {
      res.status(404).json({errors: ["Usuário não encontrado."]})
      return;
    }

}

module.exports = {
  register,
  login,
  getCurrentUser,
  update,
  getUserById,
}; // Export the register function to be used in routes or other parts of the application
