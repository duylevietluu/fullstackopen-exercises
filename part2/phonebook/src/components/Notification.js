const Notification = ({ message, isSuccess }) => {
  if (message === null) {
    return null
  }

  let notifStyle = {
    color: isSuccess ? 'green' : 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  }
  
  return (
    <div style={notifStyle}>
      {message}
    </div>
  )
}

export default Notification