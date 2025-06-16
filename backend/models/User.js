const mongoose = require('mongoose') // Import mongoose to interact with MongoDB and define schemas and models
const { Schema } = mongoose // Destructure Schema from mongoose for easier access

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    profileImage: String,
    bio: String
},{
    timestamps: true // adiciona createdAt e updatedAt automaticamente
})

const User = mongoose.model("user", userSchema) // cria o modelo User a partir do schema userSchema

module.exports = User; // exporta o modelo User para ser utilizado em outras partes da aplicação