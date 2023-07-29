const {  getCurrentLocationWeather, getSearchLocationWeather } = require("../controllers/userController");

const router = require("express").Router();

router.get("/search-location-weather", getSearchLocationWeather);
router.get("/current-location-weather", getCurrentLocationWeather);

module.exports = router;