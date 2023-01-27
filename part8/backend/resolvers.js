const { UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const JWT_SECRET = 'duyislearningfullstack'
const PASSWORD_DUY = 'duyislearningfullstack'

const resolvers = {
  Author: {
    bookCount: async(root) => Book.count({ author: root._id })
  },
  Book: {
    author: async(root) => Author.findById(root.author)
  },
  Query: {
    bookCount: async() => Book.collection.countDocuments(),
    authorCount: async() => Author.collection.countDocuments(),
    allBooks: async(root, args) => {
      let resultBooks = await Book.find({})
      if (args.author) {
        resultBooks = resultBooks.filter(book => args.author === book.author.name)
      }
      if (args.genre) {
        resultBooks = resultBooks.filter(book => book.genres.indexOf(args.genre) !== -1)
      }
      return resultBooks
    },
    allAuthors: async(root, args) => {
      return Author.find({})
    },
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      try {
        let author = await Author.findOne({ name: args.author })

        // if author not in authors, add author
        if (!author) {
          const newAuthor = new Author({ name: args.author })
          author = await newAuthor.save()
        }

        // add book
        const newBook = new Book({ ...args, author: author._id })
        await newBook.save()

        // publish
        pubsub.publish('BOOK_ADDED', { bookAdded: newBook })

        return newBook
      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },

    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      return Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo }, { new: true })
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favouriteGenre: args.favouriteGenre 
      })
  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== PASSWORD_DUY ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
}

module.exports = resolvers
