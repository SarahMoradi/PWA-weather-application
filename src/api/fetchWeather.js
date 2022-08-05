import axios from 'axios'

const URL = 'https://api.openweathermap.org/data/2.5/weather'
const APi_Key = 'eb36f63b62cfd040f08cda1bb11eab56'

export  const fetchWeather = async (query) => {
  const { data } = await axios.get(URL, {
    params: {
      q: query,
      units: 'metric',
      APPID: APi_Key,
    },
  })
  return data
}
