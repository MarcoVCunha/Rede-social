const mongoose = require('mongoose'); // Import mongoose to interact with MongoDB and define schemas and models
const { Schema } = mongoose; // Destructure Schema from mongoose for easier access

const photoSchema = new Schema({
    image: String,
    title: String,
    likes: Array,
    comments: Array,
    userId: Schema.Types.ObjectId, // referência ao usuário que enviou a foto
    userName: String,
}, {
    timestamps: true // adiciona createdAt e updatedAt automaticamente
})

const Photo = mongoose.model("photo", photoSchema); // cria o modelo Photo a partir do schema photoSchema

module.exports = Photo; // exporta o modelo Photo para ser utilizado em outras partes da aplicação