const axios = require('axios');


const getAvailableCountries = async (req, res) => {
  console.log('Solicitud recibida para obtener países disponibles');
  
  try {
    console.log("Obteniendo países...");
    const response = await axios.get('https://date.nager.at/api/v3/AvailableCountries');
    console.log('Respuesta recibida:', response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error al obtener países:', error.message); 
    res.status(500).json({ error: 'Error al obtener la lista de países' });
  }
};

const getCountryInfo = async (req, res) => {
    const { countryCode } = req.params; 

    try {
        const bordersResponse = await axios.get(`https://date.nager.at/api/v3/CountryInfo/${countryCode}`);
        
        const populationResponse = await axios.get(`https://countriesnow.space/api/v0.1/countries/population?country=${countryCode}`);
        
        const flagResponse = await axios.get(`https://countriesnow.space/api/v0.1/countries/flag/images?country=${countryCode}`);
        
        const countryInfo = {
            countryCode,
            borders: bordersResponse.data.borders || [],
            populationData: populationResponse.data.data || [],
            flagUrl: flagResponse.data.flag || '',
        };

        res.status(200).json(countryInfo);
    } catch (error) {
        console.error("Error al obtener información del país:", error);
        res.status(500).json({ error: 'Error al obtener la información del país' });
    }
};

module.exports = {
  getAvailableCountries,
  getCountryInfo
};

