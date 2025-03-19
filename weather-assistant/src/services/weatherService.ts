import axios from 'axios'

const CWB_API_KEY = import.meta.env.VITE_CWB_API_KEY
const CWB_BASE_URL = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore'

export interface WeatherData {
  locationName: string
  temperature: number
  humidity: number
  rainProbability: number
  weatherDescription: string
  windSpeed: number
  windDirection: string
}

export interface AirQualityData {
  locationName: string
  aqi: number
  pm25: number
  pm10: number
  o3: number
  description: string
}

class WeatherService {
  async getWeatherData(location: string): Promise<WeatherData> {
    try {
      const response = await axios.get(`${CWB_BASE_URL}/F-C0032-001`, {
        params: {
          Authorization: CWB_API_KEY,
          locationName: location,
          elementName: 'Wx,T,RH,PoP,WS,WD'
        }
      })
      
      // 處理 API 響應數據
      const data = response.data.records.location[0]
      return {
        locationName: data.locationName,
        temperature: parseFloat(data.weatherElement.find((el: any) => el.elementName === 'T').time[0].parameter.parameterValue),
        humidity: parseFloat(data.weatherElement.find((el: any) => el.elementName === 'RH').time[0].parameter.parameterValue),
        rainProbability: parseFloat(data.weatherElement.find((el: any) => el.elementName === 'PoP').time[0].parameter.parameterValue),
        weatherDescription: data.weatherElement.find((el: any) => el.elementName === 'Wx').time[0].parameter.parameterValue,
        windSpeed: parseFloat(data.weatherElement.find((el: any) => el.elementName === 'WS').time[0].parameter.parameterValue),
        windDirection: data.weatherElement.find((el: any) => el.elementName === 'WD').time[0].parameter.parameterValue
      }
    } catch (error) {
      console.error('Error fetching weather data:', error)
      throw error
    }
  }

  async getAirQualityData(location: string): Promise<AirQualityData> {
    try {
      const response = await axios.get(`${CWB_BASE_URL}/A-B0062-001`, {
        params: {
          Authorization: CWB_API_KEY,
          locationName: location
        }
      })
      
      // 處理 API 響應數據
      const data = response.data.records.location[0]
      return {
        locationName: data.locationName,
        aqi: parseInt(data.weatherElement.find((el: any) => el.elementName === 'AQI').time[0].parameter.parameterValue),
        pm25: parseFloat(data.weatherElement.find((el: any) => el.elementName === 'PM25').time[0].parameter.parameterValue),
        pm10: parseFloat(data.weatherElement.find((el: any) => el.elementName === 'PM10').time[0].parameter.parameterValue),
        o3: parseFloat(data.weatherElement.find((el: any) => el.elementName === 'O3').time[0].parameter.parameterValue),
        description: data.weatherElement.find((el: any) => el.elementName === 'AQI').time[0].parameter.parameterName
      }
    } catch (error) {
      console.error('Error fetching air quality data:', error)
      throw error
    }
  }
}

export const weatherService = new WeatherService() 