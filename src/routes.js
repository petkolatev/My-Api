import { Router } from "express"
import bookController from "./controllers/bookController.js"
import userController from "./controllers/userController.js"

const routes = Router()

routes.post('/register', userController)
routes.post('/login', userController)
routes.get('/logout', userController)
routes.get('/profile', userController)
routes.put('/profile/:userId', userController)

routes.get('/book', bookController)
routes.get('/book/:bookId', bookController)
routes.put('/book/:bookId', bookController)
routes.post('/book', bookController)
routes.delete('/book/:bookId', bookController)

export default routes
