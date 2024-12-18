import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CountryList from './Components/CountryList';
import CountryInfo from './Components/CountryInfo';

const App = () => {
  return (
    <Router>
      <div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#2563eb', marginBottom: '2rem', textAlign: 'center' }}>
          Countries App
        </h1>
        <div>
          <Routes>
            <Route path="/" element={<CountryList />} />
            <Route path="/country/:countryCode" element={<CountryInfo />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;







