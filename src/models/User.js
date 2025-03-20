import { Schema, Types, model } from "mongoose";
import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10

const userSchema = new Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    rePassword: {
        type: String
    }
})

userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, SALT_ROUNDS)

    this.password = hash
})

const User = model('User', userSchema)

export default User