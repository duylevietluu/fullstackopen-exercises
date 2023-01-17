import { createSlice } from '@reduxjs/toolkit'
import anecdoteServices from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload
    },
    addAnecdote(state, action) {
      state.push(action.payload)
    },
    vote(state, action) {
      const id = action.payload
      return state.map(item =>
        item.id === id ? 
        {...item, votes: item.votes + 1} : 
        item 
      )
    }
  }
})

export const { setAnecdotes, addAnecdote, vote } = anecdoteSlice.actions

export const initAnecdotes = () => {
  return async(dispatch) => {
    const anecdotes = await anecdoteServices.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async(dispatch) => {
    const newItem = await anecdoteServices.createNew(content)
    dispatch(addAnecdote(newItem))
  }
}

export const voteAnecdote = (anecdote) => {
  return async(dispatch) => {
    await anecdoteServices.update(anecdote.id, {...anecdote, votes: anecdote.votes + 1})
    dispatch(vote(anecdote.id))
  }
}

export default anecdoteSlice.reducer
