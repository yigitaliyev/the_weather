import { createAsyncThunk } from "@reduxjs/toolkit"
import { weather } from '../store/api'

export const fetchWeathers = createAsyncThunk(
    'weather/fetchWeather',
    async () => await weather.fetchWeathers()  
  )