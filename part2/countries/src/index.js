import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios'

const Filter = ({filter, changeFilter}) =>{
  return(
    <form>
      <div>
        Find countries <input value = {filter} onChange = {changeFilter}/>
      </div>
    </form>
  )
}

const Display = (p) =>{
  return(
    <>
      {p.text} {p.text2 === undefined? '' : p.text2}
    </>
  )
}

const ShowButton = ({handleShowButton}) =>{
  return(
    <button type="submit" onClick = {handleShowButton}>show</button>
  )
}

const Weather = ({country, weather}) =>{
  return(
    <>
    <h3>Wheater in {country.capital}</h3>
    <div><b>temperature:</b> {weather.temperature} Celsius</div>
    <div><img src = {weather.icon} alt = "weather icon"/></div>
    <b>wind: </b>{weather.wind_speed} mph direction {weather.wind_direction}
    </>
  )
}

const Countries = (p) =>{
  if(p.countries.length > 10)
    return(<div>Too many matches, specify another filter</div>)

  else if(p.countries.length > 1) {
    return(
      <div>
          {p.countries.map(c => {return(<div><Display key = {c.name} text = {c.name} /> 
          <ShowButton handleShowButton = {() => {
            const newShowButton = Array(p.showButtons.length).fill(false)
            newShowButton[p.all.findIndex(p => p.name === c.name? true : false)] = true
        
            p.setShowButton(newShowButton)
          }
            } /></div>)})}
      </div>
    )
  }else if(p.countries.length === 1){
    let country = p.countries[0]

    return(
      <div>
        <h2>{country.name}</h2>
        <div><Display text = 'Capital' text2 = {country.capital}/></div>
        <div><Display text = 'Population' text2 = {country.population}/></div>

        <h3>Languages</h3>
          <ul>
            {country.languages.map(lang => 
              <li key= {lang.name}>
                <Display text = {lang.name}/>
              </li>
            )}
          </ul>

          <img src={country.flag} width={100} height={100} alt = "flag" />
          <Weather country = {country} weather ={p.weather}/>
      </div>
    )
  }

  return(<div> </div>)
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [ newInput, setNewInput ] = useState('')
  const [showButtons, setShowButton] = useState(Array(countries.length).fill(false))
  const [weather, setWeather] = useState({
    temperature : undefined,
    wind_speed : undefined,
    wind_direction : undefined,
    icon : undefined
  })

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data))
  }, [])

  const params = {
    access_key: process.env.REACT_APP_WEATHER_KEY,
    query: countries.length >0? countries[0].capital : "New York"
  }
  useEffect(() => {
    axios
      .get('https://api.weatherstack.com/current', {params})
      .then(response => {
        console.log(response.data)
        const data = response.data
        const newWeather = {
          temperature : data.current.temperature,
          wind_speed : data.current.wind_speed,
          wind_direction : data.current.wind_dir,
          icon : data.current.weather_icons
        }

        setWeather(newWeather)
      })
  }, [])

  const setCountry = (event) =>{
    setNewInput(event.target.value)

    setShowButton(Array(countries.length).fill(false))

  } 

  let countrySelected = showButtons.findIndex(selected => selected)

  const countryToShow =  countrySelected>=0 ? [countries[countrySelected]] : 
  newInput === ''? [] :
  countries.filter( country => country.name.toLowerCase().includes(newInput.toLowerCase()))

  return(
    <div>
      <Filter filter = {newInput} changeFilter = {setCountry}/>
      <Countries countries = {countryToShow} setShowButton = {setShowButton} showButtons = {showButtons} all = {countries}
      weather ={weather}/>
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'))
