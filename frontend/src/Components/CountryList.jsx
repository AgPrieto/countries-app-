import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function CountryList() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://countriesnow.space/api/v0.1/countries/flag/images');
        setCountries(response.data.data); // Accedemos a la data que contiene los países y sus banderas
        setLoading(false);
      } catch (error) {
        setError('Error al obtener la lista de países');
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  if (loading) return <div>Cargando países...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f3f4f6', 
      padding: '16px' 
    }}>
      <List sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
        {countries && countries.length > 0 ? (
          countries.map((country) => (
            <React.Fragment key={country.iso2}>
              <ListItem alignItems="flex-start" className="w-full">
                {/* Hacemos que el Link ocupe todo el ListItem */}
                <Link
                  to={`/country/${country.iso2}`}
                  style={{
                    display: 'flex',    // Para hacer que el enlace ocupe todo el ListItem
                    width: '100%',      // Aseguramos que el enlace ocupe todo el ancho
                    textDecoration: 'none', // Elimina cualquier subrayado
                    color: 'inherit',   // Mantiene el color por defecto del texto
                    padding: '8px'      // Añadimos algo de padding para mejorar la experiencia visual
                  }}
                >
                  <ListItemAvatar>
                    {/* Usamos la bandera desde la API */}
                    <Avatar alt={country.name} src={country.flag} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="h6" style={{ fontSize: '1.25rem', fontWeight: '600' }}>
                        {country.name}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: 'text.primary', display: 'inline' }}
                      >
                        {'Click to see more details'}
                      </Typography>
                    }
                  />
                </Link>
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))
        ) : (
          <div>No countries available</div>
        )}
      </List>
    </div>
  );
}











    