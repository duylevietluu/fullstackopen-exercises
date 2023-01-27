import { useMutation } from "@apollo/client"
import { useEffect } from "react"
import useField from "../hooks/useField"
import { LOGIN } from "../queries"

const LoginForm = ({ show, setToken, setPage }) => {
  const {reset: usernameReset, ...username} = useField('text')
  const {reset: passwordReset, ...password} = useField('text')

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error)
      //donothing
    }
  })

  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      setToken(token)
      setPage("authors")
      localStorage.setItem('book-user-token', token)
    }
  }, [result.data]) // eslint-disable-line

  if (!show) {
    return null
  }

  const handleLogin = (event) => {
    event.preventDefault()
    login({ variables: { username: username.value, password: password.value } })
  }

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>Username: <input {...username} /> </div>
        <div>Password: <input {...password} /> </div>
        <button type="submit">login</button>
      </form>
    </>
  )
}

export default LoginForm