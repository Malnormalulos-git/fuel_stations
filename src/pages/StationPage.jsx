import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const StationPage = ({ data }) => {
  const { region, city, address } = useParams();
  const station = data[region][city][address][0];
  
  const navigate = useNavigate();

  const [fuelPrices, setFuelPrices] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFuelPrices = async () => {
      try {
        const response = await axios.get('https://td4.brsm-nafta.com/api/v2/mobile/fuel_prices/2');
        setFuelPrices(response.data);
      } catch (error) {
        setError(error);
      }
    };

    if (station) {
      fetchFuelPrices();
    } else {
      navigate('/not_found');
    }
  }, [station, navigate]);

  if (error) {
    return (
      <div>
        <h2>Error while fetching fuel prices</h2>
        <h3>{error.message}</h3>
      </div>
    );
  } else if (!data) {
    return (
      <div>
        <h2>Loading fuel prices...</h2>
      </div>
    );
  } else {
    return (
      <>
        <h2>Регіон: {region}</h2>
        <h3>Населений пункт: {city}</h3>
        <h4>Вулиця: {address}</h4>
        <div>
          {station.building && <p>Будинок: {station.building}</p>}
          {station.phone && <p>Телефон: {station.phone}</p>}
          <h4>Ціни на пальне:</h4>
          <table>
            <thead>
              <tr>
                <th>Назва</th>
                <th>Ціна (грн)</th>
              </tr>
            </thead>
            <tbody>
              {fuelPrices.map((fuel) => (
                <tr key={fuel.fuelMobId}>
                  <td>{fuel.name}</td>
                  <td>{fuel.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
};

export default StationPage;