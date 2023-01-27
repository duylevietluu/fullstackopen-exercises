import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`

export const ALL_BOOKS = gql`
  query ($genre: String) {
    allBooks(genre: $genre) {
      id
      genres
      published
      title
      author {
        name
        born
        bookCount
        id
      }
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      id
      genres
      published
      title
      author {
        name
        born
        bookCount
        id
      }
    }
  }
`

export const CHANGE_BIRTH = gql`
  mutation changeBirth($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      name
      born
      bookCount
      id
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const FAVOURITEGENRE = gql`
  query Query {
    me {
      favouriteGenre
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      author {
        name
        born
        bookCount
        id
      }
      genres
      id
      published
      title
    }
  }
`