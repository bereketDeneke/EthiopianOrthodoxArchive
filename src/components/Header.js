import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ThemeContext } from './ThemeContext';
import './Header.css'; // Custom CSS for star sprinkles

const Header = () => {
  const { themeMode, toggleTheme } = useContext(ThemeContext);

  const handleThemeChange = (mode) => {
    toggleTheme(mode);
  };

  return (
    <div className="header-wrapper">
      <AppBar position="static" sx={{ position: 'relative', overflow: 'visible' }}>
        <Toolbar className='header_container'>
          <Typography variant="h6" sx={{ flexGrow: 1, marginLeft: 70 }}>
          የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን እምነትና ሥርዓት 
          </Typography>

          <IconButton
            edge="end"
              variant="contained"
              color="primary"
              onClick={() => toggleTheme(themeMode)}
            >
               {themeMode === 'dark' ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>

        </Toolbar>
      </AppBar>

      {/* Sprinkling stars container */}
      <div className="stars-container">
        {[...Array(100)].map((_, index) => (
          <span key={index} className="star"></span>
        ))}
      </div>
    </div>
  );
};

export default Header;
