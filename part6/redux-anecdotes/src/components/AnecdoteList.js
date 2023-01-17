import { voteAnecdote } from '../reducers/anecdoteReducer'
import { displayNotif } from '../reducers/notifReducer'
import { useDispatch, useSelector } from 'react-redux' 

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes.filter(
        item => (item.content.toLowerCase().includes(state.filter.toLowerCase())))
    )
    anecdotes.sort((a, b) => b.votes - a.votes)
    const dispatch = useDispatch()

    const handleVote = async(anecdote) => {
        dispatch(voteAnecdote(anecdote))
        dispatch(displayNotif(`voted '${anecdote.content}'`, 5))
    }

    return anecdotes.map(anecdote =>
        <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
        </div>
    )
}

export default AnecdoteList