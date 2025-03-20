import bcrypt from 'bcrypt'
import User from '../models/User.js'
import jwt from '../lib/jwt.js'

const authService = {
    async register(username, email, password, next) {
       
        return await User.create({
            username,
            email,
            password,
        })
    },
    
    async update(id, update,) {
        return User.findByIdAndUpdate(id, { ...update}, {new: true})
    },

    async login(email, password) {
        const user = await User.findOne({ email })

        if (!user) {
            throw new Error('Invalid User or Password!')
        }

        const isValid = await bcrypt.compare(password, user.password)

        if (!isValid) {
            throw new Error('Invalid User or Password!')
        }

        const token = await this.generateToken(user)

        return { token, user }
    },

    async generateToken(user) {
        const payload = {
            _id: user._id,
            email: user.email,
            username: user.username
        }
        const token = await jwt.sign(payload, '3', { expiresIn: '2h' })

        return token
    }

}


export default authService
