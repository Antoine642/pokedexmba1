import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';
import App from './screens/App';
import Search from './screens/Search';
import Home from './screens/Home';

const routerConfig = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
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

