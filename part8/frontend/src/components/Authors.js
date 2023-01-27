import { useMutation, useQuery } from '@apollo/client'
import useField from '../hooks/useField'
import { ALL_AUTHORS, CHANGE_BIRTH } from '../queries'
import Select from 'react-select'
import { useState } from 'react'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  const [changeBirth] = useMutation(CHANGE_BIRTH, {
    refetchQueries: [ {query: ALL_AUTHORS} ]
  })

  const [name, setName] = useState(null)
  const {reset: bornReset, ...born} = useField('number')

  if (!props.show) {
    return null
  }

  if (result.loading)  {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors
  const options = authors.map(au => {
    return {value: au.name, label: au.name}
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    changeBirth({variables: {
      name: name.value,
      born: Number(born.value),
    }})
    bornReset()
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Set Birthyear</h3>
      <form onSubmit={handleSubmit}>
        <Select options={options} onChange={setName} />
        <div>born <input {...born} /></div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
