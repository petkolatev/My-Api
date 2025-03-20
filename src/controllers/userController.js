import { Router } from "express"
import userService from "../services/userService.js"
import { getErrorMessage } from "../utils/errorUtils.js"

const userController = Router()
userController.put('/profile/:userId', async (req, res) => {
    try {
        const user = await userService.update(req.params.userId, { ...req.body })
        res.json(user)

    } catch (err) {
        const error = getErrorMessage(err)
        res.status(500).send({ error })
    }
})

userController.post('/register', async (req, res) => {
    const { username, email, password, rePassword } = req.body

    try {
        const token = await userService.register(username, email, password, rePassword)
        res.cookie('auth', token, { httpOnly: true }).json(token)

    } catch (err) {
        const error = getErrorMessage(err)
        res.status(500).send({ error })
    }
})

userController.post('/login', async (req, res) => {
    const { email, password } = req.body

    try {
        const token = await userService.login(email, password)

        res.cookie('auth', token, { httpOnly: true }).json(token)
    } catch (err) {
        const error = getErrorMessage(err)
        res.status(500).send({ error })
    }

})

userController.get('/logout', (req, res) => {
    res.clearCookie('auth')

    res.send({ message: 'Logged out' })
})

export default userController

