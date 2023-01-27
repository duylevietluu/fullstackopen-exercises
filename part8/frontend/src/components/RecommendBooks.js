import { useQuery } from '@apollo/client'
import { ALL_BOOKS, FAVOURITEGENRE } from '../queries'

const RecommendBooks = ({ show }) => {
  const resultFavorite = useQuery(FAVOURITEGENRE)
  const result = useQuery(ALL_BOOKS)

  if (!show) {
    return null
  }

  if (result.loading || resultFavorite.loading) {
    return <div>loading...</div>
  }

  const genre = resultFavorite.data.me.favouriteGenre
  const books = result.data.allBooks.filter(book => book.genres.indexOf(genre) !== -1)

  return (
    <div>
      <h2>recommended books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
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

export default RecommendBooks
