import { createSlice } from '@reduxjs/toolkit'
import { fetchWeathers } from './actions';

const initialState = {
    data: []
}

export const WeatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWeathers.fulfilled, (state , action) => {
        state.data =action.payload
    });
  }
})


// export const {} = counterSlice.actions

export default WeatherSlice.reducer