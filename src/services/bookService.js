import Book from '../models/Book.js'

const bookService = {
    async get() {
        return Book.find()
    },
    async getById(bookId) {
        return Book.findById(bookId)
    },
    async create({ title, author, genre, year, description, image, owner } ) {
        return Book.create({ title, author, genre, year, description, image, owner })
    },
    async update(id, update,) {
        return Book.findByIdAndUpdate(id, { ...update}, {new: true})
    },
    async remove(bookId) {
        return  Book.findOneAndDelete({'_id':bookId})
    },
    async search(searchString) {
        return Book.find({ "title" : { $regex: new RegExp(`.*${searchString}.*`, 'i')  }})
    }
}

export default bookService
