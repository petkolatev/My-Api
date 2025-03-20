import { Router } from "express"
import bookService from "../services/bookService.js"
import { getErrorMessage } from "../utils/errorUtils.js"

const bookController = Router();
bookController.get('/book', async (req, res) => {
    try {
        const { title } = req.query
        let books = []
        if (title)
            books = await bookService.search(title)
        else
            books = await bookService.get()
        res.json(books)
    } catch (err) {
        const error = getErrorMessage(err)
        res.status(500).send({ error })
    }
})

bookController.get('/book/:bookId', async (req, res) => {
    try {
        const { bookId } = req.params
        const book = await bookService.getById(bookId)
        res.json(book)

    } catch (err) {
        const error = getErrorMessage(err)
        res.status(500).send({ error })
    }
})

bookController.put('/book/:bookId', async (req, res) => {
    try {
        const book = await bookService.update(req.params.bookId, { ...req.body })
        res.json(book)

    } catch (err) {
        const error = getErrorMessage(err)
        res.status(500).send({ error })
    }
})

bookController.post('/book', async (req, res) => {
    try {
        const book = await bookService.create(req.body)
        res.json(book)

    } catch (err) {
        const error = getErrorMessage(err)
        res.status(500).send({ error })
    }
})
bookController.delete('/book/:bookId', async (req, res) => {
    try {
        const book = await bookService.remove(req.params.bookId)
        res.json(book)

    } catch (err) {
        const error = getErrorMessage(err)
        res.status(500).send({ error })
    }
})

export default bookController

