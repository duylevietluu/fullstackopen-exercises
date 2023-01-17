import { configureStore } from '@reduxjs/toolkit'

import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notifReducer from './reducers/notifReducer'

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    notification: notifReducer,
    filter: filterReducer
  }
})

export default store