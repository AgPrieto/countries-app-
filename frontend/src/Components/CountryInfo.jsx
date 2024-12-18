import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Registrar los componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CountryInfo = () => {
  const { countryCode } = useParams();
  const [countryInfo, setCountryInfo] = useState(null);
  const [borders, setBorders] = useState([]); 
  const [flag, setFlag] = useState(''); 
  const [populationData, setPopulationData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchCountryInfo = async () => {
      try {
     
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
        const data = await response.json();
        setCountryInfo(data[0]);
  
      
        const flagResponse = await fetch('https://countriesnow.space/api/v0.1/countries/flag/images');
        const flagData = await flagResponse.json();
  
    
        const countryFlag = flagData.data.find(country => country.iso2 === countryCode)?.flag;
        setFlag(countryFlag);
  
  
        const borderNames = await Promise.all(
          data[0].borders.map(async (borderCode) => {
            const res = await fetch(`https://restcountries.com/v3.1/alpha/${borderCode}`);
            const borderData = await res.json();
            return {
              name: borderData[0].name.common,
              code: borderData[0].cca2, 
            };
          })
        );
        setBorders(borderNames); 
  

        const populationResponse = await fetch('https://countriesnow.space/api/v0.1/countries/population');
        const populationData = await populationResponse.json();
  

        let countryPopulation = null;
        for (let i = 0; i < populationData.data.length; i++) {
          const populationGroup = populationData.data[i];
  
         
          if (populationGroup.country.toLowerCase() === data[0].name.common.toLowerCase()) {
            countryPopulation = populationGroup;
            break;
          }
        }
  

        if (countryPopulation) {
          const years = countryPopulation.populationCounts.map(entry => entry.year);
          const populations = countryPopulation.populationCounts.map(entry => entry.value);

  
          setPopulationData({
            labels: years,
            datasets: [
              {
                label: `${data[0].name.common} Population Over Time`,
                data: populations,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
              },
            ],
          });
        } else {
          console.log('No se encontraron datos de población para este país');
        }
        
      } catch (error) {
        console.error('Error al obtener la información del país:', error);
      }
    };
  
    fetchCountryInfo();
  }, [countryCode]);

  if (!countryInfo) return <p>Cargando información...</p>;

  const {
    name,
    population,
  } = countryInfo;
   
  return (
    <div>
<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '16px' }}>

  <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '16px' }}>{name.common}</h2>


  {flag ? (
    <img src={flag} alt={`Bandera de ${name.common}`} width="500" style={{ marginBottom: '16px', marginTop: "20px" }} />
  ) : (
    <p>Bandera no disponible</p>
  )}

  {/* Fronteras */}
  <p style={{ fontWeight: '600', marginBottom: '8px' }}><h3>Border Countries</h3></p>
  {borders.length > 0 ? (
    <ul style={{ listStyleType: 'none', paddingLeft: '0', margin: '0' }}>
      {borders.map((border, index) => (
        <li key={index} >
          <Link to={`/country/${border.code}`} style={{ color: 'inherit'}}>
            {border.name}
          </Link>
        </li>
      ))}
    </ul>
  ) : (
    <p>No hay fronteras disponibles.</p>
  )}
  
</div>

 
      <div>
        <h3>Population graph over time</h3>
        {populationData.labels.length > 0 ? (
          <Line data={populationData} />
        ) : (
          <p>No hay datos de población disponibles para este país.</p>
        )}
      </div>

      <div style={{ marginTop: '1rem', textAlign: 'center' }}>
  <Link
    to="/"
    style={{
      display: 'inline-block',
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: '#fff',
      borderRadius: '3px',
      textDecoration: 'none',
      textAlign: 'center',
      fontWeight: 'bold',
      transition: 'background-color 0.3s',
      marginBottom: "20px",
      marginTop: "20px"
    }}
    onMouseEnter={(e) => (e.target.style.backgroundColor = '#0056b3')}
    onMouseLeave={(e) => (e.target.style.backgroundColor = '#007bff')}
  >
    Return to country list
  </Link>
</div>

    </div>
  );
};

export default CountryInfo;
















  

