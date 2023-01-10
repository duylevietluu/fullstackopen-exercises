import axios from 'axios'
import { useState, useEffect } from 'react'

const ViewCountry = ({country}) => {
  return (
    <>
      <h2>{country.name.common}</h2>
      <div>capital {country.capital.map((city, id) => <span key={id}>{city} </span>)}</div>
      <div>area {country.area} km2</div>
      <strong>languages</strong>
      <ul>
        {Object.values(country.languages).map((lang, id) => <li key={id}>{lang}</li>)}
      </ul>
      <img src={country.flags.png} alt={`${country.name.common}'s flag`}></img>
    </>
  )
}

const ViewCountries = ({countries, viewFunction}) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }
  if (countries.length > 1) {
    return countries.map((country, id) => (
      <div key={id}>
        <span>{country.name.common} </span>
        <button onClick={() => viewFunction(country)}>show</button>
      </div>
    ))
  }
  if (countries.length === 1) {
    return <ViewCountry country={countries[0]} />
  }
  
  return <div>No matches</div>
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [fil, setFil] = useState({filter: "", filterCountries: []})

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data))
  }, [])
  
  const handleName = (event) => {
    const newFilter = event.target.value
    const filterFunc = country => country.name.common.toLowerCase().indexOf(newFilter.toLowerCase()) !== -1

    setFil({
      filter: newFilter,
      filterCountries: countries.filter(filterFunc)
    })
  }

  const handleButton = (country) => {
    setFil({
      ...fil,
      filterCountries: [country]
    })
  }

  return (
    <div>
      <div>
        find countries <input value={fil.filter} onChange={handleName} />
      </div>
      <ViewCountries countries={fil.filterCountries} viewFunction={handleButton} />
    </div>
  )
}

export default App
