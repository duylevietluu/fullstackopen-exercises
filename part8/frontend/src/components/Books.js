import { useQuery } from '@apollo/client'
import { useState } from 'react'
import Select from 'react-select'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [genre, setGenre] = useState({value: null, label: "all genre"})

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  let books = result.data.allBooks
  let allGenres = new Set()
  
  books.forEach( ({ genres }) => genres.forEach(genre => allGenres.add(genre)))

  const options = [
    {value: null, label: "all genre"},
    ...Array.from(allGenres).map(ge => {return {value: ge, label: ge}})
  ]

  const filteredBooks = genre.value ? books.filter(book => book.genres.indexOf(genre.value) !== -1) : books

  return (
    <div>
      <h2>books</h2>
      <div>select genre</div>
      <Select options={options} onChange={setGenre} />

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
