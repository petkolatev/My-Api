import { Schema, model, Types } from "mongoose";
import User from "./User.js";

const bookSchema = new Schema({
    title: {
        type: String,
    },
    author: {
        type: String,
    },
    genre: {
        type: String,
    },
    year: {
        type: Number,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    owner: {
        type: Types.ObjectId,
        ref: 'User'
    },
    likes: [{
        type: Types.ObjectId,
        ref: 'User',
    }],
    buyers: [{
        type: Types.ObjectId,
        ref: 'User',
    }]


});

const Book = model('Book', bookSchema)

export default Book
