import { useApolloClient, useSubscription } from '@apollo/client'
import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import RecommendBooks from './components/RecommendBooks'
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from './queries'

export const updateCache = (cache, query, bookAdded) => {
  const addUnique = (array, newItem) => {
    if (array.find(item => item.id === newItem.id)) {
      return [...array]
    } else {
      return array.concat(newItem)
    }
  }

  // ALL_AUTHOR
  cache.updateQuery(query[0], ({ allAuthors }) => {
    return {
      allAuthors: addUnique(allAuthors, bookAdded.author)
    }
  })

  // ALL_BOOK
  cache.updateQuery(query[1], ({ allBooks }) => {
    return {
      allBooks: addUnique(allBooks, bookAdded)
    }
  })
}

const App = () => {
  const [page, setPage] = useState('login')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const bookAdded = data.data.bookAdded
      window.alert(`${bookAdded.title} by ${bookAdded.author.name} has been added to the library!`)
      updateCache(client.cache, [ {query: ALL_AUTHORS}, {query: ALL_BOOKS} ], bookAdded)
    }
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {
          token ?
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommended')}>recommended</button>
            <button onClick={logout}>logout</button>
          </> :
          <button onClick={() => setPage('login')}>login</button>
        }
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <RecommendBooks show={page === 'recommended'} />

      <NewBook show={page === 'add'} />

      <LoginForm show={page === 'login'} setToken={setToken} setPage={setPage} />
    </div>
  )
}

export default App
