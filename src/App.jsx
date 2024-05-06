import { Outlet, Route, Routes } from 'react-router-dom'
import './App.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import sortByField from './shared/sortByField';

const App = () => {

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://td4.brsm-nafta.com/api/v2/Mobile/get_full_ffs')
      .then(response => {
        setData(sortByField(response.data, 'region'));
      })
      .catch(error => {
        setError(error);
      });
  }, []);

  if (error) {
    return (
      <div>
        <h2>Error</h2>
        <h3>{error.message}</h3>
      </div>
  );
  } else if (!data) {
    return (
        <div>
          <h2>Loading...</h2>
        </div>
  );
  } else {
    return (
      <Routes>
        <Route path='/' element={<div> something shared to all pages <Outlet/></div>}>
          <Route index element={<p>index</p>} />

          <Route path='test' element={<p>test</p>} />

          <Route path='*' element={<p>404 - Not found</p>} />
        </Route>
      </Routes>
    )
  }
}

export default App