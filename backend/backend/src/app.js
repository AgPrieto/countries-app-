const express = require('express');
const cors = require('cors');
const countriesRoutes = require('./routes/countries'); // Ruta correcta a './routes/countries'
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Rutas de países
app.use('/api/countries', countriesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

