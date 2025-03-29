import React from 'react';
import ReactDOM from 'react-dom/client';
import { CharacterFiltersProvider } from './components/providers/FilterProvider';
import { DataProvider } from './components';
import { App } from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <DataProvider>
      <CharacterFiltersProvider>
        <App />
      </CharacterFiltersProvider>
    </DataProvider>
  </React.StrictMode>
);
