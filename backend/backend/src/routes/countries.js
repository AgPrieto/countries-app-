const express = require('express');
const { getAvailableCountries, getCountryInfo } = require('../controllers/countriesController'); 

const router = express.Router();


router.get('/available-countries', getAvailableCountries);
router.get('/country-info/:countryCode', getCountryInfo);

module.exports = router;


