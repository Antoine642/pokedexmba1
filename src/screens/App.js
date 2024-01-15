import { Outlet, useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  const navigate = useNavigate();
  return (
    <div className="App m-3">
      <ul className="nav">
        <li className="nav-item">
          <a
            className={"nav-link"}
            href="#"
            onClick={() => navigate('/')}
          >
            Accueil
          </a>
        </li>
        <li className="nav-item">
          <a
            className={"nav-link"}
            href="#"
            onClick={() => navigate('/search')}
          >
            Rechercher
          </a>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}

export default App;
