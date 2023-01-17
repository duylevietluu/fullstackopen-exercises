import { createAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import { displayNotif } from '../reducers/notifReducer'

const AnecdoteForm = props => {
    const handleSubmit = async(event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''

        props.createAnecdote(content)
        props.displayNotif(`added anecdote '${content}'`, 5)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div><input name="anecdote" /></div>
            <button type="submit">create</button>
        </form>
    )
}

export default connect(
    null,
    { createAnecdote, displayNotif }
) (AnecdoteForm)