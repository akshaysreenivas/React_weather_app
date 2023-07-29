import axios from 'axios'

// instance for user making apis
const userInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,

})
// login service  
export function weatherdatas(city) {
    //   calling api
    const url=`/search-location-weather?city=${city}`
    return userInstance.get(url);
}
// login service  
export function locationBasedWeatherdatas(latitude,longitude) {
    //   calling api
    const url=`/current-location-weather?lat=${latitude}&lon=${longitude}`
    return userInstance.get(url);
}







