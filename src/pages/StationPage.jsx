import { useParams, useNavigate } from 'react-router-dom';
import FuelPricesTable from '../components/FuelPricesTable';

const StationPage = ({ data }) => {
  const { region, city, address } = useParams();
  const station = data[region][city][address][0];
  
  const navigate = useNavigate();

  if (!station) {
    navigate('/not_found');
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
          <FuelPricesTable/>
        </div>
      </>
    );
  }
};

export default StationPage;