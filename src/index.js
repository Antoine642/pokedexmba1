import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';
import App from './screens/App';
import Search from './screens/Search';
import Home from './screens/Home';
import PokemonDetail from './screens/PokemonDetail';
import Generation from './screens/Generation';

const routerConfig = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/generation/:id', element: <Generation /> },
      { path: '/:name', element: <PokemonDetail /> },
      { path: '/search', element: <Search /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={routerConfig}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);

