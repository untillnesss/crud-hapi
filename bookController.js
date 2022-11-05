
import SendResponse from './response.js';
import Utils from './Utils.js';
import { nanoid } from 'nanoid'

const bookController = {
    index: async (request, h) => {
        let books = Utils.getBookData() ?? []
        return SendResponse.success(h, { books })
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
    }
}

export default bookController