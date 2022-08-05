import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { Card, CardSubtitle, CardText, CardTitle, Input } from 'reactstrap'

import { TbMapSearch } from 'react-icons/tb'
import { fetchWeather } from './api/fetchWeather'
import { useState } from 'react'

function App() {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})

  const search = async (e) => {
    if (e.key === 'Enter') {
      const data = await fetchWeather(query)
      setWeather(data)
      setQuery('')
    }
  }
  return (
    <div className='container'>
      <Card className='d-flex w-100 p-3 weather-card'>
        <div className='input-container'>
          <Input
            type='text'
            placeholder='search location there ...'
            className='search mb-3'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={search}
          />
          <TbMapSearch
            onClick={search}
            size={25}
            color='gray'
            className='icon-container'
          />
        </div>
        {weather.main ? (
          <div className='d-flex flex-column align-items-center justify-content-center text-center mt-5'>
            <CardSubtitle tag='h6' className='mb-4'>
              <div>
                <span className='text-white'>{weather.name}</span>
                <sup className='text-muted p-2'>{weather.sys.country}</sup>
              </div>
            </CardSubtitle>
            <CardTitle tag='h1' className='text-white mb-2'>
              {Math.round(weather.main.temp)}
              <sup>&deg;C</sup>
            </CardTitle>
            <CardText>
              <img
                className='sity-icon'
                alt={weather.weather[0].description}
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              />
              <span className='text-white'>
                {weather.weather[0].description}
              </span>
            </CardText>
          </div>
        ) : (
          <span className='text-center text-info mt-5'>
            Search a new palce to explore weather!
          </span>
        )}
      </Card>
    </div>
  )
}

export default App
