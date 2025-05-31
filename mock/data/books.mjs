import { fakerZH_CN as faker } from '@faker-js/faker'

function mockBook(id) {
  return {
    id,
    title: faker.book.title(),
    author: faker.book.author(),
    series: faker.book.series(),
    publisher: faker.book.publisher(),
    isbn: faker.commerce.isbn()
  }
}

const books = Array.from({ length: 10 }).map((_, index) => mockBook(index + 1))

export default books