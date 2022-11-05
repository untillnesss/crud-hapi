
import SendResponse from './response.js';
import Utils from './Utils.js';
import { nanoid } from 'nanoid'

const bookController = {
    index: async (request, h) => {
        let books = Utils.getBookData() ?? []
        let mappedBook = books.map((book) => {
            return {
                id: book.id,
                name: book.name,
                publisher: book.publisher
            }
        })

        return SendResponse.success(h, { books: mappedBook})
    },
    show: async (request, h) => {
        try {
            let bookId = request.params.id;
            let existBook = Utils.getBookData();

            const findBook = existBook.find(book => book.id === bookId)

            if (findBook == null)
                return SendResponse.notFound(h, 'Buku tidak ditemukan')

            return SendResponse.success(h, { book: findBook })
        } catch (error) {
            return SendResponse.notFound(h, 'Buku tidak ditemukan')
        }
    },
    store: async (request, h) => {

        try {
            const bookReq = request.payload

            if (!bookReq.hasOwnProperty('name') || bookReq.name == null || bookReq.name == '')
                return SendResponse.badRequest(h, "Gagal menambahkan buku. Mohon isi nama buku")

            if (bookReq.readPage > bookReq.pageCount)
                return SendResponse.badRequest(h, "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount")

            let existBook = Utils.getBookData();

            const bookId = nanoid()
            bookReq.id = bookId
            bookReq.finished = bookReq.pageCount === bookReq.readPage
            bookReq.insertedAt = new Date
            bookReq.updatedAt = new Date

            existBook.push(bookReq)

            Utils.saveUserData(existBook)

            return SendResponse.created(h, 'Buku berhasil ditambahkan', {
                bookId
            });
        } catch (error) {
            console.log(error);

            return SendResponse.internalError(h, "Buku gagal ditambahkan")
        }
    },
    update: async (request, h) => {

        try {
            let bookId = request.params.id;
            const bookReq = request.payload

            if (!bookReq.hasOwnProperty('name') || bookReq.name == null || bookReq.name == '')
                return SendResponse.badRequest(h, "Gagal memperbarui buku. Mohon isi nama buku")

            if (bookReq.readPage > bookReq.pageCount)
                return SendResponse.badRequest(h, "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount")

            let existBook = Utils.getBookData();

            const findBook = existBook.find(book => book.id === bookId)

            if (findBook == null)
                return SendResponse.notFound(h, 'Gagal memperbarui buku. Id tidak ditemukan')

            const updateBook = existBook.filter(book => book.id !== bookId)

            const newBookData = {
                id: bookId,
                name: bookReq.name,
                year: bookReq.year,
                author: bookReq.author,
                summary: bookReq.summary,
                publisher: bookReq.publisher,
                pageCount: bookReq.pageCount,
                readPage: bookReq.readPage,
                reading: bookReq.reading,
                finished: bookReq.pageCount === bookReq.readPage,
                insertedAt: findBook.insertedAt,
                updatedAt: new Date
            }

            updateBook.push(newBookData)

            Utils.saveUserData(updateBook)

            return SendResponse.successMessage(h, 'Buku berhasil diperbarui');
        } catch (error) {
            console.log(error);

            return SendResponse.internalError(h, "Gagal memperbarui buku")
        }
    },
    delete: async (request, h) => {

        try {
            let bookId = request.params.id;
            let existBook = Utils.getBookData();

            const findBook = existBook.find(book => book.id === bookId)

            if (findBook == null)
                return SendResponse.notFound(h, 'Buku gagal dihapus. Id tidak ditemukan')

            const updateBook = existBook.filter(book => book.id !== bookId)

            Utils.saveUserData(updateBook)

            return SendResponse.success(h, 'Buku berhasil dihapus');
        } catch (error) {
            console.log(error);

            return SendResponse.internalError(h, "Buku gagal dihapus")
        }
    }
}

export default bookController