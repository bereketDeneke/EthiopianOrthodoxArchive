import React from 'react';
import { ThemeContextProvider } from './components/ThemeContext';
import Header from './components/Header';
import HomePage from './pages/Home';

function App() {
  return (
    <ThemeContextProvider>
      <Header />
      <HomePage />
    </ThemeContextProvider>
  );
}

export default App;
