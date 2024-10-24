import React, { createContext, useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const ThemeContext = createContext();

// Define your themes here (light with gold tones, dark, etc.)
const themes = {
  light: createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#c8a600', // Golden tone for primary color
      },
      background: {
        default: '#f4e7c3', // Soft golden background color
        paper: '#f7e1a3', // Light golden for paper (cards, etc.)
      },
      text: {
        primary: '#4e4e4e', // Dark grey for primary text
        secondary: '#333333', // Slightly darker grey for secondary text
      },
    },
    typography: {
      fontFamily: `'Roboto', 'Helvetica', 'Arial', sans-serif`,
    },
  }),
  dark: createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#90caf9', // Default light blue for dark mode
      },
      background: {
        default: '#121212', // Typical dark background
        paper: '#1e1e1e', // Darker background for cards/paper elements
      },
      text: {
        primary: '#ffffff', // White for primary text
        secondary: '#b0b0b0', // Light grey for secondary text
      },
    },
  }),
};

const ThemeContextProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState('dark'); // Default to light

  // Use effect to sync with localStorage (persist user preference)
  useEffect(() => {
    const savedTheme = localStorage.getItem('themeMode');
    if (savedTheme) {
      setThemeMode(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('themeMode', themeMode);
  }, [themeMode]);

  // Get the current theme based on the user's selection
  const theme = themes[themeMode];

  // Function to toggle between light and dark modes
  const toggleTheme = (mode) => {
    setThemeMode(mode === 'light' ? 'dark' : 'light'); // Toggle between light and dark
  };

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeContextProvider };
