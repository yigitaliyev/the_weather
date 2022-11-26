import { configureStore } from '@reduxjs/toolkit'
import  WeatherSlice  from './reduser'

export const store = configureStore({
  reducer: WeatherSlice,
})