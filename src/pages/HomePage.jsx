import { Link } from "react-router-dom";

const HomePage = ({ data }) => (
  <>
    <h2>Оберіть регіон:</h2>
    {Object.keys(data).map(region => (<>
      <Link key={region} to={`/${region}`}>
        {region}
      </Link>
      <br/>
      </>
    ))}
  </>
);
export default HomePage;