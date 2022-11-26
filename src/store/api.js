import axios from "axios"
axios.defaults.baseURL = "https://api.openweathermap.org/data/2.5"

class Weather {
    async  fetchWeathers() {
       try {
           return  axios.get(`/forecast?lat=${41.3266638}&lon=${69.2282999}&units=metric&appid=45fd0b0851d8cb044266072c5d857cb8`).then(res => res.data)
       }catch(err) {
         console.log(err)
       }
    }
    
}
export const weather = new Weather()