import express from 'express'
import books from '../data/books.mjs'

const router = express.Router()


router.get('/books', (req, res) => {
  res.json({
    status: 'success',
    code: 200,
    data: books,
    message: ''
  })
})



export default router