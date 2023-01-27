import { useState } from 'react'
import useField from '../hooks/useField'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK } from '../queries'
import { updateCache } from '../App'

const NewBook = (props) => {
  const [genres, setGenres] = useState([])
  const [createBook] = useMutation(CREATE_BOOK, {
    // refetchQueries: [  {query: ALL_AUTHORS}, {query: ALL_BOOKS} ],
    update: (cache, response) => {
      updateCache(cache, [ {query: ALL_AUTHORS}, {query: ALL_BOOKS} ], response.data.addBook)
    },
  })

  const {reset: titleReset, ...title} = useField('text')
  const {reset: authorReset, ...author} = useField('text')
  const {reset: publishedReset, ...published} = useField('number')
  const {reset: genreReset, ...genre} = useField('text')

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    // console.log(`add book... ${title.value} ${author.value} ${published.value} ${genres}`)

    createBook({ variables: {
      title: title.value,
      author: author.value,
      published: Number(published.value),
      genres,
    } })

    titleReset(); authorReset(); publishedReset(); genreReset(); setGenres([])
  }

  const addGenre = () => {
    setGenres(genres.concat(genre.value))
    genreReset()
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div> title <input {...title}/> </div>
        <div> author <input {...author}/> </div>
        <div> published <input {...published}/> </div>
        <div>
          <input {...genre} />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
