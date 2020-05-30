import React, { useState, useEffect } from 'react'
import axios from 'axios';

const SearchFilter = ({searchTerm, setSearchTerm}) => {
    const updateSearch = (event) => setSearchTerm(event.target.value)
    return (
        <div>
            find countries <input value={searchTerm} onChange={updateSearch} />
        </div>
    )
}

const CountryDetails = ({country}) => {
    return (
        <div >
            <h2>{country.name}</h2>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h3>languages</h3>
            <ul>
                {country.languages.map(lang => <li key={lang.name} >{lang.name}</li>)}
            </ul>
            <img src={country.flag} alt="Flag" width="100" height="100"/>
        </div>
    )
}

const CountryList = ({countries, searchTerm}) => {
    const countriesToShow = countries.filter(
        country => country.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
    
    if(countriesToShow.length === 1) {
        return <CountryDetails country={countriesToShow[0]} />
    } else if (countriesToShow.length > 1 && countriesToShow.length <= 10) {
        return (<div>
                    {countriesToShow.map(country => 
                        <div key={country.alpha3Code}>{country.name}</div>)}
                </div>)
    } else {
        return (<div>Too many matches, specify another filter</div>) 
    }
}

const App = () => {
  const [countries, setCountries] = useState([]) 
  const [ searchTerm, setSearchTerm ] = useState('')
  const countriesURL = "https://restcountries.eu/rest/v2/all";

  useEffect(() => {  
    const eventHandler = response => {
        setCountries(response.data)
    }
    const promise = axios.get(countriesURL)
    promise.then(eventHandler)
  }, [])

  return (
    <div>
        <SearchFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <CountryList countries={countries} searchTerm={searchTerm} />
    </div>
  )
}

export default App